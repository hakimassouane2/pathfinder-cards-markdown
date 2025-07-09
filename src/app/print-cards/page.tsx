"use client";

import Card from "@/components/Card";
import { CardDimensionsCtx } from "@/components/Card/cardContexts";
import { standardFFG } from "@/data/cardDimension";
import { useCards } from "@/stores/projectStore";
import { useEffect, useState } from "react";
import styled from "styled-components";

import * as S from "./styles";

const PrintInstructions = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #fff;
  border: 2px solid #5d0000;
  border-radius: 8px;
  padding: 15px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-family: "goodProRegular", "Arial", sans-serif;
  
  h3 {
    margin: 0 0 10px 0;
    color: #5d0000;
    font-size: 16px;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
    font-size: 14px;
  }
  
  .close-btn {
    position: absolute;
    top: 5px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #5d0000;
  }
  
  @media print {
    display: none;
  }
`;

export default function PrintCards() {
  const cards = useCards();
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Set print styles when component mounts
  useEffect(() => {
    // Add print-specific styles to ensure proper card sizing
    const style = document.createElement("style");
    style.textContent = `
      @page {
        size: A4 portrait;
        margin: 5mm;
      }
      @media print {
        html {
          width: 200mm;
          height: 287mm;
        }
        body {
          margin: 0;
          padding: 0;
          width: 200mm;
          height: 287mm;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        /* Ensure cards fit properly on A4 with printer margins */
        .print-view {
          width: 200mm;
          height: 287mm;
          margin: 0;
          padding: 5mm;
          box-sizing: border-box;
        }
        /* Ensure cards maintain exact size even with margins */
        .print-view > * {
          transform: none !important;
          zoom: 1 !important;
          scale: 1 !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Attach original index to each card for correct navigation
  const cardsToPrint = cards.reduce<
    { card: CardData; originalIndex: number }[]
  >((collection, card, originalIndex) => {
    for (let i = 0; i < card.numberToPrint; i++) {
      collection.push({ card, originalIndex });
    }
    return collection;
  }, []);

  const sortedCardsToPrint = cardsToPrint
    .slice()
    .sort((a, b) => a.card.name.localeCompare(b.card.name));

  return (
    <>
      {showInstructions && (
        <PrintInstructions>
          <button 
            className="close-btn" 
            onClick={() => setShowInstructions(false)}
          >
            ×
          </button>
          <h3>Printing Instructions</h3>
          <ul>
            <li>Set paper size to <strong>A4</strong></li>
            <li>Set margins to <strong>Minimum</strong> or <strong>5mm</strong></li>
            <li>Set scale to <strong>100%</strong> or <strong>Default</strong></li>
            <li>Disable &quot;Fit to page&quot; option</li>
            <li>Cards will print at exact MTG size (63mm × 88mm)</li>
          </ul>
        </PrintInstructions>
      )}
      <CardDimensionsCtx.Provider value={standardFFG}>
        <S.PrintView className="print-view">
          {sortedCardsToPrint.map(({ card, originalIndex }, index) => (
            <Card cardData={card} key={index} />
          ))}
        </S.PrintView>
      </CardDimensionsCtx.Provider>
    </>
  );
}
