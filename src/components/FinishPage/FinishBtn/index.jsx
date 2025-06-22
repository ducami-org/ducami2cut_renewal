import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import { usePhotoStore } from "../../../store/PhotoInfo";
import { Colors } from "../../../styles/colors";

const FinishBtn = ({ onClick }) => {
  const nav = useNavigate();
  const { setPhoto, setFrameColor, setBgPhoto , setFrameText} = usePhotoStore((state)=> state.actions);
  return (
    <S.BtnWrapper>
      <S.BtnBox onClick={onClick}>사진 다운로드</S.BtnBox>
      <S.BtnBox
        onClick={() => {
          setPhoto(0, null);
          setPhoto(1,null);
          setFrameColor("");
          setBgPhoto(null);
          setFrameText("");
          nav("/");
        }}
        style={{
          backgroundColor : '#b3b6bc'
        }}
      >
        처음으로
      </S.BtnBox>
    </S.BtnWrapper>
  );
};

export default FinishBtn;
