// src/components/empresa/FormularioEmpresa.tsx
// Formulário compartilhado pelo cadastro (POST) e pela edição (PUT) de empresa
import { Controller, useForm, useWatch, type Path } from 'react-hook-form';
import Campo from '@/components/formulario/Campo';
import { classesEntrada, idDescricao } from '@/components/formulario/estilos';
import { Spinner } from '@/components/Feedback';
import { ApiError } from '@/services/api';
import type { EmpresaRequest, FormaBotoes, Tipografia } from '@/types/empresa';
import { cnpjValido, formatarCnpj, normalizarCnpj } from '@/utils/cnpj';
import { COR_HEX, CONTRASTE_MINIMO, contrasteComBranco } from '@/utils/cores';
import { formatarTelefone, somenteDigitos } from '@/utils/formatadores';
import { FORMAS_BOTOES, TIPOGRAFIAS } from './opcoesIdentidade';
import PreviaApp from './PreviaApp';

// No formulário o telefone é sempre texto ('' = não informado); na API vira null
type CamposFormulario = Omit<EmpresaRequest, 'telefone'> & { telefone: string };

const VALORES_PADRAO: CamposFormulario = {
  razaoSocial: '',
  nomeFantasia: '',
  cnpj: '',
  email: '',
  telefone: '',
  identidadeVisual: { corPrincipal: '#5F37F5', tipografia: 'SORA', formaBotoes: 'ARREDONDADO' },
};

// Campos que a API pode apontar como inválidos no corpo do erro (ex.: CNPJ duplicado)
const CAMPOS_DO_FORMULARIO: Path<CamposFormulario>[] = [
  'razaoSocial',
  'nomeFantasia',
  'cnpj',
  'email',
  'telefone',
  'identidadeVisual.corPrincipal',
  'identidadeVisual.tipografia',
  'identidadeVisual.formaBotoes',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DICA_NOME = 'É o nome que aparece no painel e no app.';
const DICA_CNPJ = 'Aceita o CNPJ numérico e o alfanumérico.';
const OPCOES_TIPOGRAFIA = Object.keys(TIPOGRAFIAS) as Tipografia[];
const OPCOES_FORMA = Object.keys(FORMAS_BOTOES) as FormaBotoes[];

function ehCampoDoFormulario(campo: string): campo is Path<CamposFormulario> {
  return (CAMPOS_DO_FORMULARIO as string[]).includes(campo);
}

function paraFormulario(dados: EmpresaRequest): CamposFormulario {
  return { ...dados, telefone: dados.telefone ?? '' };
}

function paraRequisicao(campos: CamposFormulario): EmpresaRequest {
  return {
    razaoSocial: campos.razaoSocial.trim(),
    nomeFantasia: campos.nomeFantasia.trim(),
    cnpj: normalizarCnpj(campos.cnpj),
    email: campos.email.trim().toLowerCase(),
    telefone: somenteDigitos(campos.telefone) || null,
    identidadeVisual: {
      ...campos.identidadeVisual,
      corPrincipal: campos.identidadeVisual.corPrincipal.toUpperCase(),
    },
  };
}

type FormularioEmpresaProps = {
  valoresIniciais?: EmpresaRequest;
  rotuloEnviar: string;
  aoEnviar: (dados: EmpresaRequest) => Promise<void>;
  aoCancelar: () => void;
};

export default function FormularioEmpresa({
  valoresIniciais,
  rotuloEnviar,
  aoEnviar,
  aoCancelar,
}: FormularioEmpresaProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<CamposFormulario>({
    defaultValues: valoresIniciais ? paraFormulario(valoresIniciais) : VALORES_PADRAO,
    mode: 'onTouched',
  });

  // A prévia acompanha o que está sendo digitado
  const identidade = useWatch({ control, name: 'identidadeVisual' });
  const nomeFantasia = useWatch({ control, name: 'nomeFantasia' });

  const corValida = COR_HEX.test(identidade.corPrincipal);
  const contraste = corValida ? contrasteComBranco(identidade.corPrincipal) : null;

  async function enviar(campos: CamposFormulario) {
    try {
      await aoEnviar(paraRequisicao(campos));
    } catch (erro) {
      if (!(erro instanceof ApiError)) {
        setError('root.servidor', { message: 'Ocorreu um erro inesperado. Tente novamente.' });
        return;
      }

      // Ex.: 409 com { campos: { cnpj: 'Este CNPJ já está cadastrado (SoulUp).' } }
      const errosDeCampo = Object.entries(erro.campos).filter(([campo]) => ehCampoDoFormulario(campo));
      errosDeCampo.forEach(([campo, mensagem], indice) => {
        setError(campo as Path<CamposFormulario>, { type: 'servidor', message: mensagem }, { shouldFocus: indice === 0 });
      });

      setError('root.servidor', {
        message: errosDeCampo.length > 0 ? 'Corrija os campos destacados para continuar.' : erro.message,
      });
    }
  }

  const erroCor = errors.identidadeVisual?.corPrincipal?.message;
  const erroServidor = errors.root?.servidor?.message;
  // O resumo no rodapé só aparece depois da primeira tentativa de envio
  const temErrosDeValidacao = isSubmitted && Object.keys(errors).some((chave) => chave !== 'root');

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="mt-6">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-w-0 flex-col gap-6">
          {/* DADOS DA EMPRESA */}
          <section aria-labelledby="titulo-dados" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 id="titulo-dados" className="text-base font-bold text-[#12122A]">
              Dados da empresa
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Campo id="razaoSocial" rotulo="Razão social" erro={errors.razaoSocial?.message}>
                <input
                  id="razaoSocial"
                  type="text"
                  autoComplete="organization"
                  placeholder="Esquina Café Comércio de Alimentos Ltda."
                  aria-invalid={!!errors.razaoSocial}
                  aria-describedby={idDescricao('razaoSocial', errors.razaoSocial?.message)}
                  className={classesEntrada(!!errors.razaoSocial)}
                  {...register('razaoSocial', {
                    validate: (valor) => valor.trim() !== '' || 'Informe a razão social.',
                    maxLength: { value: 150, message: 'Use no máximo 150 caracteres.' },
                  })}
                />
              </Campo>

              <Campo
                id="nomeFantasia"
                rotulo="Nome fantasia"
                erro={errors.nomeFantasia?.message}
                dica={DICA_NOME}
              >
                <input
                  id="nomeFantasia"
                  type="text"
                  placeholder="Esquina Café"
                  aria-invalid={!!errors.nomeFantasia}
                  aria-describedby={idDescricao('nomeFantasia', errors.nomeFantasia?.message, DICA_NOME)}
                  className={classesEntrada(!!errors.nomeFantasia)}
                  {...register('nomeFantasia', {
                    validate: (valor) => valor.trim() !== '' || 'Informe o nome fantasia.',
                    maxLength: { value: 100, message: 'Use no máximo 100 caracteres.' },
                  })}
                />
              </Campo>

              <Controller
                name="cnpj"
                control={control}
                rules={{
                  required: 'Informe o CNPJ.',
                  validate: (valor) => cnpjValido(valor) || 'CNPJ inválido. Confira os 14 caracteres.',
                }}
                render={({ field, fieldState }) => (
                  <Campo
                    id="cnpj"
                    rotulo="CNPJ"
                    erro={fieldState.error?.message}
                    dica={DICA_CNPJ}
                  >
                    <input
                      id="cnpj"
                      ref={field.ref}
                      name={field.name}
                      type="text"
                      autoCapitalize="characters"
                      spellCheck={false}
                      placeholder="00.000.000/0000-00"
                      value={formatarCnpj(field.value)}
                      onChange={(evento) => field.onChange(normalizarCnpj(evento.target.value))}
                      onBlur={field.onBlur}
                      aria-invalid={!!fieldState.error}
                      aria-describedby={idDescricao('cnpj', fieldState.error?.message, DICA_CNPJ)}
                      className={classesEntrada(!!fieldState.error)}
                    />
                  </Campo>
                )}
              />

              <Campo id="email" rotulo="E-mail do responsável" erro={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="responsavel@empresa.com.br"
                  aria-invalid={!!errors.email}
                  aria-describedby={idDescricao('email', errors.email?.message)}
                  className={classesEntrada(!!errors.email)}
                  {...register('email', {
                    validate: (valor) => valor.trim() !== '' || 'Informe o e-mail do responsável.',
                    pattern: { value: EMAIL_REGEX, message: 'Digite um e-mail válido.' },
                    maxLength: { value: 100, message: 'Use no máximo 100 caracteres.' },
                  })}
                />
              </Campo>

              <Controller
                name="telefone"
                control={control}
                rules={{
                  validate: (valor) =>
                    valor === '' || valor.length >= 10 || 'Informe o DDD e o número completo.',
                }}
                render={({ field, fieldState }) => (
                  <Campo id="telefone" rotulo="Telefone" opcional erro={fieldState.error?.message}>
                    <input
                      id="telefone"
                      ref={field.ref}
                      name={field.name}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(11) 91234-5678"
                      value={formatarTelefone(field.value)}
                      onChange={(evento) => field.onChange(somenteDigitos(evento.target.value).slice(0, 11))}
                      onBlur={field.onBlur}
                      aria-invalid={!!fieldState.error}
                      aria-describedby={idDescricao('telefone', fieldState.error?.message)}
                      className={classesEntrada(!!fieldState.error)}
                    />
                  </Campo>
                )}
              />
            </div>
          </section>

          {/* IDENTIDADE VISUAL */}
          <section aria-labelledby="titulo-identidade" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 id="titulo-identidade" className="text-base font-bold text-[#12122A]">
              Identidade visual no app
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Definida na implantação. O usuário final vê só a marca da empresa cliente.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Controller
                name="identidadeVisual.corPrincipal"
                control={control}
                rules={{
                  required: 'Informe a cor principal.',
                  pattern: { value: COR_HEX, message: 'Use o formato #RRGGBB, ex.: #C2410C.' },
                }}
                render={({ field }) => (
                  <Campo id="corPrincipal" rotulo="Cor principal" erro={erroCor}>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        aria-label="Escolher a cor principal no seletor"
                        value={COR_HEX.test(field.value) ? field.value.toLowerCase() : '#5f37f5'}
                        onChange={(evento) => field.onChange(evento.target.value.toUpperCase())}
                        className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
                      />
                      <input
                        id="corPrincipal"
                        ref={field.ref}
                        name={field.name}
                        type="text"
                        maxLength={7}
                        spellCheck={false}
                        value={field.value}
                        onChange={(evento) => field.onChange(evento.target.value.toUpperCase())}
                        onBlur={field.onBlur}
                        aria-invalid={!!erroCor}
                        aria-describedby={idDescricao('corPrincipal', erroCor)}
                        className={classesEntrada(!!erroCor)}
                      />
                    </div>
                  </Campo>
                )}
              />

              <Campo id="tipografia" rotulo="Tipografia">
                <select
                  id="tipografia"
                  className={classesEntrada(false)}
                  {...register('identidadeVisual.tipografia', { required: true })}
                >
                  {OPCOES_TIPOGRAFIA.map((opcao) => (
                    <option key={opcao} value={opcao}>
                      {TIPOGRAFIAS[opcao].rotulo}
                    </option>
                  ))}
                </select>
              </Campo>
            </div>

            {/* Prevenção de erro (Nielsen): avisa, sem bloquear, quando o texto branco do botão fica ilegível */}
            {contraste !== null && contraste < CONTRASTE_MINIMO && (
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                O texto branco dos botões fica com contraste de {contraste.toFixed(1).replace('.', ',')}:1
                nessa cor, abaixo dos 4,5:1 recomendados. Uma cor mais escura melhora a leitura.
              </p>
            )}

            <fieldset className="mt-4">
              <legend className="text-xs font-semibold text-[#12122A]">Forma dos botões</legend>
              <div className="mt-1.5 inline-flex flex-wrap gap-1 rounded-lg bg-gray-100 p-1">
                {OPCOES_FORMA.map((opcao) => (
                  <label key={opcao} className="cursor-pointer">
                    <input
                      type="radio"
                      value={opcao}
                      className="peer sr-only"
                      {...register('identidadeVisual.formaBotoes', { required: true })}
                    />
                    <span className="block rounded-md px-3 py-1.5 text-xs font-semibold text-gray-500 transition-colors peer-checked:bg-white peer-checked:text-[#12122A] peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-[#5F37F5]/40">
                      {FORMAS_BOTOES[opcao].rotulo}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>
        </div>

        {/* PRÉVIA */}
        <aside
          aria-labelledby="titulo-previa"
          className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6"
        >
          <h2 id="titulo-previa" className="text-base font-bold text-[#12122A]">
            Prévia no app
          </h2>
          <p className="mb-4 mt-1 text-xs text-gray-500">
            Usa a cor, a tipografia e a forma dos botões escolhidas ao lado.
          </p>
          <PreviaApp identidade={identidade} nomeEmpresa={nomeFantasia} />
        </aside>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="min-h-5">
          {(erroServidor || temErrosDeValidacao) && (
            <p className="flex items-start gap-2 text-sm text-red-600">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {erroServidor ?? 'Corrija os campos destacados para continuar.'}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={aoCancelar}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#5F37F5] transition-colors hover:bg-[#F0EEFB] disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#5F37F5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4E28E0] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && <Spinner className="h-4 w-4" />}
            {isSubmitting ? 'Salvando...' : rotuloEnviar}
          </button>
        </div>
      </div>
    </form>
  );
}
