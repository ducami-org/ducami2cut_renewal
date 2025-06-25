import React from 'react'
import * as S from './style'

const Frames = ({p, select}) => {
  return (
    <S.FrameBox style={{backgroundColor: p }}>
      {select && <S.SelectBox/>}
        <S.EmptyBox/>
        <S.EmptyBox/>
    </S.FrameBox>
  )
}

export default Frames
