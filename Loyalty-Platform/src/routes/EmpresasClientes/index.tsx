// src/routes/EmpresasClientes/index.tsx
// Listagem de empresas clientes (GET /empresas) com busca, filtro e inativar/reativar (PATCH)
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';
import ModalStatusEmpresa from '@/components/empresa/ModalStatusEmpresa';
import { Carregando, MensagemErro } from '@/components/Feedback';
import { useAviso } from '@/contexts/AvisoContext';
import { useRequisicao } from '@/hooks/useRequisicao';
import { alterarStatusEmpresa, listarEmpresas } from '@/services/empresaService';
import type { Empresa, StatusEmpresa } from '@/types/empresa';
import { normalizarCnpj } from '@/utils/cnpj';
import { rotas } from '@/utils/rotas';
import CardEmpresa from './CardEmpresa';
import LinhaEmpresa from './LinhaEmpresa';

type Filtro = 'TODAS' | StatusEmpresa;

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: 'TODAS', rotulo: 'Todas' },
  { valor: 'ATIVA', rotulo: 'Ativas' },
  { valor: 'INATIVA', rotulo: 'Inativas' },
];

const colunas = ['Empresa', 'CNPJ', 'Status', 'Campanhas ativas', 'Usuários vinculados', 'Ações'];

// Remove acentos e maiúsculas para a busca não depender de como a pessoa digita
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

export default function EmpresasClientes() {
  const { estado, recarregar, substituirDados } = useRequisicao(listarEmpresas);
  const { avisar } = useAviso();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('TODAS');
  const [empresaEmConfirmacao, setEmpresaEmConfirmacao] = useState<Empresa | null>(null);

  useEffect(() => {
    document.title = 'Empresas clientes | Loyalty Platform';
  }, []);

  const empresas = useMemo(() => (estado.status === 'sucesso' ? estado.dados : []), [estado]);

  const contadores = useMemo<Record<Filtro, number>>(
    () => ({
      TODAS: empresas.length,
      ATIVA: empresas.filter((e) => e.status === 'ATIVA').length,
      INATIVA: empresas.filter((e) => e.status === 'INATIVA').length,
    }),
    [empresas],
  );

  const empresasFiltradas = useMemo(() => {
    const termo = normalizar(busca);
    const termoCnpj = normalizarCnpj(busca);

    return empresas.filter((empresa) => {
      if (filtro !== 'TODAS' && empresa.status !== filtro) return false;
      if (!termo) return true;

      const nomeConfere =
        normalizar(empresa.nomeFantasia).includes(termo) || normalizar(empresa.razaoSocial).includes(termo);
      const cnpjConfere = termoCnpj.length >= 2 && empresa.cnpj.includes(termoCnpj);
      return nomeConfere || cnpjConfere;
    });
  }, [empresas, busca, filtro]);

  const cancelarConfirmacao = useCallback(() => setEmpresaEmConfirmacao(null), []);

  // Se a API recusar, o erro sobe para o modal, que mostra a mensagem e continua aberto
  async function confirmarAlteracaoStatus() {
    if (!empresaEmConfirmacao) return;

    const novoStatus: StatusEmpresa = empresaEmConfirmacao.status === 'ATIVA' ? 'INATIVA' : 'ATIVA';
    const atualizada = await alterarStatusEmpresa(empresaEmConfirmacao.id, novoStatus);

    substituirDados(empresas.map((empresa) => (empresa.id === atualizada.id ? atualizada : empresa)));
    setEmpresaEmConfirmacao(null);
    avisar({
      tipo: 'sucesso',
      titulo: `${atualizada.nomeFantasia} foi ${novoStatus === 'INATIVA' ? 'inativada' : 'reativada'}`,
      descricao:
        novoStatus === 'INATIVA'
          ? 'O acesso foi bloqueado e as campanhas ativas foram encerradas.'
          : 'O acesso à plataforma foi restaurado.',
    });
  }

  function limparFiltros() {
    setBusca('');
    setFiltro('TODAS');
  }

  const pilulaClasses = (ativo: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
      ativo
        ? 'border-[#E9E5FB] bg-[#E9E5FB] text-[#5F37F5]'
        : 'border-gray-200 bg-white text-gray-600 hover:border-[#5F37F5]/40'
    }`;

  function renderizarConteudo() {
    if (estado.status === 'carregando') {
      return <Carregando texto="Carregando empresas..." />;
    }

    if (estado.status === 'erro') {
      return (
        <MensagemErro
          titulo="Não foi possível carregar as empresas"
          mensagem={estado.erro.message}
          aoTentarNovamente={recarregar}
        />
      );
    }

    if (empresas.length === 0) {
      return (
        <div className="px-4 py-12 text-center">
          <p className="text-sm font-semibold text-[#12122A]">Nenhuma empresa cadastrada ainda</p>
          <p className="mt-1 text-sm text-gray-500">Cadastre a primeira empresa cliente para começar.</p>
          <Link
            to={rotas.adminNovaEmpresa}
            className="mt-4 inline-block rounded-lg bg-[#5F37F5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4E28E0]"
          >
            Cadastrar empresa
          </Link>
        </div>
      );
    }

    if (empresasFiltradas.length === 0) {
      return (
        <div className="px-4 py-12 text-center">
          <p className="text-sm font-semibold text-[#12122A]">Nenhuma empresa encontrada</p>
          <p className="mt-1 text-sm text-gray-500">Nenhuma empresa confere com a busca e o filtro escolhidos.</p>
          <button
            type="button"
            onClick={limparFiltros}
            className="mt-4 text-sm font-semibold text-[#5F37F5] hover:text-[#4E28E0]"
          >
            Limpar busca e filtros
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Celular e tablet: cartões */}
        <ul className="divide-y divide-gray-100 lg:hidden">
          {empresasFiltradas.map((empresa) => (
            <CardEmpresa key={empresa.id} empresa={empresa} aoAlterarStatus={setEmpresaEmConfirmacao} />
          ))}
        </ul>

        {/* Desktop: tabela */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <caption className="sr-only">Empresas clientes da Loyalty Platform</caption>
            <thead>
              <tr>
                {colunas.map((coluna) => (
                  <th
                    key={coluna}
                    scope="col"
                    className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {coluna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empresasFiltradas.map((empresa) => (
                <LinhaEmpresa key={empresa.id} empresa={empresa} aoAlterarStatus={setEmpresaEmConfirmacao} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <CabecalhoAdmin trilha={[{ rotulo: 'Administração' }, { rotulo: 'Empresas clientes' }]} titulo="Empresas clientes" />

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
            onChange={(evento) => setBusca(evento.target.value)}
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
              {rotulo}
              {estado.status === 'sucesso' && ` (${contadores[valor]})`}
            </button>
          ))}
        </div>

        <Link
          to={rotas.adminNovaEmpresa}
          className="w-full rounded-lg bg-[#5F37F5] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4E28E0] sm:ml-auto sm:w-auto"
        >
          Cadastrar empresa
        </Link>
      </div>

      <section aria-label="Lista de empresas" className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {renderizarConteudo()}
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

      {empresaEmConfirmacao && (
        <ModalStatusEmpresa
          empresa={empresaEmConfirmacao}
          aoConfirmar={confirmarAlteracaoStatus}
          aoCancelar={cancelarConfirmacao}
        />
      )}
    </>
  );
}
