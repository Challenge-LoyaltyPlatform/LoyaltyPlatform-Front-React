import type { ReactNode } from 'react';

type ItemRecursoProps = {
  icone: ReactNode;
  texto: string;
};

export default function ItemRecurso({ icone, texto }: ItemRecursoProps) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-white text-[#5F37F5] shadow-sm">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icone}
        </svg>
      </span>
      <span className="text-sm font-medium text-[#12122A]">{texto}</span>
    </li>
  );
}
