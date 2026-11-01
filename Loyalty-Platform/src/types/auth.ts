// src/types/auth.ts

// A mesma tela de login atende a empresa cliente e o administrador da Loyalty
export type PerfilUsuario = 'EMPRESA' | 'ADMIN';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  empresa?: string;
}

// Corpo enviado para POST /auth/login
export interface LoginRequest {
  email: string;
  senha: string;
}

// Resposta esperada da API Java quando o login dá certo
export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

// Sessão salva no navegador: resposta da API + data/hora do login
export type Sessao = LoginResponse & {
  logadoEm: string;
};
