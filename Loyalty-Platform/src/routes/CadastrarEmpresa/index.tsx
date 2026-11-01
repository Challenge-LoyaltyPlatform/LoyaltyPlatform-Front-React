// src/routes/CadastrarEmpresa/index.tsx
// Caso de uso "Cadastrar empresa" (POST /empresas)
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';
import FormularioEmpresa from '@/components/empresa/FormularioEmpresa';
import LinkVoltar from '@/components/LinkVoltar';
import { cadastrarEmpresa } from '@/services/empresaService';
import type { EmpresaRequest } from '@/types/empresa';
import type { EstadoComAviso } from '@/types/navegacao';
import { rotas } from '@/utils/rotas';

export default function CadastrarEmpresa() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cadastrar empresa | Loyalty Platform';
  }, []);

  // Erros da API (ex.: CNPJ já cadastrado) sobem para o formulário, que marca o campo
  async function cadastrar(dados: EmpresaRequest) {
    const criada = await cadastrarEmpresa(dados);

    const estado: EstadoComAviso = {
      aviso: {
        tipo: 'sucesso',
        titulo: 'Empresa cadastrada',
        descricao: `${criada.nomeFantasia} foi adicionada às empresas clientes.`,
      },
    };
    // replace: voltar no navegador não reabre o formulário já enviado
    navigate(rotas.adminEmpresa(criada.id), { replace: true, state: estado });
  }

  return (
    <>
      <CabecalhoAdmin
        trilha={[
          { rotulo: 'Administração' },
          { rotulo: 'Empresas clientes', para: rotas.adminEmpresas },
          { rotulo: 'Nova empresa' },
        ]}
        titulo="Cadastrar empresa"
      />
      <LinkVoltar para={rotas.adminEmpresas} texto="Voltar para empresas" />

      <FormularioEmpresa
        rotuloEnviar="Cadastrar empresa"
        aoEnviar={cadastrar}
        aoCancelar={() => navigate(rotas.adminEmpresas)}
      />
    </>
  );
}
