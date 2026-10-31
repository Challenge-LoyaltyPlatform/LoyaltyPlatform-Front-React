// src/components/Cabecalho.tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import logoPositiva from "@/img/LOGO POSITIVA.svg";

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/duvidas', label: 'Dúvidas' },
  { to: '/contato', label: 'Contato' },
  { to: '/solucao', label: 'Solução' },
];

const iconeEntrar = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const botaoEntrarClasses =
  'items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5F37F5] to-[#FC3E8E] text-white text-sm font-semibold transition-opacity hover:opacity-90';

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

        {/* Login desktop */}
        <Link to="/login" className={`hidden lg:inline-flex px-5 py-2 ${botaoEntrarClasses}`}>
          {iconeEntrar}
          Entrar
        </Link>

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

          <hr className="border-white/10 my-2" />

          <Link
            to="/login"
            onClick={() => setMenuAberto(false)}
            className={`flex w-full px-4 py-3 ${botaoEntrarClasses}`}
          >
            {iconeEntrar}
            Entrar
          </Link>
        </nav>
      )}
    </div>
  );
}