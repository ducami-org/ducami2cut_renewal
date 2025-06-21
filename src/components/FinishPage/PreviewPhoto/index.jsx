import React, { forwardRef } from "react";
import * as S from "./style";
import { usePhotoStore } from "../../../store/PhotoInfo";

const PreviewPhoto = forwardRef(function PreviewPhoto(props, ref) {
  const { photo, frameColor, bgPhoto } = usePhotoStore();
  return (
    <S.FrameBox style={{ backgroundColor: frameColor }} ref={ref}>
      {photo.map((item, index) => (
        <div
          style={{
            backgroundImage: `url(${bgPhoto})`,
            backgroundSize: "cover",
            borderRadius: "4px",
            overflow: "hidden",
          }}
          key={index}
        >
          <S.PhotoBox src={item} />
        </div>
      ))}
    </S.FrameBox>
  );
});

export default PreviewPhoto;
