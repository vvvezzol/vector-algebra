import type { ReactNode } from "react";
import katex from "katex";

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

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" }) {
  const styles =
    tone === "accent"
      ? "bg-accent-soft text-accent-ink border-accent/20"
      : "bg-white/70 text-ink-soft border-line";
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
      ? "border-accent/25 bg-accent-soft/70 text-accent-ink"
      : "border-warn-line bg-warn-soft text-warn-ink";
  return (
    <div className={`rounded-lg border px-4 py-3 ${styles}`}>
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-75">{label}</p>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

export function FormulaBlock({ lines }: { lines: string[] }) {
  const formulas = lines.map((line) => toLatex(line));

  return (
    <div className="my-2 overflow-x-auto rounded-md border border-line bg-white/60 px-3 py-2.5 text-ink-soft sm:px-4">
      <div className="min-w-max space-y-1.5 text-[15px] sm:text-base" aria-label={lines.join("; ")}>
        {formulas.map((formula, index) => (
          <div
            key={`${formula}-${index}`}
            className="[&_.katex]:whitespace-nowrap"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(formula, {
                displayMode: true,
                throwOnError: false,
                strict: false,
              }),
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Typeset mathematical fragments without turning surrounding Russian prose into math. */
export function MathText({ text }: { text: string }) {
  const parts = text.split(/([А-Яа-яЁё]+(?:[ -][А-Яа-яЁё]+)*|—)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (/[А-Яа-яЁё]/.test(part) || !/[A-Za-zΑ-Ωα-ω=√∠⊥∥]/.test(part) || /(?:src|public)\//.test(part)) {
          return part;
        }

        const [, before, expression, after] = part.match(/^(\s*)([\s\S]*?)([\s.:!?]*)$/)!;
        if (!expression) return part;

        return (
          <span key={index}>
            {before}
            <span
              className="inline-math"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(toLatex(expression), {
                  displayMode: false,
                  throwOnError: false,
                  strict: false,
                  trust: false,
                }),
              }}
            />
            {after}
          </span>
        );
      })}
    </>
  );
}

/** Convert the compact notation used in the content files to readable LaTeX. */
function toLatex(value: string) {
  let formula = value
    .replaceAll("·", " \\cdot ")
    .replaceAll("×", " \\times ")
    .replaceAll("∥", " \\parallel ")
    .replaceAll("⊥", " \\perp ")
    .replaceAll("≠", " \\ne ")
    .replaceAll("≈", " \\approx ")
    .replaceAll("≥", " \\ge ")
    .replaceAll("≤", " \\le ")
    .replaceAll("⇒", " \\Rightarrow ")
    .replaceAll("⇔", " \\Longleftrightarrow ")
    .replaceAll("∞", "\\infty")
    .replaceAll("½", "\\frac{1}{2}")
    .replaceAll("₁", "_{1}")
    .replaceAll("₂", "_{2}")
    .replaceAll("₃", "_{3}");

  formula = formula
    .replaceAll("−", "-")
    .replaceAll("₀", "_{0}")
    .replaceAll("⁻¹", "^{-1}")
    .replaceAll("²", "^{2}")
    .replaceAll("³", "^{3}")
    .replaceAll("∈", " \\in ")
    .replaceAll("∪", " \\cup ")
    .replaceAll("∠", "\\angle ")
    .replaceAll("°", "^{\\circ}");

  formula = formula.replace(/√([A-Za-zА-Яа-я0-9]+)/g, "\\sqrt{$1}");
  formula = formula.replace(/\b(-?\d+)\/(\d+)\b/g, "\\frac{$1}{$2}");
  formula = formula.replace(/\^([0-9]+)/g, "^{$1}");
  formula = formula.replace(/\b(sin|cos|det)\b/g, "\\$1");
  formula = formula.replace(/\s*[А-Яа-яЁё]+(?:\s+[А-Яа-яЁё]+)*\s*/g, (text) => `\\text{${text}}`);

  return formula;
}
