// src/routes/Contato/index.tsx
import { useState, type FormEvent } from "react";
import { useEffect } from 'react';

export default function Contato() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

  
    setEnviado(true);

    // some com o aviso depois de alguns segundos
    setTimeout(() => setEnviado(false), 4000);

    e.currentTarget.reset();
  }

  useEffect(() => {
      document.title = 'Contato | Loyalty Platform';
    }, []);
  return (
    <main className="min-h-screen bg-[#08081A] text-[#E9EAF1] font-['Sora'] px-6 py-10 md:px-16">
      {/* TÍTULO */}
      <section className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          Tem alguma dúvida
          <br />
          sobre a{" "}
          <span className="bg-gradient-to-r from-[#5F37F5] to-[#FC3E8E] bg-clip-text text-transparent">
            Loyalty Platform?
          </span>
        </h1>
      </section>

      {/* BADGE */}
      <div className="mt-10 flex justify-center md:justify-start max-w-xl mx-auto px-4">
        <span className="inline-block border border-[#FC3E8E] text-[#FC3E8E] text-sm font-medium px-5 py-2 rounded-full">
          Fale com a gente!
        </span>
      </div>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-xl mx-auto px-4 flex flex-col gap-5"
      >
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
            placeholder="Seu nome"
            className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5]"
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
            placeholder="seu@email.com"
            className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5F37F5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="mensagem"
            className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
          >
            Mensagem
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            required
            placeholder="Escreva sua mensagem aqui..."
            rows={6}
            className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-2xl px-5 py-4 text-sm outline-none resize-none focus:ring-2 focus:ring-[#5F37F5]"
          />
        </div>

        {/* BOTÃO */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <button
            type="submit"
            className="inline-block bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-base font-bold px-10 py-4 rounded-full"
          >
            Enviar mensagem!
          </button>

          {/* CONFIRMAÇÃO DE ENVIO */}
          <div
            className={`flex items-center gap-2 text-[#4ADE80] text-sm font-medium transition-all duration-500 ${
              enviado
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
              className={enviado ? "animate-[check_0.4s_ease-out]" : ""}
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Mensagem enviada com sucesso!
          </div>
        </div>
      </form>
    </main>
  );
}