export type StatusEmpresa = "ativa" | "inativa";

export interface Empresa {
  id: number;
  nome: string;
  descricao: string;
  cnpj: string;
  status: StatusEmpresa;
  campanhasAtivas: number;
  usuariosVinculados: number;
}