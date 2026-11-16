import type { Metadata, Viewport } from "next";

import { SiteFooter, SiteHeader } from "@/components/site/chrome";

import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Векторная алгебра — теория и решения контрольной",
    template: "%s — Векторная алгебра",
  },
  description:
    "Теория по векторной алгебре, фото задания и пошаговые решения восьми номеров: базис и координаты, параллелограмм, параметр t, смешанное произведение, матрица Грама, треугольник и пирамида, объём, две системы координат.",
  keywords: [
    "векторная алгебра",
    "аналитическая геометрия",
    "контрольная работа",
    "базис",
    "смешанное произведение",
    "матрица Грама",
    "матрица перехода",
  ],
  openGraph: {
    title: "Векторная алгебра — теория и решения контрольной",
    description:
      "Восемь заданий с разбором: от координат в базисе до матрицы перехода между системами координат.",
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
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
