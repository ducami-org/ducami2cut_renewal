import { create } from "zustand";

/**
 * 사진 정보 관리를 위한 Zustand 스토어
 * 
 * 앱 전체에서 사용되는 상태를 관리합니다:
 * - frameColor: 프레임 색상
 * - frameText: 프레임 텍스트
 * - bgPhoto: 배경 이미지 URL 또는 객체
 * - photo: 촬영된 사진 배열
 */
export const usePhotoStore = create((set) => ({
  // 상태 초기값
  frameColor: "",          // 프레임 색상
  frameText: "",           // 프레임 텍스트
  bgPhoto: null,           // 배경 이미지 URL 또는 객체
  photo: [null, null],     // 촬영된 사진 배열 (2개의 빈 슬롯)
  
  // 상태 업데이트 액션
  actions: {
    // 프레임 색상 설정
    setFrameColor: (color) => set({ frameColor: color }),
    
    // 프레임 텍스트 설정
    setFrameText: (text) => set({ frameText: text }),
    
    // 배경 이미지 설정
    setBgPhoto: (photo) => set({ bgPhoto: photo }),
    
    // 특정 인덱스의 사진 설정
    setPhoto: (index, newPhoto) =>
      set((state) => {
        const updated = [...state.photo];  // 기존 배열 복사
        updated[index] = newPhoto;         // 특정 인덱스 업데이트
        return { photo: updated };         // 새 배열로 상태 업데이트
      }),
  },
}));
