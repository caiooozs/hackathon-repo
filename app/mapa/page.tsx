import Link from "next/link";
import type { Metadata } from "next";
import { LuChevronLeft, LuInfo, LuPlus } from "react-icons/lu";
import { Mapa, SeloMapa } from "@/components/fluxo/mapa";
import { BotaoLink } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";

export const metadata: Metadata = {
  title: "Mapa de ocorrências",
  description:
    "Denúncias registradas por bairro no Recife, com base no Painel de Controle Social da Prefeitura.",
};

/**
 * Recorte de denúncias por bairro — setembro de 2025.
 * Fonte: Painel de Controle Social da Prefeitura do Recife
 * (Natureza = Denúncia, Ano/Mês = 2025/set).
 */
const BAIRROS = [
  { nome: "Boa Viagem", total: 33 },
  { nome: "Vasco da Gama", total: 25 },
  { nome: "Jardim São Paulo", total: 14 },
  { nome: "Várzea", total: 14 },
  { nome: "Areias", total: 9 },
  { nome: "Prado", total: 9 },
  { nome: "São José", total: 7 },
  { nome: "Bongi", total: 3 },
  { nome: "Beberibe", total: 2 },
  { nome: "Mustardinha", total: 1 },
];

const MAIOR = Math.max(...BAIRROS.map((b) => b.total));

const LEGENDA = [
  { cor: "#e8543a", texto: "Prioridade alta ou risco" },
  { cor: "#f5b301", texto: "Em atendimento" },
  { cor: "#2fa855", texto: "Concluída" },
];

export default function MapaOcorrencias() {
  return (
    <Tela>
      <header className="flex items-center gap-2 py-2">
        <Link
          href="/"
          className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-brand-soft"
        >
          <LuChevronLeft className="size-6" aria-hidden="true" />
          <span className="sr-only">Voltar para o início</span>
        </Link>
      </header>

      <TituloTela
        titulo="Mapa de ocorrências"
        apoio="Veja onde os problemas se repetem. Denúncias recorrentes na mesma região ganham prioridade no atendimento."
      />

      <Mapa
        variante="calor"
        descricao="Mapa de calor ilustrativo do Recife com concentração de denúncias por região."
        legenda={<SeloMapa>676 denúncias em set./2025</SeloMapa>}
      />

      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {LEGENDA.map((l) => (
          <li key={l.texto} className="flex items-center gap-2 text-[0.8rem] text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-3 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: l.cor }}
            />
            {l.texto}
          </li>
        ))}
      </ul>

      <section aria-labelledby="por-bairro" className="space-y-3">
        <h2 id="por-bairro" className="text-[0.95rem] font-bold text-navy">
          Denúncias por bairro
        </h2>
        <ol className="space-y-2.5">
          {BAIRROS.map((b) => (
            <li key={b.nome} className="space-y-1">
              <div className="flex items-baseline justify-between gap-3 text-[0.88rem]">
                <span className="font-semibold text-navy">{b.nome}</span>
                <span className="tabular-nums text-muted-foreground">
                  {b.total}
                  <span className="sr-only"> denúncias</span>
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-brand-soft"
                role="img"
                aria-label={`${b.nome}: ${b.total} denúncias`}
              >
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${(b.total / MAIOR) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="flex items-start gap-2.5 rounded-2xl bg-brand-softer p-3.5 text-[0.8rem] leading-snug text-muted-foreground ring-1 ring-brand/10">
        <LuInfo className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        Fonte: Painel de Controle Social da Prefeitura do Recife — recorte de
        setembro de 2025 (natureza “Denúncia”). Tempo médio de resposta no
        período: 41 dias.
      </p>

      <div className="mt-auto pt-2">
        <BotaoLink href="/denuncia/como">
          <LuPlus className="size-5" aria-hidden="true" />
          Registrar denúncia neste local
        </BotaoLink>
      </div>
    </Tela>
  );
}
