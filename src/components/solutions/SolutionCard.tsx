import type { Variant } from "@/content/tasks";

import { Callout, MathText } from "@/components/ui/primitives";
import { RichText } from "@/components/ui/RichText";

function stepWord(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "шаг";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "шага";
  return "шагов";
}

export function SolutionCard({
  variant,
  defaultOpen = false,
}: {
  variant: Variant;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-xl border border-line bg-surface"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-white/50 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-serif text-lg font-semibold tracking-tight">
            Вариант {variant.id}
          </span>
          <span className="text-xs text-ink-faint">
            {variant.steps.length} {stepWord(variant.steps.length)}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-ink-faint transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M4 6.5 8 10.5 12 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>

      <div className="border-t border-line px-4 py-5 sm:px-5 sm:py-6">
        <div className="rounded-lg border border-line bg-paper/60 px-4 py-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Дано
          </p>
          <div className="space-y-1">
            {variant.given.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-ink-soft">
                <MathText text={line} />
              </p>
            ))}
          </div>
        </div>

        <ol className="mt-6 space-y-5">
          {variant.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[1.75rem_1fr] gap-x-3 gap-y-1.5">
              <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full border border-line bg-paper font-mono text-[11px] text-ink-soft">
                {index + 1}
              </span>
              <h4 className="text-sm font-semibold leading-6 text-ink">{step.title}</h4>
              <div className="col-start-2 min-w-0">
                <RichText text={step.body} />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 space-y-3">
          <Callout tone="answer" label="Ответ">
            <ul className="space-y-1">
              {variant.answer.map((line) => (
                <li key={line} className="text-sm leading-relaxed">
                  <MathText text={line} />
                </li>
              ))}
            </ul>
          </Callout>

          {variant.note ? (
            <Callout tone="note" label="Примечание">
              <MathText text={variant.note} />
            </Callout>
          ) : null}
        </div>
      </div>
    </details>
  );
}
