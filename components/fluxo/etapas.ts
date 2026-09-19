/** Ordem das telas do fluxo de registro, usada pela barra de progresso. */
export const ETAPAS_FLUXO = [
  { id: "como", rota: "/denuncia/como", nome: "Forma de registro" },
  { id: "registro", rota: "/denuncia/registro", nome: "Evidência" },
  { id: "local", rota: "/denuncia/local", nome: "Localização" },
  { id: "analise", rota: "/denuncia/analise", nome: "Reunindo informações" },
  { id: "detalhes", rota: "/denuncia/detalhes", nome: "Detalhes" },
  { id: "revisao", rota: "/denuncia/revisao", nome: "Revisão" },
  { id: "enviada", rota: "/denuncia/enviada", nome: "Envio" },
] as const;

export type EtapaId = (typeof ETAPAS_FLUXO)[number]["id"];

export const TOTAL_ETAPAS = ETAPAS_FLUXO.length;

export function numeroDaEtapa(id: EtapaId) {
  return ETAPAS_FLUXO.findIndex((e) => e.id === id) + 1;
}

export function etapaAnterior(id: EtapaId) {
  const i = ETAPAS_FLUXO.findIndex((e) => e.id === id);
  return i > 0 ? ETAPAS_FLUXO[i - 1] : null;
}
