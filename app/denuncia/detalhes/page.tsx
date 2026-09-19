"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { CampoAfetados } from "@/components/fluxo/campos";
import { Botao } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";

export default function Detalhes() {
  const router = useRouter();
  const { rascunho, pronto } = useDenuncia();

  useEffect(() => {
    if (pronto && !rascunho.modo) router.replace("/denuncia/como");
  }, [pronto, rascunho.modo, router]);

  const selecionados = rascunho.afetados.length;

  return (
    <Tela>
      <CabecalhoFluxo etapa="detalhes" voltarPara="/denuncia/local" />

      <TituloTela
        titulo={
          <>
            Só mais uma
            <br />
            informação
          </>
        }
        apoio="Isso nos ajuda a encaminhar para o setor correto e a definir a prioridade."
      />

      <CampoAfetados />

      <div className="mt-auto space-y-3 pt-4">
        <Botao
          onClick={() => router.push("/denuncia/revisao")}
          disabled={selecionados === 0}
        >
          Continuar
          <LuArrowRight className="size-5" aria-hidden="true" />
        </Botao>
        <p
          aria-live="polite"
          className="text-center text-[0.8rem] text-muted-foreground"
        >
          {selecionados === 0
            ? "Escolha ao menos uma opção para continuar."
            : `${selecionados} ${selecionados === 1 ? "opção selecionada" : "opções selecionadas"}.`}
        </p>
      </div>
    </Tela>
  );
}
