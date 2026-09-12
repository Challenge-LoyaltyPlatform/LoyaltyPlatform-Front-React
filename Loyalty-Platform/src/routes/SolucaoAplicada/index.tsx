// src/routes/SolucaoAplicada/index.tsx
import { useState, type FormEvent } from "react";
import soulpinho1 from "@/img/soulpinho1.svg";
import soulpinho2 from "@/img/soulpinho2.png";
import soulpinho3 from "@/img/soulpinho3.png";

type Usuario = {
  id: number;
  nome: string;
  email: string;
  xp: number;
};

// nessa simulação só cabem 3 usuários no pódio
const LIMITE = 3;

// uma cor para cada posição do pódio
const CORES = ["#FF6B4A", "#5F37F5", "#FC3E8E"];

// altura em pixels da maior coluna, e o mínimo para o nome continuar legível
const ALTURA_MAX = 240;
const ALTURA_MIN = 60;

// o humor do mascote muda conforme os dias de engajamento na plataforma
function mascotePara(dias: number) {
  if (dias <= 3) {
    return {
      imagem: soulpinho3,
      alt: "SoulUpinho sem energia",
      texto: "Engajamento baixo! O SoulUpinho perdeu a energia.",
    };
  }

  if (dias <= 10) {
    return {
      imagem: soulpinho2,
      alt: "SoulUpinho cabisbaixo",
      texto: "Quase lá! Continue interagindo para o SoulUpinho reagir.",
    };
  }

  return {
    imagem: soulpinho1,
    alt: "SoulUpinho feliz",
    texto: "Engajamento em dia! O SoulUpinho está cheio de vida.",
  };
}

export default function SolucaoAplicada() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cadastrado, setCadastrado] = useState(false);

  // seção do mascote: os campos são controlados para ele mudar enquanto digita
  const [nomeMascote, setNomeMascote] = useState("");
  const [diasEngajamento, setDiasEngajamento] = useState("");

  // só mostra o mascote depois que um número for digitado
  const mascote =
    diasEngajamento.trim() === "" ? null : mascotePara(Number(diasEngajamento));

  const listaCheia = usuarios.length >= LIMITE;

  // o maior XP vira a régua: ele é a coluna de 100% e as outras ficam proporcionais
  const maiorXp = Math.max(...usuarios.map((u) => u.xp), 1);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (listaCheia) return;

    const form = e.currentTarget;
    const dados = new FormData(form);

    setUsuarios((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: String(dados.get("nome")),
        email: String(dados.get("email")),
        xp: Number(dados.get("xp")),
      },
    ]);

    setCadastrado(true);
    setTimeout(() => setCadastrado(false), 4000);

    form.reset();
  }

  return (
    <main className="min-h-screen bg-[#08081A] text-[#E9EAF1] font-['Sora'] px-6 py-10 md:px-16">
      {/* TÍTULO */}
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          Solução aplicada com metodologia{" "}
          <span className="bg-gradient-to-r from-[#FF7A3D] to-[#FC3E8E] bg-clip-text text-transparent">
            Loyalty Platform?
          </span>
        </h1>
      </section>

      <div className="mt-12 max-w-6xl mx-auto grid items-center gap-12 md:grid-cols-2">
        {/* CADASTRO */}
        <div>
          <span className="inline-block border border-[#FC3E8E] text-[#FC3E8E] text-sm font-medium px-5 py-2 rounded-full">
            Cadastre um usuário
          </span>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nome"
                className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
              >
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                disabled={listaCheia}
                placeholder="Seu nome"
                className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5] disabled:opacity-40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={listaCheia}
                placeholder="seu@email.com"
                className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5] disabled:opacity-40"
              />
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="xp"
                  className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
                >
                  XP de missões
                </label>
                <input
                  id="xp"
                  name="xp"
                  type="number"
                  min={0}
                  required
                  disabled={listaCheia}
                  placeholder="ex:1500"
                  className="w-36 bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5] disabled:opacity-40"
                />
              </div>

              <button
                type="submit"
                disabled={listaCheia}
                className="bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-sm font-bold px-8 py-3 rounded-full disabled:opacity-40 disabled:hover:bg-[#6C4DFC] disabled:cursor-not-allowed"
              >
                Cadastrar usuário
              </button>
            </div>

            {/* CONFIRMAÇÃO DE CADASTRO */}
            <div
              className={`flex items-center gap-2 text-[#4ADE80] text-sm font-medium transition-all duration-500 ${
                cadastrado
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Usuário cadastrado com sucesso!
            </div>

            {listaCheia && (
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#C5C6D6]">
                <span>Limite de {LIMITE} usuários atingido.</span>
                <button
                  type="button"
                  onClick={() => setUsuarios([])}
                  className="underline underline-offset-4 text-[#FC3E8E] hover:text-white transition-colors"
                >
                  Limpar pódio
                </button>
              </div>
            )}
          </form>
        </div>

        {/* PÓDIO */}
        <section aria-label="Pódio dos usuários cadastrados">
          {usuarios.length === 0 ? (
            <p className="h-80 flex items-center justify-center text-center text-[#C5C6D6] text-sm">
              Cadastre um usuário para ele aparecer no pódio.
            </p>
          ) : (
            <ul className="h-80 flex items-end justify-center gap-6 list-none p-0 m-0">
              {usuarios.map((usuario, indice) => (
                <li
                  key={usuario.id}
                  className="flex-1 max-w-[140px] flex flex-col items-center justify-end"
                >
                  {/* ícone de pessoa em cima da coluna */}
                  <svg
                    viewBox="0 0 64 56"
                    className="w-14 h-12 text-white"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="32" cy="16" r="15" />
                    <path d="M32 34c-12 0-21 8-21 18h42c0-10-9-18-21-18z" />
                  </svg>

                  <div
                    className="w-full rounded-t-md flex flex-col items-center pt-3 px-2"
                    style={{
                      height: `${Math.max(
                        (usuario.xp / maiorXp) * ALTURA_MAX,
                        ALTURA_MIN
                      )}px`,
                      backgroundColor: CORES[indice % CORES.length],
                    }}
                  >
                    <span className="text-white text-sm font-bold text-center break-words">
                      {usuario.nome}
                    </span>
                  </div>

                  <span className="mt-2 text-xs text-[#C5C6D6]">
                    {usuario.xp} XP
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ENGAJAMENTO NA PLATAFORMA */}
      <div className="mt-20 max-w-6xl mx-auto grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="inline-block border border-[#FC3E8E] text-[#FC3E8E] text-sm font-medium px-5 py-2 rounded-full">
            Engajamento na plataforma
          </span>

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nomeMascote"
                className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
              >
                Seu nome
              </label>
              <input
                id="nomeMascote"
                type="text"
                value={nomeMascote}
                onChange={(e) => setNomeMascote(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="diasEngajamento"
                className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
              >
                Dias de engajamento na plataforma
              </label>
              <input
                id="diasEngajamento"
                type="number"
                min={0}
                max={365}
                value={diasEngajamento}
                onChange={(e) => setDiasEngajamento(e.target.value)}
                placeholder="ex:12"
                className="w-36 bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5]"
              />
            </div>
          </div>
        </div>

        {/* MASCOTE DA AMIZADE */}
        <div className="text-center">
          {mascote === null ? (
            <p className="h-80 flex items-center justify-center text-[#C5C6D6] text-sm">
              Digite os dias de engajamento para ver como está o SoulUpinho.
            </p>
          ) : (
            <div className="mx-auto w-full max-w-xs">
              {nomeMascote.trim() !== "" && (
                <p className="font-bold text-[#8B5CF6]">{nomeMascote}</p>
              )}

              <img
                src={mascote.imagem}
                alt={mascote.alt}
                className="mx-auto w-full"
              />

              <p className="mt-4 text-sm text-[#C5C6D6]">{mascote.texto}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
