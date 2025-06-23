import styled from "styled-components";
import Webcam from "react-webcam";

export const BoothWrapper = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const Camera = styled(Webcam)`
    width: 500px;
    border-radius: 8px;
    position: relative;
`
export const cntNum = styled.h1`
    font-size: 50px;
    font-family: 'paperlogyB';
    color:white;
    opacity: 0.5;
    position: absolute;
`
export const Canvas = styled.canvas`
    display: flex;
    position: absolute;
    width: 500px;
    border-radius: 8px;
    z-index: 10;
`