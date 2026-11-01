<div align="center">


# Loyalty Platform

**Gamificação e engajamento B2B, transformando interação digital em recompensas reais.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-acadêmico-lightgrey)](#-licença)

[Sobre](#-sobre-o-projeto) •
[Tecnologias](#-tecnologias-utilizadas) •
[Estrutura](#-estrutura-de-pastas) •
[Como executar](#%EF%B8%8F-como-executar-localmente) •
[Autenticação](#-autenticação) •
[Identidade visual](#%EF%B8%8F-identidade-visual) •
[Autores](#-autores-e-créditos)

</div>

---

## 📖 Sobre o projeto

**Loyalty Platform** é uma plataforma B2B de gamificação e engajamento que ajuda empresas a reter seus usuários de forma ativa e contínua. Por meio de **missões**, **rankings**, **streaks** e um mascote virtual — o **SoulUpinho** —, o projeto transforma o engajamento digital em recompensas reais, dando às empresas parceiras uma forma visual e intuitiva de acompanhar o nível de participação de seus usuários.

Este repositório contém o **front-end** da aplicação, desenvolvido em React + TypeScript.

> Projeto acadêmico desenvolvido para o **FIAP Challenge 2026**.

🔗 **Repositório:** [Challenge-LoyaltyPlatform/LoyaltyPlatform-Front-React](https://github.com/Challenge-LoyaltyPlatform/LoyaltyPlatform-Front-React)

### ✨ Funcionalidades principais

- 🏆 **Rankings** — classificação dos usuários mais engajados
- 🔥 **Streaks** — acompanhamento de sequências de acesso/uso
- 🐾 **SoulUpinho** — mascote que muda de humor conforme o nível de engajamento do usuário
- 🔐 **Login da empresa cliente** — acesso ao painel integrado à API Java, com sessão mantida no navegador
- 📄 **Páginas institucionais** — Home, Sobre, Solução, Integrantes, Dúvidas e Contato

---

## 🚀 Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| [React](https://react.dev/) | Biblioteca para construção da interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Vite](https://vitejs.dev/) | Build tool e servidor de desenvolvimento |
| [React Router](https://reactrouter.com/) | Roteamento entre páginas |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização utilitária |
| [React Hook Form](https://react-hook-form.com/) | Formulários e validação |
| [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) | Requisições HTTP nativas para a API Java |
| [Fontsource Sora](https://fontsource.org/fonts/sora) | Fonte tipográfica do projeto |
| [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Linter do código |

---

## 📁 Estrutura de pastas

```
Loyalty-Platform/
├── src/
│   ├── components/   # Componentes globais (Cabeçalho, Rodapé, AvatarUsuario)
│   ├── contexts/     # Contexto de autenticação (AuthContext, AuthProvider, useAuth)
│   ├── img/          # Imagens, ícones e logos do projeto
│   ├── routes/       # Páginas da aplicação (Home, Sobre, Solução, Integrantes, Dúvidas, Contato, Login, Error)
│   ├── services/     # Comunicação com a API Java (api.ts, authService.ts)
│   ├── types/        # Tipos e interfaces compartilhados (auth.ts)
│   ├── App.tsx       # Layout raiz da aplicação
│   ├── main.tsx      # Ponto de entrada e configuração das rotas
│   ├── index.css     # Estilos globais e configuração do Tailwind
│   └── vite-env.d.ts # Tipagem das variáveis de ambiente
├── index.html
├── .env.example      # Modelo das variáveis de ambiente (URL da API)
├── .oxlintrc.json    # Configuração do linter
└── .gitignore
```

---

## ▶️ Como executar localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# Clone o repositório
git clone https://github.com/Challenge-LoyaltyPlatform/LoyaltyPlatform-Front-React.git
cd LoyaltyPlatform-Front-React/Loyalty-Platform

# Instale as dependências
npm install

# Configure a URL da API Java (opcional, o padrão é http://localhost:8080)
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

> As páginas institucionais funcionam sem o back-end. Para entrar pela página **/login**, a API Java precisa estar rodando — veja [Autenticação](#-autenticação).

### Outros comandos úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o linter (oxlint) sobre o código |

---

## 🔐 Autenticação

O painel da empresa cliente é acessado pela página **/login**, disponível no botão **Entrar** do cabeçalho. O login é feito pela API REST desenvolvida em Java (disciplina de Domain Driven Design), consumida com `fetch` nativo.

**Fluxo:**

1. O formulário, feito com React Hook Form, valida o e-mail e a senha.
2. `authService.login()` envia `POST /auth/login` para a API.
3. Se o login der certo, a sessão é salva no `localStorage` e compartilhada com toda a aplicação pelo `AuthContext` (hook `useAuth()`).
4. O cabeçalho passa a exibir o usuário logado e a opção **Sair**.

### URL da API

A URL base é lida da variável de ambiente `VITE_API_URL` (padrão: `http://localhost:8080`). Localmente, defina-a no arquivo `.env.local` (criado a partir do `.env.example`). Na Vercel, cadastre `VITE_API_URL` em **Settings → Environment Variables** com a URL da API publicada.

### Contrato esperado do back-end

`POST /auth/login`

```json
{ "email": "nome@empresa.com.br", "senha": "********" }
```

| Status | Quando | Corpo da resposta |
|---|---|---|
| `200 OK` | Credenciais válidas | `{ "token": "...", "usuario": { "id": 1, "nome": "...", "email": "...", "perfil": "EMPRESA", "empresa": "..." } }` |
| `401 Unauthorized` | E-mail ou senha incorretos | — |

- `perfil` aceita `EMPRESA` ou `ADMIN`; `empresa` é opcional.
- Em outros erros, se o corpo tiver o campo `mensagem` (ou `message`), o texto é exibido para o usuário.
- A API precisa liberar **CORS** para a origem do front-end (`http://localhost:5173` e o domínio da Vercel).

---

## 🖼️ Identidade visual

O sistema conta com identidade visual própria, incluindo o mascote **SoulUpinho**, cujas expressões variam conforme o engajamento do usuário:

| Imagem | Descrição |
|---|---|
| <img src="Loyalty-Platform/src/img/soulpinho1.svg" width="90" /> | SoulUpinho — engajamento em dia |
| <img src="Loyalty-Platform/src/img/soulpinho2.png" width="90" /> | SoulUpinho — engajamento em queda |
| <img src="Loyalty-Platform/src/img/soulpinho3.png" width="90" /> | SoulUpinho — engajamento baixo |

Ícones de redes sociais (<img src="Loyalty-Platform/src/img/github-icon.svg" width="16" /> GitHub e LinkedIn) são utilizados nos cards de contato dos integrantes, e um favicon próprio identifica a aba do navegador.

---

## 👥 Autores e créditos

| Nome | RM | Turma | LinkedIn | GitHub |
|---|---|---|---|---|
| Andrei Oliveira de Sousa | 573373 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/andrei-sousa-55662825a/) | [GitHub](https://github.com/andreisou-dev) |
| Felipe Coelho da Fonseca | 572133 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/felipe-coelho-80b78a394/) | [GitHub](https://github.com/devfcoelho) |
| Henrique Soares Pereira | 569898 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/henrique-soares-pereira/) | [GitHub](https://github.com/Henriquesope) |
| Luiz Felipe Lourenço da Silva | 572576 | 1TDSPW | [LinkedIn](https://www.linkedin.com/in/lfelipelourenco/) | [GitHub](https://github.com/devlipee) |

---

## 📄 Licença

Projeto acadêmico desenvolvido para fins de estudo no **FIAP Challenge 2026**. Uso restrito a fins educacionais.
