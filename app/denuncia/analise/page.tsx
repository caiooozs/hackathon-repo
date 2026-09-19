"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuArrowRight, LuCheck, LuMapPin } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { Mapa } from "@/components/fluxo/mapa";
import { Botao } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";
import { cn } from "@/lib/utils";

const PASSOS = [
  "Analisando o conteúdo",
  "Identificando o tipo de ocorrência",
  "Verificando o local",
  "Buscando ocorrências próximas",
];

export default function Analise() {
  const router = useRouter();
  const { rascunho, pronto, atualizar } = useDenuncia();
  const [concluidos, setConcluidos] = useState(0);
  const botaoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pronto && !rascunho.modo) router.replace("/denuncia/como");
  }, [pronto, rascunho.modo, router]);

  useEffect(() => {
    if (concluidos >= PASSOS.length) return;
    const id = window.setTimeout(() => setConcluidos((n) => n + 1), 1100);
    return () => window.clearTimeout(id);
  }, [concluidos]);

  const terminou = concluidos >= PASSOS.length;

  useEffect(() => {
    if (!terminou) return;
    atualizar({
      analiseConcluida: true,
      ocorrenciasProximas: 12,
      categoria: rascunho.categoria ?? "vias",
    });
    botaoRef.current?.focus();
    // `atualizar` e `rascunho.categoria` são estáveis o suficiente aqui:
    // o efeito só precisa rodar na transição para o estado concluído.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminou]);

  return (
    <Tela>
      <CabecalhoFluxo etapa="analise" voltarPara="/denuncia/local" />

      <TituloTela
        titulo={
          terminou ? (
            "Tudo analisado!"
          ) : (
            <>
              Estamos entendendo
              <br />o problema…
            </>
          )
        }
        apoio={
          terminou
            ? "Encontramos ocorrências parecidas perto do local informado."
            : "Nossa IA está analisando as informações e verificando ocorrências próximas."
        }
      />

      <ol className="space-y-0" aria-label="Progresso da análise">
        {PASSOS.map((passo, i) => {
          const feito = i < concluidos;
          const ativo = i === concluidos;
          return (
            <li key={passo} className="flex items-start gap-3.5">
              <div className="flex flex-col items-center self-stretch">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    feito
                      ? "border-brand bg-brand text-white"
                      : "border-brand/40 bg-white"
                  )}
                >
                  {feito ? (
                    <LuCheck className="size-4" strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        ativo ? "animate-pulse bg-brand" : "bg-transparent"
                      )}
                      aria-hidden="true"
                    />
                  )}
                </span>
                {i < PASSOS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-0.5 flex-1",
                      feito ? "bg-brand" : "bg-brand/20"
                    )}
                  />
                )}
              </div>
              <p
                className={cn(
                  "pb-4 text-[0.95rem] font-medium",
                  feito || ativo ? "text-navy" : "text-muted-foreground"
                )}
              >
                {passo}
                <span className="sr-only">
                  {" "}
                  — {feito ? "concluído" : ativo ? "em andamento" : "aguardando"}
                </span>
              </p>
            </li>
          );
        })}
      </ol>

      <p role="status" aria-live="polite" className="sr-only">
        {terminou
          ? "Análise concluída. Encontramos 12 denúncias em um raio de 300 metros."
          : `Etapa ${concluidos + 1} de 4: ${PASSOS[Math.min(concluidos, 3)]}.`}
      </p>

      <Mapa
        variante="radar"
        descricao={`Mapa ilustrativo em torno de ${rascunho.endereco || "sua localização"}, mostrando ocorrências registradas num raio de 300 metros.`}
      />

      <p className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 text-[0.88rem] leading-snug text-navy ring-1 ring-border">
        <LuMapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
        {terminou
          ? "12 denúncias parecidas em um raio de 300 m — isso aumenta a prioridade do seu registro."
          : "Procurando ocorrências em um raio de 300 m…"}
      </p>

      <div className="mt-auto pt-4">
        <Botao
          ref={botaoRef}
          onClick={() => router.push("/denuncia/detalhes")}
          disabled={!terminou}
        >
          Continuar
          <LuArrowRight className="size-5" aria-hidden="true" />
        </Botao>
      </div>
    </Tela>
  );
}
