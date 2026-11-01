import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import SidebarAdmin from './SidebarAdmin';

export default function AdminLayout() {
  const { usuario, estaAutenticado } = useAuth();

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Só o administrador da Loyalty acessa o painel de empresas clientes
  if (usuario?.perfil !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-[#F7F6FC] font-['Sora']">
      <SidebarAdmin />
      <main className="flex-1 px-6 py-8 sm:px-10">
        <Outlet />
      </main>
    </div>
  );
}