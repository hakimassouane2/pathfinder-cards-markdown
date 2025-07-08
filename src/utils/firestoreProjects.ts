import { firestore } from "@/utils/firebase";
import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export async function saveProjectToFirestore(user: User, project: Project) {
  console.log("Saving project to Firestore:", { user, project });
  const ref = doc(
    firestore,
    `users/${user.uid}/projects/${project.projectName}`
  );
  await setDoc(ref, project);
  console.log("Project saved!");
}

export async function loadProjectFromFirestore(
  user: User,
  projectName: string
): Promise<Project | undefined> {
  const ref = doc(firestore, `users/${user.uid}/projects/${projectName}`);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as Project) : undefined;
}

export async function loadAllProjectsForUser(user: User): Promise<Project[]> {
  const ref = collection(firestore, `users/${user.uid}/projects`);
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => doc.data() as Project);
}

export async function deleteProjectFromFirestore(
  user: User,
  projectName: string
) {
  const ref = doc(firestore, `users/${user.uid}/projects/${projectName}`);
  await deleteDoc(ref);
}
