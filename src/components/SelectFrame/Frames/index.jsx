import React from 'react'
import * as S from './style'

const Frames = ({color}) => {
  return (
    <S.FrameBox style={{backgroundColor:color}}>
        <S.EmptyBox/>
        <S.EmptyBox/>
    </S.FrameBox>
  )
}

export default Frames
