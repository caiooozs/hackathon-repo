import Link from "next/link";
import {
  LuArrowRight,
  LuCamera,
  LuListChecks,
  LuMap,
  LuMic,
  LuSparkles,
  LuType,
} from "react-icons/lu";
import { Logo } from "@/components/marca/logo";
import { BotaoLink } from "@/components/comuns/botao";
import { Tela } from "@/components/comuns/tela";
import { Mapa } from "@/components/fluxo/mapa";

const FORMAS = [
  { icone: LuCamera, titulo: "Foto", texto: "Mostre o problema" },
  { icone: LuMic, titulo: "Áudio", texto: "Conte o que viu" },
  { icone: LuType, titulo: "Texto", texto: "Escreva do seu jeito" },
];

const PASSOS = [
  {
    icone: LuSparkles,
    titulo: "A IA entende o registro",
    texto:
      "Identificamos o tipo de ocorrência, o local e ocorrências parecidas na região.",
  },
  {
    icone: LuListChecks,
    titulo: "Você confirma",
    texto:
      "Revise tudo antes de enviar e ajuste qualquer informação em um toque.",
  },
  {
    icone: LuMap,
    titulo: "A cidade resolve",
    texto:
      "Encaminhamos ao órgão responsável e você acompanha cada etapa em tempo real.",
  },
];

export default function Inicio() {
  return (
    <Tela className="gap-7">
      <header className="flex items-center justify-between py-2">
        <Logo />
        <Link
          href="/mapa"
          className="rounded-full px-3 py-2.5 text-sm font-semibold text-brand hover:bg-brand-soft"
        >
          Mapa
        </Link>
      </header>

      <section className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-[0.78rem] font-semibold text-navy">
          <LuSparkles className="size-3.5" aria-hidden="true" />
          Prefeitura do Recife · Conecta Recife
        </p>
        <h1 className="text-[2rem] leading-[1.12] font-extrabold tracking-tight text-navy text-balance">
          Viu um problema na cidade? A gente resolve o resto.
        </h1>
        <p className="text-[0.98rem] leading-relaxed text-muted-foreground text-pretty">
          Registre em foto, áudio ou texto. Nossa IA organiza as informações,
          encontra o órgão certo e encaminha para quem pode resolver.
        </p>
      </section>

      <div>
        <BotaoLink href="/denuncia/como" className="text-base">
          Registrar uma ocorrência
          <LuArrowRight className="size-5" aria-hidden="true" />
        </BotaoLink>
      </div>

      <section aria-labelledby="formas" className="space-y-3">
        <h2 id="formas" className="text-sm font-bold text-navy">
          Registre do jeito que for mais fácil
        </h2>
        <ul className="grid grid-cols-3 gap-2.5">
          {FORMAS.map(({ icone: Icone, titulo, texto }) => (
            <li
              key={titulo}
              className="rounded-2xl bg-brand-softer p-3 text-center ring-1 ring-brand/10"
            >
              <Icone className="mx-auto mb-2 size-6 text-brand" aria-hidden="true" />
              <p className="text-[0.85rem] font-semibold text-navy">{titulo}</p>
              <p className="text-[0.72rem] leading-tight text-muted-foreground">
                {texto}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="como-funciona" className="space-y-3">
        <h2 id="como-funciona" className="text-sm font-bold text-navy">
          Como funciona
        </h2>
        <ol className="space-y-2.5">
          {PASSOS.map(({ icone: Icone, titulo, texto }, i) => (
            <li
              key={titulo}
              className="flex gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-border"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icone className="size-[1.15rem]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[0.92rem] font-semibold text-navy">
                  <span className="sr-only">Passo {i + 1}: </span>
                  {titulo}
                </p>
                <p className="text-[0.82rem] leading-snug text-muted-foreground">
                  {texto}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="mapa-inicio" className="space-y-3">
        <h2 id="mapa-inicio" className="text-sm font-bold text-navy">
          O que está acontecendo perto de você
        </h2>
        <Mapa
          variante="radar"
          descricao="Mapa ilustrativo do seu bairro com oito ocorrências registradas nos últimos 30 dias."
        />
        <Link
          href="/mapa"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <LuMap className="size-4" aria-hidden="true" />
          Ver mapa de ocorrências
        </Link>
      </section>

      <footer className="mt-2 border-t border-border pt-5">
        <p className="text-sm font-semibold text-navy">
          Você mostra. A cidade entende.
        </p>
        <p className="mt-1 text-[0.78rem] text-muted-foreground">
          Recife sempre em movimento · Canal integrado ao Conecta Recife.
        </p>
      </footer>
    </Tela>
  );
}
