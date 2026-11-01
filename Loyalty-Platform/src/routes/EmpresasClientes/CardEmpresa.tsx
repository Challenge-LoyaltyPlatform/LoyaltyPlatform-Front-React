// src/routes/EmpresasClientes/CardEmpresa.tsx
// Versão em cartão da linha da tabela, para celular e tablet (abaixo de lg)
import { Link } from 'react-router';
import StatusEmpresaBadge from '@/components/empresa/StatusEmpresaBadge';
import type { Empresa } from '@/types/empresa';
import { formatarCnpj } from '@/utils/cnpj';
import { formatarMesAno, formatarNumero } from '@/utils/formatadores';
import { rotas } from '@/utils/rotas';

type CardEmpresaProps = {
  empresa: Empresa;
  aoAlterarStatus: (empresa: Empresa) => void;
};

export default function CardEmpresa({ empresa, aoAlterarStatus }: CardEmpresaProps) {
  const ativa = empresa.status === 'ATIVA';

  return (
    <li className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9E5FB] text-sm font-bold text-[#5F37F5]"
            aria-hidden="true"
          >
            {empresa.nomeFantasia.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <Link
              to={rotas.adminEmpresa(empresa.id)}
              className="block truncate text-sm font-semibold text-[#12122A] hover:text-[#5F37F5]"
            >
              {empresa.nomeFantasia}
            </Link>
            <p className="text-xs text-gray-500">{formatarCnpj(empresa.cnpj)}</p>
          </div>
        </div>
        <StatusEmpresaBadge status={empresa.status} />
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
        <div>
          <dt className="text-gray-500">Campanhas ativas</dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#12122A]">{formatarNumero(empresa.campanhasAtivas)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Usuários vinculados</dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#12122A]">{formatarNumero(empresa.usuariosVinculados)}</dd>
        </div>
        <div className="hidden sm:block">
          <dt className="text-gray-500">Cliente desde</dt>
          <dd className="mt-0.5 text-sm font-semibold text-[#12122A]">{formatarMesAno(empresa.dataCadastro)}</dd>
        </div>
      </dl>

      <div className="mt-3 flex items-center gap-4 text-sm font-semibold">
        <Link to={rotas.adminEmpresa(empresa.id)} className="text-[#5F37F5] hover:text-[#4E28E0]">
          Ver detalhes
        </Link>
        <Link
          to={rotas.adminEditarEmpresa(empresa.id)}
          className="text-[#5F37F5] hover:text-[#4E28E0]"
          aria-label={`Editar ${empresa.nomeFantasia}`}
        >
          Editar
        </Link>
        <button
          type="button"
          onClick={() => aoAlterarStatus(empresa)}
          className={`ml-auto ${ativa ? 'text-red-600 hover:text-red-700' : 'text-[#5F37F5] hover:text-[#4E28E0]'}`}
          aria-label={`${ativa ? 'Inativar' : 'Reativar'} ${empresa.nomeFantasia}`}
        >
          {ativa ? 'Inativar' : 'Reativar'}
        </button>
      </div>
    </li>
  );
}
