// src/components/empresa/StatusEmpresaBadge.tsx
import type { StatusEmpresa } from '@/types/empresa';

const estilos: Record<StatusEmpresa, { classes: string; rotulo: string }> = {
  ATIVA: { classes: 'bg-green-100 text-green-700', rotulo: 'Ativa' },
  INATIVA: { classes: 'bg-gray-100 text-gray-600', rotulo: 'Inativa' },
};

export default function StatusEmpresaBadge({ status }: { status: StatusEmpresa }) {
  const { classes, rotulo } = estilos[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${classes}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {rotulo}
    </span>
  );
}
