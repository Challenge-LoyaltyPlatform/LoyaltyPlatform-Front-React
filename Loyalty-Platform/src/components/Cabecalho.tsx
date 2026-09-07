// src/components/Cabecalho.tsx
import { NavLink } from 'react-router';
import logoPositiva from "@/img/LOGO POSITIVA.svg";

export default function Cabecalho() {
  return (
    <div className="bg-[#0a0a14] px-6 pt-6 pb-4">
      <header className="max-w-6xl mx-auto bg-[#12122a] rounded-2xl shadow-lg px-8 py-4 flex items-center justify-between">
        {/* TODO: substituir por <img src="/logo.svg" alt="Loyalty Platform" /> quando tiver a imagem */}
        <div className="flex items-center gap-2">
            <img src={logoPositiva} alt="Loyalty Platform" className="h-8 w-auto" />
           
            </div>
  

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Sobre
          </NavLink>
          <NavLink
            to="/integrantes"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Integrantes
          </NavLink>
          <NavLink
            to="/duvidas"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Dúvidas
          </NavLink>
          <NavLink
            to="/contato"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Contato
          </NavLink>
        </nav>
      </header>
    </div>
  );
}