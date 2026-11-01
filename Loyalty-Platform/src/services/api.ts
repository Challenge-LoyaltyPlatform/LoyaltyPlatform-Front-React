// src/services/api.ts

// URL da API Java. Em produção (Vercel) vem da variável de ambiente VITE_API_URL
const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '');

export class ApiError extends Error {
  status: number;

  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.name = 'ApiError';
    this.status = status;
  }
}

type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface OpcoesRequisicao {
  metodo?: MetodoHttp;
  corpo?: unknown;
}

export async function requisicao<T>(
  caminho: string,
  { metodo = 'GET', corpo }: OpcoesRequisicao = {},
): Promise<T> {
  let resposta: Response;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      headers: corpo !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    });
  } catch {
    // fetch só falha aqui quando não alcança o servidor (API fora do ar, sem internet ou CORS)
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Tente novamente em instantes.');
  }

  if (!resposta.ok) {
    throw new ApiError(resposta.status, await lerMensagemDeErro(resposta));
  }

  // 204 No Content não tem corpo para converter
  if (resposta.status === 204) {
    return undefined as T;
  }

  return (await resposta.json()) as T;
}

async function lerMensagemDeErro(resposta: Response): Promise<string> {
  try {
    const dados = await resposta.json();
    if (typeof dados?.mensagem === 'string') return dados.mensagem;
    if (typeof dados?.message === 'string') return dados.message;
  } catch {
    // corpo vazio ou que não é JSON: cai na mensagem padrão
  }
  return `Erro ${resposta.status} ao comunicar com o servidor.`;
}
