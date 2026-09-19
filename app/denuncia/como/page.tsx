"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuArrowRight, LuCamera, LuMic, LuType } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { Botao } from "@/components/comuns/botao";
import { Opcao } from "@/components/comuns/opcao";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";
import type { ModoRegistro } from "@/lib/tipos";

const OPCOES: {
  id: ModoRegistro;
  icone: typeof LuCamera;
  titulo: string;
  descricao: string;
}[] = [
  {
    id: "foto",
    icone: LuCamera,
    titulo: "Enviar uma foto",
    descricao: "A forma mais rápida: a imagem já mostra o problema.",
  },
  {
    id: "audio",
    icone: LuMic,
    titulo: "Gravar um áudio",
    descricao: "Fale o que está acontecendo. Nós transcrevemos para você.",
  },
  {
    id: "texto",
    icone: LuType,
    titulo: "Escrever um texto",
    descricao: "Descreva com suas palavras, sem formulário complicado.",
  },
];

export default function ComoRegistrar() {
  const router = useRouter();
  const { rascunho, reiniciar } = useDenuncia();
  const [modo, setModo] = useState<ModoRegistro | null>(rascunho.modo);

  function continuar() {
    if (!modo) return;
    reiniciar(modo);
    router.push("/denuncia/registro");
  }

  return (
    <Tela>
      <CabecalhoFluxo etapa="como" voltarPara="/" />

      <TituloTela
        titulo="Como você quer registrar?"
        apoio="Escolha o formato mais confortável para você. Todos levam ao mesmo lugar."
      />

      <fieldset className="space-y-2.5">
        <legend className="mb-2.5 text-[0.95rem] font-bold text-navy">
          Formato do registro
        </legend>
        {OPCOES.map((o) => (
          <Opcao
            key={o.id}
            tipo="radio"
            nome="modo"
            valor={o.id}
            icone={o.icone}
            titulo={o.titulo}
            descricao={o.descricao}
            selecionado={modo === o.id}
            onSelect={() => setModo(o.id)}
          />
        ))}
      </fieldset>

      <div className="mt-auto space-y-3 pt-4">
        <Botao onClick={continuar} disabled={!modo}>
          Continuar
          <LuArrowRight className="size-5" aria-hidden="true" />
        </Botao>
        <p aria-live="polite" className="text-center text-[0.8rem] text-muted-foreground">
          {modo
            ? "Você poderá revisar e alterar tudo antes de enviar."
            : "Selecione um formato para continuar."}
        </p>
      </div>
    </Tela>
  );
}
