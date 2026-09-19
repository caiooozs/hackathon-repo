"use client";

import { useState } from "react";
import {
  LuAccessibility,
  LuCar,
  LuCircleHelp,
  LuFootprints,
  LuLocateFixed,
  LuMapPin,
  LuTriangleAlert,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { Mapa } from "@/components/fluxo/mapa";
import { Botao } from "@/components/comuns/botao";
import { Opcao } from "@/components/comuns/opcao";
import { useDenuncia } from "@/lib/denuncia-store";
import { AFETADOS, type AfetadoId } from "@/lib/tipos";

/* ------------------------------------------------- Detalhes (afetados) */

const ICONES: Record<AfetadoId, IconType> = {
  veiculos: LuCar,
  pedestres: LuFootprints,
  acessibilidade: LuAccessibility,
  risco: LuTriangleAlert,
  "nao-sei": LuCircleHelp,
};

const ORDEM: AfetadoId[] = [
  "veiculos",
  "pedestres",
  "acessibilidade",
  "risco",
  "nao-sei",
];

export function CampoAfetados() {
  const { rascunho, atualizar } = useDenuncia();

  function alternar(id: AfetadoId) {
    const atuais = rascunho.afetados;
    // "Não sei dizer" é exclusivo: convive mal com qualquer outra resposta.
    if (id === "nao-sei") {
      atualizar({ afetados: atuais.includes(id) ? [] : ["nao-sei"] });
      return;
    }
    const semDesconhecido = atuais.filter((a) => a !== "nao-sei");
    atualizar({
      afetados: semDesconhecido.includes(id)
        ? semDesconhecido.filter((a) => a !== id)
        : [...semDesconhecido, id],
    });
  }

  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-2.5 text-[0.95rem] font-bold text-navy">
        Esse problema está atrapalhando:
        <span className="block text-[0.8rem] font-normal text-muted-foreground">
          Selecione quantas opções quiser.
        </span>
      </legend>

      {ORDEM.map((id) => (
        <Opcao
          key={id}
          tipo="checkbox"
          nome="afetados"
          valor={id}
          icone={ICONES[id]}
          titulo={AFETADOS[id]}
          selecionado={rascunho.afetados.includes(id)}
          onSelect={() => alternar(id)}
        />
      ))}
    </fieldset>
  );
}

/* --------------------------------------------------------- Localização */

const ENDERECO_DETECTADO = "Av. Conde da Boa Vista";
const BAIRRO_DETECTADO = "Boa Vista";

export function CampoLocal({ comMapa = true }: { comMapa?: boolean }) {
  const { rascunho, atualizar } = useDenuncia();
  const [detectando, setDetectando] = useState(false);
  const [aviso, setAviso] = useState("");

  const valido = rascunho.endereco.trim().length >= 5;

  function detectar() {
    setDetectando(true);
    setAviso("");
    // Protótipo: substitui a chamada real de geolocalização do dispositivo.
    window.setTimeout(() => {
      atualizar({
        endereco: ENDERECO_DETECTADO,
        bairro: BAIRRO_DETECTADO,
        localAutomatico: true,
      });
      setDetectando(false);
      setAviso(
        `Localização detectada: ${ENDERECO_DETECTADO}, ${BAIRRO_DETECTADO}.`
      );
    }, 900);
  }

  return (
    <div className="space-y-4">
      {comMapa && (
        <Mapa
          variante="radar"
          descricao={
            valido
              ? `Mapa ilustrativo com o ponto da ocorrência em ${rascunho.endereco}, bairro ${rascunho.bairro || "não informado"}.`
              : "Mapa ilustrativo da região. Nenhum ponto confirmado ainda."
          }
        />
      )}

      <Botao variante="contorno" onClick={detectar} disabled={detectando}>
        <LuLocateFixed className="size-5" aria-hidden="true" />
        {detectando ? "Detectando…" : "Usar minha localização atual"}
      </Botao>

      <p role="status" aria-live="polite" className="sr-only">
        {aviso}
      </p>

      <div className="space-y-4 rounded-2xl bg-brand-softer p-4 ring-1 ring-brand/10">
        <div className="space-y-1.5">
          <label
            htmlFor="endereco"
            className="flex items-center gap-2 text-[0.9rem] font-bold text-navy"
          >
            <LuMapPin className="size-4 text-brand" aria-hidden="true" />
            Endereço ou ponto de referência
          </label>
          <input
            id="endereco"
            type="text"
            autoComplete="street-address"
            value={rascunho.endereco}
            aria-describedby="endereco-ajuda"
            aria-invalid={!valido && rascunho.endereco.length > 0}
            onChange={(e) =>
              atualizar({ endereco: e.target.value, localAutomatico: false })
            }
            placeholder="Ex.: Av. Conde da Boa Vista, 1200"
            className="min-h-12 w-full rounded-xl bg-white px-3.5 text-[0.95rem] text-navy ring-1 ring-border placeholder:text-muted-foreground/70"
          />
          <p id="endereco-ajuda" className="text-[0.78rem] text-muted-foreground">
            Pode ser a rua, um cruzamento ou um comércio conhecido por perto.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="bairro" className="text-[0.9rem] font-bold text-navy">
            Bairro
          </label>
          <input
            id="bairro"
            type="text"
            value={rascunho.bairro}
            onChange={(e) => atualizar({ bairro: e.target.value })}
            placeholder="Ex.: Boa Vista"
            className="min-h-12 w-full rounded-xl bg-white px-3.5 text-[0.95rem] text-navy ring-1 ring-border placeholder:text-muted-foreground/70"
          />
        </div>
      </div>
    </div>
  );
}
