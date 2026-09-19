# Recife Resolvendo

> Você mostra. A cidade entende.

Protótipo funcional do desafio **Recriando Recife — Fragmentação do Tratamento de
Denúncias Recebidas via Conecta Recife**.

A aplicação melhora o fluxo de registro do cidadão para que o dado que chega à
Prefeitura já venha estruturado: com geolocalização, data/hora, categoria
sugerida e contexto de recorrência na região (requisitos preliminares RP-01 a
RP-06 da documentação em `references/documentation.pdf`).

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
```

## Mapa de telas

| Rota | Tela | Observação |
| --- | --- | --- |
| `/` | Início | Apresentação, atalhos para registrar e acompanhar |
| `/denuncia/como` | Etapa 1 — Formato | Foto, áudio ou texto |
| `/denuncia/registro` | Etapa 2 — Evidência | Captura conforme o formato escolhido |
| `/denuncia/local` | Etapa 3 — Localização | Detecção automática + ajuste manual |
| `/denuncia/analise` | Etapa 4 — Análise | Processamento da IA e busca de ocorrências próximas |
| `/denuncia/detalhes` | Etapa 5 — Detalhes | Quem é afetado pelo problema |
| `/denuncia/revisao` | Etapa 6 — Revisão | "Está tudo certo?" — varia por formato |
| `/denuncia/editar` | Hub de edição | "O que você deseja alterar?" |
| `/denuncia/editar/[campo]` | Edição pontual | `foto`, `audio`, `descricao`, `local`, `detalhes` |
| `/denuncia/enviada` | Ocorrência recebida | Protocolo, mapa de calor e próximos passos |
| `/mapa` | Mapa de ocorrências | Recorte real do Painel de Controle Social (set./2025) |
| `not-found` | 404 | Página de erro em português |

O hub de edição mostra apenas as opções que fazem sentido para o formato
registrado — quem enviou texto não vê "Regravar o áudio".

## Decisões

- **Next.js 16 (App Router) + Tailwind v4.** Tokens da marca em `app/globals.css`
  (`--brand`, `--navy`, `--yellow`).
- **Ícones:** [`react-icons`](https://react-icons.github.io/react-icons/), conjunto
  Lucide (`react-icons/lu`).
- **Estado do rascunho:** contexto React em `lib/denuncia-store.tsx`, persistido em
  `sessionStorage` — o usuário pode voltar, editar e recarregar sem perder o
  registro. Após o envio, guarda apenas a última ocorrência, exibida na tela de
  confirmação.
- **Mapas:** SVG ilustrativo (`components/fluxo/mapa.tsx`), sem dependência de
  serviço externo. O conteúdo equivalente é sempre descrito em texto.
- **Áudio e geolocalização** são simulados: o protótipo não acessa microfone nem
  GPS do dispositivo.

## Acessibilidade

- Idioma `pt-BR`, link "pular para o conteúdo", foco sempre visível.
- Progresso do fluxo com `role="progressbar"` e texto "Etapa X de Y".
- Inputs nativos de rádio/checkbox por trás dos cartões, preservando teclado e
  leitores de tela; formato do indicador distingue escolha única de múltipla.
- Estados e mudanças assíncronas anunciados via `aria-live` / `role="status"`.
- Alvos de toque de no mínimo 44–48 px e respeito a `prefers-reduced-motion`.
- Os próximos passos na tela de confirmação são lidos como lista ordenada, com o
  estado de cada etapa em texto — não apenas por cor ou ícone.

## Fontes de dados

Painel de Controle Social da Prefeitura do Recife (natureza "Denúncia",
2025/set): 676 denúncias, 41 dias de tempo médio de resposta, distribuição por
bairro usada em `/mapa`.
