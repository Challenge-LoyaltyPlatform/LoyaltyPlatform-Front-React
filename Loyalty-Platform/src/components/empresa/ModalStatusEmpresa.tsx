// src/components/empresa/ModalStatusEmpresa.tsx
// Confirmação de inativar/reativar (diagrama "Gerenciar cadastro empresa": inativar exige
// confirmação com aviso de impacto; reativar não traz as campanhas encerradas de volta)
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/Feedback';
import { ApiError } from '@/services/api';
import type { Empresa } from '@/types/empresa';
import { pluralizar } from '@/utils/formatadores';

type ModalStatusEmpresaProps = {
  empresa: Empresa;
  aoConfirmar: () => Promise<void>;
  aoCancelar: () => void;
};

export default function ModalStatusEmpresa({ empresa, aoConfirmar, aoCancelar }: ModalStatusEmpresaProps) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const inativando = empresa.status === 'ATIVA';

  // Fecha com Esc, menos enquanto a requisição está em andamento
  useEffect(() => {
    function aoPressionar(evento: KeyboardEvent) {
      if (evento.key === 'Escape' && !enviando) aoCancelar();
    }
    window.addEventListener('keydown', aoPressionar);
    return () => window.removeEventListener('keydown', aoPressionar);
  }, [aoCancelar, enviando]);

  async function confirmar() {
    setEnviando(true);
    setErro(null);
    try {
      await aoConfirmar();
    } catch (falha) {
      setErro(falha instanceof ApiError ? falha.message : 'Não foi possível concluir. Tente novamente.');
      setEnviando(false);
    }
  }

  const impacto = inativando
    ? empresa.campanhasAtivas > 0
      ? `A empresa perde o acesso à plataforma e ${pluralizar(empresa.campanhasAtivas, 'campanha ativa será encerrada', 'campanhas ativas serão encerradas')}. A pontuação já conquistada pelos usuários é mantida.`
      : 'A empresa perde o acesso à plataforma. Ela não tem campanhas ativas no momento.'
    : 'A empresa volta a ter acesso à plataforma. As campanhas encerradas durante a inativação não são reativadas.';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#12122A]/50 px-4 pb-4 sm:items-center sm:pb-0"
      onClick={() => !enviando && aoCancelar()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-status"
        aria-describedby="descricao-modal-status"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl font-['Sora']"
        onClick={(evento) => evento.stopPropagation()}
      >
        <h2 id="titulo-modal-status" className="text-lg font-bold text-[#12122A]">
          {inativando ? `Inativar ${empresa.nomeFantasia}?` : `Reativar ${empresa.nomeFantasia}?`}
        </h2>

        <p id="descricao-modal-status" className="mt-2 text-sm leading-relaxed text-gray-600">
          {impacto}
        </p>

        {erro && (
          <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            {erro}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={aoCancelar}
            disabled={enviando}
            autoFocus
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmar}
            disabled={enviando}
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
              inativando ? 'bg-red-600 hover:bg-red-700' : 'bg-[#5F37F5] hover:bg-[#4E28E0]'
            }`}
          >
            {enviando && <Spinner className="h-4 w-4" />}
            {inativando ? 'Inativar empresa' : 'Reativar empresa'}
          </button>
        </div>
      </div>
    </div>
  );
}
