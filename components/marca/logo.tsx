import { cn } from "@/lib/utils";

/** Marca "Conecta+": anel azul com núcleo amarelo + assinatura. */
export function Logo({
  className,
  assinatura = true,
  tamanho = "md",
}: {
  className?: string;
  assinatura?: boolean;
  tamanho?: "sm" | "md" | "lg";
}) {
  const simbolo = { sm: "size-8", md: "size-10", lg: "size-12" }[tamanho];
  const texto = {
    sm: "text-sm leading-4",
    md: "text-base leading-5",
    lg: "text-lg leading-6",
  }[tamanho];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className={cn(simbolo, "shrink-0")}
        role="img"
        aria-label="Conecta+"
      >
        <path
          d="M24 4a20 20 0 1 0 14.5 33.7"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M24 14a10 10 0 1 1-8 16"
          fill="none"
          stroke="#5b9bff"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="30" cy="27" r="7.5" fill="var(--yellow)" />
      </svg>
      {assinatura && (
        <span className={cn("font-extrabold tracking-tight text-navy", texto)}>
          Conecta+
        </span>
      )}
    </span>
  );
}

/** Assinatura de rodapé: "Você mostra. A cidade entende." */
export function Assinatura({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 text-center",
        className
      )}
    >
      <Logo tamanho="sm" />
      <span aria-hidden="true" className="hidden h-8 w-px bg-border sm:block" />
      <p className="text-sm font-medium text-navy/80">
        Você mostra. <span className="whitespace-nowrap">A cidade entende.</span>
      </p>
    </div>
  );
}
