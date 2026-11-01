import type { Empresa } from '@/types/empresa';
import StatusBadge from './StatusBadge';

type LinhaEmpresaProps = {
  empresa: Empresa;
  onAlterarStatus: (empresa: Empresa) => void;
};

export default function LinhaEmpresa({ empresa, onAlterarStatus }: LinhaEmpresaProps) {
  const ativa = empresa.status === 'ativa';

  return (
    <tr className="border-t border-gray-100">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9E5FB] text-sm font-bold text-[#5F37F5]"
            aria-hidden="true"
          >
            {empresa.nome[0].toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#12122A]">{empresa.nome}</p>
            <p className="text-xs text-gray-500">{empresa.descricao}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{empresa.cnpj}</td>
      <td className="px-4 py-4">
        <StatusBadge status={empresa.status} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">{empresa.campanhasAtivas}</td>
      <td className="px-4 py-4 text-sm text-gray-700">
        {empresa.usuariosVinculados.toLocaleString('pt-BR')}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap">
          <button type="button" className="text-[#5F37F5] hover:text-[#4E28E0] transition-colors">
            Editar
          </button>
                    {ativa ? (
            <button
              type="button"
              onClick={() => onAlterarStatus(empresa)}
              className="text-red-600 hover:text-red-700 transition-colors"
            >
              Inativar
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAlterarStatus(empresa)}
              className="text-[#5F37F5] hover:text-[#4E28E0] transition-colors"
            >
              Reativar
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}