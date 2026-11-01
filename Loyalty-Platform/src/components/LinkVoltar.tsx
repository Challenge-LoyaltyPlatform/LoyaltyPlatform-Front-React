// src/components/LinkVoltar.tsx
import { Link } from 'react-router';

type LinkVoltarProps = {
  para: string;
  texto: string;
};

export default function LinkVoltar({ para, texto }: LinkVoltarProps) {
  return (
    <Link
      to={para}
      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5F37F5] transition-colors hover:text-[#4E28E0]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      {texto}
    </Link>
  );
}
