import styled from "styled-components";

export const PrintView = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  justify-content: start;
  align-content: start;
  gap: 1rem;
  @media print {
    gap: 0;
  }
`;
