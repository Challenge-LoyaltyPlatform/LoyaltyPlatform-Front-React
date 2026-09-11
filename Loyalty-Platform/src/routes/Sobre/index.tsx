// src/routes/Sobre/index.tsx
import img1 from '@/img/Img1.png';

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
    </main>
  );
}
