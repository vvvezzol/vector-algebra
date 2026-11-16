import Image from "next/image";
import Link from "next/link";

import { HeroFigure } from "@/components/ui/Diagrams";
import { Badge, Container, Eyebrow, Section, MathText } from "@/components/ui/primitives";
import { tasks } from "@/content/tasks";
import { theory } from "@/content/theory";
import { hasAssignmentPhoto } from "@/lib/assignment-photo";

const variantCount = tasks.reduce((sum, task) => sum + task.variants.length, 0);

const steps = [
  {
    n: "01",
    title: "Разберитесь с теорией",
    text: "Десять коротких разделов: базис, произведения векторов, матрица Грама, аффинные координаты, матрица перехода. Ровно то, что нужно для этих восьми номеров.",
  },
  {
    n: "02",
    title: "Пройдите ход решения",
    text: "Каждый пункт разбит на шаги: что подставляем, почему можем, что получаем. Формулы вынесены отдельными блоками, чтобы не терялись в тексте.",
  },
  {
    n: "03",
    title: "Сверьте ответ",
    text: "Ответ выделен зелёным, примечания — жёлтым. Если ваш ответ отличается, ищите расхождение по шагам, а не в конце.",
  },
];

export default function Home() {
  const hasPhoto = hasAssignmentPhoto();

  return (
    <>
      <section className="border-b border-line bg-surface/50">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">Контрольная · вариант 1</Badge>
              <Badge>аналитическая геометрия</Badge>
            </div>

            <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
              Теория и решения контрольной по векторной алгебре
            </h1>

            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Восемь заданий одного варианта: координаты в базисе, векторы в параллелограмме,
              параметр&nbsp;t, смешанное произведение, матрица Грама, треугольник и пирамида, объём
              и переход между системами координат. Теория — отдельно, решения — пошагово, с ответами.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Смотреть решения
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/theory"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                Читать теорию
              </Link>
            </div>

            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { value: String(tasks.length), label: "заданий" },
                { value: String(variantCount), label: "вариантов с решением" },
                { value: String(theory.length), label: "разделов теории" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-2xl font-semibold text-ink sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-ink-faint">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="rounded-2xl border border-line bg-surface p-4 shadow-[0_1px_0_rgba(23,20,15,0.04),0_18px_40px_-32px_rgba(23,20,15,0.35)] sm:p-6">
            <HeroFigure uid="hero" />
            <figcaption className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-ink-faint">
              <MathText text="Параллелограмм ABCD из задания 2: диагональ AC = a + b, AE — проекция AC на AB, AF — биссектриса угла BAD." />
            </figcaption>
          </figure>
        </Container>
      </section>

      <Section id="tasks">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Содержание</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Восемь заданий
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              У каждого номера — свой раздел теории и разбор в отдельной вкладке. Нажмите на
              заголовок, чтобы перейти сразу к решению.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tasks.map((task) => (
              <article
                key={task.n}
                className="group relative flex flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs tracking-[0.2em] text-ink-faint">
                    {String(task.n).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] text-ink-faint">
                    {task.variants.map((variant) => variant.id).join(" · ")}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-xl font-semibold tracking-tight text-ink">
                  <Link
                    href={`/solutions#${task.slug}`}
                    className="after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                  >
                    {task.title}
                  </Link>
                </h3>

                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
                  {task.topic}
                </p>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft"><MathText text={task.short} /></p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
                  <Link
                    href={`/theory#${task.theory}`}
                    className="relative z-10 text-xs font-medium text-ink-faint underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                  >
                    Теория к заданию
                  </Link>
                  <span className="text-xs font-semibold text-accent opacity-70 transition-opacity group-hover:opacity-100">
                    Решение →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="photo" className="border-y border-line bg-surface/50">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <Eyebrow>Источник</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Фото задания
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Оригинальный лист с восемью номерами — чтобы сверить условия, обозначения и номера
              вариантов. Все данные ниже набраны с этого листа и продублированы текстом: если скан
              нечеткий, читайте условие в карточке решения.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              {[
                "Задания 1–2 — базис и векторы в параллелограмме.",
                "Задания 3–4 — параметр t и свойства смешанного произведения.",
                "Задания 5–7 — метрика в базисе, треугольник, пирамида, объём.",
                "Задание 8 — две системы координат и матрица перехода.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-lg border border-warn-line bg-warn-soft px-4 py-3 text-sm leading-relaxed text-warn-ink">
              Если нужного варианта нет на фото — сверьтесь с блоком «Дано» в решении: там
              выписаны все числа, с которыми ведётся расчёт.
            </p>
          </div>

          <figure className="rounded-2xl border border-line bg-surface p-3 shadow-[0_1px_0_rgba(23,20,15,0.04),0_18px_40px_-32px_rgba(23,20,15,0.35)] sm:p-4">
            {hasPhoto ? (
              <Image
                src="/zadanie.jpg"
                alt="Фотография листа с условиями контрольной работы: восемь заданий по векторной алгебре"
                width={1200}
                height={1600}
                sizes="(max-width: 1024px) 100vw, 520px"
                className="h-auto w-full rounded-lg border border-line"
              />
            ) : (
              <div className="flex min-h-[380px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong bg-paper/60 px-6 py-12 text-center">
                <svg
                  viewBox="0 0 48 48"
                  className="h-12 w-12 text-ink-faint"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="9" y="5" width="30" height="38" rx="2.5" />
                  <path d="M15 14h18M15 21h18M15 28h11" />
                  <circle cx="31" cy="34" r="5.5" />
                  <path d="M31 31.5v5M28.5 34h5" />
                </svg>
                <p className="font-serif text-lg font-semibold">Скан ещё не добавлен</p>
                <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                  Положите фотографию листа в папку проекта под именем
                </p>
                <code className="rounded border border-line bg-white/80 px-2.5 py-1 font-mono text-xs text-ink-soft">
                  public/zadanie.jpg
                </code>
                <p className="max-w-xs text-xs leading-relaxed text-ink-faint">
                  После этого страница покажет скан вместо заглушки. Условия заданий всё равно
                  доступны в текстовом виде — в разделе решений.
                </p>
              </div>
            )}
            <figcaption className="mt-3 flex items-center justify-between gap-3 border-t border-line px-1 pt-3 text-xs text-ink-faint">
              <span>Лист с заданиями, вариант 1</span>
              <span className="font-mono">8 заданий</span>
            </figcaption>
          </figure>
        </Container>
      </Section>

      <Section id="how">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Порядок работы</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Как этим пользоваться
            </h2>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="rounded-xl border border-line bg-surface p-5">
                <span className="font-mono text-xs tracking-[0.2em] text-accent/70">{step.n}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-accent/25 bg-accent-soft px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="font-serif text-xl font-semibold tracking-tight text-accent-ink">
                Нужен разбор конкретного номера?
              </p>
              <p className="mt-1 text-sm text-accent-ink/80">
                Решения открываются в отдельной вкладке — можно держать теорию и разбор рядом.
              </p>
            </div>
            <Link
              href="/solutions"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
            >
              Перейти к решениям
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
