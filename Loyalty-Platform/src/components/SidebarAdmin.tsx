import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  {
    to: '/admin/empresas',
    label: 'Empresas clientes',
    icone: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
];

export default function SidebarAdmin() {
  const { sair } = useAuth();
  const navigate = useNavigate();

  function handleSair() {
    sair();
    navigate('/login', { replace: true });
  }

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
      isActive ? 'bg-[#E9E5FB] text-[#5F37F5]' : 'text-gray-600 hover:bg-[#F0EEFB]'
    }`;

  return (
    <aside className="flex flex-col bg-white border-b md:border-b-0 md:border-r border-gray-200 px-4 py-5 md:w-60 md:min-h-screen md:shrink-0">
      <div className="flex items-center gap-2 px-1">
        <svg viewBox="0 0 35 59" className="h-7 w-auto" aria-hidden="true">
          <defs>
            <linearGradient id="gradiente-logo-sidebar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5F37F5" />
              <stop offset="60%" stopColor="#FC3E8E" />
              <stop offset="100%" stopColor="#FF7A3D" />
            </linearGradient>
          </defs>
          <path
            d="M15.0416 7.07694L0.329056 0C0.0807427 5.83537 -0.266897 19.8154 0.329056 29.0527C0.925009 38.29 10.3858 41.4684 15.0416 41.903V7.07694Z"
            fill="#5F37F5"
          />
          <path
            d="M34.2675 58.2917V43.9515H7.44958C8.19453 54.3807 16.5751 57.8571 20.6723 58.2917H34.2675Z"
            fill="url(#gradiente-logo-sidebar)"
          />
        </svg>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-[#12122A]">Loyalty Platform</span>
          <span className="text-[11px] text-gray-500">por HalfTech</span>
        </span>
      </div>

      <div className="mt-6 rounded-lg bg-[#F0EEFB] px-3 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Acesso</p>
        <p className="text-sm font-semibold text-[#12122A]">Administrador da Loyalty</p>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {links.map(({ to, label, icone }) => (
          <NavLink key={to} to={to} className={linkClasses}>
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
              {icone}
            </svg>
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleSair}
        className="mt-6 md:mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F0EEFB]"
      >
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sair
      </button>
    </aside>
  );
}