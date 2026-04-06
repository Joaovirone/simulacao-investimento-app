// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'; // <-- 1. Adicione esta importação

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvestSim",
  description: "Simulador de Investimentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        {/* 2. Adicione o Toaster aqui para ele aparecer em todo o site */}
        <Toaster richColors position="top-right" /> 
      </body>
    </html>
  );
}