// src/contexts/AuthContext.ts
import { createContext, useContext } from 'react';
import type { LoginRequest, Usuario } from '@/types/auth';

export interface AuthContextValue {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  entrar: (dados: LoginRequest) => Promise<void>;
  sair: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth precisa ser usado dentro de <AuthProvider>');
  }
  return contexto;
}
