// src/routes/Sobre/index.tsx
import { Link } from 'react-router';
import img1 from '@/img/Img1.png';
import img2 from '@/img/img2.png';
import img3 from '@/img/img3.png';
import img4 from '@/img/img4.svg';
import soulpinho from '@/img/soulpinho1.svg';
import soulpinho2 from '@/img/soulpinho2.png'
import soulpinho3 from '@/img/soulpinho3.png'
import barrinhaMetade from '@/img/barrinha na metade.png'
import barrinhaVazia from '@/img/barrinha vazia.png'

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

        <div className="mt-16 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Pet: Cuide do seu mascote, não deixe ele morrer.
            </h3>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Cada dia que você interage na plataforma, seu mascote fica{' '}
              <span className="text-[#FC3E8E]">mais feliz e cheio de vida</span>.
            </p>
          </div>

          <div className="mx-auto w-full max-w-xs text-center">
            <p className="font-bold text-[#8B5CF6]">SoulUpinho</p>

            <img
              src={soulpinho}
              alt="SoulUpinho"
              className="mx-auto w-full"
            />

            <div
              role="progressbar"
              aria-label="Engajamento do mascote"
              aria-valuenow={100}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 w-full rounded-full bg-[#8B5CF6]"
            />
            <p className="mt-3 text-sm text-white">Engajamento: 100%</p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ele sente sua falta!
            </h3>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Fique um dia sem interagir na plataforma e seu mascote começa a definhar. Ele perde energia,{' '}
              <span className="text-[#FC3E8E]">fica cabisbaixo e para de reagir. </span>.
              Quanto mais tempo você fica ausente, pior ele fica!
            </p>

          </div>
          <div className="mx-auto w-full max-w-xs text-center">
            <p className="font-bold text-[#8B5CF6]">SoulUpinho</p>

            <img
              src={soulpinho2}
              alt="SoulUpinho sem engajamento"
              className="mx-auto w-full"
            />

            <img src={barrinhaMetade} alt="" className="mt-4 w-full" />
            <p className="mt-3 text-sm text-white">Engajamento: 50%</p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Você o abandonou!
            </h3>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Quando o usuário fica ausente por tempo demais,{' '}
              <span className="text-[#FC3E8E]">o mascote morre.</span>
              A tela fica cinza, ele some e no lugar aparece apenas a lembrança do que ele era. Para trazê-lo de volta, você precisa resgatar o vínculo: três dias consecutivos de engajamento diário na plataforma.
            </p>

          </div>
          <div className="mx-auto w-full max-w-xs text-center">
            <p className="font-bold text-[#8B5CF6]">SoulUpinho</p>
            <img
              src={soulpinho3}
              alt="SoulUpinho sem engajamento"
              className="mx-auto w-full"
            />

            <img src={barrinhaVazia} alt="" className="mt-4 w-full" />
            <p className="mt-3 text-sm text-white">Engajamento: 0%</p>
          </div>


        </div>


      </section>

      <section
        aria-labelledby="titulo-cta"
        className="max-w-6xl mx-auto px-6 py-16 text-center"
      >
        <h2
          id="titulo-cta"
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Quer ver a plataforma em ação?
        </h2>

        <p className="mt-3 text-gray-300">
          Conheça a <span className="text-[#FC3E8E]">equipe</span> por trás da
          Loyalty Platform
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/integrantes"
            className="inline-block bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-base font-bold px-10 py-4 rounded-full"
          >
            Conheça a equipe!
          </Link>
        </div>
      </section>
    </main>
  );
}
