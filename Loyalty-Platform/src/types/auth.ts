// src/types/auth.ts

// A mesma tela de login atende a empresa cliente e o administrador da Loyalty
export type PerfilUsuario = 'EMPRESA' | 'ADMIN';

// Empresa de contexto de quem entra pelo painel da empresa cliente
export interface EmpresaDoUsuario {
  id: number;
  nomeFantasia: string;
}

interface UsuarioBase {
  id: number;
  nome: string;
  email: string;
}

// Union discriminada pelo perfil: só o perfil EMPRESA carrega a empresa de contexto,
// e o TypeScript obriga a checar o perfil antes de acessar usuario.empresa
export type Usuario =
  | (UsuarioBase & { perfil: 'ADMIN' })
  | (UsuarioBase & { perfil: 'EMPRESA'; empresa: EmpresaDoUsuario });

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
