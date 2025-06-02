import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:12px;
`
export const ExplainText = styled.p`
    font-size: 20px;
    color: ${Colors.white};
    text-align: left;
    line-height: 140%;
    margin: 0;
`
export const ContentWrapper = styled.div`
    display: flex;
    flex-direction:column;
    gap:32px;
`