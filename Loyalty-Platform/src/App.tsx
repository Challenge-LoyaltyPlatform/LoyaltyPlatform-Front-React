import { Outlet } from 'react-router';
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';
import { useAvisoDaRota } from './hooks/useAvisoDaRota';

export default function App() {
  // Mostra avisos de redirecionamento (ex.: "Acesso restrito" vindo do painel)
  useAvisoDaRota();

  return (
    <>
      <Cabecalho />
      <Outlet />
      <Rodape />
    </>
  );
}
