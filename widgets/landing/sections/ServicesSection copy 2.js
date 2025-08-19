// app/_sections/ServicesSection.js
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../../ui/Button";
import ReadMore from "../components/services/ReadMore";
import { SERVICES } from "../components/services/services.config.js";

const cx = (...a) => a.filter(Boolean).join(" ");

export default function ServicesSection() {
  const [view, setView] = useState("compare"); // "compare" | "cards"

  return (
    <section id="services" className="relative isolate py-20 sm:py-28">
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(900px 420px at 20% 18%, var(--cta-section-gradient), transparent),
            radial-gradient(900px 420px at 78% 64%, var(--brand-700-a14), transparent)
          `,
          mask: "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <Header />

        {/* Controls: segmented toggle */}
        <div className="mt-8 flex items-center justify-center">
          <SegmentedToggle value={view} onChange={setView} />
        </div>

        {/* Content grid area */}
        <div className="mt-10">
          {view === "compare" ? (
            <div className="grid grid-cols-1">
              <OutcomeTable />
            </div>
          ) : (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <ServiceCard key={s.slug} svc={s} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Button variant="primary" size="lg" asLink href="#contact">
            Let’s Build Your Product
          </Button>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Header --------------------------- */
function Header() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--eye-brow)]">
        Services for Innovators
      </p>
      <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold tracking-tight text-[var(--text-primary)]">
        Turning Science & Nature into Industrial Value
      </h2>
      <p className="mt-4 text-[15px] leading-7 text-[var(--text-secondary)]">
        We help move from <b>local botanicals</b> to{" "}
        <b>market‑ready products</b> — fast, compliant and sustainable.
      </p>
    </div>
  );
}

/* ---------------------- Segmented Toggle ---------------------- */
function SegmentedToggle({ value, onChange }) {
  const isCards = value === "cards";
  const isCompare = value === "compare";

  return (
    <div
      role="tablist"
      aria-label="Switch services view"
      className="
        inline-flex rounded-xl border border-[var(--tile-border)] bg-[var(--surface-1)]
        p-1 shadow-[var(--tile-shadow)]
      "
    >
      <button
        role="tab"
        aria-selected={isCompare}
        onClick={() => onChange("compare")}
        className={cx(
          "px-4 py-2 text-sm font-semibold rounded-lg transition",
          isCompare
            ? "bg-[var(--brand-600)] text-white"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}
      >
        Comparison
      </button>
      <button
        role="tab"
        aria-selected={isCards}
        onClick={() => onChange("cards")}
        className={cx(
          "px-4 py-2 text-sm font-semibold rounded-lg transition",
          isCards
            ? "bg-[var(--brand-600)] text-white"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}
      >
        Services
      </button>
    </div>
  );
}

/* ----------------------- Outcome Table ------------------------ */
function OutcomeTable() {
  // well-structured, professional, compact. Stays readable on mobile.
  const rows = [
    ["Time‑to‑market", "Slow, fragmented", "Fast‑track, integrated"],
    ["Compliance", "Risk of rework", "EU/DZ ready (INCI, claims, files)"],
    ["Scientific rigor", "Limited testing", "Validated stability & efficacy"],
    [
      "Sustainability",
      "Unclear sourcing",
      "Local botanicals, traceable supply",
    ],
    ["Tech transfer", "Ad‑hoc", "Structured, scale‑up ready"],
    ["Market support", "Vendor‑driven", "Partnership, measurable outcomes"],
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--tile-border)] shadow-[var(--tile-shadow)]">
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr className="bg-[var(--surface-1)] text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
            <th className="px-4 py-3 text-left font-medium">Outcome</th>
            <th className="px-4 py-3 text-center font-medium">DIY</th>
            <th className="px-4 py-3 text-center font-medium text-[var(--brand-600)]">
              IMALEX
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, diy, us], idx) => (
            <tr
              key={label}
              className={
                idx % 2 === 0 ? "bg-[var(--tile-bg)]" : "bg-[var(--surface-0)]"
              }
            >
              <td className="border-t border-[var(--tile-border)] px-4 py-3 font-medium text-[var(--text-primary)]">
                {label}
              </td>
              <td className="border-t border-[var(--tile-border)] px-4 py-3 text-center text-[var(--text-secondary)]">
                {diy}
              </td>
              <td className="border-t border-[var(--tile-border)] px-4 py-3 text-center font-semibold text-[var(--brand-600)]">
                {us}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* mobile helper: stacked view hint */}
      <style jsx>{`
        @media (max-width: 640px) {
          table {
            font-size: 13px;
          }
          thead {
            position: sticky;
            top: 0;
            z-index: 1;
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------- Service Card ------------------------- */
function ServiceCard({ svc }) {
  const Icon = svc.icon;
  const bullets = (svc.bullets || []).slice(0, 2);

  return (
    <article
      className="
        flex h-full flex-col overflow-hidden
        rounded-2xl border border-[var(--tile-border)] bg-[var(--tile-bg)]
        [box-shadow:var(--tile-shadow)] transition
        hover:[box-shadow:var(--tile-shadow-hover)]
      "
    >
      {/* image (strict height => equal cards) */}
      <div className="relative h-[184px] overflow-hidden">
        <Image
          src={svc.image}
          alt={svc.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3">
          {Icon && (
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--tile-icon-border)] bg-[var(--tile-icon-bg)] text-[var(--tile-icon-text)]">
              <Icon />
            </span>
          )}
          <h3 className="text-base font-semibold leading-snug text-[var(--text-primary)]">
            {svc.title}
          </h3>
        </div>

        {svc.line && (
          <p className="text-[13.5px] leading-relaxed text-[var(--tile-copy)]">
            {svc.line}
          </p>
        )}

        {bullets.length > 0 && (
          <ul className="mt-2 list-disc pl-5 text-[13px] text-[var(--tile-copy)]">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {/* actions pinned to bottom */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <Button variant="primary" size="xs" asLink href="#contact">
            {svc.cta}
          </Button>
          {svc.readMore && <ReadMore data={svc.readMore} />}
        </div>
      </div>
    </article>
  );
}
