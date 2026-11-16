type DiagramProps = {
  uid: string;
  className?: string;
};

function ArrowHead({ id, color = "var(--color-accent)" }: { id: string; color?: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" fill={color} />
      </marker>
    </defs>
  );
}

export function HeroFigure({ uid = "hero" }: { uid?: string }) {
  const arrow = `${uid}-arrow`;

  return (
    <svg
      viewBox="0 0 420 300"
      className="h-auto w-full"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ArrowHead id={arrow} />
      <g stroke="var(--color-line)" strokeWidth="1" opacity="0.7">
        {[40, 80, 120, 160, 200, 240, 280].map((y) => (
          <line key={`h${y}`} x1="20" y1={y} x2="400" y2={y} />
        ))}
        {[60, 120, 180, 240, 300, 360].map((x) => (
          <line key={`v${x}`} x1={x} y1="20" x2={x} y2="280" />
        ))}
      </g>

      <polygon
        points="90,240 250,240 330,120 170,120"
        fill="var(--color-accent)"
        fillOpacity="0.07"
      />

      <line
        x1="90"
        y1="240"
        x2="250"
        y2="240"
        stroke="var(--color-accent)"
        strokeWidth="2"
        markerEnd={`url(#${arrow})`}
      />
      <line
        x1="90"
        y1="240"
        x2="170"
        y2="120"
        stroke="var(--color-accent)"
        strokeWidth="2"
        markerEnd={`url(#${arrow})`}
      />
      <line x1="250" y1="240" x2="330" y2="120" stroke="var(--color-ink-soft)" strokeWidth="1.5" />
      <line x1="330" y1="120" x2="170" y2="120" stroke="var(--color-ink-soft)" strokeWidth="1.5" />
      <line
        x1="90"
        y1="240"
        x2="330"
        y2="120"
        stroke="var(--color-ink-faint)"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
      <line
        x1="90"
        y1="240"
        x2="290"
        y2="180"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      />

      <line
        x1="330"
        y1="120"
        x2="330"
        y2="240"
        stroke="var(--color-ink-faint)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M318 240 V228 H330"
        stroke="var(--color-ink-faint)"
        strokeWidth="1.2"
        strokeDasharray="0"
      />

      {[
        { x: 90, y: 240, label: "A", dx: 8, dy: 5 },
        { x: 250, y: 240, label: "B", dx: 8, dy: 5 },
        { x: 330, y: 120, label: "C", dx: 8, dy: 5 },
        { x: 170, y: 120, label: "D", dx: 8, dy: 5 },
        { x: 330, y: 240, label: "E", dx: 8, dy: 18 },
        { x: 290, y: 180, label: "F", dx: 8, dy: -6 },
      ].map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="3.5" fill="var(--color-ink)" />
          <text
            x={point.x + point.dx}
            y={point.y + point.dy}
            fontSize="13"
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fill="var(--color-ink)"
          >
            {point.label}
          </text>
        </g>
      ))}

      <text x="163" y="272" fontSize="12" fontFamily="var(--font-mono)" fill="var(--color-accent)">
        a
      </text>
      <text x="108" y="178" fontSize="12" fontFamily="var(--font-mono)" fill="var(--color-accent)">
        b
      </text>
      <text x="222" y="168" fontSize="12" fontFamily="var(--font-mono)" fill="var(--color-ink-faint)">
        a + b
      </text>
    </svg>
  );
}

export function ParallelogramDiagram({ uid, className }: DiagramProps) {
  const arrow = `${uid}-arrow`;

  return (
    <svg
      viewBox="0 0 200 170"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ArrowHead id={arrow} />
      <polygon points="24,132 112,132 152,52 64,52" fill="var(--color-accent)" fillOpacity="0.06" />
      <line
        x1="24"
        y1="132"
        x2="112"
        y2="132"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        markerEnd={`url(#${arrow})`}
      />
      <line
        x1="24"
        y1="132"
        x2="64"
        y2="52"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        markerEnd={`url(#${arrow})`}
      />
      <line x1="112" y1="132" x2="152" y2="52" stroke="var(--color-ink-soft)" strokeWidth="2" />
      <line x1="152" y1="52" x2="64" y2="52" stroke="var(--color-ink-soft)" strokeWidth="2" />
      <line
        x1="24"
        y1="132"
        x2="152"
        y2="52"
        stroke="var(--color-ink-faint)"
        strokeWidth="1.7"
        strokeDasharray="5 4"
      />

      {[
        { x: 24, y: 132, label: "A", dx: -14, dy: 14 },
        { x: 112, y: 132, label: "B", dx: 5, dy: 15 },
        { x: 152, y: 52, label: "C", dx: 6, dy: 4 },
        { x: 64, y: 52, label: "D", dx: -12, dy: 2 },
      ].map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="3.4" fill="var(--color-ink)" />
          <text
            x={point.x + point.dx}
            y={point.y + point.dy}
            fontSize="13"
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fill="var(--color-ink)"
          >
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function TriangleDiagram({ uid, className }: DiagramProps) {
  const arrow = `${uid}-arrow`;

  return (
    <svg
      viewBox="0 0 200 170"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ArrowHead id={arrow} />
      <polygon points="30,32 168,46 86,132" fill="var(--color-accent)" fillOpacity="0.06" />
      <line
        x1="30"
        y1="32"
        x2="168"
        y2="46"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        markerEnd={`url(#${arrow})`}
      />
      <line
        x1="30"
        y1="32"
        x2="86"
        y2="132"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        markerEnd={`url(#${arrow})`}
      />
      <line x1="168" y1="46" x2="86" y2="132" stroke="var(--color-ink-soft)" strokeWidth="2" />

      {[
        { x: 30, y: 32, label: "A", dx: -14, dy: 0 },
        { x: 168, y: 46, label: "B", dx: 5, dy: 4 },
        { x: 86, y: 132, label: "C", dx: -4, dy: 16 },
      ].map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="3.4" fill="var(--color-ink)" />
          <text
            x={point.x + point.dx}
            y={point.y + point.dy}
            fontSize="13"
            fontFamily="var(--font-serif)"
            fontStyle="italic"
            fill="var(--color-ink)"
          >
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ParallelepipedDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 180"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="36,150 120,150 160,116 76,116" fill="var(--color-accent)" fillOpacity="0.05" />
      <polygon points="36,100 120,100 160,66 76,66" fill="var(--color-accent)" fillOpacity="0.09" />

      <g stroke="var(--color-ink-soft)" strokeWidth="2">
        <line x1="36" y1="150" x2="120" y2="150" />
        <line x1="120" y1="150" x2="160" y2="116" />
        <line x1="160" y1="116" x2="76" y2="116" />
        <line x1="36" y1="150" x2="36" y2="100" />
        <line x1="120" y1="150" x2="120" y2="100" />
        <line x1="160" y1="116" x2="160" y2="66" />
        <line x1="36" y1="100" x2="120" y2="100" />
        <line x1="120" y1="100" x2="160" y2="66" />
        <line x1="160" y1="66" x2="76" y2="66" />
        <line x1="76" y1="66" x2="36" y2="100" />
      </g>

      <g stroke="var(--color-ink-faint)" strokeWidth="1.7" strokeDasharray="4 4">
        <line x1="36" y1="150" x2="76" y2="116" />
        <line x1="76" y1="116" x2="160" y2="116" />
        <line x1="76" y1="116" x2="76" y2="66" />
      </g>

      <circle cx="56" cy="133" r="3.2" fill="var(--color-accent)" />
      <circle cx="120" cy="125" r="3.2" fill="var(--color-accent)" />
      <text x="46" y="146" fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-accent)">
        T
      </text>
      <text x="127" y="128" fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-accent)">
        S
      </text>

      <text
        x="26"
        y="166"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink)"
      >
        A
      </text>
      <text
        x="118"
        y="168"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink)"
      >
        B
      </text>
      <text
        x="166"
        y="122"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink)"
      >
        C
      </text>
      <text
        x="68"
        y="112"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink)"
      >
        D
      </text>
      <text
        x="20"
        y="96"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink-faint)"
      >
        A₁
      </text>
      <text
        x="114"
        y="96"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink-faint)"
      >
        B₁
      </text>
      <text
        x="164"
        y="62"
        fontSize="13"
        fontFamily="var(--font-serif)"
        fontStyle="italic"
        fill="var(--color-ink-faint)"
      >
        C₁
      </text>
    </svg>
  );
}

export function TaskDiagram({
  kind,
  uid,
  className = "h-24 w-24 shrink-0",
}: {
  kind: "parallelogram" | "triangle" | "parallelepiped";
  uid: string;
  className?: string;
}) {
  if (kind === "parallelogram") return <ParallelogramDiagram uid={uid} className={className} />;
  if (kind === "triangle") return <TriangleDiagram uid={uid} className={className} />;
  return <ParallelepipedDiagram className={className} />;
}
