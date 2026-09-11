// src/routes/Sobre/index.tsx
import img1 from '@/img/Img1.png';
import img2 from '@/img/img2.png';
import img3 from '@/img/img3.png';
import img4 from '@/img/img4.svg';

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

      <section
        aria-labelledby="titulo-solucao"
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <p className="inline-block rounded-full border border-[#5B2EFF] px-6 py-2 text-[#5B2EFF]">
          Solução
        </p>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <h2
            id="titulo-solucao"
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Como a{' '}
            <span className="block bg-gradient-to-r from-[#FF7A3D] via-[#FC3E8E] to-[#FC3E8E] bg-clip-text text-transparent">
              Loyalty Platform
            </span>
            resolve isso?
          </h2>

          <p className="text-lg text-gray-300 text-xl leading-relaxed md:max-w-xl">
            Por meio de um ambiente próprio, intuitivo e personalizável, as
            empresas criam experiências interativas voltadas ao seu público, sem
            precisar desenvolver essa estrutura do zero.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="titulo-ranking"
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <p className="inline-block rounded-full border border-[#5B2EFF] px-6 py-2 text-[#5B2EFF]">
          Ranking
        </p>

        <h2
          id="titulo-ranking"
          className="mt-10 text-base md:text-5xl font-bold text-white leading-tight">
          Competição real,{' '}
          <span className="text-[#FC3E8E]">recompensa real</span>
        </h2>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <p className="text-lg text-gray-300 leading-relaxed">
            Quanto mais você se <span className="text-[#FC3E8E]">engaja</span> na
            plataforma, maior é a sua posição no ranking. Cada interação conta,
            seja ela consumir conteúdo, participar de comunidades, completar
            missões e realizar ações sustentáveis, tudo contribui para a sua
            pontuação. O sistema é contínuo e atualizado em tempo real,
            garantindo que o usuário mais ativo sempre esteja no topo. E quem
            chega lá, é recompensado de verdade!
          </p>

          <img
            src={img3}
            alt="Card de ranking "
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section
        aria-labelledby="titulo-streak"
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <p className="inline-block rounded-full border border-[#5B2EFF] px-6 py-2 text-[#5B2EFF]">
          Streak | PET
        </p>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2
              id="titulo-streak"
              className="text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              Compartilhe!
            </h2>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Dentro da plataforma, você pode compartilhar posts diretamente
              pelo chat com outros usuários. Cada compartilhamento conta como
              engajamento diário para a streak não acabar.
            </p>
          </div>

          <img
            src={img4}
            alt="Card de streak mostrando uma sequência de 12 dias e a melhor sequência de 24 dias."
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>
    </main>
  );
}
