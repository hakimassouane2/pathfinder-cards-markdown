import styled from "styled-components";

export const PrintView = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media print {
    gap: 0;
  }
`;
