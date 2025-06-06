import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const HeaderWrapper = styled.div`    
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
`
export const NextButton = styled.button`
    display: flex;
    padding: 8px 20px;
    background-color: ${Colors.white};
    border-radius: 90px;
    color: ${Colors.black};
    font-size:14px;
    border: none;
    &:focus{
        outline: none;
    }
    &:hover{
        outline: none;
    }
`
export const SelectTitle = styled.div`
    font-family: 'paperlogySB';
    font-size: 20px;
    color: ${Colors.black};
`