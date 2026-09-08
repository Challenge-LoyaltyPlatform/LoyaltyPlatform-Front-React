import type { ReactNode } from 'react';

interface FaqCardProps {
  pergunta: string;
  resposta: ReactNode;
}

export default function FaqCard({ pergunta, resposta }: FaqCardProps) {
  return (
    <article className="bg-[#12122a] border border-gray-700/50 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-3">{pergunta}</h3>
      <p className="text-gray-300 leading-relaxed">{resposta}</p>
    </article>
  );
}