import React from 'react'
import * as S from './style'

const CustomBtn = ({onClick}) => {
  return (
    <S.ButtonBox onClick={onClick}>시작하기</S.ButtonBox>
  )
}

export default CustomBtn
