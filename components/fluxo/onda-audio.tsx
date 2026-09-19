import { cn } from "@/lib/utils";

/** Alturas fixas: a "onda" é decorativa e não representa dados reais. */
const BARRAS = [
  8, 14, 22, 30, 18, 26, 34, 20, 12, 28, 36, 24, 16, 30, 22, 12, 20, 32, 26, 14,
  10, 24, 34, 18, 26, 14, 8, 20, 28, 16,
];

export function OndaAudio({
  className,
  progresso = 1,
  animada = false,
}: {
  className?: string;
  /** Fração de 0 a 1 das barras destacadas. */
  progresso?: number;
  animada?: boolean;
}) {
  const limite = Math.round(BARRAS.length * progresso);

  return (
    <span
      aria-hidden="true"
      className={cn("flex h-9 flex-1 items-center gap-[3px]", className)}
    >
      {BARRAS.map((altura, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full",
            i < limite ? "bg-brand" : "bg-brand/25",
            animada && "animate-pulse"
          )}
          style={{
            height: `${altura}px`,
            animationDelay: animada ? `${i * 40}ms` : undefined,
          }}
        />
      ))}
    </span>
  );
}

export function formatarDuracao(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
