"use client";

import CardEdit from "@/components/CardEdit/CardEdit";
import { useAuth } from "@/components/FirebaseAuthProvider";
import { emptyCard } from "@/data/emptyCard";
import { useCards, useProjectActions } from "@/stores/projectStore";
import { useState } from "react";

interface Props {
  params: {
    cardIndex: number;
  };
}

export default function EditCard({ params }: Props) {
  const cards = useCards();
  const numericCardIndex = Number(params.cardIndex) ?? undefined;
  const card = cards[numericCardIndex];
  const { user } = useAuth();
  const { saveProjectToCloud, saveCardByIndex } = useProjectActions();
  const [cloudStatus, setCloudStatus] = useState<string>("");

  const handleSave = async (card: CardData) => {
    saveCardByIndex(card, numericCardIndex);
    if (user) {
      setCloudStatus("Saving to cloud...");
      try {
        await saveProjectToCloud();
        setCloudStatus("Saved to cloud!");
      } catch (e) {
        setCloudStatus("Cloud save failed");
      }
    } else {
      setCloudStatus("Saved locally (login for cloud sync)");
    }
  };

  return (
    <>
      {card && (
        <CardEdit
          initialCard={card}
          cardIndex={card === emptyCard ? null : numericCardIndex}
        />
      )}
    </>
  );
}
