// src/components/Feedback.tsx
// Estados de tela usados enquanto a API responde ou quando ela falha

export function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type CarregandoProps = {
  texto: string;
};

export function Carregando({ texto }: CarregandoProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 px-4 py-12 text-sm text-gray-500"
    >
      <Spinner className="h-6 w-6 text-[#5F37F5]" />
      {texto}
    </div>
  );
}

type MensagemErroProps = {
  titulo: string;
  mensagem: string;
  aoTentarNovamente?: () => void;
};

export function MensagemErro({ titulo, mensagem, aoTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="flex flex-col items-center px-4 py-12 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </span>
      <p className="mt-3 text-sm font-semibold text-[#12122A]">{titulo}</p>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{mensagem}</p>
      {aoTentarNovamente && (
        <button
          type="button"
          onClick={aoTentarNovamente}
          className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#5F37F5] transition-colors hover:border-[#5F37F5]/40 hover:bg-[#F0EEFB]"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
