// src/components/AdminLayout.tsx
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useAvisoDaRota } from '@/hooks/useAvisoDaRota';
import type { EstadoComAviso, EstadoRedirecionamentoLogin } from '@/types/navegacao';
import { rotas } from '@/utils/rotas';
import SidebarAdmin from './SidebarAdmin';

export default function AdminLayout() {
  const { usuario, estaAutenticado, sessaoExpirada } = useAuth();
  const location = useLocation();
  useAvisoDaRota();

  if (!estaAutenticado) {
    const estado: EstadoRedirecionamentoLogin = {
      de: `${location.pathname}${location.search}`,
      aviso: sessaoExpirada
        ? { tipo: 'info', titulo: 'Sua sessão expirou', descricao: 'Entre novamente para continuar de onde parou.' }
        : { tipo: 'info', titulo: 'Entre para acessar o painel do administrador.' },
    };
    return <Navigate to={rotas.login} replace state={estado} />;
  }

  // Só o administrador da Loyalty acessa o painel de empresas clientes (RN21)
  if (usuario?.perfil !== 'ADMIN') {
    const estado: EstadoComAviso = {
      aviso: {
        tipo: 'erro',
        titulo: 'Acesso restrito',
        descricao: 'Essa área é exclusiva do administrador da Loyalty.',
      },
    };
    return <Navigate to={rotas.home} replace state={estado} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F6FC] font-['Sora'] md:flex-row">
      <SidebarAdmin />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8 xl:px-12">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
