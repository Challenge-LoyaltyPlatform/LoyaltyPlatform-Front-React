// src/utils/rotas.ts
// Endereços das telas num lugar só: trocar uma URL não exige caçar strings pelo projeto
import type { Usuario } from '@/types/auth';

export const rotas = {
  home: '/',
  login: '/login',
  adminEmpresas: '/admin/empresas',
  adminNovaEmpresa: '/admin/empresas/nova',
  adminEmpresa: (id: number) => `/admin/empresas/${id}`,
  adminEditarEmpresa: (id: number) => `/admin/empresas/${id}/editar`,
} as const;

// Painel de cada perfil. O painel da empresa cliente entra na próxima feature;
// até lá, quem entra como EMPRESA volta para o site.
export function rotaDoPainel(usuario: Usuario): string | null {
  return usuario.perfil === 'ADMIN' ? rotas.adminEmpresas : null;
}

// Para onde o Login pode mandar a pessoa de volta. Só aceita caminho interno
// do painel do próprio perfil, para o state da URL não virar redirecionamento arbitrário.
export function destinoAposLogin(usuario: Usuario, origem: unknown): string {
  const painel = rotaDoPainel(usuario);
  if (!painel) return rotas.home;

  const prefixoPermitido = usuario.perfil === 'ADMIN' ? '/admin' : null;
  const origemValida =
    typeof origem === 'string' &&
    prefixoPermitido !== null &&
    origem.startsWith(prefixoPermitido) &&
    !origem.startsWith('//');

  return origemValida ? origem : painel;
}

// "/admin/empresas/abc" -> null | "/admin/empresas/12" -> 12
export function lerIdDaRota(valor: string | undefined): number | null {
  if (!valor || !/^\d+$/.test(valor)) return null;
  const id = Number(valor);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
