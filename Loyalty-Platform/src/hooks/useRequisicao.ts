// src/hooks/useRequisicao.ts
import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/services/api';

// Union discriminada: `dados` só existe quando deu certo, `erro` só quando falhou.
// O TypeScript não deixa ler estado.dados sem antes checar estado.status === 'sucesso'.
export type EstadoRequisicao<T> =
  | { status: 'carregando' }
  | { status: 'sucesso'; dados: T }
  | { status: 'erro'; erro: ApiError };

const CARREGANDO = { status: 'carregando' } as const;

// Resultado guardado junto com a busca que o gerou, para saber se ele ainda vale
interface Resultado<T> {
  buscar: (sinal: AbortSignal) => Promise<T>;
  tentativa: number;
  estado: EstadoRequisicao<T>;
}

/**
 * Busca dados da API ao montar o componente e sempre que `buscar` mudar.
 * `buscar` precisa ser estável (função de módulo ou useCallback), senão a busca
 * roda de novo a cada renderização.
 */
export function useRequisicao<T>(buscar: (sinal: AbortSignal) => Promise<T>) {
  const [resultado, setResultado] = useState<Resultado<T> | null>(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controle = new AbortController();

    buscar(controle.signal)
      .then((dados) => {
        if (!controle.signal.aborted) {
          setResultado({ buscar, tentativa, estado: { status: 'sucesso', dados } });
        }
      })
      .catch((erro: unknown) => {
        // Cancelada porque o componente saiu da tela ou o parâmetro mudou: ignora
        if (controle.signal.aborted) return;
        setResultado({
          buscar,
          tentativa,
          estado: {
            status: 'erro',
            erro: erro instanceof ApiError ? erro : new ApiError(0, 'Ocorreu um erro inesperado.'),
          },
        });
      });

    // Ao trocar de /empresas/1 para /empresas/2, a resposta atrasada da 1 é descartada
    return () => controle.abort();
  }, [buscar, tentativa]);

  // Enquanto não chega o resultado da busca atual, a tela está carregando.
  // Derivar aqui evita um setState extra dentro do efeito.
  const estado: EstadoRequisicao<T> =
    resultado && resultado.buscar === buscar && resultado.tentativa === tentativa
      ? resultado.estado
      : CARREGANDO;

  const recarregar = useCallback(() => setTentativa((atual) => atual + 1), []);

  // Atualiza a tela com o que a API devolveu num PUT/PATCH, sem buscar de novo
  const substituirDados = useCallback(
    (dados: T) => setResultado({ buscar, tentativa, estado: { status: 'sucesso', dados } }),
    [buscar, tentativa],
  );

  return { estado, recarregar, substituirDados };
}
