import React, { useRef, useEffect, useState } from "react"; // React와 필요한 훅들을 임포트
import * as S from "./style"; // 스타일 컴포넌트 임포트
import TakeBtn from "../TakeBtn"; // 사진 촬영 버튼 컴포넌트 임포트
import { usePhotoStore } from "../../../store/PhotoInfo"; // 사진 정보를 저장하는 스토어 임포트
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation"; // MediaPipe의 배경 분리 라이브러리 임포트

const PhotoBooth = () => {
  // 주요 참조 객체들 정의
  const videoRef = useRef(null); // 비디오 요소에 대한 참조
  const canvasRef = useRef(null); // 캔버스 요소에 대한 참조
  const segmentationRef = useRef(null); // MediaPipe 세그멘테이션 객체에 대한 참조
  const animationRef = useRef(null); // 애니메이션 프레임 ID에 대한 참조
  
  // 상태 관리 변수들
  const [isModelLoaded, setIsModelLoaded] = useState(false); // 모델 로드 상태
  const [isVideoReady, setIsVideoReady] = useState(false); // 비디오 준비 상태
  const [takeCount, setTakeCount] = useState(0); // 촬영한 사진 개수
  const [isCnt, setIsCnt] = useState(false); // 카운트다운 표시 여부
  const [countdown, setCountdown] = useState(3); // 카운트다운 숫자

  // 전역 상태 관리 스토어에서 필요한 함수와 값 가져오기
  const { setPhoto } = usePhotoStore((state) => state.actions); // 사진 저장 함수


  // 웹캠 초기화 useEffect
  useEffect(() => {
    let isComponentMounted = true; // 컴포넌트 마운트 상태 추적

    const startCamera = async () => {
      try {
        // 기존 스트림이 있으면 종료
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop()); // 모든 미디어 트랙 중지
        }

        // 새 미디어 스트림 요청
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 }, // 이상적인 너비
            height: { ideal: 480 }, // 이상적인 높이
            facingMode: 'user' // 전면 카메라 사용
          } 
        });

        // 컴포넌트가 언마운트되었거나 비디오 참조가 없는 경우 처리 중단
        if (!isComponentMounted || !videoRef.current) return;

        // 비디오 요소에 스트림 연결
        videoRef.current.srcObject = stream;

        // 비디오 메타데이터 로드 대기
        await new Promise((resolve, reject) => {
          const video = videoRef.current;
          if (!video) return reject(new Error('Video element not found')); // 비디오 요소가 없으면 오류

          // 메타데이터 로드 완료 이벤트 핸들러
          const onLoadedMetadata = () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            resolve();
          };

          // 오류 이벤트 핸들러
          const onError = (e) => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            reject(e);
          };

          // 이미 메타데이터가 로드되었으면 바로 resolve
          if (video.readyState >= 1) {
            resolve();
          } else {
            // 아니면 이벤트 리스너 등록
            video.addEventListener('loadedmetadata', onLoadedMetadata);
            video.addEventListener('error', onError);
          }
        });

        // 비디오 재생 시작
        await videoRef.current.play();
        
        // 비디오가 완전히 준비될 때까지 대기
        await new Promise((resolve) => {
          const checkVideoReady = () => {
            const video = videoRef.current;
            // 비디오 크기가 설정되고 재생 준비가 완료되었는지 확인
            if (video && 
                video.videoWidth > 0 && 
                video.videoHeight > 0 && 
                video.readyState >= 3) {
              resolve();
            } else {
              // 아직 준비되지 않았으면 100ms 후 다시 확인
              setTimeout(checkVideoReady, 100);
            }
          };
          checkVideoReady();
        });

        // 컴포넌트가 여전히 마운트 상태이면 비디오 준비 상태 업데이트
        if (isComponentMounted) {
          setIsVideoReady(true);
        }

      } catch (e) {
        console.error("웹캠 접근 오류:", e); // 웹캠 접근 오류 로깅
      }
    };

    // 약간의 지연 후 카메라 시작 (컴포넌트 마운트 안정화를 위해)
    const timer = setTimeout(() => {
      startCamera();
    }, 100);

    // 클린업 함수
    return () => {
      isComponentMounted = false; // 컴포넌트 마운트 상태 변경
      clearTimeout(timer); // 타이머 정리
      // 웹캠 스트림 정리
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop()); // 모든 미디어 트랙 중지
        console.log("웹캠 스트림 종료");
      }
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // MediaPipe 초기화 useEffect
  useEffect(() => {
    // 비디오나 캔버스가 준비되지 않았으면 실행하지 않음
    if (!isVideoReady || !videoRef.current || !canvasRef.current) return;

    let isMounted = true; // 컴포넌트 마운트 상태 추적

    const initMediaPipe = () => {
      // MediaPipe SelfieSegmentation 인스턴스 생성
      const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`, // CDN에서 모델 파일 로드
      });

      // 모델 옵션 설정 (1: 일반 성능 모델)
      selfieSegmentation.setOptions({
        modelSelection: 1, 
      });

      // 결과 처리 콜백 함수 설정
      selfieSegmentation.onResults((results) => {
        // 컴포넌트가 언마운트되었거나 캔버스가 없으면 처리 중단
        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        // 캔버스 크기가 이미지 크기와 다르면 조정
        if (canvas.width !== results.image.width || canvas.height !== results.image.height) {
          canvas.width = results.image.width;
          canvas.height = results.image.height;
        }

        try {
          // 캔버스 초기화
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          // 좌우 반전 (셀카 모드처럼 보이게)
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);

        
            ctx.fillStyle = "#2d2e2d";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          

          // 세그멘테이션 마스크 적용 (배경과 사람 분리)
          ctx.save();
          ctx.filter = "blur(3px)"; // 부드러운 경계를 위한 블러 처리
          ctx.globalCompositeOperation = "destination-in"; // 마스크 적용 모드
          ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";
          ctx.restore();

          // 사람 부분 그리기
          ctx.save();
          ctx.globalCompositeOperation = "source-atop"; // 마스크 위에 원본 이미지 그리기
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          ctx.restore();
        } catch (err) {
          console.error('캔버스 렌더링 오류:', err); // 렌더링 오류 로깅
        }
      });

      // 참조 객체에 세그멘테이션 인스턴스 저장
      segmentationRef.current = selfieSegmentation;
      setIsModelLoaded(true); // 모델 로드 상태 업데이트

      // 프레임 처리 함수 - 애니메이션 프레임마다 실행
      const processFrame = async () => {
        if (!isMounted || !videoRef.current || !segmentationRef.current) return;
        
        try {
          // 현재 비디오 프레임을 세그멘테이션 모델에 전송
          await segmentationRef.current.send({ image: videoRef.current });
        } catch (err) {
          console.error('프레임 처리 오류:', err); // 프레임 처리 오류 로깅
        }
        
        // 컴포넌트가 마운트된 상태면 다음 프레임 요청
        if (isMounted) {
          animationRef.current = requestAnimationFrame(processFrame);
        }
      };

      // 모델 로드 후 잠시 대기 후 프레임 처리 시작 (안정화를 위해)
      setTimeout(processFrame, 200);
    };

    // MediaPipe 초기화 실행
    initMediaPipe();

    // 클린업 함수
    return () => {
      isMounted = false; // 컴포넌트 마운트 상태 변경
      // 애니메이션 프레임 정리
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // 세그멘테이션 인스턴스 정리
      if (segmentationRef.current) {
        segmentationRef.current.close();
      }
    };
  }, [isVideoReady]); // 비디오 준비 상태나 배경 이미지가 변경될 때 실행

  // 카운트다운 시작 함수
  const startCountdown = () => {
    // 이미 2장 찍었거나 모델/비디오가 준비되지 않았으면 실행 중단
    if (takeCount >= 2 || !isModelLoaded || !isVideoReady) return;
    setIsCnt(true); // 카운트다운 표시 활성화
    setCountdown(3); // 카운트다운 3초로 초기화
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          // 카운트다운이 끝나면
          clearInterval(countdownInterval); // 인터벌 정리
          setIsCnt(false); // 카운트다운 표시 비활성화
          captureHandle(); // 사진 촬영 실행
          return 3; // 카운트다운 값 리셋
        }
        return prevCountdown - 1; // 카운트다운 감소
      });
    }, 1000); // 1초마다 실행
  };

  // 사진 촬영 처리 함수
  const captureHandle = () => {
    // 캔버스가 있고 아직 2장 미만 촬영했을 때만 실행
    if (canvasRef.current && takeCount < 2) {
      try {
        // 캔버스의 현재 내용을 PNG 이미지로 변환
        const photo = canvasRef.current.toDataURL("image/png");
        setPhoto(takeCount, photo); // 스토어에 사진 저장
        setTakeCount(takeCount + 1); // 촬영 카운트 증가
      } catch (err) {
        console.error('사진 캡처 실패:', err); // 캡처 오류 로깅
      }
    }
  };


  return (
    <S.BoothWrapper>
      {/* 비디오 요소 (보이지 않음, 카메라 스트림 처리용) */}
      <video ref={videoRef} style={{ display: "none" }} playsInline />
      {/* 캔버스 요소 (실제 화면에 표시되는 부분) */}
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
      {/* 카운트다운 숫자 표시 (카운트다운 중일 때만 표시) */}
      {isCnt && (
        <S.cntNum>{countdown}</S.cntNum>
      )}
      {/* 모델 로딩 메시지 (모델이 로드되지 않았을 때만 표시) */}
      {!isModelLoaded && <div>모델 로딩 중...</div>}
      {/* 촬영 버튼 (모델이 로드되지 않았거나 이미 2장 찍었으면 비활성화) */}
      <TakeBtn onClick={()=> startCountdown()} disabled={!isModelLoaded || takeCount >= 2} />
    </S.BoothWrapper>
  );
};

export default PhotoBooth; // 컴포넌트 내보내기