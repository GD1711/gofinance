import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { HeroUIProvider } from "@heroui/react";
import Sidebar from '@/ui/components/Sidebar';
import "./globals.css";

export const metadata: Metadata = {
  title: "GOFinance - Previsão Financeira Inteligente",
  description: "Preveja, equilibre e melhore sua saúde financeira com clareza e inteligência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <head>
        <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js" type="module"></script>
      </head>
      <body>
        <HeroUIProvider>
          {/* Desktop Sidebar */}
          <Sidebar />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
