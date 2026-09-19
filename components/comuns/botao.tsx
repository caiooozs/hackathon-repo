import Link from "next/link";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "contorno" | "texto";

const variantes: Record<Variante, string> = {
  primario:
    "bg-brand text-white shadow-[0_6px_20px_-8px_var(--brand)] hover:bg-brand-hover",
  secundario: "bg-brand-soft text-navy hover:bg-[#dde8ff]",
  contorno: "border-2 border-brand/25 bg-white text-brand hover:bg-brand-softer",
  texto: "text-brand underline-offset-4 hover:underline",
};

/** Alvo de toque de 48px e foco visível, conforme WCAG 2.5.5 / 2.4.7. */
const base =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-2xl px-5 text-[0.95rem] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

export function Botao({
  variante = "primario",
  className,
  ...props
}: React.ComponentProps<"button"> & { variante?: Variante }) {
  return (
    <button
      type="button"
      className={cn(base, variantes[variante], className)}
      {...props}
    />
  );
}

export function BotaoLink({
  variante = "primario",
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variante?: Variante }) {
  return (
    <Link className={cn(base, variantes[variante], className)} {...props} />
  );
}
