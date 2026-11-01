import { useAuth } from '@/contexts/AuthContext';

type CabecalhoAdminProps = {
  secao: string;
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

export default function CabecalhoAdmin({ secao, titulo }: CabecalhoAdminProps) {
  const { usuario } = useAuth();

  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs text-gray-500">
          {secao} / {titulo}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#12122A]">{titulo}</h1>
      </div>

      {usuario && (
        <div className="flex items-center gap-2.5">
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