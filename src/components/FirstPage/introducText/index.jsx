import React from 'react'
import * as S from './style'
import CustomBtn from '../../common/CustomBtn'
import { useNavigate } from 'react-router-dom'

const IntroduceText = () => {
  const nav = useNavigate();
  return (
    <S.ContentWrapper>
         <S.TextWrapper>
        <S.ExplainText style={{fontSize:40, fontFamily:'paperlogyB'}}>인생두컷으로<br/>추억을 남겨보세요!</S.ExplainText>
        <S.ExplainText>오늘의 특별한 순간, 두카미가 정성껏 두 장의 사진을<br/>담아 선물해드릴게요</S.ExplainText> 
      </S.TextWrapper>
      <CustomBtn onClick={() => { nav('/frame'); console.log('버튼클릭'); }} />
    </S.ContentWrapper>
     
  )
}

export default IntroduceText
