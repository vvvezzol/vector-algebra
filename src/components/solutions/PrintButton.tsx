"use client";

export function PrintButton() {
  function handlePrint() {
    document.querySelectorAll("details").forEach((node) => {
      node.open = true;
    });
    window.print();
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-accent/40 hover:text-accent-ink"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M4.5 6V2.5h7V6M4.5 11.5h-2v-4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v4h-2" />
        <rect x="4.5" y="9.5" width="7" height="4" rx="0.6" />
      </svg>
      Печать / PDF
    </button>
  );
}
