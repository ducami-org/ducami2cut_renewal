import styled, { keyframes } from "styled-components";

const fadeInTop = keyframes`
    from{
        opacity: 0;
        transform: translateY(-50px);
    }to{
        opacity: 1;
        transform: translateY(0);
    }
`

export const Container = styled.div`
    display:flex;
    gap:40px;
`
export const PhotoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:40px;
`
export const Photo = styled.img`
    width: 248px;
    animation : ${fadeInTop} 1.2s ease;
`