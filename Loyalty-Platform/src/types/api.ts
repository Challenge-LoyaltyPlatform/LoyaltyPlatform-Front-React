// src/types/api.ts

// Corpo que a API Java devolve em qualquer resposta de erro (4xx e 5xx)
export interface ErroApiResposta {
  status: number;
  mensagem: string;
  // Erros de validação por campo, ex.: { cnpj: 'Este CNPJ já está cadastrado.' }
  campos?: Record<string, string>;
}
