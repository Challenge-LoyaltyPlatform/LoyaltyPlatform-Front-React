// src/hooks/useEmpresaDaRota.ts
// Lê o :id da URL e busca a empresa. Usado pelo detalhe e pela edição.
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { useRequisicao } from './useRequisicao';
import { ApiError } from '@/services/api';
import { buscarEmpresa } from '@/services/empresaService';
import type { EstadoComAviso } from '@/types/navegacao';
import { lerIdDaRota } from '@/utils/rotas';

export function useEmpresaDaRota() {
  const { id } = useParams();
  const idEmpresa = lerIdDaRota(id);

  // "/admin/empresas/abc" nem chega a chamar a API: cai direto no mesmo tratamento do 404
  const buscar = useCallback(
    (sinal: AbortSignal) =>
      idEmpresa === null
        ? Promise.reject(new ApiError(404, 'Empresa não encontrada.'))
        : buscarEmpresa(idEmpresa, sinal),
    [idEmpresa],
  );

  const requisicao = useRequisicao(buscar);

  const naoEncontrada = requisicao.estado.status === 'erro' && requisicao.estado.erro.status === 404;

  // State para o <Navigate> que devolve a pessoa à listagem com a explicação
  const estadoNaoEncontrada: EstadoComAviso = {
    aviso: {
      tipo: 'erro',
      titulo: 'Empresa não encontrada',
      descricao: `Não existe empresa com o código "${id ?? ''}". Ela pode ter sido digitada errado na URL.`,
    },
  };

  return { ...requisicao, idEmpresa, naoEncontrada, estadoNaoEncontrada };
}
