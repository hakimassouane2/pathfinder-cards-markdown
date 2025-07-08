import { Pages } from "@/enums/pages";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const MenuContainer = styled.div`
  background: #5d0000;
  color: #fff;
  height: 100vh;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 1.5rem 1rem 1.5rem 1rem;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
`;
const MenuButton = styled.button`
  background: #bda0a0;
  color: #5d0000;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "goodProBold", "Arial", sans-serif;
  font-weight: bold;
  padding: 0.5rem 1rem 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-bottom: 0.5rem;
  outline: none;
  box-shadow: none;
  &:hover {
    background: #fff;
    color: #5d0000;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const menuItems = [
  // { label: "Projet", href: Pages.home },
  { label: "Gérer les cartes", href: "/manage-cards" },
  { label: "Créer une carte", href: Pages.createCard },
  { label: "Importer une carte", href: Pages.importCard },
  { label: "Impression", href: Pages.printView },
];

export default function LeftMenu() {
  const router = useRouter();
  return (
    <MenuContainer>
      {menuItems.map((item, idx) => (
        <MenuButton key={idx} onClick={() => router.push(item.href)}>
          {item.label}
        </MenuButton>
      ))}
    </MenuContainer>
  );
}
