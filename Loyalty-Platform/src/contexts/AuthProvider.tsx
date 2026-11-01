// src/contexts/AuthProvider.tsx
import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { login, obterSessaoSalva, removerSessao, salvarSessao } from '@/services/authService';
import type { LoginRequest, Sessao } from '@/types/auth';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  // Recupera a sessão salva para o usuário continuar logado ao recarregar a página
  const [sessao, setSessao] = useState<Sessao | null>(() => obterSessaoSalva());

  async function entrar(dados: LoginRequest) {
    const resposta = await login(dados);
    const novaSessao: Sessao = { ...resposta, logadoEm: new Date().toISOString() };
    salvarSessao(novaSessao);
    setSessao(novaSessao);
  }

  function sair() {
    removerSessao();
    setSessao(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario: sessao?.usuario ?? null,
        estaAutenticado: sessao !== null,
        entrar,
        sair,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
