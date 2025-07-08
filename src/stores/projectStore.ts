import { auth } from "@/utils/firebase";
import {
  loadAllProjectsForUser,
  loadProjectFromFirestore,
  saveProjectToFirestore,
} from "@/utils/firestoreProjects";
import { create } from "zustand";

interface ProjectStore {
  actions: ProjectActions;
  project: Project;
}

interface ProjectActions {
  addCard: (card: CardData) => void;
  getCardByIndex: (cardIndex: number) => void;
  loadCurrentProject: () => Promise<void>;
  loadProject: (projectName: string) => Promise<void>;
  saveCardByIndex: (card: CardData, cardIndex: number) => Promise<void>;
  saveProject: () => Promise<void>;
  saveProjectAs: (newName: string) => Promise<void>;
  changeNumberToPrint: (cardIndex: number, number: number) => Promise<void>;
  removeCardByIndex: (cardIndex: number) => Promise<void>;
  saveCurrentProjectNameToCloud: (projectName: string) => void;
  loadCurrentProjectNameFromCloud: () => string | null;
  loadAllProjectsFromCloud: () => Promise<Project[]>;
}

const getInitialProject = (): Project => {
  return {
    projectName: "",
    cards: [],
  };
};

const CURRENT_PROJECT_KEY = "rpgCards_currentProject";

const useProjectStore = create<ProjectStore>((set, get) => ({
  project: getInitialProject(),

  actions: {
    addCard: async (card: CardData) => {
      set((state) => {
        const updatedProject = {
          ...state.project,
          cards: [...state.project.cards, card],
        };
        return { ...state, project: updatedProject };
      });
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, get().project);
    },

    getCardByIndex: (cardIndex: number) => get().project.cards?.[cardIndex],

    loadCurrentProject: async () => {
      const user = auth.currentUser;
      const currentProjectName =
        window.localStorage.getItem(CURRENT_PROJECT_KEY);
      if (!currentProjectName) {
        set((state) => ({ ...state, project: getInitialProject() }));
        return;
      }
      if (!user) throw new Error("Not authenticated");
      const project = await loadProjectFromFirestore(user, currentProjectName);
      set((state) => ({ ...state, project: project || getInitialProject() }));
    },

    loadProject: async (projectName: string) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const project = await loadProjectFromFirestore(user, projectName);
      set((state) => ({ ...state, project: project || getInitialProject() }));
    },

    saveCardByIndex: async (card: CardData, cardIndex: number) => {
      set((state) => {
        const project: Project = {
          ...state.project,
          cards: state.project.cards.map((currentCard, index) =>
            cardIndex === index ? card : currentCard
          ),
        };
        return { ...state, project: project };
      });
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, get().project);
    },

    saveProject: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, get().project);
    },

    saveProjectAs: async (newName: string) => {
      set((state) => {
        const updatedProject: Project = {
          projectName: newName,
          cards: [], // Always start with an empty card list for new projects
        };
        return { ...state, project: updatedProject };
      });
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, {
        projectName: newName,
        cards: [],
      });
      window.localStorage.setItem(CURRENT_PROJECT_KEY, newName);
    },

    changeNumberToPrint: async (cardIndex: number, targetNumber: number) => {
      set((state) => {
        const updatedProject = { ...state.project };
        const updatedCards = [...updatedProject.cards];
        updatedCards[cardIndex].numberToPrint = targetNumber;
        updatedProject.cards = updatedCards;
        return { ...state, project: updatedProject };
      });
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, get().project);
    },

    removeCardByIndex: async (cardIndex: number) => {
      set((state) => {
        const updatedProject: Project = {
          ...state.project,
          cards: [
            ...state.project.cards.slice(0, cardIndex),
            ...state.project.cards.slice(cardIndex + 1),
          ],
        };
        return { ...state, project: updatedProject };
      });
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, get().project);
    },

    saveCurrentProjectNameToCloud: (projectName: string) => {
      window.localStorage.setItem(CURRENT_PROJECT_KEY, projectName);
    },
    loadCurrentProjectNameFromCloud: () => {
      return window.localStorage.getItem(CURRENT_PROJECT_KEY);
    },
    loadAllProjectsFromCloud: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      return await loadAllProjectsForUser(user);
    },
  },
}));

export const useCards = () => useProjectStore((state) => state.project.cards);
export const useProjectName = () =>
  useProjectStore((state) => state.project.projectName);
export const useNumberToPrint = (cardIndex: number) =>
  useProjectStore((state) => state.project.cards[cardIndex].numberToPrint);

export const useProjectActions = () =>
  useProjectStore((state) => state.actions);
export const saveProjectAsAction =
  useProjectStore.getState().actions.saveProjectAs;
export const loadProjectAsAction =
  useProjectStore.getState().actions.loadProject;
