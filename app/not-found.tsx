import type { Metadata } from "next";
import { LuHouse, LuPlus } from "react-icons/lu";
import { Logo } from "@/components/marca/logo";
import { BotaoLink } from "@/components/comuns/botao";
import { Tela, TituloTela } from "@/components/comuns/tela";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NaoEncontrada() {
  return (
    <Tela className="gap-6">
      <header className="py-2">
        <Logo />
      </header>

      <TituloTela
        titulo="Página não encontrada"
        apoio="O endereço que você tentou abrir não existe ou foi movido."
      />

      <div className="mt-auto space-y-3 pt-4">
        <BotaoLink href="/denuncia/como">
          <LuPlus className="size-5" aria-hidden="true" />
          Registrar uma ocorrência
        </BotaoLink>
        <BotaoLink href="/" variante="contorno">
          <LuHouse className="size-5" aria-hidden="true" />
          Voltar para o início
        </BotaoLink>
      </div>
    </Tela>
  );
}
