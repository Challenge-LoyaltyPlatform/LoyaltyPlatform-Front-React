import { useEffect, useMemo, useState } from 'react';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';
import { listarEmpresas } from '@/services/empresaService';
import type { Empresa } from '@/types/empresa';
import LinhaEmpresa from './LinhaEmpresa';

type Filtro = 'todas' | 'ativa' | 'inativa';

const colunas = ['Empresa', 'CNPJ', 'Status', 'Campanhas ativas', 'Usuários vinculados', 'Ações'];

// Remove acentos e maiúsculas para a busca não depender de como a pessoa digita
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function somenteDigitos(texto: string) {
  return texto.replace(/\D/g, '');
}

export default function EmpresasClientes() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('todas');

  useEffect(() => {
    document.title = 'Empresas clientes | Loyalty Platform';
  }, []);

  useEffect(() => {
    listarEmpresas()
      .then(setEmpresas)
      .finally(() => setCarregando(false));
  }, []);

  const contadores = useMemo(
    () => ({
      todas: empresas.length,
      ativa: empresas.filter((e) => e.status === 'ativa').length,
      inativa: empresas.filter((e) => e.status === 'inativa').length,
    }),
    [empresas],
  );

  const empresasFiltradas = useMemo(() => {
    const termo = normalizar(busca);
    const digitos = somenteDigitos(busca);

    return empresas.filter((empresa) => {
      if (filtro !== 'todas' && empresa.status !== filtro) return false;
      if (!termo) return true;

      const nomeConfere = normalizar(empresa.nome).includes(termo);
      const cnpjConfere = digitos !== '' && somenteDigitos(empresa.cnpj).includes(digitos);
      return nomeConfere || cnpjConfere;
    });
  }, [empresas, busca, filtro]);

  const filtros: { valor: Filtro; rotulo: string }[] = [
    { valor: 'todas', rotulo: 'Todas' },
    { valor: 'ativa', rotulo: 'Ativas' },
    { valor: 'inativa', rotulo: 'Inativas' },
  ];

  const pilulaClasses = (ativo: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
      ativo
        ? 'border-[#E9E5FB] bg-[#E9E5FB] text-[#5F37F5]'
        : 'border-gray-200 bg-white text-gray-600 hover:border-[#5F37F5]/40'
    }`;

  return (
    <>
      <CabecalhoAdmin secao="Administração" titulo="Empresas clientes" />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <label htmlFor="busca-empresa" className="sr-only">
            Buscar por nome ou CNPJ
          </label>
          <input
            id="busca-empresa"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou CNPJ"
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-[#12122A] placeholder-gray-400 outline-none transition focus:border-[#5F37F5] focus:ring-2 focus:ring-[#5F37F5]/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por status">
          {filtros.map(({ valor, rotulo }) => (
            <button
              key={valor}
              type="button"
              onClick={() => setFiltro(valor)}
              aria-pressed={filtro === valor}
              className={pilulaClasses(filtro === valor)}
            >
              {rotulo} ({contadores[valor]})
            </button>
          ))}
        </div>

        <button
          type="button"
          className="w-full sm:w-auto sm:ml-auto rounded-lg bg-[#5F37F5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4E28E0]"
        >
          Cadastrar empresa
        </button>
      </div>

      <section className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
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
              ) : empresasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={colunas.length} className="px-4 py-8 text-center text-sm text-gray-500">
                    {empresas.length === 0
                      ? 'Nenhuma empresa cadastrada ainda.'
                      : 'Nenhuma empresa encontrada com esses critérios.'}
                  </td>
                </tr>
              ) : (
                empresasFiltradas.map((empresa) => (
                  <LinhaEmpresa key={empresa.id} empresa={empresa} />
                ))
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