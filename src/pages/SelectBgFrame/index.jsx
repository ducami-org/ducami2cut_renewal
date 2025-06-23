import React from 'react'
import * as S from './style'
import Header from '../../components/common/Header'
import SwipePhoto from '../../components/SelectBgPhoto/SwipePhoto'
import { usePhotoStore } from '../../store/PhotoInfo'

const SelectBg = () => {
  const { bgPhoto: BG } = usePhotoStore();
  return (
    <S.Container>
        <Header right='/take' left='/frame' title='배경 선택' content={BG}/>
        <SwipePhoto/>
    </S.Container>
  )
}

export default SelectBg
