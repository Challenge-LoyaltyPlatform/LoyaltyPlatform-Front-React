import { useEffect, useState } from 'react';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';
import { listarEmpresas } from '@/services/empresaService';
import type { Empresa } from '@/types/empresa';
import LinhaEmpresa from './LinhaEmpresa';

const colunas = ['Empresa', 'CNPJ', 'Status', 'Campanhas ativas', 'Usuários vinculados', 'Ações'];

export default function EmpresasClientes() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    document.title = 'Empresas clientes | Loyalty Platform';
  }, []);

  useEffect(() => {
    listarEmpresas()
      .then(setEmpresas)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <>
      <CabecalhoAdmin secao="Administração" titulo="Empresas clientes" />

      <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                {colunas.map((coluna) => (
                  <th
                    key={coluna}
                    className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500 whitespace-nowrap"
                  >
                    {coluna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr>
                  <td colSpan={colunas.length} className="px-4 py-8 text-center text-sm text-gray-500">
                    Carregando empresas...
                  </td>
                </tr>
              ) : (
                empresas.map((empresa) => <LinhaEmpresa key={empresa.id} empresa={empresa} />)
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-4 flex items-start gap-2 rounded-lg bg-[#F0EEFB] px-4 py-3 text-xs text-[#4E28E0]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-px shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        Inativar uma empresa pede confirmação e encerra as campanhas ativas dela. Reativar devolve o
        acesso, mas não reativa campanhas encerradas.
      </p>
    </>
  );
}