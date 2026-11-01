import type { Empresa } from "../types/empresa";

const empresasMock: Empresa[] = [
  {
    id: 1,
    nome: "SoulUp",
    descricao: "Rede social · implantada em 08/2026",
    cnpj: "11.222.333/0001-00",
    status: "ativa",
    campanhasAtivas: 2,
    usuariosVinculados: 48320,
  },
  {
    id: 2,
    nome: "Aurora Pay",
    descricao: "Fintech fictícia · implantada em 09/2026",
    cnpj: "22.333.444/0001-00",
    status: "ativa",
    campanhasAtivas: 1,
    usuariosVinculados: 21905,
  },
  {
    id: 3,
    nome: "Trilha Edu",
    descricao: "Educação fictícia · inativada em 10/2026",
    cnpj: "33.444.555/0001-00",
    status: "inativa",
    campanhasAtivas: 0,
    usuariosVinculados: 7410,
  },
];

export async function listarEmpresas(): Promise<Empresa[]> {
  return empresasMock;
}