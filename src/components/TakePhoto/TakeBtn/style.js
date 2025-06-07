import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const BtnBox = styled.button`
    all:unset;
    width: 50px;
    height: 50px;
    border-radius:90px;
    background-color: ${Colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    transform: none;
    &:focus{
        outline: none;
    }
    &:hover{
        border: none;
    }
`