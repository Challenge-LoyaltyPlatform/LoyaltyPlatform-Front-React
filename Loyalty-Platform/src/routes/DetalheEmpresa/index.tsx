// src/routes/DetalheEmpresa/index.tsx
// Rota dinâmica /admin/empresas/:id (GET /empresas/{id}) com inativar/reativar (PATCH)
import { useEffect, useState, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';
import ModalStatusEmpresa from '@/components/empresa/ModalStatusEmpresa';
import { FORMAS_BOTOES, TIPOGRAFIAS } from '@/components/empresa/opcoesIdentidade';
import PreviaApp from '@/components/empresa/PreviaApp';
import StatusEmpresaBadge from '@/components/empresa/StatusEmpresaBadge';
import { Carregando, MensagemErro } from '@/components/Feedback';
import LinkVoltar from '@/components/LinkVoltar';
import { useAviso } from '@/contexts/AvisoContext';
import { useEmpresaDaRota } from '@/hooks/useEmpresaDaRota';
import { alterarStatusEmpresa } from '@/services/empresaService';
import type { Empresa } from '@/types/empresa';
import { formatarCnpj } from '@/utils/cnpj';
import { formatarData, formatarMesAno, formatarNumero, formatarTelefone } from '@/utils/formatadores';
import { rotas } from '@/utils/rotas';

function Indicador({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <p className="text-xs text-gray-500">{rotulo}</p>
      <p className="mt-1 text-2xl font-bold text-[#12122A] sm:text-3xl">{valor}</p>
    </div>
  );
}

function Dado({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="border-b border-gray-100 py-3 last:border-b-0 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-xs font-semibold text-gray-500 sm:text-sm sm:font-normal">{rotulo}</dt>
      <dd className="mt-0.5 break-words text-sm text-[#12122A] sm:col-span-2 sm:mt-0">{children}</dd>
    </div>
  );
}

export default function DetalheEmpresa() {
  const { estado, recarregar, substituirDados, naoEncontrada, estadoNaoEncontrada } = useEmpresaDaRota();
  const { avisar } = useAviso();
  const [confirmandoStatus, setConfirmandoStatus] = useState(false);

  const empresa: Empresa | null = estado.status === 'sucesso' ? estado.dados : null;

  useEffect(() => {
    document.title = `${empresa?.nomeFantasia ?? 'Empresa'} | Loyalty Platform`;
  }, [empresa?.nomeFantasia]);

  if (naoEncontrada) {
    return <Navigate to={rotas.adminEmpresas} replace state={estadoNaoEncontrada} />;
  }

  const trilha = [
    { rotulo: 'Administração' },
    { rotulo: 'Empresas clientes', para: rotas.adminEmpresas },
    { rotulo: empresa?.nomeFantasia ?? 'Detalhe' },
  ];

  if (!empresa) {
    return (
      <>
        <CabecalhoAdmin trilha={trilha} titulo="Detalhe da empresa" />
        <LinkVoltar para={rotas.adminEmpresas} texto="Voltar para empresas" />
        <section className="mt-6 rounded-xl border border-gray-200 bg-white">
          {estado.status === 'erro' ? (
            <MensagemErro
              titulo="Não foi possível carregar a empresa"
              mensagem={estado.erro.message}
              aoTentarNovamente={recarregar}
            />
          ) : (
            <Carregando texto="Carregando empresa..." />
          )}
        </section>
      </>
    );
  }

  const ativa = empresa.status === 'ATIVA';

  async function confirmarAlteracaoStatus(alvo: Empresa) {
    const novoStatus = alvo.status === 'ATIVA' ? 'INATIVA' : 'ATIVA';
    const atualizada = await alterarStatusEmpresa(alvo.id, novoStatus);
    substituirDados(atualizada);
    setConfirmandoStatus(false);
    avisar({
      tipo: 'sucesso',
      titulo: `${atualizada.nomeFantasia} foi ${novoStatus === 'INATIVA' ? 'inativada' : 'reativada'}`,
    });
  }

  return (
    <>
      <CabecalhoAdmin trilha={trilha} titulo={empresa.nomeFantasia} />
      <LinkVoltar para={rotas.adminEmpresas} texto="Voltar para empresas" />

      {/* RESUMO + AÇÕES */}
      <section className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ backgroundColor: empresa.identidadeVisual.corPrincipal }}
            aria-hidden="true"
          >
            {empresa.nomeFantasia.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-bold text-[#12122A]">{empresa.nomeFantasia}</h2>
              <StatusEmpresaBadge status={empresa.status} />
            </div>
            <p className="truncate text-sm text-gray-500">{empresa.razaoSocial}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
          <Link
            to={rotas.adminEditarEmpresa(empresa.id)}
            className="rounded-lg bg-[#5F37F5] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4E28E0]"
          >
            Editar dados
          </Link>
          <button
            type="button"
            onClick={() => setConfirmandoStatus(true)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
              ativa
                ? 'border-red-200 bg-white text-red-600 hover:bg-red-50'
                : 'border-gray-200 bg-white text-[#5F37F5] hover:bg-[#F0EEFB]'
            }`}
          >
            {ativa ? 'Inativar empresa' : 'Reativar empresa'}
          </button>
        </div>
      </section>

      {!ativa && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Esta empresa está inativa e não acessa a plataforma. Reativar devolve o acesso, mas não reativa as
          campanhas encerradas.
        </p>
      )}

      {/* INDICADORES */}
      <section aria-label="Indicadores" className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        <Indicador rotulo="Campanhas ativas" valor={formatarNumero(empresa.campanhasAtivas)} />
        <Indicador rotulo="Usuários vinculados" valor={formatarNumero(empresa.usuariosVinculados)} />
        <div className="col-span-2 md:col-span-1">
          <Indicador rotulo="Cliente desde" valor={formatarMesAno(empresa.dataCadastro)} />
        </div>
      </section>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-4">
          <section aria-labelledby="titulo-cadastro" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 id="titulo-cadastro" className="text-base font-bold text-[#12122A]">
              Dados cadastrais
            </h2>
            <dl className="mt-2">
              <Dado rotulo="Razão social">{empresa.razaoSocial}</Dado>
              <Dado rotulo="CNPJ">{formatarCnpj(empresa.cnpj)}</Dado>
              <Dado rotulo="E-mail do responsável">
                <a href={`mailto:${empresa.email}`} className="text-[#5F37F5] hover:underline">
                  {empresa.email}
                </a>
              </Dado>
              <Dado rotulo="Telefone">
                {empresa.telefone ? formatarTelefone(empresa.telefone) : <span className="text-gray-400">Não informado</span>}
              </Dado>
              <Dado rotulo="Data de cadastro">{formatarData(empresa.dataCadastro)}</Dado>
            </dl>
          </section>

          <section aria-labelledby="titulo-identidade" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 id="titulo-identidade" className="text-base font-bold text-[#12122A]">
              Identidade visual no app
            </h2>
            <dl className="mt-2">
              <Dado rotulo="Cor principal">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded border border-gray-200"
                    style={{ backgroundColor: empresa.identidadeVisual.corPrincipal }}
                    aria-hidden="true"
                  />
                  {empresa.identidadeVisual.corPrincipal}
                </span>
              </Dado>
              <Dado rotulo="Tipografia">
                {TIPOGRAFIAS[empresa.identidadeVisual.tipografia]?.rotulo ?? empresa.identidadeVisual.tipografia}
              </Dado>
              <Dado rotulo="Forma dos botões">
                {FORMAS_BOTOES[empresa.identidadeVisual.formaBotoes]?.rotulo ?? empresa.identidadeVisual.formaBotoes}
              </Dado>
            </dl>
          </section>
        </div>

        <aside aria-labelledby="titulo-previa" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 id="titulo-previa" className="mb-4 text-base font-bold text-[#12122A]">
            Prévia no app
          </h2>
          <PreviaApp identidade={empresa.identidadeVisual} nomeEmpresa={empresa.nomeFantasia} />
        </aside>
      </div>

      {confirmandoStatus && (
        <ModalStatusEmpresa
          empresa={empresa}
          aoConfirmar={() => confirmarAlteracaoStatus(empresa)}
          aoCancelar={() => setConfirmandoStatus(false)}
        />
      )}
    </>
  );
}
