import type { ReactNode } from "react";

import { RichMath, Tex } from "./math";

type Tag = "div" | "section" | "main" | "article" | "aside";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  id,
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: Tag;
}) {
  return (
    <Tag id={id} className={`py-12 sm:py-16 ${className}`}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent";
}) {
  const styles =
    tone === "accent"
      ? "bg-accent-soft/80 text-accent-ink border-accent/25"
      : "bg-paper/80 text-ink-soft border-line";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}

export function Callout({
  children,
  tone = "answer",
  label,
}: {
  children: ReactNode;
  tone?: "answer" | "note";
  label: string;
}) {
  const styles =
    tone === "answer"
      ? "border-accent/25 border-l-[3px] border-l-accent/60 bg-accent-soft/70 text-accent-ink"
      : "border-warn-line border-l-[3px] border-l-warn-ink/35 bg-warn-soft text-warn-ink";
  return (
    <div className={`rounded-lg border px-4 py-3 ${styles}`}>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em]">{label}</p>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

/** A boxed system of display formulas. Each string is raw LaTeX. */
export function FormulaBlock({ lines }: { lines: string[] }) {
  return (
    <div className="my-2 max-w-full overflow-x-auto rounded-lg border border-line/80 bg-white/55 px-3 py-2.5 text-ink-soft sm:px-4">
      <div className="min-w-max space-y-1.5 text-[15px] sm:text-base">
        {lines.map((line, index) => (
          <Tex key={`${line}-${index}`} tex={line} display />
        ))}
      </div>
    </div>
  );
}

export function Prose({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`text-[15px] leading-relaxed text-ink-soft ${className}`}>
      <RichMath text={text} />
    </p>
  );
}
