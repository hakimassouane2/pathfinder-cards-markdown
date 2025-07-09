import {
  fontGoodCondensed,
  fontGoodRegular,
  traitStyle,
} from "@/styles/commonStyles";
import styled from "styled-components";

interface StyledBodyProps {
  width: number;
}

const traitColor = (trait: string) => {
  const t = trait.trim().toLowerCase();
  if (t === "unique") return "#800080"; // purple
  if (t === "rare") return "#0c1466"; // blue
  if (t === "uncommon" || t === "peu commun" || t === "peu courant")
    return "#c45500"; // orange
  return undefined;
};

export const Card = styled.div<CardDimensions>`
  width: ${(props) => props.width}mm;
  height: ${(props) => props.height}mm;
  background-color: antiquewhite;
  padding: 2mm;
  font-size: ${(props) => props.width / 25}mm;
  border: 0.1mm solid #e1e1e1;
  box-sizing: border-box;
`;

export const Body = styled.div<StyledBodyProps>`
  font-family: "goodProRegular", "Arial", sans-serif;
  ${fontGoodRegular}
  font-size: 100%;

  display: flex;
  flex-flow: column;
  width: 100%;
  height: 88%;
  overflow: hidden;
  // TODO not working?
  //margin-bottom: ${(props) => props.width * 100}mm;
  margin-top: 2%;

  /* Markdown styling */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0 0.2em 0;
    font-weight: bold;
  }

  h1 {
    font-size: 1.2em;
  }
  h2 {
    font-size: 1.1em;
  }
  h3 {
    font-size: 1.05em;
  }

  ul,
  ol {
    margin: 0.3em 0;
    padding-left: 1.5em;
  }

  li {
    margin: 0.1em 0;
  }

  blockquote {
    margin: 0.3em 0;
    padding-left: 0.5em;
    border-left: 2px solid #ccc;
    font-style: italic;
  }

  code {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.1em 0.3em;
    border-radius: 0.2em;
    font-family: monospace;
    font-size: 0.9em;
  }

  pre {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.5em;
    border-radius: 0.3em;
    overflow-x: auto;
    margin: 0.3em 0;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  hr {
    border: 0;
    border: none;
    border-top: 1px solid #b5b3a4;
    border-bottom: 1px solid #f0f0e0;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.2em 0.5em;
    text-align: left;
  }

  th {
    background-color: rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }

  b,
  strong {
    font-family: "goodProBold", "goodProRegular", "Arial", sans-serif;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`;

export const ElipsisHeadline = styled.h1`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0px;
  // TODO dynamic font-size
`;

export const CardName = styled(ElipsisHeadline)`
  display: flex;
  max-width: 75%;
  align-items: baseline;
  > div > img {
    height: 12px;
    margin-bottom: 0px;
  }

  > div {
    margin-left: 5px;
  }
`;

export const ActionIcon = styled.img`
  height: ${(props) =>
    props.height}px; // TODO change to relative size corresponding to font-size
  margin: 0 2px -2px 0;
`;

export const TypeLevel = styled(ElipsisHeadline)`
  max-width: 32%;
`;

export const CardHeader = styled.div`
  ${fontGoodCondensed}
  font-size: 80%;
  text-transform: uppercase;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  border-bottom: 1px solid rgb(119, 119, 119);
  margin-bottom: 2px;
  height: 6%;
`;

interface TraitProps {
  width: number;
}

export const Traits = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

type TraitPropsWithTrait = TraitProps & { trait: string };

export const Trait = styled.div<TraitPropsWithTrait>`
  ${traitStyle}
  padding: ${(props) => props.width / 80}mm ${(props) => props.width / 40}mm;
  margin-right: 2px;
  ${({ trait }) =>
    traitColor(trait) ? `background: ${traitColor(trait)};` : ""}
`;
