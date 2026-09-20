import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type EntradaProps = ComponentPropsWithoutRef<"div"> & {
  /** Anima os filhos diretos em sequência, em vez do bloco inteiro. */
  sequencia?: boolean;
  atrasoMs?: number;
};

/** Entrada leve em CSS, compatível com páginas de servidor e de cliente. */
export function Entrada({
  sequencia = false,
  atrasoMs = 0,
  className,
  style,
  children,
  ...props
}: EntradaProps) {
  return (
    <div
      {...props}
      className={cn(sequencia ? "entrada-sequencia" : "entrada", className)}
      style={{
        "--entrada-atraso": `${Math.max(0, atrasoMs)}ms`,
        ...style,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
