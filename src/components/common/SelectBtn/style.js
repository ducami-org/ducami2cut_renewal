import styled from "styled-components";
import { Colors } from "../../../styles/colors";

export const BtnBox = styled.div`
  width: 100px;
  display: flex;
  padding: 10px 20px;
  background-color: ${Colors.white};
  border-radius: 90px;
  color: ${Colors.black};
  font-size: 18px;
  border: none;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    outline: none;
    background-color: ${Colors.primary};
    color: ${Colors.white};
  }
`;
