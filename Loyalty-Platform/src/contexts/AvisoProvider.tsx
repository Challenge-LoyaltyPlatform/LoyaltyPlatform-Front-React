// src/contexts/AvisoProvider.tsx
// Avisos flutuantes (toasts) disponíveis em qualquer tela. Fica acima do RouterProvider,
// então um aviso disparado antes de navegar continua visível na tela seguinte.
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AvisoContext, type Aviso, type NovoAviso, type TipoAviso } from './AvisoContext';

const DURACAO_MS = 5000;
const MAXIMO_NA_TELA = 3;

const estilos: Record<TipoAviso, { icone: ReactNode; cor: string }> = {
  sucesso: {
    cor: 'text-green-600',
    icone: <path d="M20 6 9 17l-5-5" />,
  },
  erro: {
    cor: 'text-red-600',
    icone: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
  },
  info: {
    cor: 'text-[#5F37F5]',
    icone: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
  },
};

type ItemAvisoProps = {
  aviso: Aviso;
  aoFechar: (id: number) => void;
};

function ItemAviso({ aviso, aoFechar }: ItemAvisoProps) {
  const { icone, cor } = estilos[aviso.tipo];

  useEffect(() => {
    const temporizador = window.setTimeout(() => aoFechar(aviso.id), DURACAO_MS);
    return () => window.clearTimeout(temporizador);
  }, [aviso.id, aoFechar]);

  return (
    <li
      role={aviso.tipo === 'erro' ? 'alert' : 'status'}
      className="pointer-events-auto flex w-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg font-['Sora']"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mt-px shrink-0 ${cor}`}
        aria-hidden="true"
      >
        {icone}
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#12122A]">{aviso.titulo}</p>
        {aviso.descricao && <p className="mt-0.5 text-xs text-gray-500">{aviso.descricao}</p>}
      </div>
      <button
        type="button"
        onClick={() => aoFechar(aviso.id)}
        className="shrink-0 rounded p-0.5 text-gray-400 transition-colors hover:text-gray-600"
        aria-label="Fechar aviso"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
}

type AvisoProviderProps = {
  children: ReactNode;
};

export default function AvisoProvider({ children }: AvisoProviderProps) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const proximoId = useRef(1);

  const fechar = useCallback((id: number) => {
    setAvisos((atuais) => atuais.filter((aviso) => aviso.id !== id));
  }, []);

  const avisar = useCallback((novo: NovoAviso) => {
    const aviso: Aviso = { ...novo, id: proximoId.current++ };
    // Mantém só os mais recentes para não cobrir a tela
    setAvisos((atuais) => [...atuais, aviso].slice(-MAXIMO_NA_TELA));
  }, []);

  const valor = useMemo(() => ({ avisar }), [avisar]);

  return (
    <AvisoContext.Provider value={valor}>
      {children}
      <ol
        aria-label="Avisos"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96"
      >
        {avisos.map((aviso) => (
          <ItemAviso key={aviso.id} aviso={aviso} aoFechar={fechar} />
        ))}
      </ol>
    </AvisoContext.Provider>
  );
}
