import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const BtnBox = styled.button`
    all:unset;
    width: 80px;
    height: 50px;
    border-radius:90px;
    background-color: ${Colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
    &:focus{
        outline: none;
    }
    &:hover{
        border: none;
        opacity: 0.5;
    }
`