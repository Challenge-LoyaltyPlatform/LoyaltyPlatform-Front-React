interface FaqCardProps {
  pergunta: string;
  resposta: string;
}

export default function FaqCard({ pergunta, resposta }: FaqCardProps) {
  return (
    <article>
      <h3>{pergunta}</h3>
      <p>{resposta}</p>
    </article>
  );
}