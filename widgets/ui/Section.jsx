// app/_components/Section.jsx
"use client";
import React from "react";

const cx = (...a) => a.filter(Boolean).join(" ");

/**
 * Section – minimal container
 * props:
 * - id?: string
 * - as?: element tag (default "section")
 * - pad?: "sm" | "md" | "lg" (default "lg")
 * - ambient?: "none" | "brand" | "cta" (default "none")
 */
export default function Section({
  id,
  as: Tag = "section",
  pad = "lg",
  ambient = "none",
  className = "",
  children,
}) {
  const pads = {
    sm: "py-12 sm:py-14",
    md: "py-16 sm:py-20",
    lg: "py-20 sm:py-28",
  };

  return (
    <Tag
      id={id}
      className={cx("relative isolate overflow-hidden", pads[pad], className)}
    >
      {ambient !== "none" && <Ambient kind={ambient} />}
      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6">{children}</div>
    </Tag>
  );
}

/**
 * Section.Header – simple header block
 * props:
 * - eyebrow?: string/node
 * - title: string/node
 * - lead?: string/node
 * - align?: "left" | "center" (default "left")
 * - actions?: node (e.g., toggle on top-right)
 */
Section.Header = function Header({
  eyebrow,
  title,
  lead,
  align = "left",
  actions,
  className = "",
}) {
  return (
    <div className={cx("relative mb-8", className)}>
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          {eyebrow}
        </p>
      )}

      <h2
        className={cx(
          "mt-2 font-extrabold tracking-tight text-[var(--text-primary)]",
          "text-3xl sm:text-4xl"
        )}
        style={{ textWrap: "balance" }}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={cx(
            "mt-3 max-w-3xl text-[15px] leading-7 text-[var(--text-secondary)]",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}

      {actions && (
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-0">
          {actions}
        </div>
      )}
    </div>
  );
};

/**
 * Section.Grid – quick responsive grid
 * props:
 * - cols?: number (xl columns, default 3) → auto maps to 1 (base), 2 (sm), N (xl)
 * - equalize?: boolean (default true) → equal card heights per row
 * - className?: string
 */
Section.Grid = function Grid({
  cols = 3,
  equalize = true,
  className = "",
  children,
}) {
  const xlCols = Math.max(2, cols);
  // base:1, sm:2, xl:N
  const colsClass = `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-${xlCols}`;
  return (
    <div
      className={cx(
        colsClass,
        "gap-6",
        equalize && "items-stretch [grid-auto-rows:1fr]",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Section.Rail – two-column with sticky aside
 * props:
 * - aside: node
 * - topVar?: CSS var for header height (default "--header-h")
 * - className?: string
 */
Section.Rail = function Rail({
  aside,
  topVar = "--header-h",
  className = "",
  children,
}) {
  return (
    <div className={cx("grid gap-8 lg:grid-cols-[0.4fr,0.6fr]", className)}>
      <aside
        className="min-w-0 self-start lg:sticky"
        style={{
          top: `var(${topVar}, 92px)`,
          maxHeight: `calc(100dvh - var(${topVar}, 92px))`,
          overflow: "auto",
        }}
      >
        {aside}
      </aside>
      <div>{children}</div>
    </div>
  );
};

/* internal */
function Ambient({ kind }) {
  const bg =
    kind === "cta"
      ? `radial-gradient(980px 420px at 20% 18%, var(--cta-section-gradient), transparent),
         radial-gradient(920px 420px at 78% 64%, var(--brand-700-a14), transparent)`
      : `radial-gradient(900px 380px at 18% 22%, color-mix(in srgb, var(--brand-400) 16%, transparent), transparent)`;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background: bg,
        mask: "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
        WebkitMask:
          "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
      }}
    />
  );
}
