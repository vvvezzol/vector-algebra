const r = String.raw;

export type QuizQuestion = {
  id: string;
  topic: string;
  prompt: string;
  formula?: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const quiz: QuizQuestion[] = [
  {
    id: "dot-coordinates",
    topic: "Скалярное произведение",
    prompt: r`Чему равно $\vec a\cdot\vec b$?`,
    formula: r`\vec a=(2;-3;-6),\qquad \vec b=(2;2;1)`,
    options: ["$8$", "$-4$", "$-8$", "$0$"],
    correct: 2,
    explanation: r`Перемножаем одноимённые координаты: $2\cdot2+(-3)\cdot2+(-6)\cdot1=4-6-6=-8$. Отрицательный знак означает тупой угол.`,
  },
  {
    id: "length",
    topic: "Длина вектора",
    prompt: r`Найдите $|\vec a|$.`,
    formula: r`\vec a=(2;-3;-6)`,
    options: ["$\\sqrt{41}$", "$11$", "$\\sqrt{47}$", "$7$"],
    correct: 3,
    explanation: r`$|\vec a|=\sqrt{2^2+(-3)^2+(-6)^2}=\sqrt{4+9+36}=\sqrt{49}=7$.`,
  },
  {
    id: "cosine-sign",
    topic: "Угол между векторами",
    prompt: r`Каков знак $\cos(\widehat{\vec a,\vec b})$, если $\vec a\cdot\vec b=-8$, $|\vec a|=7$, $|\vec b|=3$?`,
    formula: r`\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a||\vec b|}`,
    options: ["Положительный", "Отрицательный", "Равен нулю", "Определить нельзя"],
    correct: 1,
    explanation: r`$\cos\varphi=-\frac{8}{21}<0$, поэтому угол тупой: примерно $112{,}4^\circ$.`,
  },
  {
    id: "basis-det",
    topic: "Проверка базиса",
    prompt: r`Образуют ли векторы базис плоскости?`,
    formula: r`\vec a=(2;-3),\qquad \vec b=(4;-5)`,
    options: [
      "Да, определитель равен −2",
      "Нет, определитель равен 0",
      "Да, определитель равен 2",
      "Нельзя проверить без длин",
    ],
    correct: 2,
    explanation: r`Определитель $\begin{vmatrix}2&4\\-3&-5\end{vmatrix}=-10+12=2\ne0$, значит, векторы неколлинеарны и образуют базис.`,
  },
  {
    id: "reciprocal-condition",
    topic: "Взаимный базис",
    prompt: r`Какое условие входит в определение взаимного базиса $\{\vec a^\#,\vec b^\#\}$?`,
    options: [
      r`$\vec a^\#\cdot\vec b=1$`,
      r`$\vec a^\#=\vec a$`,
      r`$\vec a^\#\cdot\vec a=0$`,
      r`$\vec a^\#\cdot\vec b=0$`,
    ],
    correct: 3,
    explanation: r`Вектор $\vec a^\#$ ортогонален «чужому» вектору $\vec b$ и даёт единицу с «своим»: $\vec a^\#\cdot\vec a=1$, $\vec a^\#\cdot\vec b=0$.`,
  },
  {
    id: "plane-projection",
    topic: "Проекция на плоскость",
    prompt: r`Плоскость $\pi$ перпендикулярна $\vec n=(1;0;-1)$. Найдите проекцию $\vec a=(3;4;5)$ на $\pi$.`,
    options: ["$(2;4;6)$", "$(4;4;4)$", "$(3;4;5)$", "$(-1;0;1)$"],
    correct: 1,
    explanation: r`$\vec a_\pi=\vec a-\frac{\vec a\cdot\vec n}{|\vec n|^2}\vec n=(3;4;5)-(-1)(1;0;-1)=(4;4;4)$. Проверка: $(4;4;4)\cdot(1;0;-1)=0$.`,
  },
  {
    id: "right-triangle",
    topic: "Координатный метод",
    prompt: r`В прямоугольном треугольнике $AC=2$, $BC=1$, $M$ — середина $AB$, $BN\perp CM$, $N\in AC$. Чему равно $CN$?`,
    options: ["$1$", "$\\dfrac{3}{4}$", "$\\dfrac12$", "$\\dfrac{3}{2}$"],
    correct: 2,
    explanation: r`В координатах $C(0;0)$, $A(2;0)$, $B(0;1)$, $M(1;\frac12)$. Для $N(t;0)$ условие $BN\perp CM$ даёт $t-\frac12=0$, откуда $CN=\frac12$.`,
  },
  {
    id: "skew-distance",
    topic: "Расстояние между прямыми",
    prompt: r`В кубе с ребром $4$ найдите расстояние между прямыми $AM$ и $BK$, если $M$ — середина $DC$, а $B_1K:KC_1=3:1$.`,
    options: [
      r`$\dfrac{16}{\sqrt{89}}$`,
      r`$4$`,
      r`$\dfrac{8}{\sqrt{89}}$`,
      r`$\dfrac{32}{\sqrt{89}}$`,
    ],
    correct: 3,
    explanation: r`Направления $(2;4;0)$ и $(0;3;4)$ дают $|\vec u\times\vec v|=2\sqrt{89}$, а смешанное произведение равно $64$. Поэтому $d=\frac{64}{2\sqrt{89}}=\frac{32}{\sqrt{89}}$.`,
  },
];
