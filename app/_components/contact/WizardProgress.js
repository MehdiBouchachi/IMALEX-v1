import React from "react";

export function WizardProgress({
  step = 1,
  labels = [],
  total = labels.length || 3,
}) {
  const pct = (step / total) * 100;

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-[var(--contact-ghost-text)]">
        {labels.map((l, i) => {
          const active = i + 1 <= step;
          return (
            <div key={l} className="flex items-center gap-2">
              <span
                className={[
                  "h-6 w-6 grid place-items-center rounded-full border",
                  active
                    ? "bg-[var(--contact-badge-active-bg)] text-[var(--contact-badge-active-text)] border-[var(--contact-badge-active-border)]"
                    : "bg-[var(--contact-badge-inactive-bg)] border-[var(--contact-badge-inactive-border)] text-[var(--contact-badge-inactive-text)]",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <span
                className={
                  active ? "text-[var(--contact-badge-active-bg)]" : ""
                }
              >
                {l}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 h-2 rounded-full overflow-hidden bg-[var(--contact-progress-track)]">
        <div
          className="h-full transition-all bg-[var(--contact-progress-fill)]"
          style={{ width: `${pct}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          role="progressbar"
        />
      </div>
    </div>
  );
}
