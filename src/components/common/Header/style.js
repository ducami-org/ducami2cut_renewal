import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const HeaderWrapper = styled.div`    
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const NextButton = styled.button`
    display: flex;
    padding: 8px 20px;
    background-color: ${Colors.white};
    border: 1px solid ${Colors.primary};
    border-radius: 90px;
    color: ${Colors.black};
    font-size:14px;
    transition: transform 0.3s ease;
    &:active{
        outline: none;
    }
    &:hover{
        transform: scale(1.2);
        border: 1px solid ${Colors.primary};
  
    }
`