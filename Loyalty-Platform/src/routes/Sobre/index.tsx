// src/routes/Sobre/index.tsx
import img1 from '@/img/Img1.png';
import img2 from '@/img/img2.png';

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#08081A]">
      <section
        aria-labelledby="titulo-sobre"
        className="max-w-6xl mx-auto px-6 py-16 grid items-center gap-10 md:grid-cols-2"
      >
        <div className="text-center md:text-left">
          <h1
            id="titulo-sobre"
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            O que é a{' '}
            <span className="block bg-gradient-to-r from-[#FF7A3D] via-[#FC3E8E] to-[#FC3E8E] bg-clip-text text-transparent">
              Loyalty Platform?
            </span>
          </h1>

          <p className="mt-6 text-gray-300 leading-relaxed md:max-w-md">
            Uma plataforma B2B de gamificação e engajamento criada para ajudar
            empresas a reterem seus usuários de forma ativa e contínua.
          </p>
        </div>

        <img
          src={img1}
          alt="Painel da Loyalty Platform exibindo missões, ranking e nível do usuário"
          className="w-full max-w-none lg:max mx-auto"
        />
      </section>

      <section
        aria-labelledby="titulo-problema"
        className="max-w-6xl mx-auto px-6 py-16 grid items-center gap-10 md:grid-cols-2"
      >
        <div className="text-center md:text-left">
          <p className="inline-block rounded-full border border-[#FC3E8E] px-6 py-2 text-[#FC3E8E]">
            O problema
          </p>

          <h2
            id="titulo-problema"
            className="mt-8 text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Porque reter usuários é{' '}
            <span className="text-[#FC3E8E]">tão dificil?</span>
          </h2>

          <p className="mt-6 text-gray-300 leading-relaxed md:max-w-md">
            As empresas investem cada vez mais em captação, mas ignoram a
            retenção, e os números mostram o preço disso.
          </p>
        </div>

        <figure className="m-0">
          <img
            src={img2}
            alt="Gráfico da porcentagem de retenção de usuários"
            className="w-full"
          />
          <figcaption className="mt-4 text-right text-white">
            *dados reais Soulup*
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
