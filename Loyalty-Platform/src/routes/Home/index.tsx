import logoPrincipal from "../../img/LOGO PRINCIPAL.png";
 
 
export default function Home() {
  return (
    <main className="min-h-screen bg-[#08081A] text-[#E9EAF1] font-['Sora'] px-6 py-10 md:px-16">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-center gap-6 md:gap-16 border-b border-white/10 pb-10">
        <img src={logoPrincipal} alt="logo principal" className="h-16 md:h-20 w-auto" />
 
        <div className="text-right">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#E9EAF1]">
            Gamificação que engaja.
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-[#5F37F5] via-[#FC3E8E] to-[#FC952E] bg-clip-text text-transparent">
            Resultados que fidelizam.
          </h2>
        </div>
      </header>
 
      {/* QUEM SOMOS */}
      <section className="max-w-2xl mx-auto text-center mt-14">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Quem somos?</h1>
 
        <p className="text-sm md:text-base text-[#C5C6D6] leading-relaxed">
          A{" "}
          <span className="bg-gradient-to-r from-[#5F37F5] to-[#FC3E8E] bg-clip-text text-transparent font-semibold">
            Loyalty Platform
          </span>{" "}
          transforma o engajamento dos seus usuários em recompensas reais,
          por meio de gamificação personalizada, sem precisar construir essa
          estrutura do zero!
        </p>
      </section>
 
      {/* CARDS */}
      <section className="flex flex-wrap items-stretch justify-center gap-6 w-full py-10">
        <div className="group bg-[#14152B] text-white border-[0.5px] border-white rounded-[10px] w-[280px] min-h-[320px] p-8 box-border flex flex-col items-center gap-4 opacity-85 hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-white font-bold text-lg mb-3 pb-3 border-b-[0.5px] border-[#5F37F5] w-full text-center">
            Missão
          </h2>
          <p className="text-white font-bold text-lg mb-3 text-center">
            Oferecer gamificação personalizada que conecta o comportamento
            digital dos usuários a recompensas reais.
          </p>
        </div>

        <div className="group bg-[#14152B] text-white border-[0.5px] border-white rounded-[10px] w-[280px] min-h-[320px] p-8 box-border flex flex-col items-center gap-4 opacity-85 hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-white font-bold text-lg mb-3 pb-3 border-b-[0.5px] border-[#5F37F5] w-full text-center">
            Visão
          </h2>
          <p className="text-white font-bold text-lg mb-3 text-center">
            Resolver os problemas propostos e alcançar o FIAP NEXT.
          </p>
        </div>
        <div className="group bg-[#14152B] text-white border-[0.5px] border-white rounded-[10px] w-[280px] min-h-[100px] p-8 box-border flex flex-col items-center gap-4 opacity-85 hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-white font-bold text-lg mb-3 pb-3 border-b-[0.5px] border-[#5F37F5] w-full text-center">
            Valores
          </h2>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5 w-full">
            <li className="flex items-center gap-2 text-white font-bold text-lg mb-3 px-3 py-1.5 rounded-md bg-[#7F77DD]/[0.08] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5F37F5] before:shrink-0">
              Inovação
            </li>
            <li className="flex items-center gap-2 text-white font-bold text-lg mb-3 px-3 py-1.5 rounded-md bg-[#7F77DD]/[0.08] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5F37F5] before:shrink-0">
              Personalização
            </li>
            <li className="flex items-center gap-2 text-white font-bold text-lg mb-3 px-3 py-1.5 rounded-md bg-[#7F77DD]/[0.08] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5F37F5] before:shrink-0">
              Resultado real
            </li>
            <li className="flex items-center gap-2 text-white font-bold text-lg mb-3 px-3 py-1.5 rounded-md bg-[#7F77DD]/[0.08] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5F37F5] before:shrink-0">
              Escalabilidade
            </li>
            <li className="flex items-center gap-2 text-white font-bold text-lg mb-3 px-3 py-1.5 rounded-md bg-[#7F77DD]/[0.08] before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#5F37F5] before:shrink-0">
              Impacto positivo
            </li>
          </ul>
        </div>
      </section>
 
      {/* BOTÃO */}
     
        <div className="mt-10 flex justify-center">
 
         <a href="/sobre"
          className="inline-block bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-base font-bold px-10 py-4 rounded-full"
  >
          Conheça a solução!
        </a>
      </div>
   
    </main >
  );
}