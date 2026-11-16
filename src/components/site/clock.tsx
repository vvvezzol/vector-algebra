"use client";

import { useEffect, useState } from "react";

const timeFormat = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

const STORAGE_KEY = "vector-algebra:visit-start";

function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export function SiteClock() {
  const [now, setNow] = useState<Date | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  useEffect(() => {
    let start = Number(window.sessionStorage.getItem(STORAGE_KEY));

    if (!Number.isFinite(start) || start <= 0) {
      start = Date.now();
      window.sessionStorage.setItem(STORAGE_KEY, String(start));
    }

    const initial = window.setTimeout(() => {
      setStartedAt(start);
      setNow(new Date());
    }, 0);

    const timer = window.setInterval(() => setNow(new Date()), 1000);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
    };
  }, []);

  const elapsed = now && startedAt ? now.getTime() - startedAt : 0;

  return (
    <div className="border-t border-line/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] text-ink-faint sm:px-8">
        <p className="flex min-w-0 items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          <span className="uppercase tracking-[0.12em]">Сейчас</span>
          <span className="hidden truncate sm:inline">
            {now ? dateFormat.format(now) : "—"}
          </span>
          <time
            dateTime={now?.toISOString()}
            title={now ? now.toLocaleString("ru-RU") : undefined}
            className="font-mono text-ink-soft tabular-nums"
          >
            {now ? timeFormat.format(now) : "--:--:--"}
          </time>
        </p>

        <p className="flex shrink-0 items-center gap-2">
          <span className="uppercase tracking-[0.12em]">На сайте</span>
          <span className="font-mono text-ink-soft tabular-nums" aria-label="Время на сайте">
            {startedAt ? formatDuration(elapsed) : "00:00:00"}
          </span>
        </p>
      </div>
    </div>
  );
}
