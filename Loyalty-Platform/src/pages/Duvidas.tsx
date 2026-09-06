import FaqCard from '../components/FaqCard';

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

const faqData: FaqItem[] = [
  // TODO: adicionar as perguntas aqui
];

export default function Duvidas() {
  return (
    <main>
      <header>
        <h1>Duvidas frequentes:</h1>
      </header>

      <section aria-label="Perguntas frequentes">
        {faqData.map((item) => (
            <FaqCard key={item.id} pergunta={item.pergunta} resposta={item.resposta} />
        ))}
      </section>

      <section aria-label="Contato">
        <h2>Tem mais dúvidas?</h2>
        <p>Entre em contato!</p>
        <button>Entre em contato!</button>
      </section>
    </main>
  );
}