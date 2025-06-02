import React from 'react'
import * as S from './style'
import IntroduceText from '../../components/FirstPage/introducText'
import Photo from '../../components/FirstPage/PhtoBox'

const First = () => {
  return (
    <S.Container>
        <IntroduceText/>
        <Photo/>
    </S.Container>
  )
}

export default First
