import { Fragment, type ReactNode } from "react";

import { RichMath, Tex } from "./math";
import { FormulaBlock } from "./primitives";

type Token = { type: "text" | "inline" | "display"; value: string };

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      tokens.push({ type: "text", value: text.slice(last, match.index) });
    }
    if (match[1] !== undefined) {
      tokens.push({ type: "display", value: match[1].trim() });
    } else {
      tokens.push({ type: "inline", value: match[2] });
    }
    last = pattern.lastIndex;
  }

  if (last < text.length) {
    tokens.push({ type: "text", value: text.slice(last) });
  }

  return tokens;
}

function Line({ text }: { text: string }) {
  const tokens = tokenize(text);
  const blocks: ReactNode[] = [];
  let paragraph: ReactNode[] = [];

  const flush = () => {
    if (paragraph.length === 0) return;
    blocks.push(
      <p key={blocks.length} className="text-[15px] leading-relaxed text-ink-soft">
        {paragraph}
      </p>,
    );
    paragraph = [];
  };

  tokens.forEach((token, index) => {
    if (token.type === "display") {
      flush();
      blocks.push(
        <div
          key={blocks.length}
          className="my-2 overflow-x-auto rounded-lg border border-line/80 bg-white/55 px-3 py-2 text-ink-soft sm:px-4"
        >
          <Tex tex={token.value} display />
        </div>,
      );
      return;
    }

    if (token.type === "inline") {
      paragraph.push(<Tex key={index} tex={token.value} />);
      return;
    }

    paragraph.push(<Fragment key={index}>{token.value}</Fragment>);
  });

  flush();

  return <>{blocks}</>;
}

/** Prose with `$...$` inline math and `$$...$$` display formulas. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {text
        .split("\n")
        .filter((line) => line.trim())
        .map((line, index) => (
          <Line key={index} text={line} />
        ))}
    </div>
  );
}

/** Kept for theory blocks that already separate formulas into their own lines. */
export function FormulaLines({ lines }: { lines: string[] }) {
  return <FormulaBlock lines={lines} />;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/45" />
          <span>
            <RichMath text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function InlineList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
