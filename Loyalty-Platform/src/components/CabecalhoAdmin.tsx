// src/components/CabecalhoAdmin.tsx
import { Fragment } from 'react';
import { Link } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

export interface ItemTrilha {
  rotulo: string;
  para?: string; // sem link quando é a tela atual ou um agrupador
}

type CabecalhoAdminProps = {
  trilha: ItemTrilha[];
  titulo: string;
};

function iniciais(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');
}

export default function CabecalhoAdmin({ trilha, titulo }: CabecalhoAdminProps) {
  const { usuario } = useAuth();

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <nav aria-label="Trilha de navegação">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
            {trilha.map((item, indice) => (
              <Fragment key={`${indice}-${item.rotulo}`}>
                {indice > 0 && <li aria-hidden="true">/</li>}
                <li className="truncate">
                  {item.para ? (
                    <Link to={item.para} className="transition-colors hover:text-[#5F37F5]">
                      {item.rotulo}
                    </Link>
                  ) : (
                    item.rotulo
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
        </nav>
        <h1 className="mt-1 truncate text-xl font-bold text-[#12122A] sm:text-2xl">{titulo}</h1>
      </div>

      {usuario && (
        <div className="flex shrink-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9E5FB] text-xs font-bold text-[#5F37F5]"
            aria-hidden="true"
          >
            {iniciais(usuario.nome)}
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[#12122A]">{usuario.nome}</span>
            <span className="text-xs text-gray-500">Administrador da Loyalty</span>
          </div>
        </div>
      )}
    </header>
  );
}
