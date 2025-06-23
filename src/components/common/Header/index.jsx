import React from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

const Header = ({ right, left, title, content }) => {
  const nav = useNavigate();

  const handleClick = () => {
    console.log("content", content);
    if (content) {
      nav(right);
    } else {
      alert("옵션을 선택하세요");
    }
  }
    return (
      <S.HeaderWrapper>
        <S.NextButton onClick={() => nav(left)}>뒤로</S.NextButton>
        <S.SelectTitle>{title}</S.SelectTitle>
        <S.NextButton onClick={handleClick}>다음</S.NextButton>
      </S.HeaderWrapper>
    );
  };

export default Header;
