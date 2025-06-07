import React from 'react'
import * as S from './style'
import Header from '../../components/common/Header'
import SwipePhoto from '../../components/SelectBgPhoto/SwipePhoto'

const SelectBg = () => {
  return (
    <S.Container>
        <Header right='/take' left='/frame' title='배경 선택'/>
        <SwipePhoto/>
    </S.Container>
  )
}

export default SelectBg
