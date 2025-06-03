import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const ButtonBox = styled.button`
    padding: 16px 10px 16px 10px;
    border-radius: 90px;
    background-color: ${Colors.white};
    color: ${Colors.black};
    font-family: 'paperlogySB';
    border: none;
    width: 120px;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
    z-index: 1000;
    &:hover{
        transform: scale(1.1);
    }

`