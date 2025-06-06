import React from "react";
import * as S from "./style";

const SelectBtn = ({ onClick }) => {
  return <S.BtnBox onClick={onClick}>선택하기</S.BtnBox>;
};

export default SelectBtn;
