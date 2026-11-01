// src/components/empresa/opcoesIdentidade.ts
// Rótulos e estilos das opções de identidade visual. Record<União, ...> obriga a
// cobrir todas as opções: se o back-end ganhar uma tipografia nova, o build acusa aqui.
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import type { FormaBotoes, Tipografia } from '@/types/empresa';

export const TIPOGRAFIAS: Record<Tipografia, { rotulo: string; fonte: string }> = {
  SORA: { rotulo: 'Sora', fonte: "'Sora', sans-serif" },
  INTER: { rotulo: 'Inter', fonte: "'Inter', sans-serif" },
  POPPINS: { rotulo: 'Poppins', fonte: "'Poppins', sans-serif" },
};

export const FORMAS_BOTOES: Record<FormaBotoes, { rotulo: string; classe: string }> = {
  PILULA: { rotulo: 'Pílula', classe: 'rounded-full' },
  ARREDONDADO: { rotulo: 'Arredondado', classe: 'rounded-md' },
  RETO: { rotulo: 'Reto', classe: 'rounded-none' },
};
