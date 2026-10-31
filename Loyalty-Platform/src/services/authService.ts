// src/services/authService.ts
import { ApiError, requisicao } from './api';
import type { LoginRequest, LoginResponse, Sessao } from '@/types/auth';

const CHAVE_SESSAO = 'loyalty:sessao';

export async function login(dados: LoginRequest): Promise<LoginResponse> {
  try {
    return await requisicao<LoginResponse>('/auth/login', { metodo: 'POST', corpo: dados });
  } catch (erro) {
    // 401 = e-mail ou senha incorretos
    if (erro instanceof ApiError && erro.status === 401) {
      throw new ApiError(401, 'E-mail ou senha incorretos.');
    }
    throw erro;
  }
}

export function salvarSessao(sessao: Sessao): void {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
}

export function obterSessaoSalva(): Sessao | null {
  const salva = localStorage.getItem(CHAVE_SESSAO);
  if (!salva) return null;

  try {
    return JSON.parse(salva) as Sessao;
  } catch {
    localStorage.removeItem(CHAVE_SESSAO);
    return null;
  }
}

export function removerSessao(): void {
  localStorage.removeItem(CHAVE_SESSAO);
}
