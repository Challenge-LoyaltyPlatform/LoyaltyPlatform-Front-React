import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import App from './App.tsx'
import Home from './routes/Home'
import Sobre from './routes/Sobre'
import Integrantes from './routes/Integrantes'
import Duvidas from './routes/Duvidas'
import Contato from './routes/Contato'
import SolucaoAplicada from './routes/SolucaoAplicada'
import PaginaErro from './routes/Error'
import Login from './routes/Login'
import AdminLayout from './components/AdminLayout'
import EmpresasClientes from './routes/EmpresasClientes'
import CadastrarEmpresa from './routes/CadastrarEmpresa'
import DetalheEmpresa from './routes/DetalheEmpresa'
import EditarEmpresa from './routes/EditarEmpresa'
import AuthProvider from './contexts/AuthProvider'
import AvisoProvider from './contexts/AvisoProvider'
import '@fontsource/sora/400.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import './index.css'

// Só existe com VITE_API_MOCK=true; carregado sob demanda para não entrar no build de produção
const AvisoApiSimulada =
  import.meta.env.VITE_API_MOCK === 'true' ? lazy(() => import('./components/AvisoApiSimulada')) : null

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/duvidas', element: <Duvidas /> },
      { path: '/contato', element: <Contato /> },
      { path: '/solucao', element: <SolucaoAplicada /> },
    ],
  },
  // Login ocupa a tela inteira, sem cabeçalho e rodapé
  { path: '/login', element: <Login />, errorElement: <PaginaErro /> },
  // Painel do administrador: sidebar própria, sem cabeçalho e rodapé do site
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <PaginaErro />,
    children: [
      { index: true, element: <Navigate to="empresas" replace /> },
      { path: 'empresas', element: <EmpresasClientes /> },
      // "nova" vem antes de ":id" por clareza; o React Router já prioriza o trecho fixo
      { path: 'empresas/nova', element: <CadastrarEmpresa /> },
      { path: 'empresas/:id', element: <DetalheEmpresa /> },
      { path: 'empresas/:id/editar', element: <EditarEmpresa /> },
    ],
  },
])

// AvisoProvider fica acima do RouterProvider: o aviso disparado antes de navegar continua na tela seguinte
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AvisoProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        {AvisoApiSimulada && (
          <Suspense fallback={null}>
            <AvisoApiSimulada />
          </Suspense>
        )}
      </AuthProvider>
    </AvisoProvider>
  </StrictMode>,
)
