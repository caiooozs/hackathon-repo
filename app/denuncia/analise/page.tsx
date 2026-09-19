"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";
import { cn } from "@/lib/utils";

const PASSOS = [0, 1, 2, 3];

export default function ReunindoInformacoes() {
  const router = useRouter();
  const { rascunho, pronto, atualizar } = useDenuncia();
  const [concluidos, setConcluidos] = useState(0);
  const terminou = concluidos >= PASSOS.length;

  useEffect(() => {
    if (pronto && !rascunho.modo) router.replace("/denuncia/como");
  }, [pronto, rascunho.modo, router]);

  useEffect(() => {
    if (!pronto || !rascunho.modo) return;

    const id = window.setTimeout(() => {
      if (terminou) {
        atualizar({
          analiseConcluida: true,
          ocorrenciasProximas: 12,
          categoria: rascunho.categoria ?? "vias",
        });
        router.replace("/denuncia/detalhes");
      } else {
        setConcluidos((n) => n + 1);
      }
    }, terminou ? 400 : 1100);

    return () => window.clearTimeout(id);
  }, [pronto, rascunho.modo, rascunho.categoria, concluidos, terminou, atualizar, router]);

  return (
    <Tela>
      <CabecalhoFluxo etapa="analise" voltarPara="/denuncia/local" />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <TituloTela titulo="Reunindo informações" />

        <div
          role="progressbar"
          aria-label="Reunindo informações"
          aria-valuemin={0}
          aria-valuemax={PASSOS.length}
          aria-valuenow={concluidos}
          className="flex items-center"
        >
          {PASSOS.map((i) => {
            const feito = i < concluidos;
            const ativo = i === concluidos;

            return (
              <div key={i} className="flex items-center" aria-hidden="true">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors motion-reduce:transition-none",
                    feito
                      ? "border-brand bg-brand text-white"
                      : "border-brand/40 bg-white"
                  )}
                >
                  {feito ? (
                    <LuCheck className="size-4" strokeWidth={3} />
                  ) : (
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        ativo ? "animate-pulse bg-brand motion-reduce:animate-none" : "bg-transparent"
                      )}
                    />
                  )}
                </span>
                {i < PASSOS.length - 1 && (
                  <span
                    className={cn(
                      "h-0.5 w-8 transition-colors motion-reduce:transition-none",
                      feito ? "bg-brand" : "bg-brand/20"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <p role="status" className="sr-only">
          {terminou
            ? "Informações reunidas. Avançando para os detalhes."
            : "Reunindo informações."}
        </p>
      </div>
    </Tela>
  );
}
