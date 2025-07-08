import { Pages } from "@/enums/pages";
import { useProjectName } from "@/stores/projectStore";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

const MenuContainer = styled.div`
  background: #5d0000;
  color: #fff;
  height: calc(100vh - 60px);
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  padding: 1rem;
  padding-top: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
`;

const MenuButton = styled.button<{ $isActive?: boolean }>`
  background: ${(props) => (props.$isActive ? "#fff" : "#bda0a0")};
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
  &:hover {
    background: #fff;
    color: #5d0000;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const BackToProjectsButton = styled.button`
  background: #bda0a0;
  color: #5d0000;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "goodProBold", "Arial", sans-serif;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #5d0000;
  }
`;

const TopMenuButtonList = styled.div`
  display: flex;
  flex-direction: column;
`;

const BottomMenuButtonList = styled.div`
  display: flex;
  flex-direction: column;
`;

const menuItems = [
  // { label: "Projet", href: Pages.home },
  { label: "Gérer les cartes", href: "/manage-cards" },
  { label: "Créer une carte", href: Pages.createCard },
  { label: "Impression", href: Pages.printView },
];

export default function LeftMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const projectName = useProjectName();

  return (
    <MenuContainer>
      <TopMenuButtonList>
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <MenuButton
              key={idx}
              onClick={() => router.push(item.href)}
              $isActive={isActive}
            >
              {item.label}
            </MenuButton>
          );
        })}
      </TopMenuButtonList>
      <BottomMenuButtonList>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#bda0a0",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          Projet actuel - {projectName}
        </p>
        <BackToProjectsButton onClick={() => router.push("/dashboard")}>
          Retour aux projets
        </BackToProjectsButton>
      </BottomMenuButtonList>
    </MenuContainer>
  );
}
