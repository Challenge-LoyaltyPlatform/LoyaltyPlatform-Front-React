// src/utils/cnpj.ts
// Desde julho de 2026 a Receita emite CNPJ alfanumérico (IN RFB 2.229/2024):
// as 12 primeiras posições aceitam 0-9 e A-Z, e as 2 últimas seguem numéricas.
// Decisão do grupo: conferir só o formato, sem calcular o dígito verificador,
// igual à validação da API Java (EmpresaRequest) e à constraint do banco.

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

// Só confere o formato: 12 letras ou números + 2 dígitos (aceita o CNPJ alfanumérico)
export function cnpjValido(valor: string): boolean {
  return FORMATO.test(normalizarCnpj(valor));
}
