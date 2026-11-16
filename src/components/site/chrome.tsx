import Link from "next/link";

import { SiteClock } from "./clock";
import { SiteNav } from "./nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent font-mono text-[10px] font-semibold text-paper shadow-[0_1px_0_rgba(23,20,15,0.08)] transition-colors group-hover:bg-accent-ink sm:h-9 sm:w-9 sm:text-xs">
            a·b
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-serif text-sm font-semibold tracking-tight sm:text-[15px]">
              Векторная алгебра
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:block">
              Вариант 1 · задание № 2
            </span>
          </span>
        </Link>

        <SiteNav />
      </div>

      <SiteClock />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Векторная алгебра · индивидуальное задание № 2 · первый вариант.</p>
        <p className="text-xs">6 задач с решениями · 8 разделов теории</p>
      </div>
    </footer>
  );
}
