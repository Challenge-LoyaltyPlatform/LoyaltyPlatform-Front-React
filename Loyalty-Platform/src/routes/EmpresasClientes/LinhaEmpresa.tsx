// src/routes/EmpresasClientes/LinhaEmpresa.tsx
// Linha da tabela (telas a partir de lg)
import { Link } from 'react-router';
import StatusEmpresaBadge from '@/components/empresa/StatusEmpresaBadge';
import type { Empresa } from '@/types/empresa';
import { formatarCnpj } from '@/utils/cnpj';
import { formatarMesAno, formatarNumero } from '@/utils/formatadores';
import { rotas } from '@/utils/rotas';

type LinhaEmpresaProps = {
  empresa: Empresa;
  aoAlterarStatus: (empresa: Empresa) => void;
};

export default function LinhaEmpresa({ empresa, aoAlterarStatus }: LinhaEmpresaProps) {
  const ativa = empresa.status === 'ATIVA';

  return (
    <tr className="border-t border-gray-100 transition-colors hover:bg-[#FAF9FE]">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9E5FB] text-sm font-bold text-[#5F37F5]"
            aria-hidden="true"
          >
            {empresa.nomeFantasia.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <Link
              to={rotas.adminEmpresa(empresa.id)}
              className="text-sm font-semibold text-[#12122A] transition-colors hover:text-[#5F37F5]"
            >
              {empresa.nomeFantasia}
            </Link>
            <p className="text-xs text-gray-500">Cliente desde {formatarMesAno(empresa.dataCadastro)}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{formatarCnpj(empresa.cnpj)}</td>
      <td className="px-4 py-4">
        <StatusEmpresaBadge status={empresa.status} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-700">{formatarNumero(empresa.campanhasAtivas)}</td>
      <td className="px-4 py-4 text-sm text-gray-700">{formatarNumero(empresa.usuariosVinculados)}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 text-sm font-semibold whitespace-nowrap">
          <Link
            to={rotas.adminEditarEmpresa(empresa.id)}
            className="text-[#5F37F5] transition-colors hover:text-[#4E28E0]"
            aria-label={`Editar ${empresa.nomeFantasia}`}
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={() => aoAlterarStatus(empresa)}
            className={ativa ? 'text-red-600 transition-colors hover:text-red-700' : 'text-[#5F37F5] transition-colors hover:text-[#4E28E0]'}
            aria-label={`${ativa ? 'Inativar' : 'Reativar'} ${empresa.nomeFantasia}`}
          >
            {ativa ? 'Inativar' : 'Reativar'}
          </button>
        </div>
      </td>
    </tr>
  );
}
