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
    width: 55%;
    border-radius: 8px;
`