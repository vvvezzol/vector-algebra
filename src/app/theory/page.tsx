import type { Metadata } from "next";
import Link from "next/link";

import { Callout, Container, Eyebrow, FormulaBlock, MathText } from "@/components/ui/primitives";
import { List } from "@/components/ui/RichText";
import { tasks } from "@/content/tasks";
import { theory, type Block } from "@/content/theory";

export const metadata: Metadata = {
  title: "Теория",
  description:
    "Десять разделов теории к контрольной по векторной алгебре: базис и координаты, скалярное, векторное и смешанное произведение, ориентация, матрица Грама, аффинные координаты, декартовы координаты, матрица перехода.",
};

function TheoryBlock({ block }: { block: Block }) {
  if (block.kind === "formula") return <FormulaBlock lines={block.lines} />;
  if (block.kind === "list") return <List items={block.items} />;
  if (block.kind === "note")
    return (
      <Callout tone="note" label="Важно">
        <MathText text={block.text} />
      </Callout>
    );

  return <p className="text-[15px] leading-relaxed text-ink-soft"><MathText text={block.text} /></p>;
}

export default function TheoryPage() {
  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-3xl">
        <Eyebrow>Теория</Eyebrow>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Минимум теории для этих восьми заданий
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Без полного курса: только определения, формулы и признаки, которые действительно
          используются в решениях. Каждый раздел связан с конкретными номерами контрольной.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-faint">
          Формулы отображаются аккуратной математической вёрсткой. Обозначения: (a, b, c) —
          смешанное произведение, [a, b] — векторное, a·b — скалярное.
        </p>
      </header>

      <nav
        aria-label="Разделы теории"
        className="mt-8 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {theory.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="shrink-0 rounded-full border border-line bg-surface px-3 py-1.5 text-xs whitespace-nowrap text-ink-soft"
          >
            <span className="mr-1.5 font-mono text-[10px] text-ink-faint">
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.title.split(":")[0]}
          </a>
        ))}
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Разделы
            </p>
            <ol className="mt-3 space-y-1 border-l border-line">
              {theory.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px flex gap-2.5 border-l border-transparent py-1.5 pl-3 text-sm leading-snug text-ink-soft transition-colors hover:border-accent hover:text-ink"
                  >
                    <span className="font-mono text-[10px] leading-5 text-ink-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href="/solutions"
              className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-accent hover:underline"
            >
              Перейти к решениям <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          {theory.map((section, index) => {
            const related = tasks.filter((task) => task.theory === section.id);

            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 font-mono text-xs tracking-[0.2em] text-ink-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem]">
                      {section.title}
                    </h2>
                    <p className="mt-2 border-l-2 border-accent/30 pl-3 text-sm leading-relaxed text-ink-soft">
                      {section.lead}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {section.blocks.map((block, blockIndex) => (
                    <TheoryBlock key={blockIndex} block={block} />
                  ))}
                </div>

                {related.length > 0 ? (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                      Применяется в:
                    </span>
                    {related.map((task) => (
                      <Link
                        key={task.n}
                        href={`/solutions#${task.slug}`}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-ink"
                      >
                        Задание {task.n} · {task.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
