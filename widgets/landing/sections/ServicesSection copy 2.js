// app/_sections/ServicesSection.js
"use client";

import { useState } from "react";
import { SERVICES } from "../components/services/services.config.js"; // ← your existing data
import ServiceTile from "../components/services/ServiceTile"; // ← your existing card

const cx = (...a) => a.filter(Boolean).join(" ");

// same rows you already use
const rows = [
  { label: "Compliance", diy: "varies", imalex: "EU/DZ ready" },
  { label: "Stability", diy: "uncertain", imalex: "validated" },
  { label: "Tech transfer", diy: "ad-hoc", imalex: "structured" },
  { label: "Time-to-market", diy: "slower", imalex: "accelerated" },
  { label: "Cost-in-use", diy: "unoptimized", imalex: "optimized" },
  { label: "QA / QC", diy: "spot checks", imalex: "QC plan" },
];

export default function ServicesSection() {
  const [mode, setMode] = useState("services"); // "services" | "outcome"

  return (
    <section id="services" className="relative isolate py-16 sm:py-20">
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(980px 420px at 20% 18%, var(--cta-section-gradient), transparent),
            radial-gradient(920px 420px at 78% 64%, var(--brand-700-a14), transparent)
          `,
          mask: "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6">
        {/* Header + top-right toggle */}
        <div className="relative mb-8">
          <HeaderCopy />
          <ModeSwitch
            value={mode}
            onChange={setMode}
            className="mt-4 sm:absolute sm:right-0 sm:top-0 sm:mt-0"
          />
        </div>

        {/* Body */}
        {mode === "services" ? <CardsOnly /> : <OutcomeOnly />}
      </div>
    </section>
  );
}

/* ----------------------------- Header copy ----------------------------- */
function HeaderCopy() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--eye-brow)]">
        What we do
      </p>
      <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
        From brief to shelf, without the friction
      </h2>
      <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
        From custom formulation to compliant production. We turn{" "}
        <b>local botanicals</b> into high-performance products for{" "}
        <b>cosmetics</b>, <b>food supplements</b>, <b>agri-food</b>,
        <b> biopesticides</b> and <b>animal nutrition</b>.
      </p>
    </div>
  );
}

/* ------------------------------- Modes -------------------------------- */
function CardsOnly() {
  return (
    <div className="grid gap-6 items-stretch [grid-auto-rows:1fr] sm:grid-cols-2 xl:grid-cols-3">
      {SERVICES.map((s, i) => (
        <ServiceTile key={s.slug} {...s} index={i} />
      ))}
    </div>
  );
}

function OutcomeOnly() {
  return (
    <div className="mt-2">
      {/* Mobile: stacked list for readability */}
      <div className="space-y-3 sm:hidden">
        {rows.map((r) => (
          <div
            key={r.label}
            className="rounded-lg border border-[var(--tile-border)] bg-[var(--tile-bg)] p-3 shadow-[var(--tile-shadow)]"
          >
            <div className="text-[12px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
              {r.label}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[14px]">
              <div className="rounded-md border border-[var(--tile-border)] px-2 py-1 text-center text-[var(--text-muted)]">
                {r.diy}
                <div className="mt-1 text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
                  DIY
                </div>
              </div>
              <div className="rounded-md border border-[var(--tile-border)] px-2 py-1 text-center font-semibold text-[var(--brand-700)]">
                {r.imalex}
                <div className="mt-1 text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
                  IMALEX
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop/Tablet: your old 3-column table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[var(--tile-border)] bg-[var(--tile-bg)] shadow-[var(--tile-shadow)] sm:block">
        <table className="w-full border-collapse text-[14px]">
          <thead className="bg-[color:var(--surface-1)] text-[var(--text-secondary)]">
            <tr>
              <Th>Outcome</Th>
              <Th className="text-center">DIY</Th>
              <Th className="text-center">IMALEX</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.label}
                className="border-t"
                style={{ borderColor: "var(--tile-border)" }}
              >
                <Td strong>{r.label}</Td>
                <Td className="text-center text-[var(--text-muted)]">
                  {r.diy}
                </Td>
                <Td className="text-center font-semibold text-[var(--brand-700)]">
                  {r.imalex}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th
      className={cx(
        "px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-wide",
        className
      )}
    >
      {children}
    </th>
  );
}
function Td({ children, className = "", strong = false }) {
  return (
    <td
      className={cx(
        "px-4 py-3 align-top",
        strong && "font-bold text-[var(--text-primary)]",
        className
      )}
    >
      {children}
    </td>
  );
}

/* ------------------------ Segmented toggle (UX) ------------------------ */
function ModeSwitch({ value, onChange, className = "" }) {
  const tabs = [
    { id: "services", label: "Services", Icon: TilesIcon },
    { id: "outcome", label: "Outcome", Icon: TableIcon },
  ];
  const activeIndex = value === "outcome" ? 1 : 0;

  return (
    <div
      role="tablist"
      aria-label="Services view"
      className={[
        "relative inline-grid grid-cols-2 rounded-full border p-1 shadow-sm",
        "border-[var(--tile-border)] bg-[var(--surface-0)]",
        className,
      ].join(" ")}
    >
      {/* sliding thumb (brand tint) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-8px)] rounded-full border transition-transform duration-300 will-change-transform"
        style={{
          transform: `translateX(${activeIndex * 100}%)`,
          background: "color-mix(in srgb, var(--brand-600) 14%, transparent)",
          borderColor: "var(--brand-600)",
        }}
      />

      {tabs.map(({ id, label, Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={[
              "relative z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition",
              "focus:outline-none focus:ring-4 focus:ring-[color:var(--brand-600)/0.18]",
              active
                ? "text-[var(--brand-700)] dark:text-[var(--brand-300)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)]",
            ].join(" ")}
          >
            <Icon
              className={[
                "h-4 w-4",
                active
                  ? "text-[var(--brand-700)] dark:text-[var(--brand-300)]"
                  : "text-[var(--text-secondary)]",
              ].join(" ")}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* tiny icons (same as before) */
function TilesIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <rect x="2" y="2" width="6" height="6" rx="2" fill="currentColor" />
      <rect x="12" y="2" width="6" height="6" rx="2" fill="currentColor" />
      <rect x="2" y="12" width="6" height="6" rx="2" fill="currentColor" />
      <rect x="12" y="12" width="6" height="6" rx="2" fill="currentColor" />
    </svg>
  );
}
function TableIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <rect
        x="2"
        y="3"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        fill="none"
      />
      <path d="M2 8h16M7 3v14" stroke="currentColor" />
    </svg>
  );
}
