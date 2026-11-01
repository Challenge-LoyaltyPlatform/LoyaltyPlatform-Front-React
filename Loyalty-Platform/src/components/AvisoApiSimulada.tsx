// src/components/AvisoApiSimulada.tsx
// Selo fixo na tela enquanto a API simulada está ligada, para ninguém confundir
// dados de exemplo com dados reais (nem em print, nem no vídeo)
import { LOGIN_SIMULADO } from '@/services/apiSimulada';

export default function AvisoApiSimulada() {
  return (
    <p
      role="note"
      className="pointer-events-none fixed bottom-4 left-4 z-[55] max-w-[calc(100%-2rem)] rounded-full border border-amber-300 bg-amber-100 px-3 py-1.5 text-[11px] font-semibold text-amber-900 shadow-sm font-['Sora']"
    >
      API simulada · login {LOGIN_SIMULADO.email} / {LOGIN_SIMULADO.senha}
    </p>
  );
}
