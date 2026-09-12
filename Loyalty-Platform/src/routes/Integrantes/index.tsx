import fotoAndrei from '@/img/fotoAndrei.jpg';
import fotoFelipe from '@/img/fotoFelipe.jpg';
import fotoHenrique from '@/img/fotoHenrique.jpg';
import fotoLuiz from '@/img/fotoLuiz.jpg';
import CardIntegrante from './CardIntegrante';

type Integrante = {
  id: number;
  nome: string;
  rm: string;
  foto: string;
  linkedin: string;
  github: string;
};

const integrantes: Integrante[] = [
  { id: 1, nome: 'Andrei Oliveira de Sousa', rm: '573373', foto: fotoAndrei, linkedin: 'https://www.linkedin.com/in/andrei-sousa-55662825a/', github: 'https://github.com/andreisou-dev'},
  { id: 2, nome: 'Felipe Coelho da Fonseca', rm: '572133', foto: fotoFelipe,   linkedin: 'https://www.linkedin.com/in/felipe-coelho-80b78a394/', github: 'https://github.com/devfcoelho' },
  { id: 3, nome: 'Henrique Soares Pereira', rm: '569898', foto: fotoHenrique, linkedin: 'https://www.linkedin.com/in/henrique-soares-pereira/', github: 'https://github.com/Henriquesope' },
  { id: 4, nome: 'Luiz Felipe Lourenço da Silva', rm: '572576', foto: fotoLuiz,   linkedin: 'https://www.linkedin.com/in/lfelipelourenco/', github: 'https://github.com/devlipee' },
];

export default function Integrantes(){
  return (
    <main className="min-h-screen bg-[#08081A] px-6 py-16">
      <section className="max-w-3xl mx-auto text-center"> {/* ALINHA A CAIXA DO CONTEÚDO NA PÁGINA*/}
        <h1 className="text-3xl md:text-4x1 font-bold text-white"> {/* RESPONSIVIDADE*/}
          Os nossos <span className="text-[#FC3E8E]">integrantes:</span>
        </h1>
        <p className="mt-6 text-gray-300 leading-relaxed">
          Uma equipe apaixonada por inovação, colaboração e resultados,
          dedicada a transformar desafios em experiências gamificadas que
          inspiram e conectam pessoas.
        </p>
      </section>
      <section className="max-w-6xl mx-auto mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrantes.map((integrante) => (
          <CardIntegrante
            key={integrante.id}
            nome={integrante.nome}
            rm={integrante.rm}
            foto={integrante.foto}
            linkedin={integrante.linkedin}
            github={integrante.github}
          />
        ))}
      </section>
    </main>
  );
}