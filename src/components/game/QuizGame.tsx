"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { RichMath } from "@/components/ui/math";
import { FormulaBlock } from "@/components/ui/primitives";
import { quiz } from "@/content/quiz";

const BEST_KEY = "vector-algebra:quiz-best";
const TOTAL = quiz.length;
const MAX_SCORE = TOTAL * 10;

type Phase = "idle" | "playing" | "done";

function shuffle<T>(items: T[]) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function resultMessage(correct: number) {
  if (correct === TOTAL) return "Идеально: все формулы и идеи варианта на месте.";
  if (correct >= TOTAL - 2) return "Сильный результат — осталось закрепить пару формул.";
  if (correct >= TOTAL - 4) return "Хорошая база. Повторите разделы, где были ошибки.";
  if (correct >= TOTAL - 6) return "Основы есть, но теорию стоит пройти ещё раз.";
  return "Начните с теории, затем вернитесь к тренажёру.";
}

export function QuizGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [order, setOrder] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const initial = window.setTimeout(() => {
      try {
        const saved = Number(window.localStorage.getItem(BEST_KEY));
        if (Number.isFinite(saved) && saved > 0) setBest(saved);
      } catch {
        // Storage may be unavailable in private mode — the game still works.
      }
    }, 0);

    return () => window.clearTimeout(initial);
  }, []);

  const start = () => {
    setOrder(shuffle(quiz.map((_, questionIndex) => questionIndex)));
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setStreak(0);
    setBestStreak(0);
    setPhase("playing");
  };

  const question = order.length > 0 ? quiz[order[index]] : null;
  const answered = selected !== null;
  const isLast = index === order.length - 1;

  const choose = (option: number) => {
    if (!question || answered) return;

    setSelected(option);

    if (option === question.correct) {
      const nextStreak = streak + 1;
      setCorrect((value) => value + 1);
      setStreak(nextStreak);
      setBestStreak((value) => Math.max(value, nextStreak));
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (!isLast) {
      setIndex((value) => value + 1);
      setSelected(null);
      return;
    }

    const score = correct * 10;
    try {
      const saved = Number(window.localStorage.getItem(BEST_KEY));
      if (!Number.isFinite(saved) || score > saved) {
        window.localStorage.setItem(BEST_KEY, String(score));
      }
    } catch {
      // Ignore storage errors; the result is still shown.
    }
    setBest((value) => Math.max(value ?? 0, score));
    setPhase("done");
  };

  if (phase === "playing" && question) {
    const progress = ((index + (answered ? 1 : 0)) / TOTAL) * 100;

    return (
      <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-wide text-ink-faint uppercase">
            Вопрос {index + 1} из {TOTAL}
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-faint">
            <span>
              Счёт: <span className="font-mono text-ink-soft">{correct * 10}</span>
            </span>
            <span>
              Серия: <span className="font-mono text-ink-soft">{streak}</span>
            </span>
          </div>
        </div>

        <div
          role="progressbar"
          aria-label="Прогресс тренажёра"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={index + (answered ? 1 : 0)}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/60"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
            {question.topic}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-snug font-semibold tracking-tight">
            <RichMath text={question.prompt} />
          </h2>

          {question.formula ? <FormulaBlock lines={[question.formula]} /> : null}
        </div>

        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {question.options.map((option, optionIndex) => {
            const isCorrect = optionIndex === question.correct;
            const isChosen = optionIndex === selected;

            let className =
              "border-line bg-surface hover:border-accent/40 hover:bg-white/70";
            if (answered) {
              if (isCorrect) className = "border-accent/50 bg-accent-soft text-accent-ink";
              else if (isChosen) className = "border-warn-line bg-warn-soft text-warn-ink";
              else className = "border-line bg-paper/60 text-ink-faint";
            }

            return (
              <button
                key={option}
                type="button"
                disabled={answered}
                onClick={() => choose(optionIndex)}
                className={`flex items-start gap-3 rounded-lg border px-3.5 py-3 text-left text-sm leading-relaxed transition-colors disabled:cursor-default ${className}`}
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-current/25 font-mono text-[10px]">
                  {String.fromCharCode(1040 + optionIndex)}
                </span>
                <span className="min-w-0">
                  <RichMath text={option} />
                </span>
                {answered && isCorrect ? (
                  <span className="ml-auto shrink-0 text-accent" aria-hidden>
                    ✓
                  </span>
                ) : null}
                {answered && isChosen && !isCorrect ? (
                  <span className="ml-auto shrink-0 text-warn-ink" aria-hidden>
                    ×
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {answered ? (
          <div
            role="status"
            aria-live="polite"
            className={`mt-5 rounded-lg border border-l-[3px] px-4 py-3 ${
              selected === question.correct
                ? "border-accent/25 border-l-accent/60 bg-accent-soft/70 text-accent-ink"
                : "border-warn-line border-l-warn-ink/35 bg-warn-soft text-warn-ink"
            }`}
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase">
              {selected === question.correct ? "Верно" : "Неверно"}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed">
              <RichMath text={question.explanation} />
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={next}
            disabled={!answered}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? "Показать результат" : "Дальше"}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    const score = correct * 10;

    return (
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
          Результат
        </p>
        <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
          <p className="font-serif text-5xl font-semibold tracking-tight">{score}</p>
          <p className="pb-1 text-sm text-ink-faint">из {MAX_SCORE} баллов</p>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Правильно: {correct} из {TOTAL}. Лучшая серия: {bestStreak}.
        </p>
        <p className="mt-1 text-sm text-ink-faint">{resultMessage(correct)}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
          >
            Пройти ещё раз
            <span aria-hidden>→</span>
          </button>
          <Link
            href="/theory#dot-product"
            className="text-sm font-medium text-accent hover:underline"
          >
            Повторить теорию
          </Link>
          <Link
            href="/solutions"
            className="text-sm font-medium text-ink-faint hover:text-ink"
          >
            К разборам
          </Link>
        </div>

        <p className="mt-5 border-t border-line pt-4 text-xs text-ink-faint">
          Лучший результат: {best === null ? "—" : `${best} из ${MAX_SCORE}`}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            {TOTAL} вопросов · {MAX_SCORE} баллов
          </h2>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink-soft">
            {[
              "Один вопрос — один ответ, без подсказок.",
              "После ответа видно объяснение и правильный вариант.",
              "Баллы начисляются за верные ответы, серия считается отдельно.",
              "Лучший результат сохраняется в этом браузере.",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/45" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-paper/70 px-5 py-4 text-center">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
            Лучший результат
          </p>
          <p className="mt-1 font-serif text-3xl font-semibold tracking-tight">
            {best === null ? "—" : best}
          </p>
          <p className="mt-0.5 text-xs text-ink-faint">из {MAX_SCORE}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={start}
        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-ink"
      >
        Начать тренажёр
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
