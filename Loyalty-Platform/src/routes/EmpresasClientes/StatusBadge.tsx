import type { StatusEmpresa } from '@/types/empresa';

const estilos: Record<StatusEmpresa, { classes: string; rotulo: string }> = {
  ativa: { classes: 'bg-green-100 text-green-700', rotulo: 'Ativa' },
  inativa: { classes: 'bg-[#E9E5FB] text-[#5F37F5]', rotulo: 'Inativa' },
};

export default function StatusBadge({ status }: { status: StatusEmpresa }) {
  const { classes, rotulo } = estilos[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {rotulo}
    </span>
  );
}