// src/contexts/AuthProvider.tsx
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { definirAcaoNaoAutorizado } from '@/services/api';
import { login } from '@/services/authService';
import { obterSessaoSalva, removerSessao, salvarSessao } from '@/services/sessao';
import type { LoginRequest, Sessao } from '@/types/auth';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  // Recupera a sessão salva para o usuário continuar logado ao recarregar a página
  const [sessao, setSessao] = useState<Sessao | null>(() => obterSessaoSalva());
  const [sessaoExpirada, setSessaoExpirada] = useState(false);

  const entrar = useCallback(async (dados: LoginRequest) => {
    const resposta = await login(dados);
    const novaSessao: Sessao = { ...resposta, logadoEm: new Date().toISOString() };
    salvarSessao(novaSessao);
    setSessao(novaSessao);
    setSessaoExpirada(false);
  }, []);

  const sair = useCallback(() => {
    removerSessao();
    setSessao(null);
    setSessaoExpirada(false);
  }, []);

  // Se a API recusar o token (expirado ou inválido), desloga e guarda o motivo.
  // As rotas protegidas redirecionam para o login sozinhas quando a sessão some.
  useEffect(() => {
    definirAcaoNaoAutorizado(() => {
      removerSessao();
      setSessao(null);
      setSessaoExpirada(true);
    });
    return () => definirAcaoNaoAutorizado(null);
  }, []);

  const valor = useMemo(
    () => ({
      usuario: sessao?.usuario ?? null,
      estaAutenticado: sessao !== null,
      sessaoExpirada,
      entrar,
      sair,
    }),
    [sessao, sessaoExpirada, entrar, sair],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
