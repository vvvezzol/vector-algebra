import Link from "next/link";

const links = [
  { href: "/", label: "Обзор" },
  { href: "/theory", label: "Теория" },
  { href: "/solutions", label: "Решения" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent font-mono text-sm font-semibold text-paper sm:h-9 sm:w-9">
            ā
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-serif text-sm font-semibold tracking-tight sm:text-[15px]">
              Векторная алгебра
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:block">
              контрольная · 8 заданий
            </span>
          </span>
        </Link>

        <nav
          aria-label="Основная навигация"
          className="flex shrink-0 items-center gap-0.5 sm:gap-2"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-1.5 text-[13px] text-ink-soft transition-colors hover:bg-white/70 hover:text-ink sm:px-3 sm:py-2 sm:text-sm ${
                link.href === "/" ? "hidden sm:block" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          Аналитическая геометрия и векторная алгебра · контрольное задание, вариант&nbsp;1.
        </p>
        <p className="font-mono text-xs">
          данные и расчёты — в <span className="text-ink-soft">src/content/tasks.ts</span>
        </p>
      </div>
    </footer>
  );
}
