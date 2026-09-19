import { cn } from "@/lib/utils";

/** Pontos fictícios de ocorrências próximas (posição em % do quadro). */
const PONTOS = [
  { x: 18, y: 26, cor: "#e8543a" },
  { x: 62, y: 18, cor: "#f5b301" },
  { x: 80, y: 34, cor: "#e8543a" },
  { x: 30, y: 58, cor: "#e8543a" },
  { x: 72, y: 62, cor: "#f5b301" },
  { x: 22, y: 82, cor: "#2fa855" },
  { x: 55, y: 88, cor: "#2fa855" },
  { x: 88, y: 74, cor: "#e8543a" },
];

function Ruas() {
  return (
    <g stroke="#dfe4ee" strokeWidth="2.5" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="300" height="200" fill="#eef1f6" stroke="none" />
      <path d="M0 46h300M0 104h300M0 156h300" />
      <path d="M52 0v200M126 0v200M204 0v200M262 0v200" />
      <path d="M0 8 84 0" strokeWidth="6" stroke="#e3e8f0" />
      <path
        d="M236 0c-14 44 8 78 -22 110 -18 20 -6 60 -30 90"
        strokeWidth="7"
        stroke="#cfe0f5"
      />
      <rect x="140" y="112" width="44" height="30" fill="#e4ecdf" stroke="none" />
      <rect x="18" y="14" width="26" height="22" fill="#e4ecdf" stroke="none" />
    </g>
  );
}

/**
 * Representação ilustrativa do mapa da região. Não é um mapa navegável — o
 * conteúdo equivalente é sempre oferecido em texto ao lado da imagem.
 */
export function Mapa({
  variante = "radar",
  legenda,
  className,
  descricao,
}: {
  variante?: "radar" | "calor";
  legenda?: React.ReactNode;
  className?: string;
  descricao: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl ring-1 ring-border/80",
        className
      )}
    >
      <div className="relative">
        <svg
          viewBox="0 0 300 200"
          className="block h-full w-full"
          role="img"
          aria-label={descricao}
        >
          <Ruas />

          {PONTOS.map((p, i) => (
            <circle
              key={i}
              cx={(p.x / 100) * 300}
              cy={(p.y / 100) * 200}
              r="5"
              fill={p.cor}
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}

          {variante === "radar" ? (
            <g>
              <circle cx="150" cy="100" r="74" fill="var(--brand)" opacity="0.10" />
              <circle cx="150" cy="100" r="50" fill="var(--brand)" opacity="0.14" />
              <circle cx="150" cy="100" r="28" fill="var(--brand)" opacity="0.20" />
              <circle
                cx="150"
                cy="100"
                r="12"
                fill="var(--brand)"
                stroke="#fff"
                strokeWidth="4"
              />
            </g>
          ) : (
            <g>
              <circle cx="150" cy="100" r="78" fill="#e8543a" opacity="0.12" />
              <circle cx="150" cy="100" r="54" fill="#e8543a" opacity="0.18" />
              <circle cx="150" cy="100" r="32" fill="#e8543a" opacity="0.28" />
              <circle
                cx="150"
                cy="100"
                r="17"
                fill="#d92d20"
                stroke="#fff"
                strokeWidth="3"
              />
              <path
                d="M150 92.5 156.5 105h-13z"
                fill="#fff"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </g>
          )}
        </svg>

        {legenda}
      </div>
    </figure>
  );
}

/** Selo sobreposto ao mapa (ex.: "12 denúncias nesta região"). */
export function SeloMapa({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1.5 text-[0.8rem] font-bold text-navy shadow-md">
      {children}
    </span>
  );
}
