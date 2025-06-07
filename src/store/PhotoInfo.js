import { create } from "zustand";

export const usePhotoStore = create((set)=>({
    frameColor:'',
    frameText:'',
    bgPhoto:'',
    photo:[],
    actions:{
        setFrameColor: (color)=> set({frameColor:color}),
        setFrameText: (text) => set({frameText:text}),
        setBgPhoto: (photo) => set({bgPhoto:photo}),
        setPhoto: (photo1,photo2) => set({photo:[photo1,photo2]}),
    }
}))