"use client";
import Card from "@/components/Card";
import {
  useCards,
  useProjectActions,
  useProjectName,
} from "@/stores/projectStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const Title = styled.h2`
  font-family: "goodProBold", "Arial", sans-serif;
  font-size: 2rem;
  color: #5d0000;
  margin-bottom: 1.5rem;
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;
const CardPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f5f0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 1.2rem 1rem 1.5rem 1rem;
`;
const ActionGroup = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 1rem;
`;
const ActionButton = styled.button`
  background: #bda0a0;
  color: #5d0000;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "goodProBold", "Arial", sans-serif;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #5d0000;
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
  const { removeCardByIndex, saveProjectToCloud } = useProjectActions();
  const projectName = useProjectName();
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleDelete = async (idx: number) => {
    setDeleting(idx);
    removeCardByIndex(idx);
    await saveProjectToCloud();
    setDeleting(null);
  };

  return (
    <Container>
      <Title>Gérer les cartes du projet {projectName}</Title>
      {cards.length === 0 ? (
        <EmptyMsg>Aucune carte dans ce projet.</EmptyMsg>
      ) : (
        <CardGrid>
          {cards.map((card, idx) => (
            <CardPreviewWrapper key={idx}>
              <Card cardData={card} />
              <ActionGroup>
                <ActionButton onClick={() => router.push(`/edit-card/${idx}`)}>
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
            </CardPreviewWrapper>
          ))}
        </CardGrid>
      )}
    </Container>
  );
}
