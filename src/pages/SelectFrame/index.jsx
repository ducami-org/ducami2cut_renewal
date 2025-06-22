import React from "react";
import * as S from "./style";
import Header from "../../components/common/Header";
import SwipeFrames from "../../components/SelectFrame/SwipeFrames";
import { usePhotoStore } from "../../store/PhotoInfo";

const SelectFrame = () => {
  const FRAME_COLOR = usePhotoStore((state) => state.frameColor);
  return (
    <>
      <S.Container>
        <Header right="/bg" left="/" title="프레임 선택" content={FRAME_COLOR}/>
        <SwipeFrames />
      </S.Container>
    </>
  );
};

export default SelectFrame;
