import { auth } from "@/utils/firebase";
import {
  loadAllProjectsForUser,
  loadProjectFromFirestore,
  saveProjectToFirestore,
} from "@/utils/firestoreProjects";
import { create } from "zustand";
import {
  loadCurrentProjectFromLs,
  loadProjectFromLs,
  saveProjectToLs,
} from "../utils/localStorage";

interface ProjectStore {
  actions: ProjectActions;
  project: Project;
}

interface ProjectActions {
  addCard: (card: CardData) => void;
  getCardByIndex: (cardIndex: number) => void;
  loadCurrentProject: () => void;
  loadProject: (projectName: string) => void;
  saveCardByIndex: (card: CardData, cardIndex: number) => void;
  saveProject: () => void;
  saveProjectAs: (newName: string) => void;
  changeNumberToPrint: (cardIndex: number, number: number) => void;
  removeCardByIndex: (cardIndex: number) => void;
  // Firestore async actions
  saveProjectToCloud: () => Promise<void>;
  loadProjectFromCloud: (projectName: string) => Promise<void>;
  loadAllProjectsFromCloud: () => Promise<Project[]>;
}

const getInitialProject = (): Project => {
  return {
    projectName: "",
    cards: [],
  };
};

const useProjectStore = create<ProjectStore>((set, get) => ({
  project: getInitialProject(),

  actions: {
    addCard: (card: CardData) =>
      set((state) => {
        const updatedProject = {
          ...state.project,
          cards: [...state.project.cards, card],
        };
        saveProjectToLs(updatedProject);

        return { ...state, project: updatedProject };
      }),

    getCardByIndex: (cardIndex: number) => get().project.cards?.[cardIndex],

    loadCurrentProject: () =>
      set((state) => {
        const currentProject = loadCurrentProjectFromLs();
        return { ...state, project: currentProject || getInitialProject() };
      }),

    loadProject: (projectName: string) =>
      set((state) => {
        const loadedProject = loadProjectFromLs(projectName);
        return { ...state, project: loadedProject || getInitialProject() };
      }),

    saveCardByIndex: (card: CardData, cardIndex: number) =>
      set((state) => {
        const project: Project = {
          ...state.project,
          cards: state.project.cards.map((currentCard, index) =>
            cardIndex === index ? card : currentCard
          ),
        };
        saveProjectToLs(project);

        return { ...state, project: project };
      }),

    saveProject: async () => {
      const user = auth.currentUser;
      if (user) {
        await saveProjectToFirestore(user, get().project);
      } else {
        saveProjectToLs(get().project);
      }
    },

    saveProjectAs: async (newName: string) => {
      set((state) => {
        const updatedProject: Project = {
          ...state.project,
          projectName: newName,
        };
        return { ...state, project: updatedProject };
      });
      const user = auth.currentUser;
      if (user) {
        await saveProjectToFirestore(user, {
          ...get().project,
          projectName: newName,
        });
      } else {
        saveProjectToLs({ ...get().project, projectName: newName });
      }
    },

    changeNumberToPrint: (cardIndex: number, targetNumber: number) => {
      set((state) => {
        const updatedProject = { ...state.project };
        const updatedCards = [...updatedProject.cards];
        updatedCards[cardIndex].numberToPrint = targetNumber;
        saveProjectToLs(updatedProject);
        return { ...state, project: updatedProject };
      });
    },

    removeCardByIndex: (cardIndex: number) => {
      set((state) => {
        const updatedProject: Project = {
          ...state.project,
          cards: [
            ...state.project.cards.slice(0, cardIndex),
            ...state.project.cards.slice(cardIndex + 1),
          ],
        };
        saveProjectToLs(updatedProject);

        return { ...state, project: updatedProject };
      });
    },
    // Firestore async actions
    saveProjectToCloud: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      await saveProjectToFirestore(user, get().project);
    },
    loadProjectFromCloud: async (projectName: string) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const project = await loadProjectFromFirestore(user, projectName);
      set((state) => ({ ...state, project: project || getInitialProject() }));
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
