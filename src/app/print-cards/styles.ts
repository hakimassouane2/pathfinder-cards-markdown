import styled from "styled-components";

export const PrintView = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media print {
    gap: 0;

    /* Force each card to be on its own page or avoid breaking */
    & > * {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    @page {
      size: A4 portrait;
    }
  }
`;
