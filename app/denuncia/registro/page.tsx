"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuArrowRight } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import {
  CapturaAudio,
  CapturaFoto,
  CapturaTexto,
} from "@/components/fluxo/capturas";
import { Botao } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";

const TEXTOS = {
  foto: {
    titulo: "Mostre o problema",
    apoio:
      "Uma foto nítida do local ajuda a equipe a entender a situação mais rápido.",
  },
  audio: {
    titulo: "Conte o que está acontecendo",
    apoio:
      "Grave um áudio de até 1 minuto. Nós transcrevemos e organizamos a informação.",
  },
  texto: {
    titulo: "Descreva a ocorrência",
    apoio: "Escreva com suas palavras. Não existe resposta errada.",
  },
} as const;

export default function Registro() {
  const router = useRouter();
  const { rascunho, pronto } = useDenuncia();
  const modo = rascunho.modo ?? "foto";

  // Sem formato escolhido não há o que registrar: volta ao início do fluxo.
  useEffect(() => {
    if (pronto && !rascunho.modo) router.replace("/denuncia/como");
  }, [pronto, rascunho.modo, router]);

  const preenchido =
    (modo === "foto" && !!rascunho.fotoDataUrl) ||
    (modo === "audio" && !!rascunho.audioSegundos) ||
    (modo === "texto" && rascunho.descricao.trim().length >= 10);

  return (
    <Tela>
      <CabecalhoFluxo etapa="registro" voltarPara="/denuncia/como" />
      <TituloTela titulo={TEXTOS[modo].titulo} apoio={TEXTOS[modo].apoio} />

      {modo === "foto" && <CapturaFoto />}
      {modo === "audio" && <CapturaAudio />}
      {modo === "texto" && <CapturaTexto />}

      <div className="mt-auto space-y-3 pt-4">
        <Botao
          onClick={() => router.push("/denuncia/local")}
          disabled={!preenchido}
        >
          Continuar
          <LuArrowRight className="size-5" aria-hidden="true" />
        </Botao>
      </div>
    </Tela>
  );
}
