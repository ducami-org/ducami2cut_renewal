// 배경 이미지 파일 임포트
import schoolImg from '../assets/bgImages/schoolimg.jpg';          // 학교 이미지
import schoolLogo from '../assets/bgImages/schoolLogo.png';         // 학교 로고
import whisk1 from '../assets/bgImages/Whisk_cymwq5y2ji.jpg';      // 배경 이미지 1
import whisk2 from '../assets/bgImages/Whisk_gewzdi5y2q.jpg';      // 배경 이미지 2
import whisk3 from '../assets/bgImages/Whisk_hmowuyymqz.jpg';      // 배경 이미지 3
import whisk4 from '../assets/bgImages/Whisk_ji4zjg3zty.jpg';      // 배경 이미지 4
import whisk5 from '../assets/bgImages/Whisk_m2n2y4otlm.jpg';      // 배경 이미지 5
import whisk6 from '../assets/bgImages/Whisk_myxnzvhzmq.jpg';      // 배경 이미지 6
import whisk7 from '../assets/bgImages/Whisk_wzlmdvlmde.jpg';      // 배경 이미지 7

/**
 * 선택 가능한 배경 이미지 배열
 * 
 * 각 항목은 id와 url 속성을 가집니다.
 * - id: 고유 식별자
 * - url: import된 이미지 객체 (webpack/vite에 의해 변환된 URL)
 */
export const PhotoUrl = [
    { id: 1, url: schoolImg },    // 학교 이미지
    { id: 2, url: schoolLogo },   // 학교 로고
    { id: 3, url: whisk1 },       // 배경 이미지 1
    { id: 4, url: whisk2 },       // 배경 이미지 2
    { id: 5, url: whisk3 },       // 배경 이미지 3
    { id: 6, url: whisk4 },       // 배경 이미지 4
    { id: 7, url: whisk5 },       // 배경 이미지 5
    { id: 8, url: whisk6 },       // 배경 이미지 6
    { id: 9, url: whisk7 }        // 배경 이미지 7
];