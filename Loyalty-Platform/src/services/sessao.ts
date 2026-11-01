// src/services/sessao.ts
// Persistência da sessão no navegador. Fica separada do authService para que
// o api.ts consiga ler o token sem criar import circular (authService já importa api).
import type { PerfilUsuario, Sessao } from '@/types/auth';

const CHAVE_SESSAO = 'loyalty:sessao';
const PERFIS: readonly PerfilUsuario[] = ['ADMIN', 'EMPRESA'];

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null;
}

// O localStorage pode ter sido editado à mão ou salvo por uma versão antiga do site:
// só aceita o que tem o formato que o resto do código espera
function ehSessaoValida(valor: unknown): valor is Sessao {
  if (!ehObjeto(valor) || typeof valor.token !== 'string' || !ehObjeto(valor.usuario)) {
    return false;
  }

  const { perfil, empresa } = valor.usuario;
  if (!PERFIS.includes(perfil as PerfilUsuario)) return false;

  return perfil === 'ADMIN' || ehObjeto(empresa);
}

export function salvarSessao(sessao: Sessao): void {
  try {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
  } catch {
    // Navegação privada ou armazenamento cheio: a sessão vale só até recarregar a página
  }
}

export function obterSessaoSalva(): Sessao | null {
  try {
    const salva = localStorage.getItem(CHAVE_SESSAO);
    if (!salva) return null;

    const sessao: unknown = JSON.parse(salva);
    if (ehSessaoValida(sessao)) return sessao;
  } catch {
    // JSON corrompido ou localStorage bloqueado: trata como deslogado
  }

  removerSessao();
  return null;
}

export function removerSessao(): void {
  try {
    localStorage.removeItem(CHAVE_SESSAO);
  } catch {
    // Nada a fazer se o armazenamento estiver bloqueado
  }
}
