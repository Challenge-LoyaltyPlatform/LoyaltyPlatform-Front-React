import { useEffect } from 'react';

// src/routes/Error/index.tsx
export default function Error() {
  useEffect(() => {
      document.title = 'Página não encontrada | Loyalty Platform';
    }, []);
  return (
    <main>
      <h1>404 Página não encontrada</h1>
      <p>O caminho que você tentou acessar não existe.</p>
    </main>
  );
}