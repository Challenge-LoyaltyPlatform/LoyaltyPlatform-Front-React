// src/routes/Contato/index.tsx
export default function Contato() {
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
      <form className="mt-6 max-w-xl mx-auto px-4 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nome"
            className="text-xs font-semibold tracking-wide text-[#C5C6D6] uppercase"
          >
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
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
            type="email"
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
            placeholder="Escreva sua mensagem aqui..."
            rows={6}
            className="w-full bg-[#E5E5E5] text-black placeholder-gray-500 rounded-2xl px-5 py-4 text-sm outline-none resize-none focus:ring-2 focus:ring-[#5F37F5]"
          />
        </div>

        {/* BOTÃO */}
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="inline-block bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-base font-bold px-10 py-4 rounded-full"
          >
            Enviar mensagem!
          </button>
        </div>
      </form>
    </main>
  );
}