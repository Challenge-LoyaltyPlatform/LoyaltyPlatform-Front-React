import fotoAndrei from '@/img/fotoAndrei.jpg';
import fotoFelipe from '@/img/fotoFelipe.jpg';
import fotoHenrique from '@/img/fotoHenrique.jpg';
import fotoLuiz from '@/img/fotoLuiz.jpg';

type Integrante = {
  id: number;
  nome: string;
  rm: string;
  foto: string;
  linkedin: string;
  github: string;
};

const integrantes: Integrante[] = [
  { id: 1, nome: 'Andrei Oliveira de Sousa', rm: '573373', foto: fotoAndrei, linkedin: '', github: ''},
  { id: 2, nome: 'Felipe Coelho da Fonseca', rm: '572133', foto: fotoFelipe,   linkedin: '', github: '' },
  { id: 3, nome: 'Henrique Soares Pereira', rm: '569898', foto: fotoHenrique, linkedin: '', github: '' },
  { id: 4, nome: 'Luiz Felipe Lourenço da Silva', rm: '572576', foto: fotoLuiz,   linkedin: '', github: '' },
];

export default function Integrantes(){
  return (
    <main className="min-h-screen bg-[#08081A] px-6 py-16">
      <section className="max-w-3x1 mx-auto text-center"> {/* ALINHA A CAIXA DO CONTEÚDO NA PÁGINA*/}
        <h1 className="text-3x1 md:text-4x1 font-bold text-white"> {/* RESPONSIVIDADE*/}
          Os nossos <span className="text-[#FC3E8E]">integrantes:</span>
        </h1>
        <p className="mt-6 text-gray-300 leading-relaxed">
          Uma equipe apaixonada por inovação, colaboração e resultados,
          dedicada a transformar desafios em experiências gamificadas que
          inspiram e conectam pessoas.
        </p>
      </section>
    </main>
  );
}