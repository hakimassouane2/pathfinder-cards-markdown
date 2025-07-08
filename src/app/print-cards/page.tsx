"use client";

import Card from "@/components/Card";
import { CardDimensionsCtx } from "@/components/Card/cardContexts";
import { standardFFG } from "@/data/cardDimension";
import { useCards } from "@/stores/projectStore";

import * as S from "./styles";

export default function PrintCards() {
  const cards = useCards();
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
    <CardDimensionsCtx.Provider value={standardFFG}>
      <S.PrintView>
        {sortedCardsToPrint.map(({ card, originalIndex }, index) => (
          <Card cardData={card} key={index} />
        ))}
      </S.PrintView>
    </CardDimensionsCtx.Provider>
  );
}
