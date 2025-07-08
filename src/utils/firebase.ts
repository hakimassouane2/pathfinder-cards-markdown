import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCctTfwidPnB_3QFHyGGqdXSpHg6zP1OXQ",
  authDomain: "pathfinder-2e-card-tool.firebaseapp.com",
  projectId: "pathfinder-2e-card-tool",
  storageBucket: "pathfinder-2e-card-tool.firebasestorage.app",
  messagingSenderId: "776607116197",
  appId: "1:776607116197:web:6b46c2200166040ef8964c",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const firebaseApp = app;
export const auth = getAuth(app);
export const firestore = getFirestore(app);
