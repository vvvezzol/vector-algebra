import katex from "katex";
import { Fragment } from "react";

/** Render a LaTeX expression. Display mode is used for standalone formulas. */
export function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  if (display) {
    return (
      <div
        className="overflow-x-auto py-0.5 text-ink-soft"
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(tex, {
            displayMode: true,
            throwOnError: false,
            strict: false,
            trust: false,
          }),
        }}
      />
    );
  }

  return (
    <span
      className="inline-math"
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode: false,
          throwOnError: false,
          strict: false,
          trust: false,
        }),
      }}
    />
  );
}

/** Render prose that may contain inline math delimited by single dollars. */
export function RichMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.length > 2 && part.startsWith("$") && part.endsWith("$")) {
          return <Tex key={index} tex={part.slice(1, -1)} />;
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
