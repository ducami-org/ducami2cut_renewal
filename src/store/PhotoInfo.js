import { create } from "zustand";

export const usePhotoStore = create((set)=>({
    frameColor:'',
    frameText:'',
    bgPhoto:'',
    actions:{
        setFrameColor: (color)=> set({frameColor:color}),
        setFrameText: (text) => set({frameText:text}),
        setBgPhoto: (photo) => set({bgPhoto:photo}),
    }
}))