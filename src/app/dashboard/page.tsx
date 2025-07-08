"use client";
import { useAuth } from "@/components/FirebaseAuthProvider";
import ProjectListPage from "@/components/ProjectListPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);
  if (loading || !user) return null;
  return <ProjectListPage />;
}
