// src/services/empresaService.ts
// Chamadas ao recurso /empresas da API Java (usado pelo painel do administrador)
import { requisicao } from './api';
import type {
  AlteracaoStatusEmpresa,
  Empresa,
  EmpresaRequest,
  StatusEmpresa,
} from '@/types/empresa';

const RECURSO = '/empresas';

export function listarEmpresas(sinal?: AbortSignal): Promise<Empresa[]> {
  return requisicao<Empresa[]>(RECURSO, { sinal });
}

export function buscarEmpresa(id: number, sinal?: AbortSignal): Promise<Empresa> {
  return requisicao<Empresa>(`${RECURSO}/${id}`, { sinal });
}

export function cadastrarEmpresa(dados: EmpresaRequest): Promise<Empresa> {
  return requisicao<Empresa>(RECURSO, { metodo: 'POST', corpo: dados });
}

export function atualizarEmpresa(id: number, dados: EmpresaRequest): Promise<Empresa> {
  return requisicao<Empresa>(`${RECURSO}/${id}`, { metodo: 'PUT', corpo: dados });
}

// Inativar encerra as campanhas ativas; reativar não traz as campanhas de volta (regra do back-end)
export function alterarStatusEmpresa(id: number, status: StatusEmpresa): Promise<Empresa> {
  const corpo: AlteracaoStatusEmpresa = { status };
  return requisicao<Empresa>(`${RECURSO}/${id}/status`, { metodo: 'PATCH', corpo });
}
