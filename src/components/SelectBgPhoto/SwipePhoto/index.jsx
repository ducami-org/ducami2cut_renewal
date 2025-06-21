import React from 'react'
import BgPhoto from '../BgPhoto'
import SwipeThings from '../../common/Swiper'
import { PhotoUrl } from '../../../styles/bgPhoto'
import { usePhotoStore } from '../../../store/PhotoInfo'

const SwipePhoto = () => {
  const bg = usePhotoStore((state)=> state.actions.setBgPhoto)
  return (
    <SwipeThings
    array={PhotoUrl}
    Component={BgPhoto}
    store={bg}
    attribute="url"/>
  )
}

export default SwipePhoto
