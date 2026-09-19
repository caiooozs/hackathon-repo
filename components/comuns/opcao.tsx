"use client";

import { LuCheck } from "react-icons/lu";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

/**
 * Opção selecionável em formato de cartão.
 * O input nativo é mantido (apenas visualmente oculto) para preservar
 * navegação por teclado, agrupamento e leitura por tecnologias assistivas.
 */
export function Opcao({
  tipo,
  nome,
  valor,
  icone: Icone,
  titulo,
  descricao,
  selecionado,
  onSelect,
}: {
  tipo: "radio" | "checkbox";
  nome: string;
  valor: string;
  icone?: IconType;
  titulo: string;
  descricao?: string;
  selecionado: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={cn(
        "group flex min-h-14 cursor-pointer items-center gap-3.5 rounded-2xl px-4 py-3 transition-colors",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
        selecionado
          ? "bg-brand-soft ring-2 ring-brand"
          : "bg-brand-softer ring-1 ring-brand/10 hover:bg-brand-soft"
      )}
    >
      <input
        type={tipo}
        name={nome}
        value={valor}
        checked={selecionado}
        onChange={onSelect}
        className="sr-only"
      />

      {Icone && (
        <Icone
          className={cn(
            "size-6 shrink-0",
            selecionado ? "text-brand" : "text-navy/70"
          )}
          aria-hidden="true"
        />
      )}

      <span className="flex-1">
        <span className="block text-[0.95rem] font-semibold text-navy">
          {titulo}
        </span>
        {descricao && (
          <span className="block text-[0.8rem] leading-snug text-muted-foreground">
            {descricao}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "flex size-6 shrink-0 items-center justify-center border-2 transition-colors",
          // Formato distingue escolha única (círculo) de múltipla (quadrado).
          tipo === "checkbox" ? "rounded-[7px]" : "rounded-full",
          selecionado
            ? "border-brand bg-brand text-white"
            : "border-navy/20 bg-white"
        )}
      >
        {selecionado && <LuCheck className="size-3.5" strokeWidth={3} />}
      </span>
    </label>
  );
}
