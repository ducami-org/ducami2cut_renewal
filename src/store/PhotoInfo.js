import { create } from "zustand";

export const usePhotoStore = create((set) => ({
  frameColor: "",
  frameText: "",
  bgPhoto: null,
  photo: [null, null,], // 4개의 빈 슬롯으로 초기화
  actions: {
    setFrameColor: (color) => set({ frameColor: color }),
    setFrameText: (text) => set({ frameText:text }),
    setBgPhoto: (photo) => set({ bgPhoto: photo }),
    setPhoto: (index, newPhoto) =>
      set((state) => {
        const updated = [...state.photo];
        updated[index] = newPhoto;
        return { photo: updated };
      }),
  },
}));
