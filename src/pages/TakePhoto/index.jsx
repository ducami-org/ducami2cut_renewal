import React from 'react'
import * as S from './style'
import Header from '../../components/common/Header'
import PhotoBooth from '../../components/TakePhoto/PhotoBooth'

const TakePhoto = () => {
  return (
    <S.Container>
        <Header left='/bg' right='/' title='사진 촬영'/>
        <PhotoBooth/>
    </S.Container>
  )
}

export default TakePhoto;
