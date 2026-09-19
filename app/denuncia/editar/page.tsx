"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuCamera,
  LuChevronRight,
  LuListChecks,
  LuMapPin,
  LuMic,
  LuSquarePen,
} from "react-icons/lu";
import { CabecalhoFluxo } from "@/components/fluxo/cabecalho-fluxo";
import { BotaoLink } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";

interface OpcaoEdicao {
  href: string;
  icone: IconType;
  titulo: string;
  descricao: string;
}

export default function HubEdicao() {
  const { rascunho } = useDenuncia();

  const opcoes: OpcaoEdicao[] = [
    ...(rascunho.modo === "foto"
      ? [
          {
            href: "/denuncia/editar/foto",
            icone: LuCamera,
            titulo: "Trocar a foto",
            descricao: "Escolher outra imagem",
          },
        ]
      : []),
    ...(rascunho.modo === "audio"
      ? [
          {
            href: "/denuncia/editar/audio",
            icone: LuMic,
            titulo: "Regravar o áudio",
            descricao: "Gravar novamente",
          },
        ]
      : []),
    {
      href: "/denuncia/editar/descricao",
      icone: LuSquarePen,
      titulo: "Editar a descrição",
      descricao: "Corrigir ou complementar o texto",
    },
    {
      href: "/denuncia/editar/local",
      icone: LuMapPin,
      titulo: "Ajustar localização",
      descricao: "Mover no mapa ou digitar o endereço",
    },
    {
      href: "/denuncia/editar/detalhes",
      icone: LuListChecks,
      titulo: "Adicionar ou remover detalhes",
      descricao: "Ex.: tipo de via, veículo, risco etc.",
    },
  ];

  return (
    <Tela>
      <CabecalhoFluxo etapa="revisao" voltarPara="/denuncia/revisao" />

      <TituloTela
        titulo="Editar informação"
        apoio="O que você deseja alterar?"
      />

      <nav aria-label="Opções de edição">
        <ul className="space-y-2.5">
          {opcoes.map(({ href, icone: Icone, titulo, descricao }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex min-h-16 items-center gap-3.5 rounded-2xl bg-brand-softer px-4 py-3 ring-1 ring-brand/10 transition-colors hover:bg-brand-soft"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand ring-1 ring-brand/15">
                  <Icone className="size-5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-[0.95rem] font-semibold text-navy">
                    {titulo}
                  </span>
                  <span className="block text-[0.8rem] leading-snug text-muted-foreground">
                    {descricao}
                  </span>
                </span>
                <LuChevronRight
                  className="size-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4">
        <BotaoLink href="/denuncia/revisao" variante="contorno">
          Voltar para a revisão
        </BotaoLink>
      </div>
    </Tela>
  );
}
