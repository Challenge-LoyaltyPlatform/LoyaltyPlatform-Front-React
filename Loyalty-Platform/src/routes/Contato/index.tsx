// src/routes/Home/index.tsx
export default function Home() {
  return (
    <main>
      <h1>Contato</h1>

       {/* BOTÃO */}

        <div className="mt-10 flex justify-center">
        <a href="/sobre"
          className="inline-block bg-[#6C4DFC] hover:bg-[#5b3ce6] transition text-white text-base font-bold px-10 py-4 rounded-full"
  >
            Enviar mensagem!
        </a>
      </div>
    </main>
  );
}