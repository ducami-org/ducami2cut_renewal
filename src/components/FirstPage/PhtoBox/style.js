import styled, { keyframes, css } from "styled-components";

const fadeInTop = keyframes`
    from{
        opacity: 0;
        transform: translateY(-50px);
    }to{
        opacity: 1;
        transform: translateY(0);
    }
`;
const fadeInBottom = keyframes`
    from{
        opacity: 0;
        transform: translateY(50px);
    }to{
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const Container = styled.div`
  display: flex;
  gap: 40px;
`;
export const PhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
export const Photo = styled.img`
  width: 248px;
  opacity: 0;
  animation: ${({ $aniNum }) =>
    css`
      ${$aniNum === 1
        ? fadeInBottom
        : $aniNum === 2
        ? fadeInTop
        : $aniNum === 3
        ? fadeInTop
        : fadeInBottom} 1.5s ease ${$aniNum === 1
        ? "0.2s"
        : $aniNum === 2
        ? "0.1s"
        : $aniNum === 3
        ? "0.6s"
        : "0.8s"};
    `};
    animation-fill-mode:forwards;
`;
