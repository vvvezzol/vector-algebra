const r = String.raw;

export type Task = {
  n: number;
  slug: string;
  title: string;
  topic: string;
  level: "базовый" | "средний";
  short: string;
  theory: string;
  given: string[];
  steps: { title: string; body: string }[];
  answer: string[];
  note?: string;
  diagram?: "dot" | "reciprocal" | "triangle" | "plane" | "right-triangle" | "cube";
};

export const tasks: Task[] = [
  {
    n: 1,
    slug: "dot-product-projection",
    title: "Скалярное произведение и проекция",
    topic: "Задание I · векторы в координатах",
    level: "базовый",
    short:
      "Найти скалярное произведение, длины, косинус угла и проекцию разности векторов на перпендикуляр к первому вектору.",
    theory: "dot-product",
    diagram: "dot",
    given: [
      r`$\vec a=2\vec i-3\vec j-6\vec k=(2;-3;-6)$, $\vec b=2\vec i+2\vec j+\vec k=(2;2;1)$.`,
      r`Найти $\vec a\cdot\vec b$, $|\vec a|$, $|\vec b|$, $\cos(\widehat{\vec a,\vec b})$ и $\operatorname{np}_{\vec a^\perp}(\vec a-\vec b)$.`,
    ],
    steps: [
      {
        title: "Скалярное произведение",
        body: r`В ортонормированном базисе перемножаем одноимённые координаты и складываем: $$\vec a\cdot\vec b=2\cdot2+(-3)\cdot2+(-6)\cdot1=4-6-6=-8.$$ Результат отрицательный, значит угол между векторами тупой.`,
      },
      {
        title: "Длины векторов",
        body: r`$$|\vec a|=\sqrt{2^2+(-3)^2+(-6)^2}=\sqrt{4+9+36}=7,$$ $$|\vec b|=\sqrt{2^2+2^2+1^2}=\sqrt{4+4+1}=3.$$`,
      },
      {
        title: "Косинус угла",
        body: r`$$\cos(\widehat{\vec a,\vec b})=\frac{\vec a\cdot\vec b}{|\vec a|\,|\vec b|}=\frac{-8}{7\cdot3}=-\frac{8}{21}\approx-0{,}381.$$ Угол равен примерно $112{,}4^\circ$.`,
      },
      {
        title: "Проекция на направление a",
        body: r`Сначала найдём разность: $$\vec a-\vec b=(0;-5;-7).$$ Её скалярная проекция на $\vec a$: $$\operatorname{np}_{\vec a}(\vec a-\vec b)=\frac{(\vec a-\vec b)\cdot\vec a}{|\vec a|}=\frac{0\cdot2+(-5)(-3)+(-7)(-6)}{7}=\frac{57}{7}.$$`,
      },
      {
        title: "Перпендикулярная составляющая",
        body: r`Длина разности: $$|\vec a-\vec b|=\sqrt{0^2+(-5)^2+(-7)^2}=\sqrt{74}.$$ Тогда $$\operatorname{np}_{\vec a^\perp}(\vec a-\vec b)=\sqrt{|\vec a-\vec b|^2-\left(\operatorname{np}_{\vec a}(\vec a-\vec b)\right)^2}=\sqrt{74-\frac{3249}{49}}=\frac{\sqrt{377}}{7}.$$ Это длина составляющей, перпендикулярной $\vec a$.`,
      },
    ],
    answer: [
      r`$\vec a\cdot\vec b=-8$;`,
      r`$|\vec a|=7$, $|\vec b|=3$;`,
      r`$\cos(\widehat{\vec a,\vec b})=-\dfrac{8}{21}$;`,
      r`$\operatorname{np}_{\vec a^\perp}(\vec a-\vec b)=\dfrac{\sqrt{377}}{7}\approx2{,}77$.`,
    ],
    note: r`Направление $\vec a^\perp$ в пространстве задано не однозначно: противоположный выбор даёт $-2{,}77$. Если в задании не указана ориентация, проекцию понимают как длину перпендикулярной составляющей, то есть число неотрицательное.`,
  },
  {
    n: 2,
    slug: "reciprocal-basis",
    title: "Взаимный базис",
    topic: "Задание II · метрическая матрица",
    level: "средний",
    short:
      "Проверить, что два вектора образуют базис, и найти координаты векторов взаимного базиса по метрическим коэффициентам.",
    theory: "reciprocal",
    diagram: "reciprocal",
    given: [
      r`В аффинном базисе $\{\vec e_1,\vec e_2\}$ заданы $g_{11}=13$, $g_{12}=-5$, $g_{22}=2$;`,
      r`$\vec a=(2;-3)$, $\vec b=(4;-5)$.`,
      r`Убедившись, что $\{\vec a,\vec b\}$ — базис, найти координаты базисных векторов $\vec a^\#$ и $\vec b^\#$ взаимного базиса.`,
    ],
    steps: [
      {
        title: "Проверяем базис",
        body: r`Составим определитель из координат $\vec a$ и $\vec b$: $$\begin{vmatrix}2&4\\-3&-5\end{vmatrix}=2\cdot(-5)-4\cdot(-3)=-10+12=2\ne0.$$ Значит, векторы неколлинеарны и действительно образуют базис.`,
      },
      {
        title: "Скалярные произведения базисных векторов",
        body: r`Через метрическую матрицу $G=\begin{pmatrix}13&-5\\-5&2\end{pmatrix}$: $$\vec a\cdot\vec a=13\cdot2^2+2(-5)\cdot2(-3)+2\cdot(-3)^2=130,$$ $$\vec a\cdot\vec b=13\cdot2\cdot4+(-5)(2(-5)+4(-3))+2(-3)(-5)=244,$$ $$\vec b\cdot\vec b=13\cdot4^2+2(-5)\cdot4(-5)+2(-5)^2=458.$$`,
      },
      {
        title: "Уравнения для a#",
        body: r`Пусть $\vec a^\#=x\vec e_1+y\vec e_2$. Условия $\vec a^\#\cdot\vec a=1$, $\vec a^\#\cdot\vec b=0$ дают систему $$\begin{cases}41x-16y=1,\\77x-30y=0.\end{cases}$$ Её определитель равен $2$, поэтому $$x=-15,\qquad y=-\frac{77}{2}.$$`,
      },
      {
        title: "Уравнения для b#",
        body: r`Аналогично для $\vec b^\#=u\vec e_1+v\vec e_2$: $$\begin{cases}41u-16v=0,\\77u-30v=1.\end{cases}$$ Отсюда $$u=8,\qquad v=\frac{41}{2}.$$`,
      },
      {
        title: "Проверка",
        body: r`Подстановка в метрическую форму даёт $\vec a^\#\cdot\vec a=1$, $\vec a^\#\cdot\vec b=0$, $\vec b^\#\cdot\vec a=0$, $\vec b^\#\cdot\vec b=1$. Значит, координаты найдены верно.`,
      },
    ],
    answer: [
      r`$\{\vec a,\vec b\}$ — базис, так как определитель координат равен $2$;`,
      r`$\vec a^\#=-15\vec e_1-\dfrac{77}{2}\vec e_2=\left(-15;-\dfrac{77}{2}\right)$;`,
      r`$\vec b^\#=8\vec e_1+\dfrac{41}{2}\vec e_2=\left(8;\dfrac{41}{2}\right)$.`,
    ],
    note: r`Координаты взаимного базиса зависят от метрики: при другом $G$ те же $\vec a$ и $\vec b$ дали бы другой ответ. В ортонормированном базисе $G=I$, поэтому метрические поправки исчезают и координаты находятся обычным обращением матрицы.`,
  },
  {
    n: 3,
    slug: "triangle-angle",
    title: "Угол в треугольнике",
    topic: "Задание III · координатный метод",
    level: "базовый",
    short:
      "Найти косинус угла MCN в треугольнике, где M и N — середины двух отрезков.",
    theory: "geometry",
    diagram: "triangle",
    given: [
      r`В треугольнике $ABC$: $A(0;-3)$, $B(4;5)$, $C(6;3)$;`,
      r`$M$ — середина $AB$, $N$ — середина $BM$.`,
      r`Найти $\cos\angle MCN$.`,
    ],
    steps: [
      {
        title: "Координаты середины AB",
        body: r`Середина отрезка — полусумма координат концов: $$M=\left(\frac{0+4}{2};\frac{-3+5}{2}\right)=(2;1).$$`,
      },
      {
        title: "Координаты середины BM",
        body: r`$$N=\left(\frac{4+2}{2};\frac{5+1}{2}\right)=(3;3).$$`,
      },
      {
        title: "Векторы, выходящие из вершины C",
        body: r`Угол $\angle MCN$ образован векторами $$\overrightarrow{CM}=(2-6;1-3)=(-4;-2),$$ $$\overrightarrow{CN}=(3-6;3-3)=(-3;0).$$`,
      },
      {
        title: "Длины и скалярное произведение",
        body: r`$$|\overrightarrow{CM}|=\sqrt{16+4}=2\sqrt5,\qquad |\overrightarrow{CN}|=3,$$ $$\overrightarrow{CM}\cdot\overrightarrow{CN}=(-4)(-3)+(-2)\cdot0=12.$$`,
      },
      {
        title: "Косинус угла",
        body: r`$$\cos\angle MCN=\frac{12}{2\sqrt5\cdot3}=\frac{2}{\sqrt5}=\frac{2\sqrt5}{5}\approx0{,}894.$$ Угол равен примерно $26{,}6^\circ$.`,
      },
    ],
    answer: [
      r`$M(2;1)$, $N(3;3)$;`,
      r`$\cos\angle MCN=\dfrac{2}{\sqrt5}=\dfrac{2\sqrt5}{5}\approx0{,}894$.`,
    ],
    note: r`Угол ищется именно между векторами из вершины $C$, а не между $MC$ и $NC$: направление второго вектора нужно брать от вершины.`,
  },
  {
    n: 4,
    slug: "plane-projection",
    title: "Проекция на плоскость",
    topic: "Задание IV · проекции и направляющие косинусы",
    level: "средний",
    short:
      "Найти проекцию вектора на плоскость, перпендикулярную заданному вектору, и направляющие косинусы нормали.",
    theory: "projection",
    diagram: "plane",
    given: [
      r`Даны $\vec a=(3;4;5)$ и $\vec n=(1;0;-1)$ в ортонормированном базисе.`,
      r`Плоскость $\pi$ перпендикулярна $\vec n$.`,
      r`Найти $\operatorname{np}_\pi\vec a$ и направляющие косинусы $\vec n$.`,
    ],
    steps: [
      {
        title: "Длина и направляющие косинусы нормали",
        body: r`$$|\vec n|=\sqrt{1^2+0^2+(-1)^2}=\sqrt2.$$ Поэтому $$\cos\alpha=\frac{1}{\sqrt2},\qquad \cos\beta=0,\qquad \cos\gamma=-\frac{1}{\sqrt2}.$$ Проверка: $\frac12+0+\frac12=1$.`,
      },
      {
        title: "Нормальная и касательная составляющие",
        body: r`$$\vec a\cdot\vec n=3\cdot1+4\cdot0+5\cdot(-1)=-2.$$ Скалярная проекция на нормаль: $$\operatorname{np}_{\vec n}\vec a=\frac{-2}{\sqrt2}=-\sqrt2.$$ Знак минус означает, что вектор $\vec a$ отклоняется от направления $\vec n$ в противоположную сторону.`,
      },
      {
        title: "Векторная проекция на плоскость",
        body: r`Из вектора вычитаем нормальную составляющую: $$\vec a_\pi=\vec a-\frac{\vec a\cdot\vec n}{|\vec n|^2}\vec n=(3;4;5)-\frac{-2}{2}(1;0;-1).$$ Так как $\frac{-2}{2}=-1$, получаем $$\vec a_\pi=(3;4;5)+(1;0;-1)=(4;4;4).$$`,
      },
      {
        title: "Проверка и длина",
        body: r`Вектор проекции должен быть перпендикулярен нормали: $$(4;4;4)\cdot(1;0;-1)=4-4=0.$$ Его длина: $$|\vec a_\pi|=\sqrt{4^2+4^2+4^2}=4\sqrt3\approx6{,}93.$$`,
      },
    ],
    answer: [
      r`$\operatorname{np}_\pi\vec a=(4;4;4)$;`,
      r`$|\operatorname{np}_\pi\vec a|=4\sqrt3$;`,
      r`направляющие косинусы $\vec n$: $\left(\dfrac{1}{\sqrt2};0;-\dfrac{1}{\sqrt2}\right)$.`,
    ],
    note: r`Если под $\operatorname{np}_\pi\vec a$ понимают скалярную проекцию на плоскость, то есть длину вектора проекции, ответ равен $4\sqrt3$. Векторная проекция — $(4;4;4)$.`,
  },
  {
    n: 5,
    slug: "right-triangle-perpendicular",
    title: "Перпендикуляр в прямоугольном треугольнике",
    topic: "Задание V · геометрия",
    level: "средний",
    short:
      "Через вершину прямого угла проведена медиана; из другой вершины опущен перпендикуляр к ней. Найти отрезок на катете.",
    theory: "geometry",
    diagram: "right-triangle",
    given: [
      r`В $\triangle ABC$ угол $C=90^\circ$, $AC=2$, $BC=1$;`,
      r`$M$ — середина $AB$, $BN\perp CM$, прямые $BN$ и $AC$ пересекаются в точке $N$.`,
      r`Найти длину отрезка $CN$.`,
    ],
    steps: [
      {
        title: "Удобные координаты",
        body: r`Поместим прямой угол в начало координат: $$C(0;0),\qquad A(2;0),\qquad B(0;1).$$ Тогда катет $AC$ лежит на оси $Ox$, а $BC$ — на оси $Oy$.`,
      },
      {
        title: "Середина гипотенузы",
        body: r`$$M=\left(\frac{2+0}{2};\frac{0+1}{2}\right)=\left(1;\frac12\right).$$ Направляющий вектор медианы: $$\overrightarrow{CM}=\left(1;\frac12\right).$$`,
      },
      {
        title: "Точка N на прямой AC",
        body: r`Так как $N$ лежит на $AC$, её координаты имеют вид $N(t;0)$. Вектор $$\overrightarrow{BN}=(t;-1).$$ Условие $BN\perp CM$ означает, что скалярное произведение равно нулю: $$t\cdot1+(-1)\cdot\frac12=0.$$`,
      },
      {
        title: "Решаем и находим CN",
        body: r`$$t-\frac12=0\quad\Rightarrow\quad t=\frac12.$$ Значит, $N\left(\frac12;0\right)$, и $$CN=\left|\frac12-0\right|=\frac12.$$ Точка $N$ лежит между $C$ и $A$, поэтому отрезок действительно пересекает катет, а не его продолжение.`,
      },
    ],
    answer: [r`$CN=\dfrac12=0{,}5$.`],
    note: r`Проверка через углы: медиана прямоугольного треугольника равна половине гипотенузы, поэтому $CM=\frac{\sqrt5}{2}$. Координатный способ короче и сразу даёт положение точки $N$.`,
  },
  {
    n: 6,
    slug: "skew-lines-distance",
    title: "Расстояние между прямыми в кубе",
    topic: "Задание VI · скрещивающиеся прямые",
    level: "средний",
    short:
      "Найти кратчайшее расстояние между прямой через вершину и середину ребра и прямой через точку деления верхнего ребра.",
    theory: "skew-lines",
    diagram: "cube",
    given: [
      r`В кубе $ABCDA_1B_1C_1D_1$ ребро равно $4$;`,
      r`$M$ — середина ребра $DC$, точка $K\in B_1C_1$, причём $B_1K:KC_1=3:1$.`,
      r`Найти кратчайшее расстояние между прямыми $AM$ и $BK$.`,
    ],
    steps: [
      {
        title: "Координаты вершин",
        body: r`Выберем систему координат с началом в $A$: $$A(0;0;0),\ B(4;0;0),\ C(4;4;0),\ D(0;4;0),$$ $$A_1(0;0;4),\ B_1(4;0;4),\ C_1(4;4;4),\ D_1(0;4;4).$$`,
      },
      {
        title: "Координаты M и K",
        body: r`Середина $DC$: $$M=\left(\frac{4+0}{2};\frac{4+4}{2};\frac{0+0}{2}\right)=(2;4;0).$$ Точка $K$ делит $B_1C_1$ в отношении $3:1$, считая от $B_1$: $$K=B_1+\frac34\overrightarrow{B_1C_1}=(4;0;4)+\frac34(0;4;0)=(4;3;4).$$`,
      },
      {
        title: "Направляющие векторы прямых",
        body: r`$$\vec u=\overrightarrow{AM}=(2;4;0),\qquad \vec v=\overrightarrow{BK}=(4-4;3-0;4-0)=(0;3;4).$$ Векторы не коллинеарны, значит прямые не параллельны.`,
      },
      {
        title: "Общий перпендикуляр",
        body: r`Векторное произведение: $$\vec u\times\vec v=\begin{vmatrix}\vec i&\vec j&\vec k\\2&4&0\\0&3&4\end{vmatrix}=(16;-8;6).$$ Его длина: $$|\vec u\times\vec v|=\sqrt{16^2+(-8)^2+6^2}=\sqrt{356}=2\sqrt{89}.$$`,
      },
      {
        title: "Смешанное произведение и расстояние",
        body: r`Возьмём точки $A$ и $B$ на прямых: $\overrightarrow{AB}=(4;0;0)$. Тогда $$(\overrightarrow{AB}\cdot(\vec u\times\vec v))=4\cdot16+0\cdot(-8)+0\cdot6=64.$$ Искомое расстояние: $$d=\frac{64}{2\sqrt{89}}=\frac{32}{\sqrt{89}}=\frac{32\sqrt{89}}{89}\approx3{,}39.$$`,
      },
    ],
    answer: [
      r`$d=\dfrac{32}{\sqrt{89}}=\dfrac{32\sqrt{89}}{89}\approx3{,}39$.`,
    ],
    note: r`Формула даёт расстояние между прямыми, а не между отрезками $AM$ и $BK$. Кратчайший отрезок — общий перпендикуляр; его концы могут лежать на продолжениях данных отрезков.`,
  },
];
