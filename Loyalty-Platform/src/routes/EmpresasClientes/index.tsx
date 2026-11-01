import { useEffect } from 'react';
import CabecalhoAdmin from '@/components/CabecalhoAdmin';

export default function EmpresasClientes() {
  useEffect(() => {
    document.title = 'Empresas clientes | Loyalty Platform';
  }, []);

  return (
    <>
      <CabecalhoAdmin secao="Administração" titulo="Empresas clientes" />

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
        A tabela de empresas entra no próximo commit.
      </section>
    </>
  );
}