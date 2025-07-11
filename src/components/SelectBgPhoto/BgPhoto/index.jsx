import React from "react";
import * as S from "./style";
import { Colors } from "../../../styles/colors";
/**
 * 배경 이미지 컴포넌트
 * 
 * 스와이퍼에서 각 배경 이미지를 표시하는 컴포넌트입니다.
 * 
 * @param {string|object} p - 배경 이미지 URL 또는 객체
 */
const BgPhoto = ({ p , select}) => {
  // PhotoWrapper 컴포넌트에 src 속성으로 이미지 전달
  return (
    <>
      <S.PhotoWrapper src={p} alt="배경 이미지" style={{border: select && `5px solid ${Colors.primary}`}}/>
     
    </>
  );
};

export default BgPhoto;
