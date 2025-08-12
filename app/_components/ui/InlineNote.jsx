import React from "react";

/**
 * InlineNote
 * Props:
 * - show?: boolean (controls visibility)
 * - title?: string (bold accent text before content)
 * - children: React.ReactNode (note content)
 * - tone?: "info" | "warning" | "success" | "danger"
 * - icon?: React.ReactNode (optional custom icon)
 * - className?: string
 * - live?: "polite" | "assertive" | "off"  (aria-live)
 */
export default function InlineNote({
  show = true,
  title,
  children,
  tone = "info",
  icon,
  className = "",
  live = "polite",
}) {
  if (!show) return null;

  const toneClasses = {
    info: "bg-[var(--note-info-bg)] border-[var(--note-info-border)] text-[var(--note-info-text)]",
    warning:
      "bg-[var(--note-warn-bg)] border-[var(--note-warn-border)] text-[var(--note-warn-text)]",
    success:
      "bg-[var(--note-ok-bg)] border-[var(--note-ok-border)] text-[var(--note-ok-text)]",
    danger:
      "bg-[var(--note-danger-bg)] border-[var(--note-danger-border)] text-[var(--note-danger-text)]",
  }[tone];

  return (
    <div
      role="note"
      aria-live={live}
      className={[
        "mt-3 flex items-start gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm",
        "transition-all duration-300 ease-out",
        toneClasses,
        className,
      ].join(" ")}
    >
      {/* default icon if none provided */}
      <span aria-hidden="true" className="mt-0.5 shrink-0">
        {icon ?? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 7.5v.01M12 10v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>

      <p className="leading-snug">
        {title ? (
          <span className="font-medium text-[var(--note-accent)]">
            {title}{" "}
          </span>
        ) : null}
        {children}
      </p>
    </div>
  );
}
