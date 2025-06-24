import React, { useRef } from 'react'; // React와 useRef 훅 임포트
import * as S from './style.js'; // 스타일 컴포넌트 임포트
import PreviewPhoto from '../../components/FinishPage/PreviewPhoto'; // 사진 미리보기 컴포넌트 임포트
import FinishBtn from '../../components/FinishPage/FinishBtn'; // 완료 버튼 컴포넌트 임포트
import html2canvas from 'html2canvas'; // HTML 요소를 캔버스로 변환하는 라이브러리 임포트
import TextInput from '../../components/FinishPage/TextInput/index.jsx'; // 텍스트 입력 컴포넌트 임포트

const Finish = () => {
  // DOM 요소를 참조하기 위한 ref 생성 (다운로드할 영역 지정용)
  const printRef = useRef(null);

  // 사진 다운로드 처리 함수
  const handleDownload = async () => {
    // 다운로드할 요소가 없는 경우 처리
    if (!printRef.current) {
      alert("다운로드할 내용이 없습니다.");
      return;
    }

    try {
      // DOM 요소를 캔버스로 변환
      // html2canvas 라이브러리를 사용하여 요소를 이미지로 렌더링
      const canvas = await html2canvas(printRef.current, {
        backgroundColor: null, // 배경 투명하게 설정
        scale: 2, // 해상도를 2배로 향상시켜 선명한 이미지 생성
        useCORS: true, // 외부 이미지 리소스 허용 (Cross-Origin 지원)
        allowTaint: true, // 외부 리소스에 의한 캔버스 오염 허용
      });

      // 캔버스를 이미지로 변환하고 다운로드 링크 생성
      const link = document.createElement('a'); // 다운로드 링크 요소 생성
      link.download = `photo_${new Date().getTime()}.png`; // 파일명 설정 (현재 시간 기반)
      link.href = canvas.toDataURL('image/png'); // 캔버스 내용을 PNG 이미지 URL로 변환
      
      // 다운로드 자동 실행
      document.body.appendChild(link); // 링크를 DOM에 추가
      link.click(); // 링크 클릭 시뮬레이션으로 다운로드 시작
      document.body.removeChild(link); // 사용 후 링크 제거
      
      console.log("사진 다운로드 완료!"); // 다운로드 성공 로그
    } catch (error) {
      console.error("다운로드 실패:", error); // 오류 발생 시 콘솔에 로그
      alert("다운로드에 실패했습니다."); // 사용자에게 오류 알림
    }
  };

  return (
    <S.Container>
      {/* 
        사진 미리보기 컴포넌트 
        ref를 통해 이 영역을 캡처하여 다운로드할 수 있도록 설정
      */}
      <PreviewPhoto ref={printRef} />
      
      {/* 설정 영역 래퍼 */}
      <S.setWrapper>
        {/* 텍스트 입력 컴포넌트 (사진에 추가할 텍스트 입력) */}
        <TextInput />
        
        {/* 
          완료 버튼 컴포넌트 
          클릭 시 handleDownload 함수 실행하여 사진 다운로드
        */}
        <FinishBtn onClick={handleDownload} />
      </S.setWrapper>
      
    </S.Container>
  );
};

export default Finish; // Finish 컴포넌트 내보내기
