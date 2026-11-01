// src/utils/formatadores.ts

export function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, '');
}

// "11912345678" -> "(11) 91234-5678" | "1133334444" -> "(11) 3333-4444"
export function formatarTelefone(valor: string): string {
  const digitos = somenteDigitos(valor).slice(0, 11);
  if (digitos.length <= 2) return digitos.length ? `(${digitos}` : '';

  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);
  const corte = numero.length > 8 ? 5 : 4;

  return numero.length > corte
    ? `(${ddd}) ${numero.slice(0, corte)}-${numero.slice(corte)}`
    : `(${ddd}) ${numero}`;
}

// A API manda datas como "2026-08-14". Não usa new Date() porque ele interpreta
// a data em UTC e, no fuso de Brasília, "volta" um dia (14/08 vira 13/08).
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.slice(0, 10).split('-');
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : iso;
}

// "2026-08-14" -> "08/2026"
export function formatarMesAno(iso: string): string {
  const [ano, mes] = iso.slice(0, 7).split('-');
  return ano && mes ? `${mes}/${ano}` : iso;
}

export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR');
}

// pluralizar(1, 'campanha ativa', 'campanhas ativas') -> "1 campanha ativa"
export function pluralizar(quantidade: number, singular: string, plural: string): string {
  return `${formatarNumero(quantidade)} ${quantidade === 1 ? singular : plural}`;
}
