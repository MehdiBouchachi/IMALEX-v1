// app/_components/ServicesGrid.js
import Image from "next/image";
import Button from "./ui/Button";

/* --- tiny inline icons (stroke currentColor) --- */
const IFlask = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M8 3h8M10 3v5l-5 10a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-10V3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M9 14h6" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const IBeaker = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M6 3h12M9 3v4l-5 9a3 3 0 0 0 3 5h10a3 3 0 0 0 3-5l-5-9V3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IShield = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IGauge = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M4 13a8 8 0 1 1 16 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M12 13l4-4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const ILeaf = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M4 12c6-10 16-8 16-8s2 10-8 16C6 22 4 16 4 12z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 12c6 0 8 2 12 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IFactory = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M3 21V9l6 3V9l6 3V6l6 3v12H3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6 21v-3M9 21v-3M12 21v-3M15 21v-3M18 21v-3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const items = [
  {
    slug: "formulation",
    title: "Custom Formulation",
    line: "Bespoke, natural-first formulas that hit claims—without trade-offs.",
    icon: IFlask,
    image: "/images/services/formulation.jpg",
    bullets: [
      "Brief → functional & sensory targets",
      "Ingredient selection (local botanicals prioritized)",
      "Balanced efficacy, stability & cost-in-use",
    ],
    cta: "Start a brief",
  },
  {
    slug: "prototype",
    title: "Prototype Development",
    line: "Get lab samples fast to validate feasibility and sensorials.",
    icon: IBeaker,
    image: "/images/services/prototype.jpg",
    bullets: [
      "Rapid bench samples & iteration",
      "Sensorial tuning (texture, scent, taste)",
      "Pre-stability checks & packaging screening",
    ],
    cta: "Request samples",
  },
  {
    slug: "regulatory",
    title: "Regulatory Dossiers",
    line: "DZ/EU compliance, labels, INCI and technical files—done right.",
    icon: IShield,
    image: "/images/services/regulatory.jpg",
    bullets: [
      "INCI & ingredient declarations",
      "Claims & artwork review",
      "Safety guidance & file compilation",
    ],
    cta: "Check compliance",
  },
  {
    slug: "stability",
    title: "Stability & Efficacy",
    line: "Prove shelf-life and performance with the right test plan.",
    icon: IGauge,
    image: "/images/services/stability.jpg",
    bullets: [
      "Accelerated & real-time stability",
      "Micro / physico-chemical / packaging",
      "Partnered efficacy & tolerance studies",
    ],
    cta: "Plan testing",
  },
  {
    slug: "rnd",
    title: "R&D & Ingredient Sourcing",
    line: "Unlock local botanicals & synergies with scientific rigor.",
    icon: ILeaf,
    image: "/images/services/rnd.jpg",
    bullets: [
      "Actives scouting & standardization",
      "Synergy design & eco-processes",
      "Sustainable, traceable sourcing",
    ],
    cta: "Explore actives",
  },
  {
    slug: "manufacturing",
    title: "Contract Manufacturing",
    line: "Pilot → small/medium series in compliant facilities.",
    icon: IFactory,
    image: "/images/services/manufacturing.jpg",
    bullets: [
      "Liquids / semi-solids / solids",
      "Primary packaging & QC",
      "Tech transfer & scale-up",
    ],
    cta: "Discuss production",
  },
];

export default function ServicesGrid() {
  return (
    <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 isolate">
      {items.map((it) => (
        <ServiceTile key={it.slug} {...it} />
      ))}
    </div>
  );
}

function ServiceTile({ title, line, icon: Icon, image, bullets = [], cta }) {
  return (
    <article
      className="
        group relative isolate overflow-hidden rounded-2xl
        border transition
        bg-[var(--tile-bg)] border-[var(--tile-border)]
        [box-shadow:var(--tile-shadow)]
        hover:[box-shadow:var(--tile-shadow-hover)]
      "
    >
      {/* top accent bar */}
      <div className="h-1 w-full bg-[image:var(--tile-accent)]" />

      {/* image / fallback glow */}
      <div className="relative h-32">
        {image ? (
          <Image
            src={image}
            alt={title}
            quality={50} // jpeg/webp quality (0–100)
            loading="lazy"
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition"
            sizes="(max-width:1024px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: "var(--g-hero-overlay)",
            }}
          />
        )}
      </div>

      <div className="p-6">
        {/* icon + title */}
        <div className="grid grid-cols-[40px,1fr] items-center gap-3">
          <span
            className="
              grid h-10 w-10 place-items-center rounded-xl border
              bg-[var(--tile-icon-bg)] text-[var(--tile-icon-text)] border-[var(--tile-icon-border)]
            "
          >
            <Icon />
          </span>
          <h3 className="text-lg font-semibold leading-snug text-[var(--text-primary)]">
            {title}
          </h3>
        </div>

        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--tile-copy)]">
          {line}
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          {bullets.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--bullet)]" />
              <span className="text-[var(--tile-copy)]">{b}</span>
            </li>
          ))}
        </ul>

        {/* actions row */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* primary CTA (tokens) */}
          <Button variant="primary" size="xs" asLink href="#contact">
            {cta}
          </Button>

          <details className="group/details relative w-auto">
            <summary
              className="list-none cursor-pointer select-none inline-flex items-center gap-2
                         text-xs font-semibold text-[var(--text-primary)] hover:underline
                         focus:outline-none rounded"
            >
              <span>Read more</span>
              <svg
                className="h-3.5 w-3.5 text-[var(--text-muted)] transition-transform group-open/details:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>

            {/* Soft divider via wire color */}
            <div className="mt-3 h-px bg-gradient-to-r from-transparent via-[var(--effect-wire-start)]/30 to-transparent" />

            {/* Collapsible content */}
            <div className="mt-3 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open/details:grid-rows-[1fr]">
              <div className="overflow-hidden w-full">
                <div
                  className="max-w-full rounded-lg border px-3 py-2 text-xs
                                border-[var(--tile-softpanel-border)] bg-[var(--tile-softpanel-bg)]
                                text-[var(--brand-700)] dark:text-[var(--brand-800)]"
                >
                  Full scope & documentation available on request.
                </div>

                <div className="mt-3 text-sm leading-relaxed text-[var(--tile-copy)]">
                  <p className="mb-2">
                    You’ll receive a clear process map, QA/QC checkpoints,
                    templates for labels & dossiers, and a transfer package to
                    accelerate scale-up.
                  </p>

                  <ul className="grid gap-2 sm:grid-cols-2">
                    {[
                      "Process flow & roles",
                      "QA/QC checkpoints",
                      "Artwork/label checklist",
                      "Tech transfer package",
                    ].map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--bullet)]" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition
                               border-[color:var(--tile-softpanel-border)]
                               text-[var(--brand-700)] dark:text-[var(--brand-800)]
                               hover:bg-[var(--tile-softpanel-bg)]"
                  >
                    Ask for full scope
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </article>
  );
}
