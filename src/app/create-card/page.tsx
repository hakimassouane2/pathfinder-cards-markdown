"use client";

import Card from "@/components/Card";
import CardEditFields from "@/components/CardEdit/CardEditFields";
import { useAuth } from "@/components/FirebaseAuthProvider";
import { emptyCard } from "@/data/emptyCard";
import { useProjectActions } from "@/stores/projectStore";
import { PageColumn, PrimaryButton } from "@/styles/commonStyledComponents";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "./styles";

export default function CreateCard() {
  const [cardData, setCardData] = useState<CardData>(emptyCard);
  const { addCard } = useProjectActions();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    // eslint-disable-next-line
  }, [user]);

  const handleAddCard = async () => {
    await addCard(cardData);
    setCardData(emptyCard);
  };

  return (
    <S.CreateCardView>
      <PageColumn>
        <CardEditFields cardData={cardData} onSaveCardData={setCardData} />
      </PageColumn>
      <PageColumn>
        <Card cardData={cardData} />
        <PrimaryButton onClick={handleAddCard}>Sauvegarder</PrimaryButton>
      </PageColumn>
    </S.CreateCardView>
  );
}
