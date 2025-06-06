import React, { useRef, useEffect, useState } from 'react';
import * as S from './style';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Frames from '../Frames';
import ArrowBtn from '../../common/ArrowBtn';
import { FrameColors } from '../../../styles/frameColors';
import 'swiper/css';
import 'swiper/css/navigation';

const SwipeFrames = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevRef.current && nextRef.current) {
        setIsReady(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.SwiperWrapper style={{ display: 'flex', alignItems: 'center' }}>
      <ArrowBtn direct="left" ref={prevRef} />

      {isReady && (
        <Swiper
          loop={true}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          spaceBetween={40}
          slidesPerView={1}
          speed={500}
        >
          {FrameColors.map((item) => (
            <S.FrameWrapper key={item.id}>
              <Frames color={item.color} />
            </S.FrameWrapper>
          ))}
        </Swiper>
      )}

      <ArrowBtn direct="right" ref={nextRef} />
    </S.SwiperWrapper>
  );
};

export default SwipeFrames;