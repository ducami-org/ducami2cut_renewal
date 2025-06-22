import React from "react";
import * as S from "./style";
import Header from "../../components/common/Header";
import SwipeFrames from "../../components/SelectFrame/SwipeFrames";

const SelectFrame = () => {
  return (
    <>
      <S.Container>
        <Header right="/bg" left="/" title="프레임 선택" />
        <SwipeFrames />
      </S.Container>
    </>
  );
};

export default SelectFrame;
