"use client";
import CardEdit from "@/components/CardEdit/CardEdit";
import { useAuth } from "@/components/FirebaseAuthProvider";
import { emptyCard } from "@/data/emptyCard";
import { useProjectActions } from "@/stores/projectStore";
import { useState } from "react";

export default function ImportCard() {
  const { user } = useAuth();
  const { saveProjectToCloud } = useProjectActions();
  const [cloudStatus, setCloudStatus] = useState<string>("");

  const handleImport = async (importedProject: Project) => {
    // ... existing import logic ...
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
      <CardEdit initialCard={emptyCard} cardIndex={null} />
    </>
  );
}
