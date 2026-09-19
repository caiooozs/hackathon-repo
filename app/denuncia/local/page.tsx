"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { CampoLocal } from "@/components/fluxo/campos";
import { Botao } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";

export default function LocalDaOcorrencia() {
  const router = useRouter();
  const { rascunho, pronto } = useDenuncia();

  useEffect(() => {
    if (pronto && !rascunho.modo) router.replace("/denuncia/como");
  }, [pronto, rascunho.modo, router]);

  const valido = rascunho.endereco.trim().length >= 5;

  return (
    <Tela>
      <CabecalhoFluxo etapa="local" voltarPara="/denuncia/registro" />

      <TituloTela
        titulo="Onde fica o problema?"
        apoio="O endereço é o que permite encaminhar a ocorrência para a equipe certa."
      />

      <CampoLocal />

      <div className="mt-auto space-y-3 pt-4">
        <Botao
          onClick={() => router.push("/denuncia/analise")}
          disabled={!valido}
        >
          Continuar
          <LuArrowRight className="size-5" aria-hidden="true" />
        </Botao>
        <p
          aria-live="polite"
          className="text-center text-[0.8rem] text-muted-foreground"
        >
          {valido
            ? "Vamos reunir as informações do seu registro."
            : "Informe o endereço para continuar."}
        </p>
      </div>
    </Tela>
  );
}
