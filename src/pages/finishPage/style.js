import styled from "styled-components";
import { Colors } from "../../styles/colors";

export const Container = styled.div`
    margin:0;
    padding:0px 80px;
    width:100vw;
    height: 100vh;
    background-color:${Colors.gray};
    align-items: center;
    justify-content: space-between;
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
`
export const setWrapper = styled.div`
    width:30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-right:100px;
`