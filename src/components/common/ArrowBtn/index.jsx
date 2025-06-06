import React, { forwardRef } from 'react';
import { BtnBox } from './style';  // 지금 공유해주신 스타일 파일

const ArrowBtn = forwardRef(({ direct }, ref) => {
  return (
    <BtnBox ref={ref} $direct={direct}>
      {direct === 'left' ? '〈' 
      : direct === 'right' ? '〉' :
       undefined}
    </BtnBox>
  );
});

export default ArrowBtn;