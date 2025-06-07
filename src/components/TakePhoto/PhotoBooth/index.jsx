import React, { useRef, useState } from "react";
import * as S from "./style";
import TakeBtn from "../TakeBtn";

const PhotoBooth = () => {
    const webcamRef = useRef(null);
  return (
    <S.BoothWrapper>
      <S.Camera mirrored={true} />
      <TakeBtn />
    </S.BoothWrapper>
  );
};

export default PhotoBooth;
