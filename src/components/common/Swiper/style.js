import styled from "styled-components";
import { SwiperSlide } from "swiper/react";

export const SelectWrapper = styled.div`
    width: 100vw;
    height: 100%;
    padding:40px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    box-sizing: border-box;
`

export const SwiperWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const FrameWrapper = styled(SwiperSlide)`
    display: flex;
    justify-content: center;
    transition: transform 0.3s ease, opacity 0.3s ease;

  &.swiper-slide {
    transform: scale(0.8);
    opacity: 0.4;
  }

  &.swiper-slide-active {
    transform: scale(1); 
    opacity: 1;
    z-index: 1000;
  }
`