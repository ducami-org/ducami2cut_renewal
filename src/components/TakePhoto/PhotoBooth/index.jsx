import React, { useRef, useState } from "react";
import * as S from "./style";
import TakeBtn from "../TakeBtn";
import { usePhotoStore } from "../../../store/PhotoInfo";

const PhotoBooth = () => {
  const webcamRef = useRef(null);
  const setPhoto = usePhotoStore((state) => state.actions.setPhoto);
  const photo = usePhotoStore((state)=> state.photo);
  const [takeCnt, setTakeCnt] = useState(0);

  const captureHandle = () => {
    if (takeCnt <= 1) {
      const img = webcamRef.current.getScreenshot();
      setPhoto(takeCnt, img);
      setTakeCnt(takeCnt + 1);
      console.log(photo);
    }
  };
  return (
    <S.BoothWrapper>
      <S.Camera mirrored={true} ref={webcamRef} />
      <TakeBtn onClick={captureHandle} />
    </S.BoothWrapper>
  );
};

export default PhotoBooth;
