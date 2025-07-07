import { Colors } from "@/styles/commonStyles";
import styled from "styled-components";

export const CardEdit = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 300px;
`;

export const TextArea = styled.textarea`
  width: 99%;
  margin-top: 10px;
  height: 400px;
`;

export const StyledSelect = styled.select`
  border: 1px solid ${Colors.DarkRed};
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${Colors.DarkRed};
  }
`;
