// src/components/AvatarUsuario.tsx
type AvatarUsuarioProps = {
  nome: string;
};

// "Luiz Felipe Lourenço" -> "LL"
function obterIniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? '';
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
  return (primeira + ultima).toUpperCase();
}

export default function AvatarUsuario({ nome }: AvatarUsuarioProps) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-gradient-to-r from-[#5F37F5] to-[#FC3E8E] text-xs font-bold text-white"
    >
      {obterIniciais(nome)}
    </span>
  );
}
