import { createActionIcon } from "@/utils/createActionIcon";
import { useContext } from "react";
import { CardDataCtx } from "../cardContexts";
import * as S from "../styles";

export default function CardHeader() {
  const cardData = useContext(CardDataCtx);

  return (
    <S.CardHeader>
      <S.CardName>
        {cardData.name}{" "}
        {createActionIcon(cardData.actions, 12) || cardData.actions}
      </S.CardName>
      <S.TypeLevel>
        {cardData.type} {cardData.level}
      </S.TypeLevel>
    </S.CardHeader>
  );
}
