// src/routes/Login/index.tsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import ItemRecurso from './ItemRecurso';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/services/api';
import type { LoginRequest } from '@/types/auth';

const recursos = [
  {
    texto: 'Campanhas com missões e recompensas reais',
    icone: (
      <>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </>
    ),
  },
  {
    texto: 'Métricas por empresa e por campanha',
    icone: (
      <>
        <path d="M3 3v18h18" />
        <path d="M8 17v-5" />
        <path d="M13 17V8" />
        <path d="M18 17v-3" />
      </>
    ),
  },
  {
    texto: 'A experiência aparece com a marca da sua empresa',
    icone: (
      <>
        <path d="M12 2a10 10 0 0 0 0 20c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.5-.7-.5-1.1a1.7 1.7 0 0 1 1.7-1.7h2a5.6 5.6 0 0 0 5.6-5.5C22 6 17.5 2 12 2z" />
        <circle cx="7.5" cy="11.5" r="1" fill="currentColor" />
        <circle cx="10" cy="7" r="1" fill="currentColor" />
        <circle cx="15" cy="7.5" r="1" fill="currentColor" />
      </>
    ),
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { entrar, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  useEffect(() => {
    document.title = 'Entrar | Loyalty Platform';
  }, []);

  // Já logado (ou acabou de entrar): leva para a Home
  useEffect(() => {
    if (estaAutenticado) {
      navigate('/', { replace: true });
    }
  }, [estaAutenticado, navigate]);

  async function onSubmit(dados: LoginRequest) {
    try {
      await entrar(dados);
    } catch (erro) {
      setError('root', {
        message:
          erro instanceof ApiError ? erro.message : 'Ocorreu um erro inesperado. Tente novamente.',
      });
    }
  }

  const inputClasses = (temErro: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-[#12122A] placeholder-gray-400 outline-none transition focus:ring-2 ${
      temErro
        ? 'border-red-500 focus:ring-red-200'
        : 'border-gray-200 focus:border-[#5F37F5] focus:ring-[#5F37F5]/20'
    }`;

  return (
    <main className="relative min-h-screen flex flex-col md:flex-row bg-white font-['Sora']">
      <Link
        to="/"
        className="absolute top-8 right-6 sm:right-10 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#5F37F5] transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Voltar ao site
      </Link>

      {/* Painel institucional */}
      <aside className="bg-[#F0EEFB] px-6 py-8 sm:px-10 md:w-5/12 md:px-12 md:py-10 flex flex-col">
        <Link to="/" aria-label="Loyalty Platform - voltar para a Home" className="flex items-center gap-2 w-fit">
          <svg viewBox="0 0 35 59" className="h-7 w-auto" aria-hidden="true">
            <defs>
              <linearGradient id="gradiente-logo-login" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5F37F5" />
                <stop offset="60%" stopColor="#FC3E8E" />
                <stop offset="100%" stopColor="#FF7A3D" />
              </linearGradient>
            </defs>
            <path
              d="M15.0416 7.07694L0.329056 0C0.0807427 5.83537 -0.266897 19.8154 0.329056 29.0527C0.925009 38.29 10.3858 41.4684 15.0416 41.903V7.07694Z"
              fill="#5F37F5"
            />
            <path
              d="M34.2675 58.2917V43.9515H7.44958C8.19453 54.3807 16.5751 57.8571 20.6723 58.2917H34.2675Z"
              fill="url(#gradiente-logo-login)"
            />
          </svg>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-[#12122A]">Loyalty Platform</span>
            <span className="text-[11px] text-gray-500">por HalfTech</span>
          </span>
        </Link>

        <div className="mt-8 md:my-auto md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#12122A]">
            Painel da empresa cliente
          </h1>
          <p className="mt-3 md:mt-5 max-w-md text-sm md:text-base text-gray-500 leading-relaxed">
            Crie campanhas, cadastre missões e acompanhe o engajamento dos usuários do seu app.
          </p>

          <ul className="hidden md:flex mt-8 flex-col gap-4">
            {recursos.map(({ texto, icone }) => (
              <ItemRecurso key={texto} texto={texto} icone={icone} />
            ))}
          </ul>
        </div>

        <p className="hidden md:block text-xs text-gray-500">
          Loyalty Platform · uma solução HalfTech
        </p>
      </aside>

      {/* Formulário */}
      <section className="flex-1 flex items-start md:items-center justify-center px-6 py-10 sm:px-10 md:py-12">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-[#12122A]">Entrar</h2>
          <p className="mt-1 text-sm text-gray-500">
            Use o e-mail cadastrado pela sua empresa na implantação.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col">
            <label htmlFor="email" className="text-xs font-semibold text-[#12122A]">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nome@empresa.com.br"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'erro-email' : undefined}
              className={`mt-1.5 ${inputClasses(!!errors.email)}`}
              {...register('email', {
                required: 'Informe seu e-mail.',
                pattern: { value: EMAIL_REGEX, message: 'Digite um e-mail válido.' },
                setValueAs: (valor: string) => valor.trim(),
              })}
            />
            {errors.email && (
              <p id="erro-email" className="mt-1.5 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}

            <label htmlFor="senha" className="mt-4 text-xs font-semibold text-[#12122A]">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              aria-invalid={errors.senha ? 'true' : 'false'}
              aria-describedby={errors.senha ? 'erro-senha' : undefined}
              className={`mt-1.5 ${inputClasses(!!errors.senha)}`}
              {...register('senha', { required: 'Informe sua senha.' })}
            />
            {errors.senha && (
              <p id="erro-senha" className="mt-1.5 text-xs text-red-600">
                {errors.senha.message}
              </p>
            )}

            <Link
              to="/contato"
              className="mt-3 self-end text-xs font-semibold text-[#5F37F5] hover:text-[#4E28E0] transition-colors"
            >
              Esqueci minha senha
            </Link>

            {/* Erro vindo da API (credenciais inválidas, servidor fora do ar...) */}
            {errors.root && (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-[#5F37F5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4E28E0] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {isSubmitting ? 'Entrando...' : 'Entrar no painel'}
            </button>
          </form>

          <p className="mt-5 flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-px shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            O mesmo acesso serve para o administrador da Loyalty, com permissões diferentes.
          </p>
        </div>
      </section>
    </main>
  );
}
