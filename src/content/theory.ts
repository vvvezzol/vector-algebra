const r = String.raw;

export type Block =
  | { kind: "p"; text: string }
  | { kind: "formula"; lines: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "note"; text: string };

export type TheorySection = {
  id: string;
  title: string;
  lead: string;
  blocks: Block[];
};

export const theory: TheorySection[] = [
  {
    id: "vectors",
    title: "Векторы и координаты",
    lead: "С чего начинается любой разбор: выбрать базис, записать координаты и работать с ними как с числами.",
    blocks: [
      {
        kind: "p",
        text: r`Вектор — направленный отрезок. В ортонормированном базисе $\{\vec i,\vec j,\vec k\}$ вектор записывают тройкой координат:`,
      },
      {
        kind: "formula",
        lines: [r`\vec a=x\vec i+y\vec j+z\vec k=(x;y;z)`],
      },
      {
        kind: "p",
        text: r`Линейные операции выполняются покоординатно:`,
      },
      {
        kind: "formula",
        lines: [
          r`\vec a\pm\vec b=(x_1\pm x_2;\ y_1\pm y_2;\ z_1\pm z_2)`,
          r`\lambda\vec a=(\lambda x;\ \lambda y;\ \lambda z)`,
        ],
      },
      {
        kind: "p",
        text: r`Два вектора образуют базис плоскости, если они неколлинеарны. В координатах это значит, что определитель, составленный из их координат, отличен от нуля:`,
      },
      {
        kind: "formula",
        lines: [
          r`\begin{vmatrix}x_1&x_2\\ y_1&y_2\end{vmatrix}\ne0`,
          r`\vec a,\ \vec b,\ \vec c\ \text{— базис пространства}\iff \det(\vec a,\vec b,\vec c)\ne0`,
        ],
      },
      {
        kind: "note",
        text: r`Координаты зависят от базиса. Если базис не ортонормированный, привычные формулы длины и скалярного произведения через координаты напрямую не работают — нужна метрическая матрица.`,
      },
    ],
  },
  {
    id: "dot-product",
    title: "Скалярное произведение",
    lead: "Главная операция всего задания: через неё считаются длины, углы, проекции и перпендикулярность.",
    blocks: [
      {
        kind: "p",
        text: r`Скалярное произведение векторов $\vec a$ и $\vec b$ — это число`,
      },
      {
        kind: "formula",
        lines: [r`\vec a\cdot\vec b=|\vec a|\,|\vec b|\cos\varphi,`],
      },
      {
        kind: "p",
        text: r`где $\varphi$ — угол между векторами, $0\le\varphi\le\pi$. В ортонормированном базисе координатная формула очень простая:`,
      },
      {
        kind: "formula",
        lines: [r`\vec a\cdot\vec b=x_1x_2+y_1y_2+z_1z_2`],
      },
      {
        kind: "list",
        items: [
          r`$\vec a\cdot\vec a=|\vec a|^2$ — длина выражается через скалярный квадрат.`,
          r`$\vec a\perp\vec b\iff\vec a\cdot\vec b=0$ (для ненулевых векторов).`,
          r`$\vec a\cdot\vec b>0$ — угол острый, $\vec a\cdot\vec b<0$ — угол тупой.`,
          r`Операция коммутативна и линейна по каждому аргументу.`,
        ],
      },
      {
        kind: "note",
        text: r`Знак скалярного произведения несёт геометрическую информацию: если оно отрицательно, угол между векторами больше $90^\circ$. Именно поэтому в задаче I ответ $\cos(\widehat{\vec a,\vec b})=-\frac{8}{21}$ сразу говорит о тупом угле.`,
      },
    ],
  },
  {
    id: "length-angle",
    title: "Длина, расстояние и угол",
    lead: "Три формулы, которые нужны почти в каждой задаче варианта.",
    blocks: [
      {
        kind: "p",
        text: r`Длина вектора — корень из скалярного квадрата:`,
      },
      {
        kind: "formula",
        lines: [r`|\vec a|=\sqrt{\vec a\cdot\vec a}=\sqrt{x^2+y^2+z^2}`],
      },
      {
        kind: "p",
        text: r`Расстояние между точками $A(x_1;y_1;z_1)$ и $B(x_2;y_2;z_2)$ — длина вектора $\overrightarrow{AB}$:`,
      },
      {
        kind: "formula",
        lines: [r`|AB|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}`],
      },
      {
        kind: "p",
        text: r`Угол между ненулевыми векторами задаётся через косинус:`,
      },
      {
        kind: "formula",
        lines: [r`\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}`],
      },
      {
        kind: "p",
        text: r`Единичный вектор того же направления получают делением на длину: $\vec e_a=\dfrac{\vec a}{|\vec a|}$. Его координаты — это направляющие косинусы:`,
      },
      {
        kind: "formula",
        lines: [r`\cos\alpha=\frac{x}{|\vec a|},\qquad \cos\beta=\frac{y}{|\vec a|},\qquad \cos\gamma=\frac{z}{|\vec a|}`],
      },
      {
        kind: "note",
        text: r`Для направляющих косинусов всегда $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$. Это удобная проверка.`,
      },
    ],
  },
  {
    id: "projection",
    title: "Проекции на направление и на плоскость",
    lead: "Проекция — это «тень» вектора. Скалярная проекция — число, векторная — вектор.",
    blocks: [
      {
        kind: "p",
        text: r`Скалярная проекция $\vec b$ на направление $\vec a$:`,
      },
      {
        kind: "formula",
        lines: [r`\operatorname{np}_{\vec a}\vec b=|\vec b|\cos\varphi=\frac{\vec a\cdot\vec b}{|\vec a|}`],
      },
      {
        kind: "p",
        text: r`Векторная проекция (составляющая вдоль $\vec a$):`,
      },
      {
        kind: "formula",
        lines: [r`\operatorname{proj}_{\vec a}\vec b=\frac{\vec a\cdot\vec b}{|\vec a|^2}\,\vec a`],
      },
      {
        kind: "p",
        text: r`Ортогональная составляющая получается вычитанием:`,
      },
      {
        kind: "formula",
        lines: [
          r`\vec b_\perp=\vec b-\operatorname{proj}_{\vec a}\vec b,\qquad |\vec b_\perp|=\sqrt{|\vec b|^2-\left(\operatorname{np}_{\vec a}\vec b\right)^2}`,
        ],
      },
      {
        kind: "p",
        text: r`Проекция на плоскость $\pi$ с нормальным вектором $\vec n$ — это составляющая, перпендикулярная нормали:`,
      },
      {
        kind: "formula",
        lines: [
          r`\vec a_\pi=\vec a-\frac{\vec a\cdot\vec n}{|\vec n|^2}\,\vec n,\qquad |\vec a_\pi|=\sqrt{|\vec a|^2-\frac{(\vec a\cdot\vec n)^2}{|\vec n|^2}}`,
        ],
      },
      {
        kind: "note",
        text: r`В записи $\operatorname{np}_{\vec a^\perp}\vec c$ направление $\vec a^\perp$ задаётся с точностью до знака. Если не указана ориентация, берут длину перпендикулярной составляющей — неотрицательное число.`,
      },
    ],
  },
  {
    id: "metric-basis",
    title: "Метрическая матрица",
    lead: "Как считать длины и углы, когда базис не ортонормированный.",
    blocks: [
      {
        kind: "p",
        text: r`Пусть $\{\vec e_1,\vec e_2\}$ — произвольный базис плоскости. Его метрические коэффициенты:`,
      },
      {
        kind: "formula",
        lines: [r`g_{ij}=\vec e_i\cdot\vec e_j,\qquad G=\begin{pmatrix}g_{11}&g_{12}\\ g_{21}&g_{22}\end{pmatrix},\quad g_{12}=g_{21}`],
      },
      {
        kind: "p",
        text: r`Если векторы заданы координатами $\vec a=(x_1;y_1)$, $\vec b=(x_2;y_2)$ в этом базисе, то`,
      },
      {
        kind: "formula",
        lines: [r`\vec a\cdot\vec b=\begin{pmatrix}x_1&y_1\end{pmatrix}G\begin{pmatrix}x_2\\ y_2\end{pmatrix}`],
      },
      {
        kind: "p",
        text: r`В развёрнутом виде:`,
      },
      {
        kind: "formula",
        lines: [r`\vec a\cdot\vec b=g_{11}x_1x_2+g_{12}(x_1y_2+y_1x_2)+g_{22}y_1y_2`],
      },
      {
        kind: "list",
        items: [
          r`$g_{11}=|\vec e_1|^2$, $g_{22}=|\vec e_2|^2$;`,
          r`$g_{12}=|\vec e_1||\vec e_2|\cos\angle(\vec e_1,\vec e_2)$;`,
          r`$\det G>0$ для любого базиса; в ортонормированном базисе $G=I$.`,
        ],
      },
      {
        kind: "note",
        text: r`В задаче II метрическая матрица $\begin{pmatrix}13&-5\\-5&2\end{pmatrix}$ имеет определитель $1$. Это не случайность: именно поэтому обратная матрица и координаты взаимного базиса получаются целыми и полуцелыми.`,
      },
    ],
  },
  {
    id: "reciprocal",
    title: "Взаимный базис",
    lead: "Базис, векторы которого «ортогональны» чужим и дают единицу на своём.",
    blocks: [
      {
        kind: "p",
        text: r`Пусть $\{\vec a,\vec b\}$ — базис. Взаимный базис $\{\vec a^\#,\vec b^\#\}$ определяется условиями`,
      },
      {
        kind: "formula",
        lines: [
          r`\vec a^\#\cdot\vec a=1,\qquad \vec a^\#\cdot\vec b=0,`,
          r`\vec b^\#\cdot\vec a=0,\qquad \vec b^\#\cdot\vec b=1.`,
        ],
      },
      {
        kind: "p",
        text: r`Если $A$ — матрица, столбцы которой являются координатами $\vec a$ и $\vec b$ в исходном базисе, а $G$ — метрическая матрица, то столбцы координат взаимного базиса образуют матрицу`,
      },
      {
        kind: "formula",
        lines: [r`B=(A^{T}G)^{-1}=G^{-1}A^{-T}.`],
      },
      {
        kind: "p",
        text: r`На практике удобнее решать две системы линейных уравнений. Например, для $\vec a^\#=(x;y)$:`,
      },
      {
        kind: "formula",
        lines: [
          r`\begin{cases}\vec a^\#\cdot\vec a=1\\ \vec a^\#\cdot\vec b=0\end{cases}\qquad\Longleftrightarrow\qquad \begin{cases}41x-16y=1\\ 77x-30y=0\end{cases}`,
        ],
      },
      {
        kind: "p",
        text: r`Числа $41$, $16$, $77$, $30$ — это произведения метрической матрицы на координаты $\vec a$ и $\vec b$: $G\vec a$ и $G\vec b$.`,
      },
      {
        kind: "note",
        text: r`Обязательная проверка: $\vec a^\#\cdot\vec b=0$ и $\vec b^\#\cdot\vec a=0$. Если хотя бы одно из четырёх условий не выполнено, где-то потерян знак или множитель.`,
      },
    ],
  },
  {
    id: "geometry",
    title: "Координатный метод в геометрии",
    lead: "Треугольники, параллелограммы и деление отрезка: переводим картинку в векторы и считаем.",
    blocks: [
      {
        kind: "p",
        text: r`Главный приём — поставить начало координат в удобную вершину и записать все точки. Тогда любой отрезок становится разностью координат.`,
      },
      {
        kind: "formula",
        lines: [
          r`\overrightarrow{AB}=(x_B-x_A;\ y_B-y_A;\ z_B-z_A)`,
          r`M=\frac{A+B}{2}\quad\text{— середина }AB`,
        ],
      },
      {
        kind: "p",
        text: r`Точка $X$, делящая отрезок $AB$ в отношении $AX:XB=m:n$, имеет координаты`,
      },
      {
        kind: "formula",
        lines: [r`X=\frac{nA+mB}{m+n}.`],
      },
      {
        kind: "p",
        text: r`Угол при вершине $C$ ищут между векторами, выходящими из этой вершины: $\overrightarrow{CA}$ и $\overrightarrow{CB}$. Сначала находят косинус, затем сам угол:`,
      },
      {
        kind: "formula",
        lines: [r`\cos\angle ACB=\frac{\overrightarrow{CA}\cdot\overrightarrow{CB}}{|\overrightarrow{CA}|\,|\overrightarrow{CB}|}`],
      },
      {
        kind: "list",
        items: [
          r`В треугольнике медиана соединяет вершину с серединой противоположной стороны.`,
          r`В параллелограмме противоположные стороны равны и параллельны — это даёт координаты четвёртой вершины.`,
          r`Перпендикулярность двух отрезков проверяется равенством $\overrightarrow{u}\cdot\overrightarrow{v}=0$.`,
          r`Если нужна длина отрезка, считают длину соответствующего вектора.`,
        ],
      },
      {
        kind: "note",
        text: r`Не обязательно рисовать точный чертёж: координатный метод работает и без него. Но схема помогает не перепутать, из какой вершины выходят векторы угла.`,
      },
    ],
  },
  {
    id: "skew-lines",
    title: "Расстояние между скрещивающимися прямыми",
    lead: "Кратчайшее расстояние — длина общего перпендикуляра. В координатах оно считается через смешанное и векторное произведения.",
    blocks: [
      {
        kind: "p",
        text: r`Пусть прямые заданы точками и направляющими векторами:`,
      },
      {
        kind: "formula",
        lines: [
          r`\ell_1:\ \vec r=\vec r_1+t\vec u,\qquad \ell_2:\ \vec r=\vec r_2+s\vec v.`,
        ],
      },
      {
        kind: "p",
        text: r`Если $\vec u\times\vec v\ne\vec0$ (прямые не параллельны), расстояние между ними равно модулю проекции вектора $\vec r_2-\vec r_1$ на общий перпендикуляр $\vec u\times\vec v$:`,
      },
      {
        kind: "formula",
        lines: [
          r`d=\frac{|(\vec r_2-\vec r_1)\cdot(\vec u\times\vec v)|}{|\vec u\times\vec v|}`],
      },
      {
        kind: "p",
        text: r`Числитель — модуль смешанного произведения, то есть объём параллелепипеда. Знаменатель — площадь основания. Отношение даёт высоту, то есть искомое расстояние.`,
      },
      {
        kind: "list",
        items: [
          r`$\vec u\times\vec v=\vec0$ — прямые параллельны; расстояние считают от точки до прямой.`,
          r`Смешанное произведение равно нулю — прямые пересекаются, расстояние $0$.`,
          r`Расстояние от точки $P$ до прямой с точкой $A$ и направлением $\vec u$: $d=\dfrac{|(P-A)\times\vec u|}{|\vec u|}$.`,
        ],
      },
      {
        kind: "note",
        text: r`В кубе удобно брать рёбра за оси координат. Тогда все вершины, середины и точки деления получают простые координаты, а векторное произведение считается без геометрических построений.`,
      },
    ],
  },
];

export const theoryById = (id: string) => theory.find((section) => section.id === id);
