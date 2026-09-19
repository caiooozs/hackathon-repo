/**
 * Tipos e dados de domínio do Recife Resolvendo.
 *
 * O produto cobre a jornada descrita na documentação (seção 10): identificar o
 * problema, registrar, informar local/evidências e enviar a manifestação.
 */

export type ModoRegistro = "foto" | "audio" | "texto";

/** Categorias derivadas das áreas temáticas do Painel de Controle Social. */
export type CategoriaId =
  | "vias"
  | "iluminacao"
  | "limpeza"
  | "agua"
  | "arborizacao"
  | "ordem"
  | "outro";

export type AfetadoId =
  | "veiculos"
  | "pedestres"
  | "acessibilidade"
  | "risco"
  | "nao-sei";

export type StatusDenuncia =
  | "recebida"
  | "analise"
  | "encaminhada"
  | "atendimento"
  | "concluida";

export interface Denuncia {
  protocolo: string;
  modo: ModoRegistro;
  titulo: string;
  descricao: string;
  endereco: string;
  bairro: string;
  categoria: CategoriaId;
  afetados: AfetadoId[];
  fotoDataUrl?: string;
  audioSegundos?: number;
  criadaEm: string;
  status: StatusDenuncia;
  ocorrenciasProximas: number;
}

export const CATEGORIAS: Record<CategoriaId, { nome: string; orgao: string }> = {
  vias: { nome: "Vias e pavimentação", orgao: "Secretaria de Infraestrutura" },
  iluminacao: { nome: "Iluminação pública", orgao: "Autarquia de Manutenção" },
  limpeza: { nome: "Limpeza urbana", orgao: "Emlurb" },
  agua: { nome: "Água e drenagem", orgao: "Secretaria de Saneamento" },
  arborizacao: { nome: "Arborização", orgao: "Secretaria de Meio Ambiente" },
  ordem: { nome: "Ordem pública", orgao: "Secretaria de Ordem Pública" },
  outro: { nome: "Outros", orgao: "Triagem da Ouvidoria" },
};

export const AFETADOS: Record<AfetadoId, string> = {
  veiculos: "Veículos",
  pedestres: "Pedestres",
  acessibilidade: "Acessibilidade",
  risco: "Oferece risco imediato",
  "nao-sei": "Não sei dizer",
};

export const ETAPAS_STATUS: {
  id: StatusDenuncia;
  titulo: string;
  detalhe: string;
}[] = [
  { id: "recebida", titulo: "Denúncia recebida", detalhe: "Registro confirmado" },
  { id: "analise", titulo: "Em análise", detalhe: "Identificando e priorizando" },
  { id: "encaminhada", titulo: "Encaminhada", detalhe: "Órgão responsável definido" },
  { id: "atendimento", titulo: "Atendimento", detalhe: "Equipe em campo" },
  { id: "concluida", titulo: "Conclusão", detalhe: "Você será notificado" },
];

export function indiceStatus(status: StatusDenuncia) {
  return ETAPAS_STATUS.findIndex((e) => e.id === status);
}

export function formatarData(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatarDataHora(iso: string) {
  const d = new Date(iso);
  return `${formatarData(iso)} · ${d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
