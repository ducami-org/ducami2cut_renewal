import React from 'react'
import * as S from './style'
import FramePhoto1 from '../../../assets/image/FramePhoto.png';
import FramePhoto2 from '../../../assets/image/FramePhoto1.png';
import FramePhoto3 from '../../../assets/image/FramePhoto2.png'
import FramePhoto4 from '../../../assets/image/FramePhoto4.png'

const Photo = () => {
  return (
    <S.Container>
        <S.PhotoWrapper  style={{marginBottom:100}}>
            <S.Photo src={FramePhoto2}/>
            <S.Photo src={FramePhoto1}/>
        </S.PhotoWrapper>

        <S.PhotoWrapper style={{marginTop:100}}>
            <S.Photo src={FramePhoto3}/>
            <S.Photo src={FramePhoto4}/>
        </S.PhotoWrapper>
    </S.Container>
  )
}

export default Photo;
