import type { Metadata, Viewport } from "next";

import { SiteFooter, SiteHeader } from "@/components/site/chrome";

import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Векторная алгебра — вариант 1: теория и разборы",
    template: "%s — Векторная алгебра",
  },
  description:
    "Скалярное произведение, длины и углы, проекции, метрическая матрица, взаимный базис, координатный метод и расстояние между скрещивающимися прямыми. Восемь разделов теории и шесть задач первого варианта с пошаговыми решениями.",
  keywords: [
    "векторная алгебра",
    "скалярное произведение",
    "взаимный базис",
    "проекция вектора",
    "расстояние между прямыми",
    "координатный метод",
    "вариант 1",
  ],
  openGraph: {
    title: "Векторная алгебра — вариант 1: теория и разборы",
    description:
      "Полный разбор первого варианта индивидуального задания № 2: скалярное произведение, взаимный базис, углы, проекции и расстояние между прямыми.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          К содержанию
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
