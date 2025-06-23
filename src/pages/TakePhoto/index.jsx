import React from 'react'
import * as S from './style'
import Header from '../../components/common/Header'
import PhotoBooth from '../../components/TakePhoto/PhotoBooth'
import { usePhotoStore } from '../../store/PhotoInfo'

const TakePhoto = () => {
  const { photo: PHOTO } = usePhotoStore();
  return (
    <S.Container>
        <Header left='/bg' right='/finish' title='사진 촬영' content={PHOTO}/>
        <PhotoBooth/>
    </S.Container>
  )
}

export default TakePhoto;
