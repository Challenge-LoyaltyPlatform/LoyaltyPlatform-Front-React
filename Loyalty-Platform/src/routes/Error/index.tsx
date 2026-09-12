// src/routes/Error/index.tsx
import { Link } from 'react-router';
import { useEffect } from 'react';

export default function Error() {
  useEffect(() => {
    document.title = 'Página não encontrada | Loyalty Platform';
  }, []);

  return (
    <main className="min-h-screen bg-[#08081A] text-[#E9EAF1] font-['Sora'] flex items-center justify-center px-6 py-10 md:px-16">
      <section className="max-w-2xl mx-auto text-center">
        <span className="inline-block border border-[#FC3E8E] text-[#FC3E8E] text-sm font-medium px-5 py-2 rounded-full">
          Erro 404
        </span>

        <h1 className="mt-8 text-4xl md:text-6xl font-bold leading-tight">
          Página{" "}
          <span className="bg-gradient-to-r from-[#FF7A3D] via-[#FC3E8E] to-[#FC3E8E] bg-clip-text text-transparent">
            não encontrada
          </span>
        </h1>

        <p className="mt-6 text-gray-300 leading-relaxed">
          O caminho que você tentou acessar não existe ou foi movido.
          Vamos te ajudar a voltar para o lugar certo.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="inline-block bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-sm font-bold px-8 py-3 rounded-full"
          >
            Voltar para a Home
          </Link>
        </div>
      </section>
    </main>
  );
}