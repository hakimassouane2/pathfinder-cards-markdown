import { useAuth } from "@/components/FirebaseAuthProvider";
import React, { useState } from "react";
import styled from "styled-components";

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f5f0;
`;
const AuthCard = styled.div`
  background: #5d0000;
  color: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AuthTitle = styled.h2`
  font-family: "goodProBold", "Arial", sans-serif;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;
const AuthInput = styled.input`
  width: auto;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #bda0a0;
  border-radius: 6px;
  font-size: 1.1rem;
  font-family: "goodProRegular", "Arial", sans-serif;
`;
const AuthButton = styled.button`
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
const SwitchButton = styled.button`
  background: none;
  color: #fff;
  border: none;
  font-size: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  text-decoration: underline;
`;
const ErrorMsg = styled.div`
  color: #ffb3b3;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

export default function AuthPage() {
  const { user, loading, login, signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading)
    return (
      <AuthContainer>
        <AuthCard>Chargement...</AuthCard>
      </AuthContainer>
    );
  if (user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message || "Erreur d'authentification");
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>{isSignup ? "Créer un compte" : "Connexion"}</AuthTitle>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <AuthInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthInput
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <AuthButton type="submit">
            {isSignup ? "Créer un compte" : "Connexion"}
          </AuthButton>
        </form>
        <SwitchButton type="button" onClick={() => setIsSignup((s) => !s)}>
          {isSignup
            ? "Déjà inscrit ? Se connecter"
            : "Pas de compte ? Créer un compte"}
        </SwitchButton>
      </AuthCard>
    </AuthContainer>
  );
}
