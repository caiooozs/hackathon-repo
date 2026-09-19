"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  LuCamera,
  LuMic,
  LuPause,
  LuPlay,
  LuRefreshCw,
  LuTrash2,
  LuUpload,
} from "react-icons/lu";
import { OndaAudio, formatarDuracao } from "@/components/fluxo/onda-audio";
import { Botao } from "@/components/comuns/botao";
import { useDenuncia } from "@/lib/denuncia-store";

export const LIMITE_TEXTO = 500;

/* ------------------------------------------------------------------ Foto */

export function CapturaFoto() {
  const { rascunho, atualizar } = useDenuncia();
  const inputRef = useRef<HTMLInputElement>(null);
  const [erro, setErro] = useState("");

  function selecionar(arquivo?: File) {
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) {
      setErro("Escolha um arquivo de imagem (JPG, PNG ou HEIC).");
      return;
    }
    if (arquivo.size > 6 * 1024 * 1024) {
      setErro("A imagem precisa ter no máximo 6 MB.");
      return;
    }
    setErro("");
    const leitor = new FileReader();
    leitor.onload = () =>
      atualizar({
        fotoDataUrl: String(leitor.result),
        fotoNome: arquivo.name,
        titulo: rascunho.titulo || "Buraco na via",
        descricao:
          rascunho.descricao ||
          "Buraco na via, atrapalhando a passagem de veículos.",
        categoria: rascunho.categoria ?? "vias",
      });
    leitor.readAsDataURL(arquivo);
  }

  return (
    <section className="space-y-3">
      <input
        ref={inputRef}
        id="foto"
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-describedby="foto-ajuda"
        onChange={(e) => selecionar(e.target.files?.[0])}
      />

      {rascunho.fotoDataUrl ? (
        <figure className="overflow-hidden rounded-2xl ring-1 ring-border">
          <Image
            src={rascunho.fotoDataUrl}
            alt={`Foto enviada por você: ${rascunho.fotoNome ?? "registro da ocorrência"}`}
            width={800}
            height={600}
            unoptimized
            className="h-56 w-full object-cover"
          />
          <figcaption className="flex items-center justify-between gap-2 bg-white p-2.5">
            <span className="truncate text-[0.8rem] text-muted-foreground">
              {rascunho.fotoNome}
            </span>
            <span className="flex gap-1">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-[0.82rem] font-semibold text-brand hover:bg-brand-soft"
              >
                <LuRefreshCw className="size-4" aria-hidden="true" />
                Trocar
              </button>
              <button
                type="button"
                onClick={() => atualizar({ fotoDataUrl: null, fotoNome: null })}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-[0.82rem] font-semibold text-[var(--danger)] hover:bg-red-50"
              >
                <LuTrash2 className="size-4" aria-hidden="true" />
                Remover
              </button>
            </span>
          </figcaption>
        </figure>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-56 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand/30 bg-brand-softer p-6 text-center hover:bg-brand-soft"
        >
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-white">
            <LuCamera className="size-7" aria-hidden="true" />
          </span>
          <span className="text-[0.95rem] font-semibold text-navy">
            Tirar foto ou escolher da galeria
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.82rem] text-muted-foreground">
            <LuUpload className="size-4" aria-hidden="true" />
            JPG, PNG ou HEIC até 6 MB
          </span>
        </button>
      )}

      <p id="foto-ajuda" className="text-[0.8rem] text-muted-foreground">
        Evite incluir rostos ou placas de veículos na imagem.
      </p>
      {erro && (
        <p role="alert" className="text-[0.82rem] font-medium text-[var(--danger)]">
          {erro}
        </p>
      )}
    </section>
  );
}

/* ----------------------------------------------------------------- Áudio */

export function CapturaAudio() {
  const { rascunho, atualizar } = useDenuncia();
  const [gravando, setGravando] = useState(false);
  const [segundos, setSegundos] = useState(rascunho.audioSegundos ?? 0);

  // Simulação de gravação: o protótipo não acessa o microfone do dispositivo.
  useEffect(() => {
    if (!gravando) return;
    const id = window.setInterval(() => {
      setSegundos((s) => (s >= 60 ? s : s + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [gravando]);

  function parar() {
    setGravando(false);
    atualizar({
      audioSegundos: segundos || 8,
      transcricao: "Buraco grande na via, está dificultando a passagem.",
      titulo: rascunho.titulo || "Buraco na via",
      descricao:
        rascunho.descricao ||
        "Buraco na via, atrapalhando a passagem de veículos.",
      categoria: rascunho.categoria ?? "vias",
    });
  }

  const temGravacao = !!rascunho.audioSegundos && !gravando;

  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-brand-softer p-5 ring-1 ring-brand/10">
        <div className="flex items-center gap-3">
          <span
            className={
              "flex size-12 shrink-0 items-center justify-center rounded-full " +
              (gravando ? "bg-[var(--danger)] text-white" : "bg-brand text-white")
            }
            aria-hidden="true"
          >
            {gravando ? (
              <LuPause className="size-5" />
            ) : (
              <LuPlay className="size-5" />
            )}
          </span>
          <OndaAudio
            animada={gravando}
            progresso={gravando ? Math.min(segundos / 60, 1) : 1}
          />
          <span className="text-[0.85rem] font-semibold tabular-nums text-navy">
            {formatarDuracao(segundos)}
          </span>
        </div>

        <p
          role="status"
          aria-live="polite"
          className="mt-3 text-[0.85rem] text-muted-foreground"
        >
          {gravando
            ? `Gravando… ${formatarDuracao(segundos)} de 01:00.`
            : temGravacao
              ? `Áudio de ${formatarDuracao(segundos)} pronto para envio.`
              : "Nenhum áudio gravado ainda."}
        </p>
      </div>

      {gravando ? (
        <Botao variante="secundario" onClick={parar}>
          <LuPause className="size-5" aria-hidden="true" />
          Parar gravação
        </Botao>
      ) : (
        <Botao
          variante={temGravacao ? "contorno" : "primario"}
          onClick={() => {
            setSegundos(0);
            setGravando(true);
          }}
        >
          <LuMic className="size-5" aria-hidden="true" />
          {temGravacao ? "Regravar áudio" : "Começar a gravar"}
        </Botao>
      )}

      {temGravacao && (
        <p className="rounded-2xl bg-white p-3.5 text-[0.85rem] leading-relaxed text-muted-foreground ring-1 ring-border">
          <span className="font-semibold text-navy">
            Transcrição automática:{" "}
          </span>
          “{rascunho.transcricao}”
        </p>
      )}
    </section>
  );
}

/* ----------------------------------------------------------------- Texto */

export function CapturaTexto() {
  const { rascunho, atualizar } = useDenuncia();
  const texto = rascunho.descricao;
  const restante = LIMITE_TEXTO - texto.length;

  return (
    <section className="space-y-2">
      <label
        htmlFor="relato"
        className="block text-[0.95rem] font-bold text-navy"
      >
        O que está acontecendo?
      </label>
      <textarea
        id="relato"
        rows={7}
        maxLength={LIMITE_TEXTO}
        value={texto}
        aria-describedby="relato-ajuda relato-contador"
        onChange={(e) =>
          atualizar({
            descricao: e.target.value,
            titulo: rascunho.titulo || "Ocorrência relatada por texto",
            categoria: rascunho.categoria ?? "vias",
          })
        }
        placeholder="Ex.: Buraco na via, atrapalhando a passagem de veículos."
        className="w-full resize-y rounded-2xl bg-brand-softer p-4 text-[0.95rem] leading-relaxed text-navy ring-1 ring-brand/15 placeholder:text-muted-foreground/70"
      />
      <div className="flex items-start justify-between gap-3">
        <p id="relato-ajuda" className="text-[0.8rem] text-muted-foreground">
          Mínimo de 10 caracteres. Inclua pontos de referência, se souber.
        </p>
        <p
          id="relato-contador"
          aria-live="polite"
          className="shrink-0 text-[0.8rem] tabular-nums text-muted-foreground"
        >
          {texto.length}/{LIMITE_TEXTO}
          <span className="sr-only"> caracteres ({restante} restantes)</span>
        </p>
      </div>
    </section>
  );
}
