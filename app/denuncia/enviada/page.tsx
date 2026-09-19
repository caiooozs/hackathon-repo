"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuCheck, LuHouse, LuMap, LuPlus } from "react-icons/lu";
import { LinhaTempo } from "@/components/fluxo/linha-tempo";
import { Mapa, SeloMapa } from "@/components/fluxo/mapa";
import { BotaoLink } from "@/components/comuns/botao";
import { Tela } from "@/components/comuns/tela";
import { useDenuncia } from "@/lib/denuncia-store";
import { CATEGORIAS, formatarDataHora } from "@/lib/tipos";

export default function OcorrenciaRecebida() {
  const router = useRouter();
  const { ultima, pronto } = useDenuncia();

  // Acesso direto à URL sem nenhum envio nesta sessão: volta para o início.
  useEffect(() => {
    if (pronto && !ultima) router.replace("/");
  }, [pronto, ultima, router]);

  if (!ultima) return null;

  return (
    <Tela className="gap-6">
      <div className="flex flex-col items-center pt-8 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_-10px_var(--brand)]">
          <LuCheck className="size-10" strokeWidth={3} aria-hidden="true" />
        </span>

        <h1 className="mt-5 text-[1.75rem] leading-[1.15] font-extrabold tracking-tight text-navy text-balance">
          Ocorrência recebida com sucesso!
        </h1>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground text-pretty">
          Sua denúncia já está com a Prefeitura e será encaminhada para{" "}
          <strong className="font-semibold text-navy">
            {CATEGORIAS[ultima.categoria].orgao}
          </strong>
          .
        </p>
      </div>

      <div className="rounded-2xl bg-brand-softer p-4 text-center ring-1 ring-brand/10">
        <p className="text-[0.78rem] font-semibold tracking-wide text-muted-foreground uppercase">
          Número do protocolo
        </p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight text-navy tabular-nums">
          #{ultima.protocolo}
        </p>
        <p className="mt-1 text-[0.8rem] text-muted-foreground">
          Registrada em {formatarDataHora(ultima.criadaEm)} · {ultima.endereco}
          {ultima.bairro && `, ${ultima.bairro}`}
        </p>
      </div>

      <p role="status" className="sr-only">
        Ocorrência recebida com sucesso sob o protocolo {ultima.protocolo}.
      </p>

      {ultima.ocorrenciasProximas > 0 && (
        <Mapa
          variante="calor"
          descricao={`Mapa de calor em torno de ${ultima.endereco}, indicando concentração de denúncias semelhantes.`}
          legenda={<SeloMapa>{ultima.ocorrenciasProximas} denúncias</SeloMapa>}
        />
      )}

      <section aria-labelledby="proximos-passos" className="space-y-3">
        <h2 id="proximos-passos" className="text-[0.95rem] font-bold text-navy">
          O que acontece agora
        </h2>
        <LinhaTempo
          status={ultima.status}
          carimbos={{ recebida: formatarDataHora(ultima.criadaEm) }}
        />
      </section>

      <p className="rounded-2xl bg-white p-3.5 text-[0.82rem] leading-snug text-muted-foreground ring-1 ring-border">
        Guarde o número do protocolo: com ele você consulta o andamento em
        qualquer canal do Conecta Recife.
      </p>

      <div className="mt-auto space-y-3 pt-2">
        <BotaoLink href="/denuncia/como">
          <LuPlus className="size-5" aria-hidden="true" />
          Registrar outra ocorrência
        </BotaoLink>
        <BotaoLink href="/mapa" variante="contorno">
          <LuMap className="size-5" aria-hidden="true" />
          Ver mapa de ocorrências
        </BotaoLink>
        <BotaoLink href="/" variante="texto" className="min-h-11">
          <LuHouse className="size-4" aria-hidden="true" />
          Voltar para o início
        </BotaoLink>
      </div>
    </Tela>
  );
}
