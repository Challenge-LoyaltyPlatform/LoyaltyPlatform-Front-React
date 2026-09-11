// src/components/Cabecalho.tsx
import { useState } from 'react';
import { NavLink } from 'react-router';
import logoPositiva from "@/img/LOGO POSITIVA.svg";

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/duvidas', label: 'Dúvidas' },
  { to: '/contato', label: 'Contato' },
];

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-300 hover:text-white'
    }`;

  const linkClassesMobile = ({ isActive }: { isActive: boolean }) =>
    `block w-full text-center px-4 py-3 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-300 hover:text-white'
    }`;

  return (
    <div className="bg-[#08081A] px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
      <header className="max-w-6xl mx-auto bg-[#13142A] border border-white/10 rounded-2xl px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* TODO: substituir por <img src="/logo.svg" alt="Loyalty Platform" /> quando tiver a imagem */}
        <div className="flex items-center gap-2">
          <img src={logoPositiva} alt="Loyalty Platform" className="h-8 w-auto" />
        </div>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-2">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClasses}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Botão hambúrguer (mobile/tablet) */}
        <button
          type="button"
          onClick={() => setMenuAberto((prev) => !prev)}
          className="lg:hidden p-2 rounded-full text-gray-300 hover:text-white transition-colors"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          {menuAberto ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Nav mobile */}
      {menuAberto && (
        <nav className="max-w-6xl mx-auto lg:hidden mt-2 bg-[#13142A] border border-white/10 rounded-2xl px-4 py-3 flex flex-col gap-1">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={linkClassesMobile}
              onClick={() => setMenuAberto(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}