"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { LuCheck } from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { CampoAfetados, CampoLocal } from "@/components/fluxo/campos";
import {
  CapturaAudio,
  CapturaFoto,
  CapturaTexto,
} from "@/components/fluxo/capturas";
import { Botao, BotaoLink } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";

/**
 * Edição pontual de um campo, sempre a partir da tela de revisão.
 * As alterações são gravadas no rascunho enquanto o usuário digita, então
 * "Salvar" apenas confirma e devolve o contexto para a revisão.
 */
const CAMPOS = {
  foto: {
    titulo: "Trocar a foto",
    apoio: "Escolha outra imagem que mostre melhor o problema.",
    Editor: CapturaFoto,
  },
  audio: {
    titulo: "Regravar o áudio",
    apoio: "Grave novamente o seu relato. A transcrição é refeita automaticamente.",
    Editor: CapturaAudio,
  },
  descricao: {
    titulo: "Editar a descrição",
    apoio: "Corrija ou complemente o texto identificado pela nossa IA.",
    Editor: CapturaTexto,
  },
  local: {
    titulo: "Ajustar localização",
    apoio: "Confirme o endereço ou digite um ponto de referência mais preciso.",
    Editor: CampoLocal,
  },
  detalhes: {
    titulo: "Adicionar ou remover detalhes",
    apoio: "Quem é mais afetado por esse problema?",
    Editor: CampoAfetados,
  },
} as const;

type Campo = keyof typeof CAMPOS;

export default function EditarCampo() {
  const router = useRouter();
  const { campo } = useParams<{ campo: string }>();

  if (!(campo in CAMPOS)) notFound();
  const { titulo, apoio, Editor } = CAMPOS[campo as Campo];

  return (
    <Tela>
      <CabecalhoFluxo etapa="revisao" voltarPara="/denuncia/editar" />

      <TituloTela titulo={titulo} apoio={apoio} />

      <Editor />

      <div className="mt-auto space-y-3 pt-4">
        <Botao onClick={() => router.push("/denuncia/revisao")}>
          <LuCheck className="size-5" aria-hidden="true" />
          Salvar e voltar para a revisão
        </Botao>
        <BotaoLink href="/denuncia/editar" variante="texto" className="min-h-11">
          Editar outra informação
        </BotaoLink>
      </div>
    </Tela>
  );
}
