// src/services/api.ts
// Único ponto do front que fala HTTP com a API Java. Os services de cada recurso
// (empresaService, authService...) usam a função requisicao daqui.
import { obterSessaoSalva } from './sessao';
import type { ErroApiResposta } from '@/types/api';

// URL da API Java. Em produção (Vercel) vem da variável de ambiente VITE_API_URL
const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/+$/, '');

// Hospedagem gratuita costuma "dormir" e a primeira resposta demora; acima disso, desiste
const TEMPO_LIMITE_MS = 30_000;

// VITE_API_MOCK=true troca o fetch pela API simulada em memória (só para desenvolvimento).
// Na Vercel a variável não existe, então o build de produção sempre usa a API real.
const USAR_API_SIMULADA = import.meta.env.VITE_API_MOCK === 'true';

type Transporte = (url: string, init: RequestInit) => Promise<Response>;

async function obterTransporte(): Promise<Transporte> {
  if (!USAR_API_SIMULADA) return (url, init) => fetch(url, init);
  // Import dinâmico: o código da API simulada só é baixado quando ela está ligada
  const { fetchSimulado } = await import('./apiSimulada');
  return fetchSimulado;
}

const MENSAGENS_PADRAO: Partial<Record<number, string>> = {
  400: 'Os dados enviados são inválidos.',
  401: 'Sua sessão expirou. Entre novamente.',
  403: 'Você não tem permissão para fazer isso.',
  404: 'O registro procurado não foi encontrado.',
  409: 'Já existe um registro com esses dados.',
};

export class ApiError extends Error {
  readonly status: number;
  // Erros por campo do formulário, quando a API informa (ex.: { cnpj: '...' })
  readonly campos: Record<string, string>;

  constructor(status: number, mensagem: string, campos: Record<string, string> = {}) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
    this.campos = campos;
  }
}

type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface OpcoesRequisicao {
  metodo?: MetodoHttp;
  corpo?: unknown;
  // Permite cancelar a requisição (ex.: o usuário saiu da página antes da resposta)
  sinal?: AbortSignal;
}

// Chamado quando a API recusa o token (401). O AuthProvider registra aqui o "deslogar".
let aoNaoAutorizar: (() => void) | null = null;

export function definirAcaoNaoAutorizado(acao: (() => void) | null): void {
  aoNaoAutorizar = acao;
}

export async function requisicao<T>(
  caminho: string,
  { metodo = 'GET', corpo, sinal }: OpcoesRequisicao = {},
): Promise<T> {
  const token = obterSessaoSalva()?.token;

  const cabecalhos = new Headers({ Accept: 'application/json' });
  if (corpo !== undefined) cabecalhos.set('Content-Type', 'application/json');
  if (token) cabecalhos.set('Authorization', `Bearer ${token}`);

  const tempoLimite = AbortSignal.timeout(TEMPO_LIMITE_MS);

  const transporte = await obterTransporte();

  let resposta: Response;
  try {
    resposta = await transporte(`${API_URL}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
      signal: sinal ? AbortSignal.any([sinal, tempoLimite]) : tempoLimite,
    });
  } catch (erro) {
    // Cancelada por quem chamou: repassa o AbortError para ser ignorado lá
    if (sinal?.aborted) throw erro;
    if (tempoLimite.aborted) {
      throw new ApiError(0, 'O servidor demorou demais para responder. Tente novamente.');
    }
    // fetch só falha aqui quando não alcança o servidor (API fora do ar, sem internet ou CORS)
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Tente novamente em instantes.');
  }

  if (!resposta.ok) {
    if (resposta.status === 401 && token) aoNaoAutorizar?.();
    throw await criarErro(resposta);
  }

  // 204 No Content não tem corpo para converter
  if (resposta.status === 204) {
    return undefined as T;
  }

  try {
    return (await resposta.json()) as T;
  } catch {
    throw new ApiError(resposta.status, 'O servidor enviou uma resposta em formato inesperado.');
  }
}

function ehMapaDeTextos(valor: unknown): valor is Record<string, string> {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    Object.values(valor).every((item) => typeof item === 'string')
  );
}

async function criarErro(resposta: Response): Promise<ApiError> {
  const mensagemPadrao =
    MENSAGENS_PADRAO[resposta.status] ??
    (resposta.status >= 500
      ? 'O servidor encontrou um erro. Tente novamente em instantes.'
      : `Erro ${resposta.status} ao comunicar com o servidor.`);

  try {
    const corpo = (await resposta.json()) as Partial<ErroApiResposta>;
    const mensagem =
      typeof corpo.mensagem === 'string' && corpo.mensagem.trim() !== ''
        ? corpo.mensagem
        : mensagemPadrao;

    return new ApiError(resposta.status, mensagem, ehMapaDeTextos(corpo.campos) ? corpo.campos : {});
  } catch {
    // Corpo vazio ou que não é JSON: fica com a mensagem padrão do status
    return new ApiError(resposta.status, mensagemPadrao);
  }
}
