// src/utils/cnpj.ts
// Desde julho de 2026 a Receita emite CNPJ alfanumérico (IN RFB 2.229/2024):
// as 12 primeiras posições aceitam 0-9 e A-Z, e os 2 dígitos verificadores seguem numéricos.
// Os CNPJs só numéricos continuam válidos e passam pela mesma conta.

const TAMANHO = 14;
const FORMATO = /^[0-9A-Z]{12}[0-9]{2}$/;

// Mantém só letras e números, em maiúsculas, até 14 caracteres
export function normalizarCnpj(valor: string): string {
  return valor
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '')
    .slice(0, TAMANHO);
}

// "11222333000181" -> "11.222.333/0001-81" (formata também enquanto a pessoa digita)
export function formatarCnpj(valor: string): string {
  const cnpj = normalizarCnpj(valor);
  const partes = [cnpj.slice(0, 2), cnpj.slice(2, 5), cnpj.slice(5, 8), cnpj.slice(8, 12), cnpj.slice(12)];
  const separadores = ['', '.', '.', '/', '-'];

  return partes.reduce(
    (formatado, parte, indice) => (parte ? formatado + separadores[indice] + parte : formatado),
    '',
  );
}

// Cada caractere vale o código ASCII menos 48: '0'..'9' valem 0..9 e 'A'..'Z' valem 17..42
function calcularDigito(base: string): number {
  let peso = 2;
  let soma = 0;

  // Pesos de 2 a 9, da direita para a esquerda, voltando a 2 depois do 9
  for (let i = base.length - 1; i >= 0; i--) {
    soma += (base.charCodeAt(i) - 48) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function cnpjValido(valor: string): boolean {
  const cnpj = normalizarCnpj(valor);

  if (!FORMATO.test(cnpj)) return false;
  // 00.000.000/0000-00, 11.111.111/1111-11... passam na conta, mas não existem
  if (/^(.)\1+$/.test(cnpj)) return false;

  const primeiro = calcularDigito(cnpj.slice(0, 12));
  const segundo = calcularDigito(cnpj.slice(0, 12) + primeiro);

  return cnpj.endsWith(`${primeiro}${segundo}`);
}
