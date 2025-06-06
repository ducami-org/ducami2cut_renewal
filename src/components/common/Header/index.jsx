import React from 'react'
import * as S from './style'
import { useNavigate } from 'react-router-dom'

const Header = ({right , left}) => {
  const nav = useNavigate();
  return (
    <S.HeaderWrapper>
      <S.NextButton onClick={()=> nav(right)}>뒤로</S.NextButton>
      <S.SelectTitle>프레임 선택</S.SelectTitle>
      <S.NextButton onClick={()=> nav(left)}>다음</S.NextButton>
    </S.HeaderWrapper>
  )
}

export default Header
