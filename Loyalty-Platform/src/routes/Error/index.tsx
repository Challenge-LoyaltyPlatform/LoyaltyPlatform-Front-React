// src/routes/Error/index.tsx
// errorElement das rotas: diferencia "página não existe" (404) de erro inesperado na tela.
// O componente não se chama Error para não esconder o construtor global Error do JavaScript.
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { useEffect } from 'react';

export default function PaginaErro() {
  const erro = useRouteError();
  const naoEncontrada = isRouteErrorResponse(erro) && erro.status === 404;

  useEffect(() => {
    document.title = `${naoEncontrada ? 'Página não encontrada' : 'Algo deu errado'} | Loyalty Platform`;
    if (!naoEncontrada) console.error(erro);
  }, [erro, naoEncontrada]);

  return (
    <main className="min-h-screen bg-[#08081A] text-[#E9EAF1] font-['Sora'] flex items-center justify-center px-6 py-10 md:px-16">
      <section className="max-w-2xl mx-auto text-center">
        <span className="inline-block border border-[#FC3E8E] text-[#FC3E8E] text-sm font-medium px-5 py-2 rounded-full">
          {naoEncontrada ? 'Erro 404' : 'Erro inesperado'}
        </span>

        <h1 className="mt-8 text-4xl md:text-6xl font-bold leading-tight">
          {naoEncontrada ? 'Página' : 'Algo deu'}{" "}
          <span className="bg-gradient-to-r from-[#FF7A3D] via-[#FC3E8E] to-[#FC3E8E] bg-clip-text text-transparent">
            {naoEncontrada ? 'não encontrada' : 'errado'}
          </span>
        </h1>

        <p className="mt-6 text-gray-300 leading-relaxed">
          {naoEncontrada
            ? 'O caminho que você tentou acessar não existe ou foi movido. Vamos te ajudar a voltar para o lugar certo.'
            : 'Esta tela encontrou um problema e não pôde ser exibida. Tente recarregar a página ou volte para a Home.'}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          {!naoEncontrada && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-block border border-white/20 hover:border-white/50 transition text-white text-sm font-bold px-8 py-3 rounded-full"
            >
              Recarregar a página
            </button>
          )}
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
