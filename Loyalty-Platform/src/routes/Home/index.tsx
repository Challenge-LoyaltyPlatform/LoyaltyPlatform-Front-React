// src/routes/Home/index.tsx
import logoPrincipal from "../../img/LOGO PRINCIPAL.png";
export default function Home() {
  return (
    <main>
      <header className="conteudo-principal">
        <img src={logoPrincipal} alt="logo principal" />
        <div>
          <h1>Gamificação que engaja.</h1>
          <h2 id="degrade">Resultados que fidelizam.</h2>
        </div>
      </header>

      <section className="sobre-nos">
        <h1>Quem somos ?</h1>

        <p>
          A <span id="degrade">Loyalty Platform</span> transforma o
          engajamento dos seus usuários em recompensas reais, por meio de
          personalizada, sem precisar construir essa estrutura do zero!
        </p>
      </section>

      <section className="card-section">
        <div className="feature-card">
          <h2 id="titulo-card">Missão</h2>
          <p>
            Oferecer gamificação personalizada que conecta o comportamento
            digital dos usuários a recompensas reais.
          </p>
        </div>

        <div className="feature-card">
          <h2 id="titulo-card">Visão</h2>
          <p>Resolver os problemas e alcançar o FIAP NEXT</p>
        </div>

        <div className="feature-card">
          <h2 id="titulo-card">Valores</h2>
          <ul>
            <li>Inovação</li>
            <li>Personalização</li>
            <li>Resultado real</li>
            <li>Escalabilidade</li>
            <li>Impacto positivo</li>
          </ul>
        </div>
      </section>

      <div className="botao-wrapper">
        <a className="botao" href="/sobre">
          Conheça a solução!
        </a>
      </div>
    </main>
  );
}