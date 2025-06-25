import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const FrameBox = styled.div`
    width:248px;
    height: 400px;
    border-radius: 8px;
    display:flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px 20px 80px 20px;
    gap:20px;
    flex-direction: column;
    box-sizing: content-box;
    position: relative;
`
export const EmptyBox = styled.div`
    width: 100%;
    flex:1;
    border-radius: 4px;
    background-color: ${Colors.white};
    border:2px solid ${Colors.gray};
`
export const SelectBox = styled.div`
    position: absolute;
    background-color:rgba(39, 196, 186, 0.45);
    width: 100%;
    top:0;
    left:0;
    height: 100%;
    border-radius: 8px;
    z-index: 1000;
`