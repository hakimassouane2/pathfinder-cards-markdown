import { Colors, doNotPrint, fontGoodRegular } from "@/styles/commonStyles";
import { styled } from "styled-components";

export const PrintPage = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  background-color: red;

  > div {
    background-color: red;
  }

  @media print {
    /* Global print styles to ensure proper card sizing */
    * {
      box-sizing: border-box;
    }
    
    /* Ensure no scaling occurs during print */
    html, body {
      zoom: 1 !important;
      transform: none !important;
      scale: 1 !important;
    }
  }
`;

export const Project = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MenuWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const leftMenuWidth = 170;
export const ViewWrapper = styled.div`
  flex-grow: 1;
`;

export const LeftMenuWrapper = styled.div`
  ${doNotPrint}
  display: flex;
  flex-flow: column;
  width: ${leftMenuWidth}px;
  height: 100%;
`;

export const ProjectName = styled.h1`
  ${doNotPrint}
  ${fontGoodRegular}
	text-align: center;
  font-weight: bold;
  color: ${Colors.DarkRed};
  letter-spacing: 1px;
`;