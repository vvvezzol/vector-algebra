import type { Metadata } from "next";

import { QuizGame } from "@/components/game/QuizGame";
import { Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Тренажёр",
  description:
    "Восемь вопросов по векторной алгебре: скалярное произведение, длины и углы, базис, взаимный базис, проекции, координатный метод и расстояние между прямыми. С объяснением после каждого ответа.",
};

export default function GamePage() {
  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-3xl">
        <Eyebrow>Тренажёр</Eyebrow>
        <h1 className="mt-2 font-serif text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Восемь вопросов по векторной алгебре
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Проверьте, различаете ли вы скалярную и векторную проекции, условия взаимного базиса и
          формулу расстояния между прямыми. После каждого ответа будет объяснение.
        </p>
      </header>

      <div className="mt-8 max-w-4xl">
        <QuizGame />
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-faint">
        Вопросы составлены по задачам первого варианта. Баллы и рекорд хранятся только в вашем
        браузере.
      </p>
    </Container>
  );
}
