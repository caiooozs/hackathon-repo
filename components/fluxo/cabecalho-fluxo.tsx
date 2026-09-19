"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { ETAPAS_FLUXO, TOTAL_ETAPAS, numeroDaEtapa, type EtapaId } from "./etapas";

/**
 * Cabeçalho das telas do fluxo: botão voltar + progresso segmentado.
 * O progresso é anunciado por leitores de tela como "Etapa X de Y".
 */
export function CabecalhoFluxo({
  etapa,
  voltarPara,
  aoVoltar,
}: {
  etapa: EtapaId;
  voltarPara?: string;
  aoVoltar?: () => void;
}) {
  const router = useRouter();
  const atual = numeroDaEtapa(etapa);
  const rotulo = `Etapa ${atual} de ${TOTAL_ETAPAS}: ${
    ETAPAS_FLUXO[atual - 1].nome
  }`;

  const conteudoBotao = (
    <>
      <LuChevronLeft className="size-6" aria-hidden="true" />
      <span className="sr-only">Voltar para a etapa anterior</span>
    </>
  );

  const classeBotao =
    "inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-brand-soft";

  return (
    <header className="flex items-center gap-3 py-2">
      {voltarPara && !aoVoltar ? (
        <Link href={voltarPara} className={classeBotao}>
          {conteudoBotao}
        </Link>
      ) : (
        <button
          type="button"
          onClick={aoVoltar ?? (() => router.back())}
          className={classeBotao}
        >
          {conteudoBotao}
        </button>
      )}

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={TOTAL_ETAPAS}
        aria-valuenow={atual}
        aria-valuetext={rotulo}
        aria-label="Progresso do registro da ocorrência"
        className="flex flex-1 items-center gap-1.5"
      >
        {ETAPAS_FLUXO.map((e, i) => (
          <span
            key={e.id}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < atual ? "bg-brand" : "bg-brand-soft"
            )}
          />
        ))}
      </div>
    </header>
  );
}
