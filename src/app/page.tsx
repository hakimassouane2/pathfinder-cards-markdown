"use client";

import Card from "@/components/Card";
import { CardDimensionsCtx } from "@/components/Card/cardContexts";
import { CardControlWrapper } from "@/components/CardControlsWrapper";
import { standardFFG } from "@/data/cardDimension";
import { useCards } from "@/stores/projectStore";

import * as S from "./styles";

export default function Home() {
  const cards = useCards();
  // Attach original index to each card for correct navigation
  const sortedCards = cards
    .map((card, originalIndex) => ({ card, originalIndex }))
    .sort((a, b) => a.card.name.localeCompare(b.card.name));

  return (
    <CardDimensionsCtx.Provider value={standardFFG}>
      <S.Project>
        {sortedCards.map(({ card, originalIndex }) => (
          <CardControlWrapper cardIndex={originalIndex} key={originalIndex}>
            <Card cardData={card} />
          </CardControlWrapper>
        ))}
      </S.Project>
    </CardDimensionsCtx.Provider>
  );
}
