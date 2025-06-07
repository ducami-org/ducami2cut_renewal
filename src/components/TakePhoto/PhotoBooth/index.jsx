import React, { useRef, useState } from "react";
import * as S from "./style";
import TakeBtn from "../TakeBtn";
import { usePhotoStore } from "../../../store/PhotoInfo";

const PhotoBooth = () => {
  const webcamRef = useRef(null);
  const setPhoto = usePhotoStore((state) => state.actions.setPhoto);
  const photo = usePhotoStore((state) => state.photo);
  const [takeCnt, setTakeCnt] = useState(0);
  const [cnt, setCnt] = useState(null);

  const captureHandle = () => {
    if (takeCnt > 1 || cnt !== null) return;

    let countdown = 3;
    setCnt(countdown);

    const timer = setInterval(()=> {
        countdown-=1;
        if(countdown ===0){
            clearInterval(timer);
            const img = webcamRef.current.getScreenshot();
            setPhoto(takeCnt, img);
            setTakeCnt((prev)=> prev+1);
            setCnt(null);
            console.log(photo)
        }else{
            setCnt(countdown);
        }
        
    },1000);
  };
  return (
    <S.BoothWrapper>
      <S.Camera mirrored={true} ref={webcamRef} />
      <S.cntNum>{cnt !== null ? cnt : ""}</S.cntNum>
      <TakeBtn onClick={captureHandle} />
    </S.BoothWrapper>
  );
};

export default PhotoBooth;
