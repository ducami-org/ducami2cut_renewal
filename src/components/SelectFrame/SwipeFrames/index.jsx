import React from "react";
import Frames from "../Frames";
import { usePhotoStore } from "../../../store/PhotoInfo";
import SwipeThings from "../../common/Swiper";
import { FrameColors } from "../../../styles/frameColors";

const SwipeFrames = () => {
  const color = usePhotoStore((state) => state.actions.setFrameColor);
  return (
    <SwipeThings
      array={FrameColors}
      attribute="color"
      store={color}
      Component={Frames}
    />
  );
};

export default SwipeFrames;