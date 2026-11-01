// src/hooks/useAvisoDaRota.ts
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAviso } from '@/contexts/AvisoContext';
import type { EstadoComAviso } from '@/types/navegacao';

/**
 * Mostra o aviso que veio no state da navegação e o remove do histórico,
 * para ele não reaparecer ao recarregar a página ou voltar no navegador.
 * Usado nos layouts (App, AdminLayout) e no Login.
 */
export function useAvisoDaRota(): void {
  const location = useLocation();
  const navigate = useNavigate();
  const { avisar } = useAviso();
  // Em desenvolvimento o StrictMode roda o efeito duas vezes; isso evita aviso duplicado
  const ultimaEntradaTratada = useRef<string | null>(null);

  useEffect(() => {
    const estado = location.state as EstadoComAviso | null;
    if (!estado?.aviso || ultimaEntradaTratada.current === location.key) return;

    ultimaEntradaTratada.current = location.key;
    avisar(estado.aviso);

    // Preserva o resto do state (ex.: a rota de origem que o Login usa)
    navigate(`${location.pathname}${location.search}`, {
      replace: true,
      state: { ...estado, aviso: undefined },
    });
  }, [location, navigate, avisar]);
}
