import { LuCheck, LuRefreshCw } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { ETAPAS_STATUS, indiceStatus, type StatusDenuncia } from "@/lib/tipos";

/**
 * Linha do tempo do tratamento da denúncia.
 * Usa lista ordenada para que leitores de tela anunciem a sequência e o estado
 * de cada etapa em texto (não apenas por cor/ícone).
 */
export function LinhaTempo({
  status,
  carimbos = {},
  className,
}: {
  status: StatusDenuncia;
  carimbos?: Partial<Record<StatusDenuncia, string>>;
  className?: string;
}) {
  const atual = indiceStatus(status);

  return (
    <ol className={cn("relative space-y-0", className)}>
      {ETAPAS_STATUS.map((etapa, i) => {
        const concluida = i < atual;
        const emAndamento = i === atual;
        const estado = concluida
          ? "Concluída"
          : emAndamento
            ? "Em andamento"
            : "Pendente";

        return (
          <li key={etapa.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                  concluida || emAndamento
                    ? "border-brand bg-brand text-white"
                    : "border-brand/25 bg-white text-brand/60"
                )}
              >
                {concluida || emAndamento ? (
                  <LuCheck className="size-4" aria-hidden="true" />
                ) : (
                  <LuRefreshCw className="size-4" aria-hidden="true" />
                )}
              </span>
              {i < ETAPAS_STATUS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "w-0.5 flex-1",
                    concluida ? "bg-brand" : "bg-brand/20"
                  )}
                />
              )}
            </div>

            <div className={cn("pb-5", i === ETAPAS_STATUS.length - 1 && "pb-0")}>
              <p className="text-[0.95rem] font-semibold text-navy">
                {etapa.titulo}
                <span className="sr-only"> — {estado}</span>
              </p>
              <p className="text-[0.85rem] text-muted-foreground">
                {carimbos[etapa.id] ?? etapa.detalhe}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
