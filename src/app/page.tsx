import Link from "next/link";

import { VectorFigure } from "@/components/ui/Diagrams";
import { RichMath } from "@/components/ui/math";
import { Badge, Container, Eyebrow, FormulaBlock, Section } from "@/components/ui/primitives";
import { tasks } from "@/content/tasks";
import { theory } from "@/content/theory";

const steps = [
  {
    n: "01",
    title: "Запишите координаты",
    text: String.raw`Переведите векторы в координаты и проверьте, что базис действительно базис: определитель из координат не должен быть нулём.`,
  },
  {
    n: "02",
    title: "Считайте скалярные произведения",
    text: String.raw`Длины, углы, перпендикулярность и проекции — всё это следствия одного числа $\vec a\cdot\vec b$. Сначала считайте его, потом остальное.`,
  },
  {
    n: "03",
    title: "Разделяйте проекции",
    text: String.raw`Скалярная проекция — число, векторная — вектор. Перпендикулярная составляющая получается вычитанием проекции из исходного вектора.`,
  },
  {
    n: "04",
    title: "Переводите геометрию в координаты",
    text: "В треугольнике, параллелограмме или кубе удобно поставить начало координат в вершину. Дальше середины, отношения и углы считаются по формулам.",
  },
];

const formulas = [
  {
    label: "Скалярное произведение",
    tex: String.raw`\vec a\cdot\vec b=|\vec a||\vec b|\cos\varphi=x_1x_2+y_1y_2+z_1z_2`,
  },
  {
    label: "Длина и косинус",
    tex: String.raw`|\vec a|=\sqrt{x^2+y^2+z^2},\qquad \cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a||\vec b|}`,
  },
  {
    label: "Проекция",
    tex: String.raw`\operatorname{np}_{\vec a}\vec b=\frac{\vec a\cdot\vec b}{|\vec a|},\qquad \operatorname{proj}_{\vec a}\vec b=\frac{\vec a\cdot\vec b}{|\vec a|^2}\vec a`,
  },
  {
    label: "Проекция на плоскость",
    tex: String.raw`\vec a_\pi=\vec a-\frac{\vec a\cdot\vec n}{|\vec n|^2}\vec n`,
  },
  {
    label: "Взаимный базис",
    tex: String.raw`\vec a^\#\cdot\vec a=1,\quad \vec a^\#\cdot\vec b=0,\quad \vec b^\#\cdot\vec a=0,\quad \vec b^\#\cdot\vec b=1`,
  },
  {
    label: "Расстояние между прямыми",
    tex: String.raw`d=\frac{|(\vec r_2-\vec r_1)\cdot(\vec u\times\vec v)|}{|\vec u\times\vec v|}`,
  },
];

export default function Home() {
  return (
    <>
      <section className="paper-grid border-b border-line bg-surface/40">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">Индивидуальное задание № 2</Badge>
              <Badge>Вариант 1 · 6 задач</Badge>
            </div>

            <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.3rem]">
              Векторная алгебра: теория и разбор первого варианта
            </h1>

            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              Скалярное произведение, длины и углы, проекции, метрическая матрица, взаимный базис,
              координатный метод и расстояние между скрещивающимися прямыми. Восемь разделов теории
              и шесть задач с пошаговыми решениями.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Перейти к разборам
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/theory"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
              >
                Сначала теория
              </Link>
            </div>

            <Link
              href="/lesson"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              Непонятна задача II? Подробный разбор с нуля
              <span aria-hidden>→</span>
            </Link>

            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6 sm:[&>div+div]:border-l sm:[&>div+div]:border-line/70 sm:[&>div+div]:pl-4">
              {[
                { value: String(tasks.length), label: "задач с решением" },
                { value: String(theory.length), label: "разделов теории" },
                { value: "1", label: "разобранный вариант" },
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
            <VectorFigure />
            <figcaption className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-ink-faint">
              <RichMath text={String.raw`Вектор $\vec b$ раскладывается на проекцию вдоль $\vec a$ и перпендикулярную составляющую. Эта картинка стоит за задачами о проекциях, углах и расстояниях.`} />
            </figcaption>
          </figure>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <Eyebrow>Порядок действий</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Как разбирать задачи варианта
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Почти все задания сводятся к двум идеям: скалярному произведению и удачному выбору
                координат. Главное — не смешивать скалярные и векторные величины.
              </p>
            </div>

            <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[1.125rem] before:w-px before:bg-line">
              {steps.map((step) => (
                <li key={step.n} className="grid grid-cols-[2.25rem_1fr] gap-x-4">
                  <span className="relative grid h-9 w-9 place-items-center rounded-full border border-accent/20 bg-accent-soft font-mono text-xs text-accent-ink">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                      <RichMath text={step.text} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section id="tasks" className="border-y border-line bg-surface/50">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Задачи</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Шесть задач первого варианта
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Задания I–VI по таблице вариантов. Для варианта 1 во всех шести разделах берётся
              первый номер — он и разобран полностью.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tasks.map((task) => (
              <article
                key={task.n}
                className="group relative flex flex-col rounded-xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_2px_0_rgba(23,20,15,0.03),0_16px_30px_-24px_rgba(23,20,15,0.4)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-paper/80 font-mono text-[11px] text-ink-soft">
                    {String(task.n).padStart(2, "0")}
                  </span>
                  <Badge tone={task.level === "средний" ? "accent" : "neutral"}>
                    {task.level}
                  </Badge>
                </div>

                <h3 className="mt-4 font-serif text-xl font-semibold tracking-tight text-ink">
                  <Link
                    href={`/solutions#${task.slug}`}
                    className="after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                  >
                    {task.title}
                  </Link>
                </h3>

                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
                  {task.topic}
                </p>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
                  <RichMath text={task.short} />
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
                  <Link
                    href={`/theory#${task.theory}`}
                    className="relative z-10 text-xs font-medium text-ink-faint underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                  >
                    Теория к задаче
                  </Link>
                  <span className="text-xs font-semibold text-accent">
                    Разбор
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-4 sm:py-6">
        <Container>
          <div className="grid gap-6 rounded-2xl border border-accent/20 bg-accent-soft/50 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div className="max-w-2xl">
              <Eyebrow>Тренажёр</Eyebrow>
              <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Проверьте себя за 8 вопросов
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                Скалярное произведение, базис, проекции и расстояние между прямыми — с
                объяснением после каждого ответа. Рекорд сохраняется в браузере.
              </p>
            </div>
            <Link
              href="/game"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
            >
              Начать тренажёр
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Шпаргалка</Eyebrow>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Формулы, которые нужны чаще всего
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Если задача не идёт, начните с этих формул: почти каждое действие в варианте — их
              комбинация.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {formulas.map((item) => (
              <div key={item.label} className="min-w-0 rounded-xl border border-line bg-surface p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {item.label}
                </p>
                <FormulaBlock lines={[item.tex]} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-accent/20 bg-accent-soft/60 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-accent-ink">
                Начните с теории, проверяйте себя по разборам
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-accent-ink/80">
                Сначала — короткие разделы с определениями и формулами. Затем — шесть задач
                варианта с проверками и ответами.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Link
                href="/theory"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
              >
                К теории
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-surface px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:border-accent/60"
              >
                К разборам
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
