import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Pierre Ménès — Pierrot le foot",
  description: "Journaliste & consultant foot. Débriefs, mercato, lives — tous les contenus de Pierre Ménès au même endroit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
