import React from 'react'
import BgPhoto from '../BgPhoto'                    // 배경 이미지 컴포넌트
import SwipeThings from '../../common/Swiper'       // 스와이퍼 컴포넌트
import { PhotoUrl } from '../../../styles/bgPhoto'  // 배경 이미지 배열
import { usePhotoStore } from '../../../store/PhotoInfo'  // 상태 관리 스토어

/**
 * 배경 이미지 선택 컴포넌트
 * 
 * 사용자가 배경 이미지를 선택할 수 있는 스와이퍼 UI를 제공합니다.
 */
const SwipePhoto = () => {
  // 배경 이미지 설정 액션 가져오기
  const bg = usePhotoStore((state) => state.actions.setBgPhoto)
  
  return (
    <SwipeThings
      array={PhotoUrl}         // 배경 이미지 배열
      Component={BgPhoto}      // 각 항목을 렌더링할 컴포넌트
      store={bg}               // 선택 시 호출할 저장 함수
      attribute="url"          // 선택할 속성 이름
    />
  )
}

export default SwipePhoto
