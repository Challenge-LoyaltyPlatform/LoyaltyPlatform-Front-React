// src/routes/EditarEmpresa/index.tsx
// Rota dinâmica /admin/empresas/:id/editar (GET para preencher + PUT para salvar)
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';
import FormularioEmpresa from '@/components/empresa/FormularioEmpresa';
import { Carregando, MensagemErro } from '@/components/Feedback';
import LinkVoltar from '@/components/LinkVoltar';
import { useEmpresaDaRota } from '@/hooks/useEmpresaDaRota';
import { atualizarEmpresa } from '@/services/empresaService';
import type { Empresa, EmpresaRequest } from '@/types/empresa';
import type { EstadoComAviso } from '@/types/navegacao';
import { rotas } from '@/utils/rotas';

// O formulário só trabalha com os campos editáveis; id, status e contadores ficam de fora
function dadosEditaveis(empresa: Empresa): EmpresaRequest {
  const { razaoSocial, nomeFantasia, cnpj, email, telefone, identidadeVisual } = empresa;
  return { razaoSocial, nomeFantasia, cnpj, email, telefone, identidadeVisual };
}

export default function EditarEmpresa() {
  const navigate = useNavigate();
  const { estado, recarregar, naoEncontrada, estadoNaoEncontrada } = useEmpresaDaRota();
  const empresa = estado.status === 'sucesso' ? estado.dados : null;

  useEffect(() => {
    document.title = `Editar ${empresa?.nomeFantasia ?? 'empresa'} | Loyalty Platform`;
  }, [empresa?.nomeFantasia]);

  if (naoEncontrada) {
    return <Navigate to={rotas.adminEmpresas} replace state={estadoNaoEncontrada} />;
  }

  async function salvar(id: number, dados: EmpresaRequest) {
    const atualizada = await atualizarEmpresa(id, dados);

    const estadoNavegacao: EstadoComAviso = {
      aviso: { tipo: 'sucesso', titulo: 'Alterações salvas', descricao: `Os dados de ${atualizada.nomeFantasia} foram atualizados.` },
    };
    navigate(rotas.adminEmpresa(atualizada.id), { replace: true, state: estadoNavegacao });
  }

  return (
    <>
      <CabecalhoAdmin
        trilha={[
          { rotulo: 'Administração' },
          { rotulo: 'Empresas clientes', para: rotas.adminEmpresas },
          ...(empresa ? [{ rotulo: empresa.nomeFantasia, para: rotas.adminEmpresa(empresa.id) }] : []),
          { rotulo: 'Editar' },
        ]}
        titulo="Editar empresa"
      />
      <LinkVoltar
        para={empresa ? rotas.adminEmpresa(empresa.id) : rotas.adminEmpresas}
        texto={empresa ? `Voltar para ${empresa.nomeFantasia}` : 'Voltar para empresas'}
      />

      {empresa ? (
        <FormularioEmpresa
          key={empresa.id}
          valoresIniciais={dadosEditaveis(empresa)}
          rotuloEnviar="Salvar alterações"
          aoEnviar={(dados) => salvar(empresa.id, dados)}
          aoCancelar={() => navigate(rotas.adminEmpresa(empresa.id))}
        />
      ) : (
        <section className="mt-6 rounded-xl border border-gray-200 bg-white">
          {estado.status === 'erro' ? (
            <MensagemErro
              titulo="Não foi possível carregar a empresa"
              mensagem={estado.erro.message}
              aoTentarNovamente={recarregar}
            />
          ) : (
            <Carregando texto="Carregando dados da empresa..." />
          )}
        </section>
      )}
    </>
  );
}
