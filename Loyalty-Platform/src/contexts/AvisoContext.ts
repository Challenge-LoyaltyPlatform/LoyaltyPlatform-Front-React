// src/contexts/AvisoContext.ts
import { createContext, useContext } from 'react';

export type TipoAviso = 'sucesso' | 'erro' | 'info';

export interface Aviso {
  id: number;
  tipo: TipoAviso;
  titulo: string;
  descricao?: string;
}

// Quem dispara o aviso não escolhe o id: o provider gera
export type NovoAviso = Omit<Aviso, 'id'>;

export interface AvisoContextValue {
  avisar: (aviso: NovoAviso) => void;
}

export const AvisoContext = createContext<AvisoContextValue | null>(null);

export function useAviso(): AvisoContextValue {
  const contexto = useContext(AvisoContext);
  if (!contexto) {
    throw new Error('useAviso precisa ser usado dentro de <AvisoProvider>');
  }
  return contexto;
}
