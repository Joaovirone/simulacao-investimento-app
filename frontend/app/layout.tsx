import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import { DM_Sans, Syne } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "InvestSim — Simulador de Investimentos",
  description: "Simule seus investimentos com inteligência. Visualize o crescimento do seu patrimônio com juros compostos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${syne.variable}`}>
        <ThemeToggle />
        {children}
        <Toaster
          theme="dark"
          richColors
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f1f5f9',
              fontFamily: 'var(--font-dm-sans), sans-serif',
            },
          }}
        />
      </body>
    </html>
  );
}
