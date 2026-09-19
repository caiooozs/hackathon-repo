import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { DenunciaProvider } from "@/lib/denuncia-store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Recife Resolvendo",
    template: "%s · Recife Resolvendo",
  },
  description:
    "Registre problemas urbanos em poucos toques e acompanhe cada etapa do atendimento. Você mostra. A cidade entende.",
};

export const viewport: Viewport = {
  themeColor: "#1552f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={cn("h-full antialiased", poppins.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-xl focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo principal
        </a>
        <DenunciaProvider>
          <main id="conteudo" className="flex flex-1 flex-col">
            {children}
          </main>
        </DenunciaProvider>
      </body>
    </html>
  );
}
