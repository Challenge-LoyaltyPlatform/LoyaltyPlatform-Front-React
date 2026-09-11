// src/components/Rodape.tsx
import { Link } from 'react-router';
import logoPrincipal from '@/img/LOGO PRINCIPAL.png';

export default function Rodape() {
  return (
    <footer className="w-full bg-[#12122a] px-10 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-10">
          {/* Logo + texto institucional */}
          <div className="flex items-center gap-5 flex-1">
            <img src={logoPrincipal} alt="Loyalty Platform" className="h-20 w-auto shrink-0" />
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              A Loyalty Platform transforma o engajamento dos seus usuários em
              recompensas reais, por meio de gamificação personalizada — sem
              precisar construir essa estrutura do zero.
            </p>
          </div>

          {/* Navegação */}
          <div className="flex flex-col gap-3 md:pl-10">
            <p className="text-white font-semibold text-lg mb-1">Navegação:</p>
            <Link to="/sobre" className="text-gray-300 hover:text-white text-base transition-colors">
              Sobre
            </Link>
            <Link to="/integrantes" className="text-gray-300 hover:text-white text-base transition-colors">
              Integrantes
            </Link>
            <Link to="/duvidas" className="text-gray-300 hover:text-white text-base transition-colors">
              FAQ
            </Link>
            <Link to="/contato" className="text-gray-300 hover:text-white text-base transition-colors">
              Contatos
            </Link>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-gray-500 text-xs text-right">
          © 2026 Loyalty Platform · FIAP · Challenge 1TDSPW
        </p>
      </div>
    </footer>
  );
}