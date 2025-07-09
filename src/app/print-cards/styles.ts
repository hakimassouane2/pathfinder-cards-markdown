import styled from "styled-components";

export const PrintView = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media print {
    gap: 0;
    margin: 0;
    padding: 5mm;
    width: 200mm;
    height: 287mm;
    box-sizing: border-box;
    
    /* Ensure cards print at exact physical size */
    transform: none !important;
    zoom: 1 !important;
    
    /* Force each card to be on its own page or avoid breaking */
    & > * {
      break-inside: avoid;
      page-break-inside: avoid;
      margin: 0;
      padding: 0;
    }
    
    /* A4 specific adjustments with printer margins */
    @page {
      size: A4 portrait;
      margin: 5mm;
    }
  }
`;
