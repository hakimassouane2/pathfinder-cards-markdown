import { useAuth } from "@/components/FirebaseAuthProvider";
import { Pages } from "@/enums/pages";
import { useProjectActions, useProjectName } from "@/stores/projectStore";
import { deleteProjectFromFirestore } from "@/utils/firestoreProjects";
import { saveCurrentProjectNameToLs } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Main = styled.div`
  background: #f8f5f0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 60px);
`;
const Card = styled.div`
  background: #5d0000;
  color: #fff;
  padding: 0 2rem 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-family: "goodProBold", "Arial", sans-serif;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;
const ProjectButton = styled.button`
  width: 100%;
  padding: 0.7rem 1rem;
  background: #bda0a0;
  color: #5d0000;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-family: "goodProBold", "Arial", sans-serif;
  margin-bottom: 0.7rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #fff;
  }
`;
const NewProjectForm = styled.form`
  width: 100%;
  margin-top: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #bda0a0;
  border-radius: 6px;
  font-size: 1.1rem;
  font-family: "goodProRegular", "Arial", sans-serif;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`;

export default function ProjectListPage() {
  const { user, logout } = useAuth();
  const { loadAllProjectsFromCloud, saveProjectAs, loadProject } =
    useProjectActions();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const currentProjectName = useProjectName();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [deletingProject, setDeletingProject] = useState<string | null>(null);
  // Get user initials for avatar
  const initials = user?.email ? user.email[0].toUpperCase() : "U";

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    loadAllProjectsFromCloud()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, [user]);

  const handleSelect = async (projectName: string) => {
    await loadProject(projectName);
    saveCurrentProjectNameToLs(projectName);
    router.push(Pages.manageCards);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newProjectName.trim()) {
      setError("Nom de projet requis");
      return;
    }
    try {
      console.log("Creating project:", newProjectName.trim());
      await saveProjectAs(newProjectName.trim());
      await loadProject(newProjectName.trim());
      saveCurrentProjectNameToLs(newProjectName.trim());
      const updatedProjects = await loadAllProjectsFromCloud();
      setProjects(updatedProjects);
      router.push(Pages.manageCards);
    } catch (err: any) {
      setError("Erreur lors de la création du projet");
      console.error("Error creating project:", err);
    }
  };

  const handleDelete = async (projectName: string) => {
    if (
      !window.confirm(
        `Supprimer le projet "${projectName}" ? Cette action est irréversible.`
      )
    )
      return;
    if (!user) {
      setError("Utilisateur non authentifié");
      return;
    }
    setDeletingProject(projectName);
    setError(null);
    try {
      await deleteProjectFromFirestore(user, projectName);
      setProjects((prev) => prev.filter((p) => p.projectName !== projectName));
      // If the deleted project is the current one, you may want to handle it (optional)
    } catch (err) {
      setError("Erreur lors de la suppression du projet");
      console.error("Error deleting project:", err);
    } finally {
      setDeletingProject(null);
    }
  };

  return (
    <>
      <Main>
        <Card>
          <Title>Projets</Title>
          {loading ? (
            <div>Chargement...</div>
          ) : projects.length === 0 ? (
            <div>Aucun projet trouvé. Créez-en un nouveau !</div>
          ) : (
            projects.map((p) => (
              <div
                key={p.projectName}
                style={{ display: "flex", alignItems: "start", width: "100%" }}
              >
                <ProjectButton
                  onClick={() => handleSelect(p.projectName)}
                  style={{ flex: 1 }}
                  disabled={deletingProject === p.projectName}
                >
                  {p.projectName}
                </ProjectButton>
                <button
                  onClick={() => handleDelete(p.projectName)}
                  disabled={deletingProject === p.projectName}
                  style={{
                    marginLeft: 8,
                    background: "#ffb3b3",
                    color: "#5d0000",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.7rem 1rem",
                    fontWeight: "bold",
                    cursor:
                      deletingProject === p.projectName
                        ? "not-allowed"
                        : "pointer",
                  }}
                  title="Supprimer le projet"
                >
                  {deletingProject === p.projectName ? "..." : "❌"}
                </button>
              </div>
            ))
          )}
          <hr style={{ width: "100%", borderBottom: "1px solid #bda0a0" }} />
          <NewProjectForm onSubmit={handleCreate}>
            <Input
              type="text"
              placeholder="Nom du projet"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              required
            />
            <ProjectButton type="submit">Créer un nouveau projet</ProjectButton>
            {error && <div style={{ color: "#ffb3b3" }}>{error}</div>}
          </NewProjectForm>
        </Card>
      </Main>
    </>
  );
}
