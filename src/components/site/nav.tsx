"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string; short?: string }[] = [
  { href: "/", label: "Обзор" },
  { href: "/lesson", label: "С нуля", short: "С нуля" },
  { href: "/theory", label: "Теория" },
  { href: "/solutions", label: "Разборы" },
  { href: "/game", label: "Тренажёр", short: "Квиз" },
];

export function SiteNav() {
  const pathname = usePathname() || "/";

  const matches = (href: string) =>
    pathname === href || pathname.endsWith(href) || pathname.endsWith(`${href}/`);

  return (
    <nav aria-label="Основная навигация" className="flex shrink-0 items-center gap-0.5 sm:gap-1">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? !links.some((other) => other.href !== "/" && matches(other.href))
            : matches(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative rounded-md px-2 py-1.5 text-[13px] transition-colors sm:px-3 sm:py-2 sm:text-sm ${
              link.href === "/" ? "hidden sm:block" : ""
            } ${
              active
                ? "text-ink after:absolute after:inset-x-2 after:bottom-0.5 after:h-px after:bg-accent sm:after:inset-x-3"
                : "text-ink-soft hover:bg-white/70 hover:text-ink"
            }`}
          >
            {link.short ? (
              <>
                <span className="sm:hidden">{link.short}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </>
            ) : (
              link.label
            )}
          </Link>
        );
      })}
    </nav>
  );
}
