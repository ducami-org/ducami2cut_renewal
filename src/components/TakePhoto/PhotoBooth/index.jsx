import React, { useRef, useEffect, useState } from "react";
import * as S from "./style";
import TakeBtn from "../TakeBtn";
import { usePhotoStore } from "../../../store/PhotoInfo";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

const PhotoBooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
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

  useEffect(() => {
    let stream = null;
    let isComponentMounted = true;

    const startCamera = async () => {
      try {
        if (videoRef.current) {
                
          if (videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
          }

          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
          });


          if (videoRef.current && isComponentMounted) {
            videoRef.current.srcObject = stream;


            videoRef.current.onloadedmetadata = async () => {
              if (videoRef.current && isComponentMounted) {
                try {
                  await videoRef.current.play();
                  console.log("웹캠 재생 시작");
                } catch (e) {
                  console.error("웹캠 재생 실패:", e);
                }
              }
            };
          }
        }
      } catch (e) {
        console.error("웹캠 접근 오류:", e);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log("웹캠 스트림 종료");
      }
    };
  }, []);


  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    selfieSegmentation.setOptions({
      modelSelection: 1, 
    });

    selfieSegmentation.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = results.image.width;
      canvas.height = results.image.height;

      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);


      if (bgImg) {
        console.log("배경 이미지 그리기 시도");
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      } else {

        ctx.fillStyle = "#444";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.save();
      ctx.filter = "blur(3px)";
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.restore();
    });

    setIsModelLoaded(true);

    let animationId;
    const processFrame = async () => {
      if (videoRef.current && isModelLoaded) {
        await selfieSegmentation.send({ image: videoRef.current });
      }
      animationId = requestAnimationFrame(processFrame);
    };
    processFrame();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      selfieSegmentation.close();
    };
  }, [bgImg, isModelLoaded]);

  const startCountdown = () => {
    if (takeCount >= 2) return;
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
      const photo = canvasRef.current.toDataURL("image/png");
      setPhoto(takeCount, photo); // 인덱스에 사진 저장
      setTakeCount(takeCount + 1); 
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