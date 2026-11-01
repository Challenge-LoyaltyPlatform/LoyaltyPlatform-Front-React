// src/components/formulario/estilos.ts

export function classesEntrada(temErro: boolean): string {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-[#12122A] placeholder-gray-400 outline-none transition focus:ring-2 ${
    temErro
      ? 'border-red-500 focus:ring-red-200'
      : 'border-gray-200 focus:border-[#5F37F5] focus:ring-[#5F37F5]/20'
  }`;
}

// Liga a entrada à mensagem que o <Campo> mostra embaixo dela
export function idDescricao(id: string, erro?: string, dica?: string): string | undefined {
  if (erro) return `${id}-erro`;
  if (dica) return `${id}-dica`;
  return undefined;
}
