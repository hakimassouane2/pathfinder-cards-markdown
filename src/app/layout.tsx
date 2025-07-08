"use client";

import {
  FirebaseAuthProvider,
  useAuth,
} from "@/components/FirebaseAuthProvider";
import LeftMenu from "@/components/LeftMenu";
import StyledComponentsRegistry from "@/utils/styledComponentsRegistry";

import Overlay from "@/components/Overlay";
import { useShowOverlay } from "@/stores/overlayStore";
import { useProjectActions, useProjectName } from "@/stores/projectStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../styles/fonts.css";
import * as S from "./styles";

interface Props {
  children: React.ReactNode;
}

const TopBar = styled.div`
  width: 100vw;
  background: #5d0000;
  color: #fff;
  padding: 0.5rem 1rem 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: "goodProBold", "Arial", sans-serif;
  font-size: 1.2rem;
  height: 60px;
  @media print {
    display: none;
  }
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: #bda0a0;
  color: #5d0000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
`;
const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 60px;
  background: #fff;
  color: #5d0000;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  padding: 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const DropdownButton = styled.button`
  background: #5d0000;
  color: #f8f5f0;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-family: "goodProBold", "Arial", sans-serif;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: all 0.3s ease;
  &:hover {
    background: #bda0a0;
    color: #5d0000;
    transition: all 0.3s ease;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;
  padding: 1rem;
  background-color: #f8f5f0;

  @media print {
    padding: 0;
    background-color: #fff;
    overflow-x: visible;
  }
`;

function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const projectName = useProjectName();
  const showOverlay = useShowOverlay();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // If not authenticated, show only children (login/signup)
  if (!user && !loading) {
    return <>{children}</>;
  }
  if (loading) return null;

  // Always show top bar after login (except on /)
  const showTopBar = pathname !== "/";
  // Show sidebar on all main app pages except /dashboard and /
  const showSidebar = pathname !== "/dashboard" && pathname !== "/";

  // Get user initials for avatar
  const initials = user?.email ? user.email[0].toUpperCase() : "U";

  return (
    <>
      {showTopBar && (
        <TopBar>
          <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
            PF2E Card Tool
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Avatar ref={avatarRef} onClick={() => setDropdownOpen((v) => !v)}>
              {initials}
            </Avatar>
            {dropdownOpen && (
              <Dropdown style={{ right: 0 }}>
                <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                  {user?.email}
                </div>
                <DropdownButton
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  Se déconnecter
                </DropdownButton>
              </Dropdown>
            )}
          </div>
        </TopBar>
      )}
      {!!showOverlay && <Overlay />}
      {showSidebar ? (
        <S.MenuWrapper
          style={{
            marginTop: 0,
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <S.LeftMenuWrapper style={{ minWidth: 220 }}>
            <LeftMenu />
          </S.LeftMenuWrapper>
          <MainContent>
            <div style={{ width: "100%" }}>{children}</div>
          </MainContent>
        </S.MenuWrapper>
      ) : (
        <div style={{ marginTop: 0 }}>{children}</div>
      )}
    </>
  );
}

export default function RootLayout({ children }: Props) {
  const [hasInitializedStore, setHasInitializedStore] = useState(false);
  const { loadCurrentProject } = useProjectActions();

  /* Page is initially rendered on the server, where local storage is not
	accessible. Because of that we have to wait until it becomes so before
	initializing the store from the local storage.
	https://stackoverflow.com/questions/73853069/solve-referenceerror-localstorage-is-not-defined-in-next-js
	 */
  useEffect(() => {
    if (
      !hasInitializedStore &&
      typeof window !== "undefined" &&
      !!loadCurrentProject
    ) {
      loadCurrentProject();
      setHasInitializedStore(true);
    }
  }, [hasInitializedStore, loadCurrentProject]);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <FirebaseAuthProvider>
          <StyledComponentsRegistry>
            <AppShell>{children}</AppShell>
          </StyledComponentsRegistry>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
