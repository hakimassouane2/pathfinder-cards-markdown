"use client";

import Card from "@/components/Card";
import CardEditFields from "@/components/CardEdit/CardEditFields";
import { useAuth } from "@/components/FirebaseAuthProvider";
import { emptyCard } from "@/data/emptyCard";
import { useProjectActions, useProjectName } from "@/stores/projectStore";
import { PageColumn, PrimaryButton } from "@/styles/commonStyledComponents";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import * as S from "./styles";

export default function CreateCard() {
  const [cardData, setCardData] = useState<CardData>(emptyCard);
  const { addCard } = useProjectActions();
  const { user } = useAuth();
  const { saveProjectToCloud, loadProjectFromCloud } = useProjectActions();
  const projectName = useProjectName();
  const [cloudStatus, setCloudStatus] = useState<string>("");

  const router = useRouter();

  if (!user) {
    router.push("/");
  }

  const handleAddCard = async () => {
    addCard(cardData);
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
    setCardData(emptyCard);
  };

  useEffect(() => {
    if (user && projectName) {
      setCloudStatus("Loading from cloud...");
      loadProjectFromCloud(projectName)
        .then(() => {
          setCloudStatus("Loaded from cloud!");
        })
        .catch(() => {
          setCloudStatus("Cloud load failed");
        });
    }
    // eslint-disable-next-line
  }, [user, projectName]);

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
