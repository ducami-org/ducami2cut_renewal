import React, { useRef } from 'react';
import * as S from './style.js';
import PreviewPhoto from '../../components/FinishPage/PreviewPhoto';
import FinishBtn from '../../components/FinishPage/FinishBtn';
import html2canvas from 'html2canvas';

const Finish = () => {
  const printRef = useRef(null);

  const handleDownload = async () => {
    if (!printRef.current) {
      alert("다운로드할 내용이 없습니다.");
      return;
    }

    try {
      // DOM 요소를 캔버스로 변환
      const canvas = await html2canvas(printRef.current, {
        backgroundColor: null,
        scale: 2, // 해상도 향상
        useCORS: true,
        allowTaint: true,
      });

      // 캔버스를 이미지로 변환
      const link = document.createElement('a');
      link.download = `photo_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      
      // 다운로드 실행
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log("사진 다운로드 완료!");
    } catch (error) {
      console.error("다운로드 실패:", error);
      alert("다운로드에 실패했습니다.");
    }
  };

  return (
    <S.Container>
      <PreviewPhoto ref={printRef} />
      <FinishBtn onClick={handleDownload} />
    </S.Container>
  );
};

export default Finish;
