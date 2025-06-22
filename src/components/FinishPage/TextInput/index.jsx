import React from "react";
import * as S from "./style";
import { usePhotoStore } from "../../../store/PhotoInfo";

const TextInput = () => {
  const setFrameText = usePhotoStore((state)=> state.actions.setFrameText);

  const handleInputChange = (e) => {
    setFrameText(e.target.value);
  };
  return (
    <S.InputWrapper>
      <S.InputTitle>문구 추가</S.InputTitle>
      <S.InputBox
        placeholder="문구를 입력하세요"
        maxLength={50}
        onChange={(e) => handleInputChange(e)}
      />
    </S.InputWrapper>
  );
};

export default TextInput;
