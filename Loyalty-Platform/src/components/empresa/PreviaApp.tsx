// src/components/empresa/PreviaApp.tsx
// Mostra a tela de missões do app com a identidade visual da empresa cliente (white label)
import type { CSSProperties } from 'react';
import type { IdentidadeVisual } from '@/types/empresa';
import { COR_HEX } from '@/utils/cores';
import { FORMAS_BOTOES, TIPOGRAFIAS } from './opcoesIdentidade';

const missoesExemplo = [
  { titulo: 'Complete seu perfil', pontos: 50 },
  { titulo: 'Avalie sua experiência', pontos: 20 },
  { titulo: 'Indique um amigo', pontos: 80 },
];

const COR_PADRAO = '#5F37F5';

type PreviaAppProps = {
  identidade: IdentidadeVisual;
  nomeEmpresa: string;
};

export default function PreviaApp({ identidade, nomeEmpresa }: PreviaAppProps) {
  // Enquanto a pessoa digita um hex incompleto, a prévia segura a cor padrão
  const cor = COR_HEX.test(identidade.corPrincipal) ? identidade.corPrincipal : COR_PADRAO;
  const formaBotao = FORMAS_BOTOES[identidade.formaBotoes]?.classe ?? FORMAS_BOTOES.ARREDONDADO.classe;
  const fonte = TIPOGRAFIAS[identidade.tipografia]?.fonte ?? TIPOGRAFIAS.SORA.fonte;

  // A cor vira variável CSS para as classes do Tailwind usarem com bg-(--cor-marca)
  const estilo = { '--cor-marca': cor, fontFamily: fonte } as CSSProperties;

  return (
    <figure className="m-0">
      <div
        style={estilo}
        className="mx-auto w-full max-w-[240px] rounded-[2rem] border-[6px] border-[#12122A] bg-[#FFFBF7] px-4 pb-6 pt-4 shadow-sm"
        aria-hidden="true"
      >
        <span className="block text-lg leading-none text-[#12122A]">‹</span>
        <p className="mt-3 text-xl font-bold text-[#12122A]">Missões</p>

        <div className="mt-2 flex gap-4 border-b border-gray-200 text-[11px] text-gray-500">
          <span className="border-b-2 border-(--cor-marca) pb-1.5 font-bold text-(--cor-marca)">Missões</span>
          <span className="pb-1.5">Nível</span>
          <span className="pb-1.5">Ranking</span>
        </div>

        <ul className="mt-2">
          {missoesExemplo.map(({ titulo, pontos }) => (
            <li key={titulo} className="flex items-center gap-2 border-b border-gray-100 py-2.5 last:border-b-0">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center bg-(--cor-marca) text-[10px] font-bold text-white ${formaBotao}`}>
                +{pontos}
              </span>
              <span className="min-w-0 flex-1 text-[11px] font-semibold leading-tight text-[#12122A]">
                {titulo}
              </span>
              <span className={`shrink-0 bg-(--cor-marca) px-2.5 py-1 text-[10px] font-bold text-white ${formaBotao}`}>
                Começar
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-xs text-gray-500">
        Como a tela de missões aparece para os usuários
        {nomeEmpresa.trim() ? ` da ${nomeEmpresa.trim()}` : ''}.
      </figcaption>
    </figure>
  );
}
