// src/routes/Duvidas/index.tsx
import FaqCard from './FaqCard';

interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

const faqData: FaqItem[] = [
  {
    id: '1',
    pergunta: 'O que é a Loyalty Platform?',
    resposta:
      'É uma plataforma B2B de gamificação criada para ajudar empresas a reterem seus usuários de forma ativa e contínua. Por meio de missões, rankings, desafios e premiações reais, transformamos o engajamento digital em recompensas concretas.',
  },
  {
    id: '2',
    pergunta: 'Como funciona o sistema de pontuação?',
    resposta:
      'Cada ação realizada pelo usuário dentro da plataforma é avaliada automaticamente por um algoritmo e recebe uma pontuação de 0 a 100, baseada no impacto e relevância da ação. Quanto mais você interage, maior sua pontuação.',
  },
  {
    id: '3',
    pergunta: 'Quais são as recompensas disponíveis?',
    resposta:
      'As recompensas variam de acordo com cada empresa parceira. No caso da SoulUp, incluem descontos na fatura de energia, benefícios exclusivos e experiências sustentáveis. O usuário no topo do ranking tem sua conta de energia totalmente subsidiada.'
  },
  
];

export default function Duvidas() {
  return (
    <main className="min-h-screen bg-[#0a0a1a] px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Duvidas <span className="text-pink-500">frequentes:</span>
        </h1>
      </header>

      <section
        aria-label="Perguntas frequentes"
        className="max-w-2xl mx-auto flex flex-col gap-6"
      >
        {faqData.map((item) => (
          <FaqCard key={item.id} pergunta={item.pergunta} resposta={item.resposta} />
        ))}
      </section>

      <section aria-label="Contato" className="text-center mt-16">
        <h2 className="text-2xl font-bold text-white mb-2">Tem mais dúvidas?</h2>
        <p className="text-gray-300 mb-6">
          Entre em <span className="text-pink-500">contato!</span>
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full transition-colors">
          Entre em contato!
        </button>
      </section>
    </main>
  );
}