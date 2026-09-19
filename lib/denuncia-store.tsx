"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  AfetadoId,
  CategoriaId,
  Denuncia,
  ModoRegistro,
} from "@/lib/tipos";

/** Rascunho da denúncia em construção ao longo do fluxo de registro. */
export interface Rascunho {
  modo: ModoRegistro | null;
  titulo: string;
  descricao: string;
  transcricao: string;
  endereco: string;
  bairro: string;
  localAutomatico: boolean;
  categoria: CategoriaId | null;
  afetados: AfetadoId[];
  fotoDataUrl: string | null;
  fotoNome: string | null;
  audioSegundos: number | null;
  ocorrenciasProximas: number;
  analiseConcluida: boolean;
}

export const RASCUNHO_VAZIO: Rascunho = {
  modo: null,
  titulo: "",
  descricao: "",
  transcricao: "",
  endereco: "",
  bairro: "",
  localAutomatico: true,
  categoria: null,
  afetados: [],
  fotoDataUrl: null,
  fotoNome: null,
  audioSegundos: null,
  ocorrenciasProximas: 0,
  analiseConcluida: false,
};

interface Store {
  rascunho: Rascunho;
  pronto: boolean;
  /** Última ocorrência enviada nesta sessão. */
  ultima: Denuncia | null;
  atualizar: (dados: Partial<Rascunho>) => void;
  reiniciar: (modo?: ModoRegistro) => void;
  enviar: () => Denuncia;
}

const CHAVE_RASCUNHO = "rr:rascunho";
const CHAVE_ULTIMA = "rr:ultima";

const StoreContext = createContext<Store | null>(null);

function ler<T>(chave: string, padrao: T): T {
  if (typeof window === "undefined") return padrao;
  try {
    const bruto = window.sessionStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
}

function gravar(chave: string, valor: unknown) {
  try {
    window.sessionStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* modo privado / storage bloqueado: o fluxo segue apenas em memória */
  }
}

export function DenunciaProvider({ children }: { children: React.ReactNode }) {
  const [rascunho, setRascunho] = useState<Rascunho>(RASCUNHO_VAZIO);
  const [ultima, setUltima] = useState<Denuncia | null>(null);
  // Evita divergência entre HTML do servidor e estado restaurado no cliente.
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    // Reidratação única a partir do sessionStorage. Não pode acontecer no
    // primeiro render porque o HTML do servidor não tem acesso ao storage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRascunho(ler(CHAVE_RASCUNHO, RASCUNHO_VAZIO));
    setUltima(ler<Denuncia | null>(CHAVE_ULTIMA, null));
    setPronto(true);
  }, []);

  const atualizar = useCallback((dados: Partial<Rascunho>) => {
    setRascunho((anterior) => {
      const novo = { ...anterior, ...dados };
      gravar(CHAVE_RASCUNHO, novo);
      return novo;
    });
  }, []);

  const reiniciar = useCallback((modo?: ModoRegistro) => {
    const novo: Rascunho = { ...RASCUNHO_VAZIO, modo: modo ?? null };
    gravar(CHAVE_RASCUNHO, novo);
    setRascunho(novo);
  }, []);

  const enviar = useCallback((): Denuncia => {
    const protocolo = String(4287000 + Math.floor(Math.random() * 999));
    const denuncia: Denuncia = {
      protocolo,
      modo: rascunho.modo ?? "texto",
      titulo: rascunho.titulo || "Ocorrência registrada",
      descricao: rascunho.descricao,
      endereco: rascunho.endereco,
      bairro: rascunho.bairro,
      categoria: rascunho.categoria ?? "outro",
      afetados: rascunho.afetados,
      fotoDataUrl: rascunho.fotoDataUrl ?? undefined,
      audioSegundos: rascunho.audioSegundos ?? undefined,
      criadaEm: new Date().toISOString(),
      status: "recebida",
      ocorrenciasProximas: rascunho.ocorrenciasProximas,
    };
    gravar(CHAVE_ULTIMA, denuncia);
    setUltima(denuncia);
    return denuncia;
  }, [rascunho]);

  const valor = useMemo(
    () => ({ rascunho, pronto, ultima, atualizar, reiniciar, enviar }),
    [rascunho, pronto, ultima, atualizar, reiniciar, enviar]
  );

  return <StoreContext value={valor}>{children}</StoreContext>;
}

export function useDenuncia() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useDenuncia precisa estar dentro de <DenunciaProvider>");
  }
  return ctx;
}
