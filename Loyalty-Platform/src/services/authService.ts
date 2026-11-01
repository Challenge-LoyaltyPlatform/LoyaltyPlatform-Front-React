// src/services/authService.ts
import { ApiError, requisicao } from './api';
import type { LoginRequest, LoginResponse } from '@/types/auth';

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
