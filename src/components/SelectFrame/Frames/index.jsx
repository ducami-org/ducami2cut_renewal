import React from 'react'
import * as S from './style'

const Frames = ({p}) => {
  return (
    <S.FrameBox style={{backgroundColor:p}}>
        <S.EmptyBox/>
        <S.EmptyBox/>
    </S.FrameBox>
  )
}

export default Frames
