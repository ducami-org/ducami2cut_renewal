import React from 'react'
import * as S from './style'
import Header from '../../components/common/Header'
import SwipeFrames from '../../components/SelectFrame/SwipeFrames'

const SelectFrame = () => {
  return (
    <>
      <S.Container>
        <Header right='/' left='/'/>
        <S.SelectWrapper>
          <SwipeFrames/>
        </S.SelectWrapper>
        
      </S.Container>
    </>
  )
}

export default SelectFrame
