// src/services/apiSimulada.ts
// API falsa, em memória, para desenvolver o front enquanto o back-end Java não existe.
// Liga com VITE_API_MOCK=true no .env.local. Segue o docs/contrato-api.md e responde
// com objetos Response de verdade, então o api.ts trata sucesso e erro igual à API real.
// Os dados voltam ao estado inicial sempre que a página é recarregada.
import type { ErroApiResposta } from '@/types/api';

const LATENCIA_MS = 400;

// Tipos próprios de propósito: a API simulada faz o papel do servidor, que não
// conhece os tipos do front. O formato precisa bater com o contrato.
type StatusEmpresa = 'ATIVA' | 'INATIVA';

interface EmpresaNoServidor {
  id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  telefone: string | null;
  identidadeVisual: { corPrincipal: string; tipografia: string; formaBotoes: string };
  status: StatusEmpresa;
  dataCadastro: string;
  campanhasAtivas: number;
  usuariosVinculados: number;
}

type DadosEditaveis = Pick<
  EmpresaNoServidor,
  'razaoSocial' | 'nomeFantasia' | 'cnpj' | 'email' | 'telefone' | 'identidadeVisual'
>;

export const LOGIN_SIMULADO = { email: 'admin@loyalty.com', senha: 'senha123' } as const;

const contas = [
  {
    ...LOGIN_SIMULADO,
    token: 'simulado-admin',
    usuario: { id: 1, nome: 'Equipe HalfTech', email: LOGIN_SIMULADO.email, perfil: 'ADMIN' },
  },
  {
    email: 'empresa@soulup.com.br',
    senha: 'senha123',
    token: 'simulado-empresa',
    usuario: {
      id: 2,
      nome: 'Luiz Felipe',
      email: 'empresa@soulup.com.br',
      perfil: 'EMPRESA',
      empresa: { id: 1, nomeFantasia: 'SoulUp' },
    },
  },
];

let proximoId = 4;

const empresas: EmpresaNoServidor[] = [
  {
    id: 1,
    razaoSocial: 'SoulUp Tecnologia Ltda.',
    nomeFantasia: 'SoulUp',
    cnpj: '11222333000181',
    email: 'contato@soulup.com.br',
    telefone: '11912345678',
    identidadeVisual: { corPrincipal: '#7C3AED', tipografia: 'POPPINS', formaBotoes: 'PILULA' },
    status: 'ATIVA',
    dataCadastro: '2026-08-14',
    campanhasAtivas: 2,
    usuariosVinculados: 48320,
  },
  {
    id: 2,
    razaoSocial: 'Aurora Pagamentos S.A.',
    nomeFantasia: 'Aurora Pay',
    cnpj: '22333444000181',
    email: 'implantacao@aurorapay.com.br',
    telefone: null,
    identidadeVisual: { corPrincipal: '#0F766E', tipografia: 'INTER', formaBotoes: 'ARREDONDADO' },
    status: 'ATIVA',
    dataCadastro: '2026-09-02',
    campanhasAtivas: 1,
    usuariosVinculados: 21905,
  },
  {
    id: 3,
    razaoSocial: 'Trilha Educação Digital Ltda.',
    nomeFantasia: 'Trilha Edu',
    cnpj: '12ABC34501DE35', // exemplo de CNPJ alfanumérico da Receita
    email: 'ti@trilhaedu.com.br',
    telefone: '1133334444',
    identidadeVisual: { corPrincipal: '#C2410C', tipografia: 'SORA', formaBotoes: 'RETO' },
    status: 'INATIVA',
    dataCadastro: '2026-10-05',
    campanhasAtivas: 0,
    usuariosVinculados: 7410,
  },
];

function responder(status: number, corpo?: unknown): Response {
  return new Response(corpo === undefined ? null : JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function responderErro(status: number, mensagem: string, campos?: Record<string, string>): Response {
  const corpo: ErroApiResposta = { status, mensagem, ...(campos ? { campos } : {}) };
  return responder(status, corpo);
}

// Simula o tempo de rede e respeita o cancelamento, como o fetch faz
function esperar(ms: number, sinal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    if (sinal?.aborted) {
      reject(sinal.reason);
      return;
    }
    const temporizador = setTimeout(resolve, ms);
    sinal?.addEventListener(
      'abort',
      () => {
        clearTimeout(temporizador);
        reject(sinal.reason);
      },
      { once: true },
    );
  });
}

function lerCorpo(init?: RequestInit): Record<string, unknown> {
  return typeof init?.body === 'string' ? (JSON.parse(init.body) as Record<string, unknown>) : {};
}

function extrairEditaveis(corpo: Record<string, unknown>): DadosEditaveis {
  const { razaoSocial, nomeFantasia, cnpj, email, telefone, identidadeVisual } = corpo as DadosEditaveis;
  return { razaoSocial, nomeFantasia, cnpj, email, telefone, identidadeVisual };
}

// Mesma regra de unicidade das constraints UNIQUE de TB_EMPRESA
function conflitos(dados: DadosEditaveis, ignorarId?: number): Record<string, string> | null {
  const campos: Record<string, string> = {};
  const outras = empresas.filter((empresa) => empresa.id !== ignorarId);

  const mesmoCnpj = outras.find((empresa) => empresa.cnpj === dados.cnpj);
  if (mesmoCnpj) {
    campos.cnpj = `Este CNPJ já está cadastrado (${mesmoCnpj.nomeFantasia}). Confira o número ou reative a empresa existente.`;
  }
  const mesmoEmail = outras.find((empresa) => empresa.email === dados.email);
  if (mesmoEmail) {
    campos.email = `Este e-mail já é usado por ${mesmoEmail.nomeFantasia}.`;
  }

  return Object.keys(campos).length > 0 ? campos : null;
}

// Devolve cópia: a tela nunca altera o "banco" por referência
const copia = <T,>(valor: T): T => structuredClone(valor);

export async function fetchSimulado(url: string, init: RequestInit = {}): Promise<Response> {
  await esperar(LATENCIA_MS, init.signal);

  const metodo = (init.method ?? 'GET').toUpperCase();
  const partes = new URL(url, window.location.origin).pathname.split('/').filter(Boolean);
  // Ignora um eventual prefixo da URL base (ex.: /api/v1/empresas)
  const inicio = partes.findIndex((parte) => parte === 'auth' || parte === 'empresas');
  const [recurso, id, subrecurso] = inicio >= 0 ? partes.slice(inicio) : partes;

  // POST /auth/login
  if (recurso === 'auth' && id === 'login' && metodo === 'POST') {
    const { email, senha } = lerCorpo(init);
    const conta = contas.find((item) => item.email === email && item.senha === senha);
    return conta
      ? responder(200, { token: conta.token, usuario: conta.usuario })
      : responderErro(401, 'E-mail ou senha incorretos.');
  }

  if (recurso !== 'empresas') {
    return responderErro(404, 'Rota não existe na API simulada.');
  }

  const token = new Headers(init.headers).get('Authorization')?.replace(/^Bearer\s+/i, '');
  const conta = contas.find((item) => item.token === token);
  if (!conta) return responderErro(401, 'Sessão inválida ou expirada.');
  if (conta.usuario.perfil !== 'ADMIN') {
    return responderErro(403, 'Somente o administrador da Loyalty gerencia empresas.');
  }

  // GET e POST /empresas
  if (id === undefined) {
    if (metodo === 'GET') return responder(200, copia(empresas));

    if (metodo === 'POST') {
      const dados = extrairEditaveis(lerCorpo(init));
      const campos = conflitos(dados);
      if (campos) return responderErro(409, 'Já existe empresa com esses dados.', campos);

      const nova: EmpresaNoServidor = {
        ...dados,
        id: proximoId++,
        status: 'ATIVA',
        dataCadastro: new Date().toISOString().slice(0, 10),
        campanhasAtivas: 0,
        usuariosVinculados: 0,
      };
      empresas.push(nova);
      return responder(201, copia(nova));
    }

    return responderErro(405, 'Método não suportado.');
  }

  const empresa = empresas.find((item) => item.id === Number(id));
  if (!empresa) return responderErro(404, 'Empresa não encontrada.');

  // GET e PUT /empresas/{id}
  if (subrecurso === undefined) {
    if (metodo === 'GET') return responder(200, copia(empresa));

    if (metodo === 'PUT') {
      const dados = extrairEditaveis(lerCorpo(init));
      const campos = conflitos(dados, empresa.id);
      if (campos) return responderErro(409, 'Já existe empresa com esses dados.', campos);

      Object.assign(empresa, dados);
      return responder(200, copia(empresa));
    }
  }

  // PATCH /empresas/{id}/status
  if (subrecurso === 'status' && metodo === 'PATCH') {
    const { status } = lerCorpo(init);
    if (status !== 'ATIVA' && status !== 'INATIVA') {
      return responderErro(400, 'Status inválido.', { status: 'Use ATIVA ou INATIVA.' });
    }
    if (status === empresa.status) {
      return responderErro(409, `A empresa já está ${status === 'ATIVA' ? 'ativa' : 'inativa'}.`);
    }

    empresa.status = status;
    // Inativar encerra as campanhas ativas; reativar não traz elas de volta
    if (status === 'INATIVA') empresa.campanhasAtivas = 0;
    return responder(200, copia(empresa));
  }

  return responderErro(405, 'Método não suportado.');
}
