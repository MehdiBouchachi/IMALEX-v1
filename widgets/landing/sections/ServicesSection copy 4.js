// app/_sections/ServicesSection.js
"use client";

import Image from "next/image";
import Button from "../../ui/Button"; // adjust if your Button path differs
import { SERVICES } from "../components/services/services.config.js";

const cx = (...a) => a.filter(Boolean).join(" ");

export default function ServicesSection() {
  return (
    <section id="services" className="relative isolate py-20 sm:py-28">
      {/* Ambient gradient (your tokens) */}
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

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.32fr]">
          {/* LEFT — intro + focused comparison table */}
          <aside className="lg:sticky lg:top-[92px] self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eye-brow)]">
              Industrial services
            </p>
            <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
              Science, Nature & Industry — under one roof
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
              From custom formulation to compliant production. We turn{" "}
              <b>local botanicals</b> into high-performance products for{" "}
              <b>cosmetics, food supplements, agri-food, biopesticides</b> and{" "}
              <b>animal nutrition</b>.
            </p>

            {/* Focused comparison — only valuable rows */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[var(--tile-border)] bg-[var(--tile-bg)] shadow-[var(--tile-shadow)]">
              <div className="grid grid-cols-[1.1fr,0.9fr,0.9fr] text-[15px]">
                <Cell head className="text-[13.5px]">
                  Outcome
                </Cell>
                <Cell head className="text-center text-[13.5px]">
                  DIY
                </Cell>
                <Cell head className="text-center text-[13.5px]">
                  IMALEX
                </Cell>

                <Cell>Compliance</Cell>
                <Cell className="text-center text-[var(--text-muted)]">
                  varies
                </Cell>
                <Cell className="text-center font-semibold text-[var(--brand-700)]">
                  EU/DZ ready
                </Cell>

                <Cell>Stability</Cell>
                <Cell className="text-center text-[var(--text-muted)]">
                  uncertain
                </Cell>
                <Cell className="text-center font-semibold text-[var(--brand-700)]">
                  validated
                </Cell>

                <Cell>Tech transfer</Cell>
                <Cell className="text-center text-[var(--text-muted)]">
                  ad-hoc
                </Cell>
                <Cell className="text-center font-semibold text-[var(--brand-700)]">
                  structured
                </Cell>

                <Cell>Time-to-market</Cell>
                <Cell className="text-center text-[var(--text-muted)]">
                  slower
                </Cell>
                <Cell className="text-center font-semibold text-[var(--brand-700)]">
                  accelerated
                </Cell>

                <Cell>Cost-in-use</Cell>
                <Cell className="text-center text-[var(--text-muted)]">
                  unoptimized
                </Cell>
                <Cell className="text-center font-semibold text-[var(--brand-700)]">
                  optimized
                </Cell>

                <Cell>QA / QC</Cell>
                <Cell className="text-center text-[var(--text-muted)]">
                  spot checks
                </Cell>
                <Cell className="text-center font-semibold text-[var(--brand-700)]">
                  QC plan
                </Cell>
              </div>
            </div>
          </aside>

          {/* RIGHT — ONE CARD PER ROW */}
          <div className="grid grid-cols-1 gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} svc={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── table cell (readable sizes) ── */
function Cell({ children, head = false, className = "" }) {
  return (
    <div
      className={cx(
        "border-t border-[var(--tile-border)] px-3 py-3",
        head &&
          "bg-[var(--surface-1)] uppercase tracking-[0.08em] text-[var(--text-muted)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── service card (flex inside, compact) ── */
function ServiceCard({ svc }) {
  const Icon = svc.icon;
  const bullets = (svc.bullets || []).slice(0, 3);
  const chips = svc.readMore?.items ? svc.readMore.items.slice(0, 3) : [];

  return (
    <article
      className="
        flex flex-col overflow-hidden rounded-2xl
        border border-[var(--tile-border)] bg-[var(--tile-bg)]
        [box-shadow:var(--tile-shadow)] hover:[box-shadow:var(--tile-shadow-hover)]
        transition
      "
    >
      {/* Accent band */}
      <div className="h-1 w-full bg-[image:var(--tile-accent)]" />

      {/* Media: fixed height to keep cards visually consistent */}
      <div className="relative h-[min(52vw,240px)] w-full overflow-hidden">
        <Image
          src={svc.image}
          alt={svc.title}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 100vw, (min-width:640px) 100vw, 100vw"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Body */}
      <div className="flex min-h-0 grow flex-col p-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          {Icon ? (
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--tile-icon-border)] bg-[var(--tile-icon-bg)] text-[var(--tile-icon-text)]">
              <Icon />
            </span>
          ) : null}
          <h3 className="text-base sm:text-lg font-semibold leading-snug text-[var(--text-primary)]">
            {svc.title}
          </h3>
        </div>

        {/* Line */}
        {svc.line && (
          <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--tile-copy)]">
            {svc.line}
          </p>
        )}

        {/* Bullets */}
        {bullets.length > 0 && (
          <ul className="mt-2 pl-5 list-disc text-[13px] text-[var(--tile-copy)]">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {/* Scope chips (first 3 only) */}
        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((it, i) => (
              <span
                key={i}
                className="rounded-full border border-[var(--tile-border)] bg-[var(--surface-1)] px-2 py-[2px] text-[11px] text-[var(--text-muted)]"
              >
                {it}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-4">
          <Button variant="primary" size="xs" href="#contact">
            {svc.cta}
          </Button>
        </div>
      </div>
    </article>
  );
}
