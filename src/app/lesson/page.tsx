import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { List } from "@/components/ui/RichText";
import { TaskDiagram } from "@/components/ui/Diagrams";
import {
  Badge,
  Callout,
  Container,
  Eyebrow,
  FormulaBlock,
  Prose,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Задача II с нуля",
  description:
    "Подробный разбор задания II варианта 1: что такое базис, зачем нужна метрическая матрица, откуда берутся числа 41, −16, 77, −30 и как шаг за шагом найти векторы взаимного базиса.",
};

const r = String.raw;

const toc = [
  { id: "given", n: "00", title: "Что дано" },
  { id: "coordinates", n: "01", title: "Координаты и базис" },
  { id: "basis-check", n: "02", title: "Проверка базиса" },
  { id: "metric", n: "03", title: "Метрическая матрица" },
  { id: "metric-vector", n: "04", title: "Откуда 41 и −16" },
  { id: "reciprocal", n: "05", title: "Что такое взаимный базис" },
  { id: "find-a", n: "06", title: "Ищем a#" },
  { id: "find-b", n: "07", title: "Ищем b#" },
  { id: "check", n: "08", title: "Полная проверка" },
  { id: "answer", n: "09", title: "Ответ" },
  { id: "why", n: "10", title: "Зачем это нужно" },
  { id: "mistakes", n: "11", title: "Типичные ошибки" },
  { id: "self-check", n: "12", title: "Самопроверка" },
];

function Step({
  id,
  n,
  title,
  lead,
  children,
}: {
  id: string;
  n: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line/70 pt-9 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-ink-faint">{n}</span>
        <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
          {title}
        </h2>
      </div>
      {lead ? (
        <p className="mt-2 border-l border-line pl-3 text-sm leading-relaxed text-ink-faint sm:pl-4">
          {lead}
        </p>
      ) : null}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Check({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="group rounded-xl border border-line bg-surface open:border-line-strong">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/50 [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink-faint">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M4 6.5 8 10.5 12 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </summary>
      <div className="border-t border-line px-4 py-4">
        <Prose text={children as string} />
      </div>
    </details>
  );
}

export default function LessonPage() {
  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <Eyebrow>Разбор с нуля · задача II</Eyebrow>
          <Badge tone="accent">Вариант 1</Badge>
          <Badge>Без пропущенных шагов</Badge>
        </div>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Взаимный базис: подробно, шаг за шагом
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Если в решении непонятно, откуда взялись числа 41, −16, 77 и −30, зачем нужны векторы
          a# и b# и почему нельзя просто перемножить координаты — начните отсюда. Мы пройдём весь
          путь: от определения базиса до полной проверки ответа.
        </p>

        <div className="mt-6 rounded-xl border border-accent/20 bg-accent-soft/60 p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Главная идея за 30 секунд
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-accent-ink">
            Взаимный базис — это два вектора-«извлекателя координат». Вектор <em>a#</em>{" "}
            перпендикулярен <em>b</em> и даёт единицу с <em>a</em>; вектор <em>b#</em>{" "}
            перпендикулярен <em>a</em> и даёт единицу с <em>b</em>. Если вектор <em>x</em> разложен
            как <em>x = αa + βb</em>, то <em>α = x·a#</em>, а <em>β = x·b#</em>.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/solutions#reciprocal-basis"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3.5 py-2 font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-ink"
          >
            Короткое решение задачи
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/theory#reciprocal"
            className="font-medium text-accent hover:underline"
          >
            Теория: взаимный базис
          </Link>
        </div>
      </header>

      <nav
        aria-label="Содержание разбора"
        className="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 rounded-full border border-line bg-surface px-3 py-1.5 text-xs whitespace-nowrap text-ink-soft"
          >
            <span className="mr-1.5 font-mono text-[10px] text-ink-faint">{item.n}</span>
            {item.title}
          </a>
        ))}
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[230px_1fr] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Содержание
            </p>
            <ol className="mt-3 space-y-1 border-l border-line">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px flex gap-2.5 border-l border-transparent py-1.5 pl-3 text-sm leading-snug text-ink-soft transition-colors hover:border-accent hover:text-ink"
                  >
                    <span className="font-mono text-[10px] leading-5 text-ink-faint">{item.n}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href="/solutions"
              className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-accent hover:underline"
            >
              Все разборы <span aria-hidden>→</span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          <Step
            id="given"
            n="00"
            title="Что дано"
            lead="Сначала выпишем все числа и поймём, что именно требуется найти."
          >
            <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Условие варианта 1
              </p>
              <FormulaBlock
                lines={[
                  r`g_{11}=13,\qquad g_{12}=-5,\qquad g_{22}=2,`,
                  r`\vec a=(2;-3),\qquad \vec b=(4;-5).`,
                ]}
              />
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Базис <em>e₁, e₂</em> задан не векторами, а своими метрическими коэффициентами.
                Это значит, что нам известны длины и угол между базисными векторами, но не их
                координаты на рисунке.
              </p>
            </div>
            <Prose
              text={r`Нужно сделать две вещи: убедиться, что $\{\vec a,\vec b\}$ — базис, и найти координаты векторов $\vec a^\#$ и $\vec b^\#$ взаимного базиса. Координаты ищутся в исходном базисе $\{\vec e_1,\vec e_2\}$.`}
            />
            <Callout tone="note" label="Что важно сразу">
              <Prose
                text={r`Ответ — это не числа $41$ и $-16$, а векторы $\vec a^\#$ и $\vec b^\#$. Числа $41$, $-16$, $77$, $-30$ — промежуточные коэффициенты, которые нужны, чтобы составить уравнения.`}
              />
            </Callout>
          </Step>

          <Step
            id="coordinates"
            n="01"
            title="Координаты и базис"
            lead="Чтобы разобраться с взаимным базисом, сначала нужно понять, что такое координаты вектора."
          >
            <Prose
              text={r`Базис плоскости — это два неколлинеарных вектора. Если $\{\vec e_1,\vec e_2\}$ — базис, то любой вектор $\vec x$ можно единственным способом записать в виде`}
            />
            <FormulaBlock lines={[r`\vec x=\alpha\vec e_1+\beta\vec e_2.`]} />
            <Prose
              text={r`Числа $\alpha$ и $\beta$ называются координатами вектора $\vec x$ в этом базисе. Запись $\vec a=(2;-3)$ означает`}
            />
            <FormulaBlock lines={[r`\vec a=2\vec e_1-3\vec e_2.`]} />
            <Prose
              text={r`То есть мы берём два шага вдоль $\vec e_1$ и три шага против направления $\vec e_2$. Сами векторы $\vec e_1$, $\vec e_2$ при этом могут быть какой угодно длины и располагаться под любым углом.`}
            />
            <Callout tone="note" label="Два разных базиса">
              <Prose
                text={r`В задаче есть базис $\{\vec e_1,\vec e_2\}$, в котором заданы координаты, и базис $\{\vec a,\vec b\}$, для которого мы строим взаимный. Это разные базисы, и координаты в них разные.`}
              />
            </Callout>
            <Prose
              text={r`В обычном ортонормированном базисе координаты вектора можно вытащить скалярными произведениями на базисные векторы. В косоугольном базисе так просто не получится — именно поэтому появляется метрическая матрица.`}
            />
          </Step>

          <Step
            id="basis-check"
            n="02"
            title="Проверяем, что {a, b} — базис"
            lead="Пара векторов образует базис тогда и только тогда, когда они неколлинеарны."
          >
            <Prose
              text={r`Для двух векторов на плоскости неколлинеарность проверяется определителем, составленным из их координат. Если определитель не равен нулю, векторы неколлинеарны и образуют базис.`}
            />
            <FormulaBlock
              lines={[
                r`\Delta=\begin{vmatrix}2&4\\-3&-5\end{vmatrix}=2\cdot(-5)-4\cdot(-3)`,
                r`\Delta=-10+12=2\ne0.`,
              ]}
            />
            <Prose
              text={r`Значит, $\{\vec a,\vec b\}$ — действительно базис. Теперь можно искать векторы, взаимные к нему.`}
            />
          </Step>

          <Step
            id="metric"
            n="03"
            title="Метрическая матрица: как считать скалярное произведение"
            lead="Это ключевой шаг. Без него все дальнейшие уравнения будут неверными."
          >
            <Prose
              text={r`В ортонормированном базисе скалярное произведение считается простой формулой:`}
            />
            <FormulaBlock lines={[r`(x_1;y_1)\cdot(x_2;y_2)=x_1x_2+y_1y_2.`]} />
            <Prose
              text={r`Но наш базис $\{\vec e_1,\vec e_2\}$ не ортонормированный. Поэтому нужно знать три числа:`}
            />
            <FormulaBlock
              lines={[
                r`g_{11}=\vec e_1\cdot\vec e_1,\qquad g_{12}=\vec e_1\cdot\vec e_2,\qquad g_{22}=\vec e_2\cdot\vec e_2.`,
              ]}
            />
            <Prose
              text={r`Они собраны в метрическую матрицу`}
            />
            <FormulaBlock
              lines={[
                r`G=\begin{pmatrix}g_{11}&g_{12}\\g_{21}&g_{22}\end{pmatrix}=\begin{pmatrix}13&-5\\-5&2\end{pmatrix},\qquad g_{21}=g_{12}.`,
              ]}
            />
            <Prose
              text={r`Для векторов $\vec u=(x_1;y_1)$ и $\vec v=(x_2;y_2)$ скалярное произведение считается так:`}
            />
            <FormulaBlock
              lines={[
                r`\vec u\cdot\vec v=g_{11}x_1x_2+g_{12}(x_1y_2+y_1x_2)+g_{22}y_1y_2.`,
              ]}
            />
            <Prose
              text={r`Первое слагаемое учитывает длину $\vec e_1$, третье — длину $\vec e_2$, а среднее — угол между ними. Если базис ортонормированный, то $g_{11}=g_{22}=1$, $g_{12}=0$, и формула превращается в обычную.`}
            />
            <Prose text={r`Посчитаем три полезных произведения для наших векторов.`} />
            <FormulaBlock
              lines={[
                r`\vec a\cdot\vec a=13\cdot2\cdot2+(-5)\bigl(2\cdot(-3)+(-3)\cdot2\bigr)+2\cdot(-3)\cdot(-3)=130,`,
                r`\vec a\cdot\vec b=13\cdot2\cdot4+(-5)\bigl(2\cdot(-5)+(-3)\cdot4\bigr)+2\cdot(-3)\cdot(-5)=244,`,
                r`\vec b\cdot\vec b=13\cdot4\cdot4+(-5)\bigl(4\cdot(-5)+(-5)\cdot4\bigr)+2\cdot(-5)\cdot(-5)=458.`,
              ]}
            />
            <Callout tone="note" label="Смысл коэффициентов">
              <Prose
                text={r`$g_{11}=13$ означает $|\vec e_1|=\sqrt{13}$; $g_{22}=2$ означает $|\vec e_2|=\sqrt2$; $g_{12}=-5$ означает, что угол между $\vec e_1$ и $\vec e_2$ не прямой. Обычная формула $x_1x_2+y_1y_2$ здесь дала бы неверный ответ.`}
              />
            </Callout>
          </Step>

          <Step
            id="metric-vector"
            n="04"
            title="Откуда берутся 41, −16, 77 и −30"
            lead="Это не случайные числа и не координаты векторов. Это скалярные произведения a и b с базисными векторами."
          >
            <Prose
              text={r`Умножим метрическую матрицу на столбец координат вектора $\vec a=(2;-3)$:`}
            />
            <FormulaBlock
              lines={[
                r`G\vec a=\begin{pmatrix}13&-5\\-5&2\end{pmatrix}\begin{pmatrix}2\\-3\end{pmatrix}=\begin{pmatrix}13\cdot2+(-5)\cdot(-3)\\(-5)\cdot2+2\cdot(-3)\end{pmatrix}=\begin{pmatrix}41\\-16\end{pmatrix}.`,
              ]}
            />
            <Prose
              text={r`Что означает этот столбец? Ровно две вещи:`}
            />
            <FormulaBlock
              lines={[
                r`41=\vec e_1\cdot\vec a,\qquad -16=\vec e_2\cdot\vec a.`,
              ]}
            />
            <Prose
              text={r`То есть $G\vec a$ — это не «новый вектор $a$» и не длина $a$. Это табличка из двух скалярных произведений: насколько $\vec a$ согласован с $\vec e_1$ и с $\vec e_2$.`}
            />
            <Prose text={r`Аналогично для $\vec b=(4;-5)$:`} />
            <FormulaBlock
              lines={[
                r`G\vec b=\begin{pmatrix}13&-5\\-5&2\end{pmatrix}\begin{pmatrix}4\\-5\end{pmatrix}=\begin{pmatrix}13\cdot4+(-5)\cdot(-5)\\(-5)\cdot4+2\cdot(-5)\end{pmatrix}=\begin{pmatrix}77\\-30\end{pmatrix}.`,
              ]}
            />
            <Prose
              text={r`Теперь пусть $\vec u=(x;y)$ — произвольный вектор. Тогда`}
            />
            <FormulaBlock
              lines={[
                r`\vec u\cdot\vec a=x(\vec e_1\cdot\vec a)+y(\vec e_2\cdot\vec a)=41x-16y,`,
                r`\vec u\cdot\vec b=x(\vec e_1\cdot\vec b)+y(\vec e_2\cdot\vec b)=77x-30y.`,
              ]}
            />
            <Callout tone="answer" label="Вывод шага">
              <Prose
                text={r`Числа $41$, $-16$, $77$, $-30$ — это коэффициенты, через которые скалярное произведение любого вектора $\vec u=(x;y)$ с $\vec a$ и $\vec b$ выражается простыми линейными формулами. Именно они превратят условия взаимного базиса в систему уравнений.`}
              />
            </Callout>
          </Step>

          <Step
            id="reciprocal"
            n="05"
            title="Что такое взаимный базис"
            lead="Теперь, когда мы умеем считать скалярные произведения, можно понять сами условия."
          >
            <Prose
              text={r`Взаимный базис к базису $\{\vec a,\vec b\}$ — это пара векторов $\{\vec a^\#,\vec b^\#\}$, удовлетворяющая четырём условиям:`}
            />
            <FormulaBlock
              lines={[
                r`\vec a^\#\cdot\vec a=1,\qquad \vec a^\#\cdot\vec b=0,`,
                r`\vec b^\#\cdot\vec a=0,\qquad \vec b^\#\cdot\vec b=1.`,
              ]}
            />
            <figure className="rounded-xl border border-line bg-surface p-4 sm:p-5">
              <div className="mx-auto max-w-md">
                <TaskDiagram kind="reciprocal" />
              </div>
              <figcaption className="mt-2 border-t border-line/70 pt-2 text-[11px] leading-relaxed text-ink-faint">
                Схема: a# перпендикулярен b, b# перпендикулярен a. Векторы a# и b# не обязаны
                быть перпендикулярны друг другу.
              </figcaption>
            </figure>
            <Prose
              text={r`Смысл первых двух условий: $\vec a^\#$ должен быть ортогонален «чужому» вектору $\vec b$ и давать единицу с «своим» $\vec a$. Вторые два условия делают то же самое для $\vec b^\#$.`}
            />
            <Callout tone="note" label="Частая путаница">
              <Prose
                text={r`«Взаимный» не означает «взаимно перпендикулярный». Вектор $\vec a^\#$ перпендикулярен $\vec b$, а не $\vec a$. Вектор $\vec b^\#$ перпендикулярен $\vec a$, а не $\vec b$.`}
              />
            </Callout>
            <Prose text={r`Зачем нужны именно такие условия? Пусть вектор $\vec x$ разложен по базису: $\vec x=\alpha\vec a+\beta\vec b$. Тогда`} />
            <FormulaBlock
              lines={[
                r`\vec x\cdot\vec a^\#=\alpha(\vec a\cdot\vec a^\#)+\beta(\vec b\cdot\vec a^\#)=\alpha\cdot1+\beta\cdot0=\alpha,`,
                r`\vec x\cdot\vec b^\#=\alpha(\vec a\cdot\vec b^\#)+\beta(\vec b\cdot\vec b^\#)=\alpha\cdot0+\beta\cdot1=\beta.`,
              ]}
            />
            <Prose
              text={r`То есть $a^\#$ и $b^\#$ работают как извлекатели координат: одно скалярное произведение даёт первую координату, другое — вторую.`}
            />
          </Step>

          <Step
            id="find-a"
            n="06"
            title="Ищем a#: составляем и решаем систему"
            lead="Пусть a# = (x; y). Подставим его в два первых условия взаимного базиса."
          >
            <Prose text={r`Условие $\vec a^\#\cdot\vec a=1$ с учётом шага 04 даёт:`} />
            <FormulaBlock lines={[r`41x-16y=1.`]} />
            <Prose text={r`Условие $\vec a^\#\cdot\vec b=0$ даёт:`} />
            <FormulaBlock lines={[r`77x-30y=0.`]} />
            <Prose text={r`Получаем систему:`} />
            <FormulaBlock
              lines={[
                r`\begin{cases}41x-16y=1,\\77x-30y=0.\end{cases}`,
              ]}
            />
            <Prose
              text={r`Решаем подробно. Из второго уравнения выразим $y$ через $x$:`}
            />
            <FormulaBlock
              lines={[
                r`77x=30y\quad\Rightarrow\quad y=\frac{77x}{30}.`,
              ]}
            />
            <Prose text={r`Подставим в первое уравнение:`} />
            <FormulaBlock
              lines={[
                r`41x-16\cdot\frac{77x}{30}=1,`,
                r`41x-\frac{1232x}{30}=1,`,
                r`\frac{1230x-1232x}{30}=1,`,
                r`-\frac{2x}{30}=1,`,
                r`x=-15.`,
              ]}
            />
            <Prose text={r`Теперь найдём $y$:`} />
            <FormulaBlock
              lines={[
                r`y=\frac{77\cdot(-15)}{30}=-\frac{77}{2}.`,
              ]}
            />
            <Prose text={r`Значит,`} />
            <FormulaBlock
              lines={[r`\vec a^\#=\left(-15;-\frac{77}{2}\right).`]}
            />
            <Prose text={r`Проверим оба условия:`} />
            <FormulaBlock
              lines={[
                r`41\cdot(-15)-16\cdot\left(-\frac{77}{2}\right)=-615+616=1,`,
                r`77\cdot(-15)-30\cdot\left(-\frac{77}{2}\right)=-1155+1155=0.`,
              ]}
            />
            <Callout tone="answer" label="a# найден">
              <Prose
                text={r`$\vec a^\#=\left(-15;-\dfrac{77}{2}\right)$. Оба условия выполняются, значит, координаты найдены верно.`}
              />
            </Callout>
          </Step>

          <Step
            id="find-b"
            n="07"
            title="Ищем b#: те же действия, другие условия"
            lead="Пусть b# = (u; v). Теперь работают вторые два условия."
          >
            <Prose text={r`Условие $\vec b^\#\cdot\vec a=0$:`} />
            <FormulaBlock lines={[r`41u-16v=0.`]} />
            <Prose text={r`Условие $\vec b^\#\cdot\vec b=1$:`} />
            <FormulaBlock lines={[r`77u-30v=1.`]} />
            <Prose text={r`Система:`} />
            <FormulaBlock
              lines={[r`\begin{cases}41u-16v=0,\\77u-30v=1.\end{cases}`]}
            />
            <Prose text={r`Из первого уравнения:`} />
            <FormulaBlock lines={[r`41u=16v\quad\Rightarrow\quad u=\frac{16v}{41}.`]} />
            <Prose text={r`Подставляем во второе:`} />
            <FormulaBlock
              lines={[
                r`77\cdot\frac{16v}{41}-30v=1,`,
                r`\frac{1232v}{41}-30v=1,`,
                r`\frac{1232v-1230v}{41}=1,`,
                r`\frac{2v}{41}=1,`,
                r`v=\frac{41}{2}.`,
              ]}
            />
            <Prose text={r`Тогда`} />
            <FormulaBlock
              lines={[
                r`u=\frac{16\cdot\frac{41}{2}}{41}=8.`,
              ]}
            />
            <Prose text={r`Значит,`} />
            <FormulaBlock
              lines={[r`\vec b^\#=\left(8;\frac{41}{2}\right).`]}
            />
            <Prose text={r`Проверяем:`} />
            <FormulaBlock
              lines={[
                r`41\cdot8-16\cdot\frac{41}{2}=328-328=0,`,
                r`77\cdot8-30\cdot\frac{41}{2}=616-615=1.`,
              ]}
            />
            <Callout tone="answer" label="b# найден">
              <Prose
                text={r`$\vec b^\#=\left(8;\dfrac{41}{2}\right)$. Оба условия снова выполняются.`}
              />
            </Callout>
          </Step>

          <Step
            id="check"
            n="08"
            title="Полная проверка всех четырёх условий"
            lead="Проверять нужно все четыре условия, а не только те, из которых решали систему."
          >
            <div className="overflow-x-auto rounded-xl border border-line bg-surface">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="border-b border-line bg-paper/60 text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Условие</th>
                    <th className="px-4 py-3 font-semibold">Вычисление</th>
                    <th className="px-4 py-3 font-semibold">Результат</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/70 text-ink-soft">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">a# · a</td>
                    <td className="px-4 py-3">(−15)·41 + (−77/2)·(−16)</td>
                    <td className="px-4 py-3 font-semibold text-accent">1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">a# · b</td>
                    <td className="px-4 py-3">(−15)·77 + (−77/2)·(−30)</td>
                    <td className="px-4 py-3 font-semibold text-accent">0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">b# · a</td>
                    <td className="px-4 py-3">8·41 + (41/2)·(−16)</td>
                    <td className="px-4 py-3 font-semibold text-accent">0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">b# · b</td>
                    <td className="px-4 py-3">8·77 + (41/2)·(−30)</td>
                    <td className="px-4 py-3 font-semibold text-accent">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Prose
              text={r`Все четыре условия выполнены. Поэтому векторы найдены правильно, и никакая дополнительная нормировка не нужна.`}
            />
          </Step>

          <Step id="answer" n="09" title="Ответ">
            <div className="rounded-xl border border-accent/30 bg-accent-soft/70 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Задание II · вариант 1
              </p>
              <FormulaBlock
                lines={[
                  r`\vec a^\#=\left(-15;-\frac{77}{2}\right),`,
                  r`\vec b^\#=\left(8;\frac{41}{2}\right).`,
                ]}
              />
              <p className="text-sm leading-relaxed text-accent-ink">
                Координаты записаны в исходном базисе <em>e₁, e₂</em>.
              </p>
            </div>
          </Step>

          <Step
            id="why"
            n="10"
            title="Зачем это нужно на практике"
            lead="Взаимный базис — не абстракция. Это способ доставать координаты вектора в косоугольном базисе."
          >
            <Prose
              text={r`Пусть у нас есть вектор $\vec x$, и мы знаем, что он раскладывается по базису $\{\vec a,\vec b\}$:`}
            />
            <FormulaBlock lines={[r`\vec x=\alpha\vec a+\beta\vec b.`]} />
            <Prose text={r`Тогда его координаты в этом базисе находятся так:`} />
            <FormulaBlock
              lines={[
                r`\alpha=\vec x\cdot\vec a^\#,\qquad \beta=\vec x\cdot\vec b^\#.`,
              ]}
            />
            <Prose
              text={r`Например, если $\vec x=3\vec a-2\vec b$, то $\vec x\cdot\vec a^\#=3$, а $\vec x\cdot\vec b^\#=-2$. Никаких систем уравнений решать уже не нужно.`}
            />
            <Prose
              text={r`Именно поэтому $a^\#$ и $b^\#$ называют взаимным, или двойственным, базисом. Он позволяет переходить от геометрии к координатам и обратно.`}
            />
            <Callout tone="note" label="Связь с матрицами">
              <Prose
                text={r`Если составить матрицу $A$ из координат $\vec a$ и $\vec b$, то матрица координат взаимного базиса равна $B=(A^{T}G)^{-1}$. Это та же самая процедура, только записанная одной формулой.`}
              />
            </Callout>
          </Step>

          <Step
            id="mistakes"
            n="11"
            title="Типичные ошибки"
            lead="Если ответ не сходится, скорее всего, ошибка в одном из этих мест."
          >
            <List
              items={[
                r`Считать скалярное произведение как $x_1x_2+y_1y_2$. В косоугольном базисе так нельзя: теряется метрика.`,
                r`Думать, что $\vec a^\#$ перпендикулярен $\vec a$. На самом деле $\vec a^\#\perp\vec b$, а с $\vec a$ он даёт единицу.`,
                r`Забыть коэффициент $g_{12}$: он отвечает за угол между базисными векторами и меняет все числа.`,
                r`Перепутать координаты в базисе $\{\vec e_1,\vec e_2\}$ и в базисе $\{\vec a,\vec b\}$. Ответ задачи — координаты в исходном базисе.`,
                r`Проверить только те два условия, из которых решали систему. Проверять нужно все четыре.`,
                r`Потерять знак минус при переносе или при вычислении $g_{12}=-5$.`,
              ]}
            />
          </Step>

          <Step
            id="self-check"
            n="12"
            title="Проверьте себя"
            lead="Ответьте на вопросы, не подглядывая. Если получается — тема закрыта."
          >
            <div className="space-y-2.5">
              <Check question="Почему определитель, равный 2, доказывает, что {a, b} — базис?">
                {r`Определитель составлен из координат векторов. Он не равен нулю, значит, векторы неколлинеарны. Два неколлинеарных вектора на плоскости образуют базис.`}
              </Check>
              <Check question="Почему a# перпендикулярен b, а не a?">
                {r`Таково определение взаимного базиса: каждый вектор ортогонален «чужому» вектору и даёт единицу со «своим». Именно поэтому $\vec a^\#\cdot\vec b=0$, а $\vec a^\#\cdot\vec a=1$.`}
              </Check>
              <Check question="Чему равны a# · a и a# · b?">
                {r`$\vec a^\#\cdot\vec a=1$, $\vec a^\#\cdot\vec b=0$ по определению. В координатах это даёт уравнения $41x-16y=1$ и $77x-30y=0$.`}
              </Check>
              <Check question="Если x = 3a − 2b, чему равны x · a# и x · b#?">
                {r`$\vec x\cdot\vec a^\#=3$, $\vec x\cdot\vec b^\#=-2$. Взаимный базис извлекает координаты: множитель при $\vec a$ даёт первое число, множитель при $\vec b$ — второе.`}
              </Check>
              <Check question="Почему в ответе не нужны числа 41, −16, 77 и −30?">
                {r`Это промежуточные коэффициенты, через которые записываются скалярные произведения. Ответ задачи — сами векторы $\vec a^\#$ и $\vec b^\#$, то есть их координаты.`}
              </Check>
            </div>
          </Step>

          <div className="rounded-2xl border border-accent/20 bg-accent-soft/60 p-6 sm:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Дальше
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-accent-ink">
              Закрепите на коротком решении и теории
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-accent-ink/80">
              В коротком разборе те же шаги записаны компактно, а в теории есть общая формула
              взаимного базиса и метрической матрицы.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/solutions#reciprocal-basis"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
              >
                К решению задачи II
              </Link>
              <Link
                href="/theory#reciprocal"
                className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-surface px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:border-accent/60"
              >
                К теории
              </Link>
              <Link
                href="/game"
                className="inline-flex items-center justify-center rounded-lg border border-accent/30 bg-surface px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:border-accent/60"
              >
                К тренажёру
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
