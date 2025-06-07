import React, { useRef, useEffect, useState } from "react";
import * as S from "./style";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowBtn from "../../common/ArrowBtn";
import SelectBtn from "../../common/SelectBtn";
import "swiper/css";

const SwipeThings = ({store, array, attribute, Component}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const RenderComponent = Component;

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleChangeAttribute = () => {
    store(array[activeIndex][attribute]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevRef.current && nextRef.current) {
        setIsReady(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.SelectWrapper>
      <S.SwiperWrapper>
        <ArrowBtn direct="left" ref={prevRef} />

        {isReady && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            slidesPerView={3}
            speed={500}
            centeredSlides={true}
            onSlideChange={handleSlideChange}
          >
            {array.map((item) => (
              <S.FrameWrapper key={item.id}>
                <RenderComponent p={item[attribute]}/>
              </S.FrameWrapper>
            ))}
          </Swiper>
        )}

        <ArrowBtn direct="right" ref={nextRef} />
      </S.SwiperWrapper>
      <SelectBtn onClick={handleChangeAttribute} />
    </S.SelectWrapper>
  );
};

export default SwipeThings;
