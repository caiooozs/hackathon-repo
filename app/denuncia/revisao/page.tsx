"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  LuFileText,
  LuMailCheck,
  LuMapPin,
  LuPlay,
  LuPlus,
  LuSquarePen,
} from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { OndaAudio, formatarDuracao } from "@/components/fluxo/onda-audio";
import { Botao, BotaoLink } from "@/components/comuns/botao";
import { AvisoOrgao, Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";
import { AFETADOS, CATEGORIAS } from "@/lib/tipos";

export default function Revisao() {
  const router = useRouter();
  const { rascunho, pronto, enviar } = useDenuncia();
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (pronto && !rascunho.modo) router.replace("/denuncia/como");
  }, [pronto, rascunho.modo, router]);

  function enviarDenuncia() {
    setEnviando(true);
    enviar();
    router.push("/denuncia/enviada");
  }

  const adicionais =
    rascunho.afetados.length > 0
      ? rascunho.afetados.map((a) => AFETADOS[a]).join(", ")
      : "Nenhum";

  return (
    <Tela>
      <CabecalhoFluxo etapa="revisao" voltarPara="/denuncia/detalhes" />

      <TituloTela
        titulo="Está tudo certo?"
        apoio="Revise as informações antes de enviar."
      />

      {rascunho.modo === "foto" && <ResumoFoto />}
      {rascunho.modo === "audio" && <ResumoAudio />}
      {rascunho.modo === "texto" && <ResumoTexto />}

      <dl className="divide-y divide-border">
        <ItemRevisao
          icone={LuMapPin}
          rotulo="Localização"
          valor={
            rascunho.endereco
              ? `${rascunho.endereco}${rascunho.bairro ? ` — ${rascunho.bairro}, Recife - PE` : ""}`
              : "Detectada automaticamente"
          }
          editarEm="/denuncia/editar/local"
        />
        <ItemRevisao
          icone={LuFileText}
          rotulo="Descrição"
          valor={rascunho.descricao || "Sem descrição"}
          editarEm="/denuncia/editar/descricao"
        />
        <ItemRevisao
          icone={LuPlus}
          rotulo="Adicionais"
          valor={adicionais}
          editarEm="/denuncia/editar/detalhes"
        />
      </dl>

      <div className="space-y-3 pt-1">
        <Botao onClick={enviarDenuncia} disabled={enviando}>
          <LuMailCheck className="size-5" aria-hidden="true" />
          {enviando ? "Enviando…" : "Enviar ocorrência"}
        </Botao>

        <BotaoLink href="/denuncia/editar" variante="texto" className="min-h-11">
          <LuSquarePen className="size-4" aria-hidden="true" />
          Editar outra informação
        </BotaoLink>

        <AvisoOrgao />

        <p className="text-center text-[0.78rem] text-muted-foreground">
          A ocorrência será encaminhada para{" "}
          <strong className="font-semibold text-navy">
            {CATEGORIAS[rascunho.categoria ?? "outro"].orgao}
          </strong>
          .
        </p>
      </div>
    </Tela>
  );
}

/* --------------------------------------------------------------- Blocos */

function ItemRevisao({
  icone: Icone,
  rotulo,
  valor,
  editarEm,
}: {
  icone: IconType;
  rotulo: string;
  valor: string;
  editarEm: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Icone className="size-[1.1rem]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-[0.95rem] font-bold text-navy">{rotulo}</dt>
        <dd className="text-[0.85rem] leading-snug text-muted-foreground">
          {valor}
        </dd>
      </div>
      <Link
        href={editarEm}
        className="inline-flex min-h-11 shrink-0 items-center rounded-xl px-2.5 text-[0.85rem] font-semibold text-brand hover:bg-brand-soft"
      >
        Editar
        <span className="sr-only"> {rotulo.toLowerCase()}</span>
      </Link>
    </div>
  );
}

function ResumoFoto() {
  const { rascunho } = useDenuncia();

  return (
    <section className="flex gap-3.5">
      {rascunho.fotoDataUrl ? (
        <Image
          src={rascunho.fotoDataUrl}
          alt={`Foto enviada por você: ${rascunho.fotoNome ?? "registro da ocorrência"}`}
          width={220}
          height={220}
          unoptimized
          className="size-24 shrink-0 rounded-2xl object-cover ring-1 ring-border"
        />
      ) : (
        <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-brand-softer text-[0.7rem] text-muted-foreground ring-1 ring-border">
          Sem foto
        </div>
      )}
      <div className="min-w-0">
        <h2 className="text-[1.05rem] font-bold text-navy">
          {rascunho.titulo || "Ocorrência"}
        </h2>
        <p className="text-[0.85rem] leading-snug text-muted-foreground">
          {rascunho.endereco}
          {rascunho.bairro && (
            <>
              <br />
              {rascunho.bairro}, Recife - PE
            </>
          )}
        </p>
        <Link
          href="/denuncia/editar/foto"
          className="mt-1 inline-flex min-h-11 items-center text-[0.85rem] font-semibold text-brand hover:underline"
        >
          Editar foto
        </Link>
      </div>
    </section>
  );
}

function ResumoAudio() {
  const { rascunho } = useDenuncia();

  return (
    <section className="rounded-2xl bg-brand-softer p-4 ring-1 ring-brand/10">
      <div className="flex items-center gap-3">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white"
          aria-hidden="true"
        >
          <LuPlay className="size-5" />
        </span>
        <OndaAudio />
        <span className="text-[0.85rem] font-semibold tabular-nums text-navy">
          {formatarDuracao(rascunho.audioSegundos ?? 0)}
        </span>
      </div>
      <Link
        href="/denuncia/editar/audio"
        className="mt-2 inline-flex min-h-11 items-center text-[0.85rem] font-semibold text-brand hover:underline"
      >
        Ouvir novamente ou regravar
      </Link>
      {rascunho.transcricao && (
        <p className="mt-1 text-[0.82rem] leading-snug text-muted-foreground">
          <span className="font-semibold text-navy">Transcrição: </span>“
          {rascunho.transcricao}”
        </p>
      )}
    </section>
  );
}

function ResumoTexto() {
  const { rascunho } = useDenuncia();

  return (
    <section className="rounded-2xl bg-brand-softer p-4 ring-1 ring-brand/10">
      <h2 className="sr-only">Relato enviado</h2>
      <p className="text-[0.95rem] leading-relaxed text-navy">
        {rascunho.descricao}
      </p>
      <p className="mt-2 text-right text-[0.78rem] tabular-nums text-muted-foreground">
        {rascunho.descricao.length}/500
        <span className="sr-only"> caracteres usados</span>
      </p>
    </section>
  );
}
