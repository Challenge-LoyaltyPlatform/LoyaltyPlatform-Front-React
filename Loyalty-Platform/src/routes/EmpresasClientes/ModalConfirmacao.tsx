import { useEffect } from 'react';
import type { Empresa } from '@/types/empresa';

type ModalConfirmacaoProps = {
  empresa: Empresa;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export default function ModalConfirmacao({ empresa, onConfirmar, onCancelar }: ModalConfirmacaoProps) {
  const inativando = empresa.status === 'ativa';

  // Fecha com a tecla Esc
  useEffect(() => {
    function aoPressionar(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancelar();
    }
    window.addEventListener('keydown', aoPressionar);
    return () => window.removeEventListener('keydown', aoPressionar);
  }, [onCancelar]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#12122A]/50 px-4"
      onClick={onCancelar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl font-['Sora']"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="titulo-modal" className="text-lg font-bold text-[#12122A]">
          {inativando ? `Inativar ${empresa.nome}?` : `Reativar ${empresa.nome}?`}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {inativando
            ? empresa.campanhasAtivas > 0
              ? `A empresa perde o acesso e ${empresa.campanhasAtivas} campanha(s) ativa(s) será(ão) encerrada(s).`
              : 'A empresa perde o acesso à plataforma.'
            : 'A empresa volta a ter acesso. As campanhas encerradas não são reativadas.'}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
              inativando ? 'bg-red-600 hover:bg-red-700' : 'bg-[#5F37F5] hover:bg-[#4E28E0]'
            }`}
          >
            {inativando ? 'Inativar empresa' : 'Reativar empresa'}
          </button>
        </div>
      </div>
    </div>
  );
}