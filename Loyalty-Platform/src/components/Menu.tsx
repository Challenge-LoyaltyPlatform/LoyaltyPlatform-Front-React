import { Link } from 'react-router';

export default function Menu() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/integrantes">Integrantes</Link>
      <Link to="/duvidas">Duvidas</Link>
      <Link to="/contato">Contato</Link>
    </nav>
  );
}