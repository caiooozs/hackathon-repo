import { cn } from "@/lib/utils";
import { Entrada } from "./entrada";

/**
 * Coluna central mobile-first. Em telas grandes a interface continua com a
 * largura de leitura confortável, centralizada sobre o fundo institucional.
 */
export function Tela({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Entrada
      sequencia
      className={cn(
        "mx-auto flex w-full max-w-[30rem] flex-1 flex-col gap-5 px-5 pt-3 pb-10",
        className
      )}
    >
      {children}
    </Entrada>
  );
}

export function TituloTela({
  titulo,
  apoio,
  id = "titulo-tela",
}: {
  titulo: React.ReactNode;
  apoio?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="space-y-2">
      <h1
        id={id}
        className="text-[1.75rem] leading-[1.15] font-extrabold tracking-tight text-navy text-balance"
      >
        {titulo}
      </h1>
      {apoio && (
        <p className="text-[0.95rem] leading-relaxed text-muted-foreground text-pretty">
          {apoio}
        </p>
      )}
    </div>
  );
}

/** Aviso recorrente nas telas de revisão. */
export function AvisoOrgao({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 text-[0.8rem] leading-snug text-muted-foreground",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="mt-px size-5 shrink-0" aria-hidden="true">
        <path
          d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.5 7.5 10 4.4-1.5 7.5-5.4 7.5-10v-6Z"
          fill="var(--brand-soft)"
          stroke="var(--brand)"
          strokeWidth="1.5"
        />
        <path
          d="m8.6 11.8 2.3 2.3 4.5-4.6"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        Você não precisa escolher o órgão responsável. Nós fazemos isso por você.
      </span>
    </p>
  );
}
