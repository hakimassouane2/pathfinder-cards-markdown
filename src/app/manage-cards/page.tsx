"use client";
import Card from "@/components/Card";
import { useAuth } from "@/components/FirebaseAuthProvider";
import {
  useCards,
  useProjectActions,
  useProjectName,
} from "@/stores/projectStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const ActionGroup = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 1rem;
`;
const ActionButton = styled.button`
  background: #5d0000;
  color: #f8f5f0;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "goodProBold", "Arial", sans-serif;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #bda0a0;
    color: #5d0000;
    transition: all 0.3s ease;
  }
`;
const EmptyMsg = styled.div`
  color: #5d0000;
  font-size: 1.1rem;
  margin: 2rem 0;
  text-align: center;
`;

export default function ManageCardsPage() {
  const cards = useCards();
  const { removeCardByIndex, loadCurrentProject } = useProjectActions();
  const { user } = useAuth();
  const projectName = useProjectName();
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      loadCurrentProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (idx: number) => {
    setDeleting(idx);
    await removeCardByIndex(idx);
    setDeleting(null);
  };

  return (
    <>
      {cards.length === 0 ? (
        <EmptyMsg>Aucune carte dans ce projet.</EmptyMsg>
      ) : (
        <CardGrid>
          {cards
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((card, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Card cardData={card} />
                <ActionGroup>
                  <ActionButton
                    onClick={() => router.push(`/edit-card/${idx}`)}
                  >
                    Éditer
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleDelete(idx)}
                    disabled={deleting === idx}
                    style={{ opacity: deleting === idx ? 0.6 : 1 }}
                  >
                    {deleting === idx ? "Suppression..." : "Supprimer"}
                  </ActionButton>
                </ActionGroup>
              </div>
            ))}
        </CardGrid>
      )}
    </>
  );
}
