// src/components/formulario/Campo.tsx
// Rótulo + entrada + mensagem de erro/dica, sempre ligados por id para leitores de tela
import type { ReactNode } from 'react';

type CampoProps = {
  id: string;
  rotulo: string;
  erro?: string;
  dica?: string;
  opcional?: boolean;
  className?: string;
  children: ReactNode; // a entrada deve usar aria-describedby={idDescricao(id, erro, dica)}
};

export default function Campo({ id, rotulo, erro, dica, opcional, className = '', children }: CampoProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-xs font-semibold text-[#12122A]">
        {rotulo}
        {opcional && <span className="font-normal text-gray-400"> (opcional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {erro ? (
        <p id={`${id}-erro`} className="mt-1.5 text-xs text-red-600">
          {erro}
        </p>
      ) : (
        dica && (
          <p id={`${id}-dica`} className="mt-1.5 text-xs text-gray-500">
            {dica}
          </p>
        )
      )}
    </div>
  );
}
