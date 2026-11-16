import type { Metadata } from "next";
import Link from "next/link";

import { List } from "@/components/ui/RichText";
import { RichMath } from "@/components/ui/math";
import {
  Callout,
  Container,
  Eyebrow,
  FormulaBlock,
  Prose,
} from "@/components/ui/primitives";
import { tasks } from "@/content/tasks";
import { theory, type Block } from "@/content/theory";

export const metadata: Metadata = {
  title: "Теория",
  description:
    "Восемь разделов теории: векторы и координаты, скалярное произведение, длина и угол, проекции, метрическая матрица, взаимный базис, координатный метод и расстояние между скрещивающимися прямыми.",
};

function TheoryBlock({ block }: { block: Block }) {
  if (block.kind === "formula") return <FormulaBlock lines={block.lines} />;
  if (block.kind === "list") return <List items={block.items} />;
  if (block.kind === "note")
    return (
      <Callout tone="note" label="Важно">
        <Prose text={block.text} />
      </Callout>
    );

  return <Prose text={block.text} />;
}

export default function TheoryPage() {
  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-3xl">
        <Eyebrow>Теория</Eyebrow>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Минимум теории для варианта 1
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Восемь разделов с определениями и формулами, которые используются в шести задачах:
          скалярное произведение, длины и углы, проекции, метрическая матрица, взаимный базис,
          координатный метод и расстояние между прямыми.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-faint">
          <RichMath text={String.raw`Обозначения: $\vec a^\#$ — вектор взаимного базиса, $\operatorname{np}_{\vec a}\vec b$ — скалярная проекция. Формулы свёрстаны как в учебнике; длинные выражения можно прокрутить по горизонтали.`} />
        </p>
      </header>

      <nav
        aria-label="Разделы теории"
        className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
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
            {section.title}
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
              Перейти к разборам <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          {theory.map((section, index) => {
            const related = tasks.filter((task) => task.theory === section.id);

            return (
              <section
                key={section.id}
                id={section.id}
                className={`scroll-mt-24 ${index > 0 ? "border-t border-line/70 pt-10" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-ink-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                    {section.title}
                  </h2>
                </div>
                <p className="mt-2 border-l border-line pl-3 text-sm leading-relaxed text-ink-faint sm:pl-4">
                  {section.lead}
                </p>

                <div className="mt-5 space-y-4">
                  {section.blocks.map((block, blockIndex) => (
                    <TheoryBlock key={blockIndex} block={block} />
                  ))}
                </div>

                {related.length > 0 ? (
                  <p className="mt-5 flex flex-wrap items-center gap-2 text-[11px] tracking-wide text-ink-faint uppercase">
                    Применяется в:
                    {related.map((task) => (
                      <Link
                        key={task.n}
                        href={`/solutions#${task.slug}`}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium tracking-normal text-ink-soft normal-case transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        Задача {task.n} · {task.title}
                      </Link>
                    ))}
                  </p>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
