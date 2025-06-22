import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const InputTitle = styled.div`
    font-size: 18px;
    color: ${Colors.black};
    font-family: 'paperlogySB';
`;

export const InputBox = styled.input`
    width: 320px;
    height: 56px;
    border-radius: 12px;
    border: none;
    color: ${Colors.black};
    background-color: ${Colors.white};
    padding: 0 16px 0 16px;
    
    &:focus-visible{
        outline: none;
    }
`
