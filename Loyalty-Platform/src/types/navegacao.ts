// src/types/navegacao.ts
import type { NovoAviso } from '@/contexts/AvisoContext';

// State que uma tela pode mandar junto com o redirecionamento:
// navigate(rota, { state: { aviso: { tipo: 'sucesso', titulo: '...' } } })
export interface EstadoComAviso {
  aviso?: NovoAviso;
}

// O Login lê `de` para devolver a pessoa à tela que ela tentou abrir
export type EstadoRedirecionamentoLogin = EstadoComAviso & {
  de?: string;
};
