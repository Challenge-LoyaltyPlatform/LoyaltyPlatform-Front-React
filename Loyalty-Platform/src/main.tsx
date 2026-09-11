import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.tsx'
import Home from './routes/Home'
import Sobre from './routes/Sobre'
import Integrantes from './routes/Integrantes'
import Duvidas from './routes/Duvidas'
import Contato from './routes/Contato'
import SolucaoAplicada from './routes/SolucaoAplicada'
import Error from './routes/Error'
import '@fontsource/sora/400.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sobre', element: <Sobre /> },
      { path: '/integrantes', element: <Integrantes /> },
      { path: '/duvidas', element: <Duvidas /> },
      { path: '/contato', element: <Contato /> },
      { path: '/solucao', element: <SolucaoAplicada /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)