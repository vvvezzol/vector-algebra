import { Fragment, type ReactNode } from "react";

import { FormulaBlock, MathText } from "./primitives";

type Chunk = { type: "p"; text: string } | { type: "f"; lines: string[] };

/** Строки с префиксом `$$` — блоки формул; остальные — текст с inline-формулами. */
export function parseChunks(text: string): Chunk[] {
  const chunks: Chunk[] = [];

  for (const raw of text.split("\n")) {
    const isFormula = raw.startsWith("$$");
    const value = (isFormula ? raw.slice(2) : raw).trim();
    if (!value) continue;

    const last = chunks[chunks.length - 1];
    if (isFormula) {
      if (last && last.type === "f") {
        last.lines.push(value);
      } else {
        chunks.push({ type: "f", lines: [value] });
      }
    } else {
      chunks.push({ type: "p", text: value });
    }
  }

  return chunks;
}

export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const chunks = parseChunks(text);

  return (
    <div className={`space-y-2 ${className}`}>
      {chunks.map((chunk, index) => (
        <Fragment key={index}>
          {chunk.type === "p" ? (
            <p className="text-[15px] leading-relaxed text-ink-soft"><MathText text={chunk.text} /></p>
          ) : (
            <FormulaBlock lines={chunk.lines} />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
          <span>{typeof item === "string" ? <MathText text={item} /> : item}</span>
        </li>
      ))}
    </ul>
  );
}
