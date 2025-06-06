import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const BtnBox = styled.button`
    width: 50px;
    height: 50px;
    display:flex;
    justify-content:center;
    align-items: center;
    border-radius: 80px;

    background-color: ${Colors.white};
    color:${Colors.black};
    font-family:'paperlogyB';
    transition: transform 0.3s ease;
    &:focus{
        outline: none;
    }
    &:hover{
        transform: scale(1.2);
        border-color: ${Colors.primary};
    }
`
