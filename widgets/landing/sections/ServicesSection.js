// app/_sections/ServicesSection.js
import { SERVICES } from "../components/services/services.config.js";
import ServiceTile from "../components/services/ServiceTile";

const cx = (...a) => a.filter(Boolean).join(" ");

// one source of truth for the comparison rows
const rows = [
  { label: "Compliance", diy: "varies", imalex: "EU/DZ ready" },
  { label: "Stability", diy: "uncertain", imalex: "validated" },
  { label: "Tech transfer", diy: "ad-hoc", imalex: "structured" },
  { label: "Time-to-market", diy: "slower", imalex: "accelerated" },
  { label: "Cost-in-use", diy: "unoptimized", imalex: "optimized" },
  { label: "QA / QC", diy: "spot checks", imalex: "QC plan" },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative isolate py-14 sm:py-20">
      {/* ambient */}
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
        <div className="grid gap-10 lg:grid-cols-[1fr,1.32fr]">
          {/* LEFT — intro + comparison */}
          <aside className="self-start lg:sticky lg:top-[92px]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--eye-brow)]">
              What we do
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              From brief to shelf, without the friction
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
              From custom formulation to compliant production. We turn{" "}
              <b>local botanicals</b> into high-performance products for{" "}
              <b>cosmetics, food supplements, agri-food, biopesticides</b> and{" "}
              <b>animal nutrition</b>.
            </p>

            {/* Mobile: stacked list (no overflow, super readable) */}
            <div className="mt-5 space-y-3 sm:hidden">
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
                    <div className="rounded-md border border-[var(--tile-border)] bg-[color:color-mix(in_srgb,var(--brand-400)_10%,transparent)] px-2 py-1 text-center font-semibold text-[var(--brand-700)]">
                      {r.imalex}
                      <div className="mt-1 text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
                        IMALEX
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop/tablet: 3-column table */}
            <div className="mt-6 hidden overflow-hidden rounded-xl border border-[var(--tile-border)] bg-[var(--tile-bg)] shadow-[var(--tile-shadow)] sm:block">
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

                {rows.map((r) => (
                  <Row key={r.label} {...r} />
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT — cards */}
          <div className="grid grid-cols-1 gap-6">
            {SERVICES.map((it, i) => (
              <ServiceTile key={it.slug} {...it} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── desktop table bits ── */
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

function Row({ label, diy, imalex }) {
  return (
    <>
      <Cell>{label}</Cell>
      <Cell className="text-center text-[var(--text-muted)]">{diy}</Cell>
      <Cell className="text-center font-semibold text-[var(--brand-700)]">
        {imalex}
      </Cell>
    </>
  );
}
