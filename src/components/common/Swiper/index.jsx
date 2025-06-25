import React, { useRef, useEffect, useState } from "react";
import * as S from "./style";
import { Swiper } from "swiper/react";              // Swiper 라이브러리
import { Navigation } from "swiper/modules";        // Swiper 네비게이션
import ArrowBtn from "../../common/ArrowBtn";       // 화살표 버튼
import SelectBtn from "../../common/SelectBtn";     // 선택 버튼
import "swiper/css";                               // Swiper 스타일
import { Colors } from "../../../styles/colors";
/**
 * 범용 스와이퍼 컴포넌트
 * 
 * 다양한 항목을 슬라이드 형태로 표시하고 선택할 수 있는 UI를 제공합니다.
 * 
 * @param {Function} store - 선택된 항목을 저장할 함수
 * @param {Array} array - 표시할 항목 배열
 * @param {string} attribute - 선택할 속성 이름
 * @param {Component} Component - 각 항목을 렌더링할 컴포넌트
 */
const SwipeThings = ({store, array, attribute, Component}) => {
  const prevRef = useRef(null);  // 이전 버튼 참조
  const nextRef = useRef(null);  // 다음 버튼 참조
  const [isReady, setIsReady] = useState(false);  // 스와이퍼 준비 상태
  const [activeIndex, setActiveIndex] = useState(0);  // 현재 활성 슬라이드 인덱스
  const [sIndex, setSIndex] = useState(0);  // 현재 인덱스 (사용되지 않음)
  const RenderComponent = Component;  // 렌더링할 컴포넌트

  /**
   * 슬라이드 변경 이벤트 핸들러
   * 현재 활성 슬라이드 인덱스를 업데이트합니다.
   */
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  /**
   * 항목 선택 이벤트 핸들러
   * 현재 활성 슬라이드의 속성 값을 저장합니다.
   */
  const handleChangeAttribute = () => {
    // 선택된 항목의 속성 값을 저장
    setSIndex(activeIndex);
    store(array[activeIndex][attribute]);
  };

  /**
   * 컴포넌트 마운트 시 버튼 참조 설정
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevRef.current && nextRef.current) {
        setIsReady(true);  // 버튼 참조가 준비되면 상태 업데이트
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <S.SelectWrapper>
      <S.SwiperWrapper>
        {/* 이전 버튼 */}
        <ArrowBtn direct="left" ref={prevRef} />

        {/* 스와이퍼 컴포넌트 (버튼 참조가 준비된 경우에만 렌더링) */}
        {isReady && (
          <Swiper
            modules={[Navigation]}  // 네비게이션 모듈 사용
            navigation={{
              prevEl: prevRef.current,  // 이전 버튼 참조
              nextEl: nextRef.current,  // 다음 버튼 참조
            }}
            onBeforeInit={(swiper) => {
              // 스와이퍼 초기화 전에 네비게이션 버튼 설정
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            slidesPerView={3}       // 한 화면에 보이는 슬라이드 수
            speed={500}             // 슬라이드 전환 속도
            centeredSlides={true}   // 현재 슬라이드 중앙 정렬
            onSlideChange={handleSlideChange}  // 슬라이드 변경 이벤트 핸들러
          >
            {/* 각 항목을 슬라이드로 렌더링 */}
            {array.map((item,index) => (
              <S.FrameWrapper key={item.id} >
                <RenderComponent p={item[attribute]} select={ sIndex === index }/>
              </S.FrameWrapper>
            ))}
          </Swiper>
        )}

        {/* 다음 버튼 */}
        <ArrowBtn direct="right" ref={nextRef} />
      </S.SwiperWrapper>
      
      {/* 선택 버튼 */}
      <SelectBtn onClick={handleChangeAttribute} />
    </S.SelectWrapper>
  );
};

export default SwipeThings;
