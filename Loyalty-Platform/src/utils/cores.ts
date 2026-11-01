// src/utils/cores.ts

export const COR_HEX = /^#[0-9A-F]{6}$/i;

// Luminância relativa da WCAG 2.x para uma cor "#RRGGBB"
function luminancia(hex: string): number {
  const canais = [1, 3, 5].map((inicio) => {
    const canal = parseInt(hex.slice(inicio, inicio + 2), 16) / 255;
    return canal <= 0.03928 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * canais[0] + 0.7152 * canais[1] + 0.0722 * canais[2];
}

// Contraste entre a cor e o texto branco usado nos botões (1 = nenhum, 21 = máximo)
export function contrasteComBranco(hex: string): number {
  return 1.05 / (luminancia(hex) + 0.05);
}

// A WCAG pede 4,5:1 para texto de tamanho normal, como o dos botões
export const CONTRASTE_MINIMO = 4.5;
