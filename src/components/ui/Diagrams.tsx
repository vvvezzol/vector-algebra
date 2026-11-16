import type { Task } from "@/content/tasks";

const sans = "var(--font-sans)";
const mono = "var(--font-mono)";

function Arrowhead({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 10 5 0 10z" fill="currentColor" />
      </marker>
    </defs>
  );
}

function Label({
  x,
  y,
  children,
  fill = "var(--color-ink-soft)",
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fill={fill} fontSize="12" fontFamily={mono} textAnchor={anchor}>
      {children}
    </text>
  );
}

/** Hero illustration: decomposition of a vector into parallel and perpendicular parts. */
export function VectorFigure() {
  return (
    <svg viewBox="0 0 460 300" className="h-auto w-full" fill="none" role="img" aria-label="Разложение вектора на проекцию и перпендикулярную составляющую">
      <Arrowhead id="hero-arrow" />
      <line x1="45" y1="245" x2="425" y2="245" stroke="var(--color-line)" strokeWidth="1" />
      <line x1="45" y1="245" x2="45" y2="45" stroke="var(--color-line)" strokeWidth="1" />

      {/* direction a */}
      <line x1="45" y1="245" x2="360" y2="105" stroke="var(--color-accent)" strokeWidth="2.2" markerEnd="url(#hero-arrow)" />
      {/* vector b */}
      <line x1="45" y1="245" x2="300" y2="60" stroke="var(--color-ink)" strokeWidth="2.2" markerEnd="url(#hero-arrow)" />
      {/* projection of b on a */}
      <line x1="45" y1="245" x2="292" y2="139" stroke="var(--color-accent)" strokeWidth="5" strokeOpacity="0.28" />
      {/* perpendicular component */}
      <line x1="292" y1="139" x2="300" y2="60" stroke="var(--color-warn-ink)" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#hero-arrow)" />
      {/* right angle */}
      <path d="M 282 125 L 298 131 L 292 146" stroke="var(--color-line-strong)" strokeWidth="1.2" />

      <text x="368" y="96" fill="var(--color-accent)" fontSize="15" fontFamily={mono} fontStyle="italic">a</text>
      <text x="310" y="52" fill="var(--color-ink)" fontSize="15" fontFamily={mono} fontStyle="italic">b</text>
      <text x="300" y="166" fill="var(--color-accent)" fontSize="12" fontFamily={sans}>npₐb</text>
      <text x="310" y="110" fill="var(--color-warn-ink)" fontSize="12" fontFamily={sans}>b⊥</text>
      <text x="54" y="263" fill="var(--color-ink-faint)" fontSize="11" fontFamily={sans}>O</text>
    </svg>
  );
}

function DotDiagram() {
  return (
    <svg viewBox="0 0 420 260" className="h-auto w-full" fill="none" aria-hidden="true">
      <Arrowhead id="dot-arrow" />
      <line x1="50" y1="215" x2="390" y2="215" stroke="var(--color-line)" strokeWidth="1" />
      <line x1="50" y1="215" x2="50" y2="30" stroke="var(--color-line)" strokeWidth="1" />
      {/* a and b from O */}
      <line x1="50" y1="215" x2="360" y2="120" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#dot-arrow)" />
      <line x1="50" y1="215" x2="190" y2="45" stroke="var(--color-ink)" strokeWidth="2" markerEnd="url(#dot-arrow)" />
      {/* projection of b on a: p = O + 0.5665 * a */}
      <line x1="50" y1="215" x2="226" y2="161" stroke="var(--color-accent)" strokeWidth="6" strokeOpacity="0.25" />
      {/* perpendicular from b to line a */}
      <line x1="190" y1="45" x2="226" y2="161" stroke="var(--color-warn-ink)" strokeWidth="1.7" strokeDasharray="5 3" />
      <path d="M 215 150 L 225 146 L 229 156" stroke="var(--color-line-strong)" strokeWidth="1" />
      <Label x={367} y={117}>a</Label>
      <Label x={195} y={35} fill="var(--color-ink)">b</Label>
      <Label x={118} y={200} fill="var(--color-accent)">npₐb</Label>
      <Label x={238} y={112} fill="var(--color-warn-ink)">npₐ⊥(a−b)</Label>
    </svg>
  );
}

function ReciprocalDiagram() {
  return (
    <svg viewBox="0 0 320 210" className="h-auto w-full" fill="none" aria-hidden="true">
      <Arrowhead id="rec-arrow" />
      <line x1="35" y1="175" x2="285" y2="175" stroke="var(--color-line)" strokeWidth="1" />
      <line x1="35" y1="175" x2="35" y2="25" stroke="var(--color-line)" strokeWidth="1" />
      {/* e1, e2 */}
      <line x1="35" y1="175" x2="205" y2="175" stroke="var(--color-line-strong)" strokeWidth="1.4" markerEnd="url(#rec-arrow)" />
      <line x1="35" y1="175" x2="135" y2="55" stroke="var(--color-line-strong)" strokeWidth="1.4" markerEnd="url(#rec-arrow)" />
      {/* a and b */}
      <line x1="35" y1="175" x2="235" y2="135" stroke="var(--color-accent)" strokeWidth="2" markerEnd="url(#rec-arrow)" />
      <line x1="35" y1="175" x2="175" y2="45" stroke="var(--color-ink)" strokeWidth="2" markerEnd="url(#rec-arrow)" />
      {/* reciprocal a# perpendicular-ish to b, b# to a */}
      <line x1="35" y1="175" x2="255" y2="80" stroke="var(--color-warn-ink)" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#rec-arrow)" />
      <line x1="35" y1="175" x2="215" y2="190" stroke="var(--color-warn-ink)" strokeWidth="1.6" strokeDasharray="5 3" markerEnd="url(#rec-arrow)" />
      <Label x={211} y={170}>e₁</Label>
      <Label x={140} y={49}>e₂</Label>
      <Label x={242} y={129} fill="var(--color-accent)">a</Label>
      <Label x={180} y={39} fill="var(--color-ink)">b</Label>
      <Label x={260} y={78} fill="var(--color-warn-ink)">b#</Label>
      <Label x={220} y={202} fill="var(--color-warn-ink)">a#</Label>
    </svg>
  );
}

function TriangleDiagram() {
  return (
    <svg viewBox="0 0 320 210" className="h-auto w-full" fill="none" aria-hidden="true">
      <Arrowhead id="tri-arrow" />
      {/* A(0,-3), B(4,5), C(6,3) mapped approximately */}
      <polygon points="45,185 130,55 190,95" fill="var(--color-accent-soft)" fillOpacity="0.45" stroke="var(--color-line-strong)" strokeWidth="1.2" />
      <line x1="45" y1="185" x2="190" y2="95" stroke="var(--color-accent)" strokeWidth="2" />
      <line x1="130" y1="55" x2="190" y2="95" stroke="var(--color-accent)" strokeWidth="2" />
      <line x1="130" y1="55" x2="190" y2="95" stroke="var(--color-line-strong)" strokeWidth="1" strokeDasharray="3 3" />
      {/* M midpoint AB, N midpoint BM */}
      <circle cx="87" cy="120" r="3.2" fill="var(--color-accent)" />
      <circle cx="108" cy="87" r="3.2" fill="var(--color-accent)" />
      <line x1="190" y1="95" x2="87" y2="120" stroke="var(--color-ink)" strokeWidth="1.5" />
      <line x1="190" y1="95" x2="108" y2="87" stroke="var(--color-warn-ink)" strokeWidth="1.5" strokeDasharray="4 3" />
      <Label x={34} y={196}>A</Label>
      <Label x={126} y={46}>B</Label>
      <Label x={197} y={93}>C</Label>
      <Label x={72} y={115}>M</Label>
      <Label x={105} y={77}>N</Label>
    </svg>
  );
}

function PlaneDiagram() {
  return (
    <svg viewBox="0 0 320 210" className="h-auto w-full" fill="none" aria-hidden="true">
      <Arrowhead id="plane-arrow" />
      <polygon points="45,145 175,185 285,125 155,85" fill="var(--color-accent-soft)" fillOpacity="0.5" stroke="var(--color-line-strong)" strokeWidth="1.2" />
      {/* normal n */}
      <line x1="150" y1="130" x2="150" y2="35" stroke="var(--color-warn-ink)" strokeWidth="1.8" markerEnd="url(#plane-arrow)" />
      <Label x={156} y={28} fill="var(--color-warn-ink)">n</Label>
      {/* vector a */}
      <line x1="150" y1="130" x2="235" y2="55" stroke="var(--color-ink)" strokeWidth="2" markerEnd="url(#plane-arrow)" />
      <Label x={242} y={50} fill="var(--color-ink)">a</Label>
      {/* projection in plane */}
      <line x1="150" y1="130" x2="225" y2="112" stroke="var(--color-accent)" strokeWidth="4" strokeOpacity="0.5" />
      <Label x={228} y={121} fill="var(--color-accent)">aπ</Label>
      {/* perpendicular drop */}
      <line x1="225" y1="112" x2="235" y2="55" stroke="var(--color-line-strong)" strokeWidth="1.2" strokeDasharray="4 3" />
      <path d="M 218 105 L 228 101 L 232 111" stroke="var(--color-line-strong)" strokeWidth="1" />
      <text x="62" y="170" fill="var(--color-ink-faint)" fontSize="11" fontFamily={sans}>плоскость π</text>
    </svg>
  );
}

function RightTriangleDiagram() {
  return (
    <svg viewBox="0 0 320 210" className="h-auto w-full" fill="none" aria-hidden="true">
      <Arrowhead id="rt-arrow" />
      {/* C(40,170), A(240,170), B(40,70) */}
      <polygon points="40,170 240,170 40,70" fill="var(--color-accent-soft)" fillOpacity="0.4" stroke="var(--color-line-strong)" strokeWidth="1.2" />
      <path d="M 40 152 L 58 152 L 58 170" stroke="var(--color-line-strong)" strokeWidth="1.1" />
      {/* M midpoint AB */}
      <circle cx="140" cy="120" r="3.4" fill="var(--color-accent)" />
      <line x1="40" y1="170" x2="140" y2="120" stroke="var(--color-accent)" strokeWidth="1.8" />
      {/* BN perpendicular to CM, N=(90,170) */}
      <line x1="40" y1="70" x2="90" y2="170" stroke="var(--color-warn-ink)" strokeWidth="1.8" strokeDasharray="5 3" />
      <path d="M 79 144 L 90 141 L 93 152" stroke="var(--color-line-strong)" strokeWidth="1" />
      <circle cx="90" cy="170" r="3.2" fill="var(--color-warn-ink)" />
      <Label x={26} y={181}>C</Label>
      <Label x={246} y={181}>A</Label>
      <Label x={26} y={66}>B</Label>
      <Label x={137} y={111}>M</Label>
      <Label x={87} y={191}>N</Label>
      <Label x={166} y={128} fill="var(--color-accent)">CM</Label>
      <Label x={48} y={108} fill="var(--color-warn-ink)">BN</Label>
    </svg>
  );
}

function CubeDiagram() {
  return (
    <svg viewBox="0 0 340 240" className="h-auto w-full" fill="none" aria-hidden="true">
      <Arrowhead id="cube-arrow" />
      {/* bottom face A(55,190) B(185,190) C(235,160) D(105,160) */}
      <polygon points="55,190 185,190 235,160 105,160" fill="var(--color-accent-soft)" fillOpacity="0.35" stroke="var(--color-line-strong)" strokeWidth="1.1" />
      {/* top face A1(55,130) B1(185,130) C1(235,100) D1(105,100) */}
      <polygon points="55,130 185,130 235,100 105,100" fill="var(--color-surface)" stroke="var(--color-line-strong)" strokeWidth="1.1" />
      <line x1="55" y1="190" x2="55" y2="130" stroke="var(--color-line-strong)" strokeWidth="1.1" />
      <line x1="185" y1="190" x2="185" y2="130" stroke="var(--color-line-strong)" strokeWidth="1.1" />
      <line x1="235" y1="160" x2="235" y2="100" stroke="var(--color-line-strong)" strokeWidth="1.1" />
      <line x1="105" y1="160" x2="105" y2="100" stroke="var(--color-line-strong)" strokeWidth="1.1" strokeDasharray="4 3" />
      {/* M midpoint DC = (170,160) */}
      <circle cx="170" cy="160" r="3.4" fill="var(--color-accent)" />
      {/* K on B1C1, 3/4 from B1(185,130) to C1(235,100) => (222.5,107.5) */}
      <circle cx="223" cy="108" r="3.4" fill="var(--color-warn-ink)" />
      <line x1="55" y1="190" x2="170" y2="160" stroke="var(--color-accent)" strokeWidth="2" />
      <line x1="185" y1="190" x2="223" y2="108" stroke="var(--color-warn-ink)" strokeWidth="2" strokeDasharray="5 3" />
      <Label x={40} y={203}>A</Label>
      <Label x={183} y={203}>B</Label>
      <Label x={241} y={156}>C</Label>
      <Label x={101} y={155}>D</Label>
      <Label x={40} y={126}>A₁</Label>
      <Label x={183} y={126}>B₁</Label>
      <Label x={241} y={96}>C₁</Label>
      <Label x={101} y={96}>D₁</Label>
      <Label x={160} y={176} fill="var(--color-accent)">M</Label>
      <Label x={228} y={104} fill="var(--color-warn-ink)">K</Label>
      <Label x={108} y={181} fill="var(--color-accent)">AM</Label>
      <Label x={204} y={147} fill="var(--color-warn-ink)">BK</Label>
    </svg>
  );
}

export function TaskDiagram({ kind }: { kind: NonNullable<Task["diagram"]> }) {
  if (kind === "dot") return <DotDiagram />;
  if (kind === "reciprocal") return <ReciprocalDiagram />;
  if (kind === "triangle") return <TriangleDiagram />;
  if (kind === "plane") return <PlaneDiagram />;
  if (kind === "right-triangle") return <RightTriangleDiagram />;
  return <CubeDiagram />;
}
