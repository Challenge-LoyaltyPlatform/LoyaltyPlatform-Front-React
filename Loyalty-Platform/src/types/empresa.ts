// src/types/empresa.ts
// Contrato do recurso /empresas da API Java (detalhado em docs/contrato-api.md).
// Os valores em MAIÚSCULAS espelham os enums do back-end.

export type StatusEmpresa = 'ATIVA' | 'INATIVA';

export type FormaBotoes = 'PILULA' | 'ARREDONDADO' | 'RETO';

export type Tipografia = 'SORA' | 'INTER' | 'POPPINS';

// Personalização white label: como o app aparece para os usuários da empresa cliente
export interface IdentidadeVisual {
  corPrincipal: string; // hexadecimal, ex.: #C2410C
  tipografia: Tipografia;
  formaBotoes: FormaBotoes;
}

// Corpo do POST /empresas e do PUT /empresas/{id}
export interface EmpresaRequest {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string; // 14 caracteres, sem máscara (aceita o CNPJ alfanumérico)
  email: string;
  telefone: string | null; // só dígitos, com DDD
  identidadeVisual: IdentidadeVisual;
}

// Resposta da API: os dados cadastrais + o que o servidor gera ou calcula
export type Empresa = EmpresaRequest & {
  id: number;
  status: StatusEmpresa;
  dataCadastro: string; // ISO 8601, ex.: 2026-08-14
  campanhasAtivas: number;
  usuariosVinculados: number;
};

// Corpo do PATCH /empresas/{id}/status
export interface AlteracaoStatusEmpresa {
  status: StatusEmpresa;
}
