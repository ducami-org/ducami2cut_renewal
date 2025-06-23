import React, { useRef, useEffect, useState } from "react";
import * as S from "./style";
import TakeBtn from "../TakeBtn";
import { usePhotoStore } from "../../../store/PhotoInfo";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

const PhotoBooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const segmentationRef = useRef(null);
  const animationRef = useRef(null);
  
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [bgImg, setBgImg] = useState(null);
  const [takeCount, setTakeCount] = useState(0);
  const [isCnt, setIsCnt] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const { setPhoto } = usePhotoStore((state) => state.actions);
  const bg = usePhotoStore((state) => state.bgPhoto);

  // 배경 이미지 로드
  useEffect(() => {
    if (bg) {
      const img = new window.Image();
      img.src = bg;
      img.onload = () => setBgImg(img);
      img.onerror = () => setBgImg(null);
    } else {
      setBgImg(null);
    }
  }, [bg]);

  // 웹캠 초기화 - 수정된 부분
  useEffect(() => {
    let isComponentMounted = true;

    const startCamera = async () => {
      try {
        // 기존 스트림 정리
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          } 
        });

        if (!isComponentMounted || !videoRef.current) return;

        videoRef.current.srcObject = stream;

        // 비디오 메타데이터 로드 대기
        await new Promise((resolve, reject) => {
          const video = videoRef.current;
          if (!video) return reject(new Error('Video element not found'));

          const onLoadedMetadata = () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            resolve();
          };

          const onError = (e) => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            reject(e);
          };

          if (video.readyState >= 1) {
            resolve();
          } else {
            video.addEventListener('loadedmetadata', onLoadedMetadata);
            video.addEventListener('error', onError);
          }
        });

        // 비디오 재생
        await videoRef.current.play();
        
        // 비디오 완전 준비 대기
        await new Promise((resolve) => {
          const checkVideoReady = () => {
            const video = videoRef.current;
            if (video && 
                video.videoWidth > 0 && 
                video.videoHeight > 0 && 
                video.readyState >= 3) {
              resolve();
            } else {
              setTimeout(checkVideoReady, 100);
            }
          };
          checkVideoReady();
        });

        if (isComponentMounted) {
          setIsVideoReady(true);
        }

      } catch (e) {
        console.error("웹캠 접근 오류:", e);
      }
    };

    // 약간의 지연 후 카메라 시작
    const timer = setTimeout(() => {
      startCamera();
    }, 100);

    return () => {
      isComponentMounted = false;
      clearTimeout(timer);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        console.log("웹캠 스트림 종료");
      }
    };
  }, []);

  // MediaPipe 초기화 - 수정된 부분
  useEffect(() => {
    if (!isVideoReady || !videoRef.current || !canvasRef.current) return;

    let isMounted = true;

    const initMediaPipe = () => {
      const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
      });

      selfieSegmentation.setOptions({
        modelSelection: 1, 
      });

      selfieSegmentation.onResults((results) => {
        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // 캔버스 크기 설정
        if (canvas.width !== results.image.width || canvas.height !== results.image.height) {
          canvas.width = results.image.width;
          canvas.height = results.image.height;
        }

        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);

          // 배경 그리기
          if (bgImg) {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          } else {
            ctx.fillStyle = "#29c627";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          // 세그멘테이션 마스크 적용
          ctx.save();
          ctx.filter = "blur(3px)";
          ctx.globalCompositeOperation = "destination-in";
          ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";
          ctx.restore();

          // 사람 부분 그리기
          ctx.save();
          ctx.globalCompositeOperation = "source-atop";
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          ctx.restore();
        } catch (err) {
          console.error('캔버스 렌더링 오류:', err);
        }
      });

      segmentationRef.current = selfieSegmentation;
      setIsModelLoaded(true);

      // 프레임 처리 함수
      const processFrame = async () => {
        if (!isMounted || !videoRef.current || !segmentationRef.current) return;
        
        try {
          await segmentationRef.current.send({ image: videoRef.current });
        } catch (err) {
          console.error('프레임 처리 오류:', err);
        }
        
        if (isMounted) {
          animationRef.current = requestAnimationFrame(processFrame);
        }
      };

      // 모델 로드 후 프레임 처리 시작
      setTimeout(processFrame, 200);
    };

    initMediaPipe();

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (segmentationRef.current) {
        segmentationRef.current.close();
      }
    };
  }, [isVideoReady, bgImg]);

  const startCountdown = () => {
    if (takeCount >= 2 || !isModelLoaded || !isVideoReady) return;
    setIsCnt(true);
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          setIsCnt(false);
          captureHandle();
          return 3; 
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const captureHandle = () => {
    if (canvasRef.current && takeCount < 2) {
      try {
        const photo = canvasRef.current.toDataURL("image/png");
        setPhoto(takeCount, photo);
        setTakeCount(takeCount + 1);
      } catch (err) {
        console.error('사진 캡처 실패:', err);
      }
    }
  };


  return (
    <S.BoothWrapper>
      <video ref={videoRef} style={{ display: "none" }} playsInline />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          width: "640px",
          height: "480px",
          background: "#222",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          display: "block",
          margin: "0 auto"
        }}
      />
      {isCnt && (
        <S.cntNum>{countdown}</S.cntNum>
      )}
      {!isModelLoaded && <div>모델 로딩 중...</div>}
      <TakeBtn onClick={()=> startCountdown()} disabled={!isModelLoaded || takeCount >= 2} />
    </S.BoothWrapper>
  );
};

export default PhotoBooth;