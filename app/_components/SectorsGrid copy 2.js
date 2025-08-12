"use client";

/* === Small inline icons (kept) === */
const ICosmetics = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M8 3h8M10 3v5M7 8h10M7 8l-2 12h14L17 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const INutra = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <rect
      x="3"
      y="6"
      width="8"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M13 12c0-3 3-6 6-6 0 3-3 6-6 6zm0 0c0 3 3 6 6 6 0-3-3-6-6-6z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IAgriBio = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M4 16c4-8 8-8 12-8M4 16c4 0 8 2 12 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="18"
      cy="8"
      r="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IAnimal = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M7 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5 14c2-2 12-2 14 0v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const IFood = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M4 12h16M6 7h4v10H6zM14 7h4v6h-4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

/* === Data (no slug‑art) === */
const items = [
  {
    title: "Cosmetics",
    desc: "Skin, hair & body care with clean, effective actives.",
    icon: ICosmetics,
    points: ["Leave-on & rinse-off", "Claims & sensorials"],
  },
  {
    title: "Nutraceuticals",
    desc: "Capsules, powders, liquids and gummies.",
    icon: INutra,
    points: ["Dose & bioavailability", "Tasty formats"],
  },
  {
    title: "Biofertilizers & Biopesticides",
    desc: "Plant-friendly actives and microbial solutions.",
    icon: IAgriBio,
    points: ["Botanical actives", "Field-ready stability"],
  },
  {
    title: "Animal Nutrition",
    desc: "Phytogenic additives and functional oils.",
    icon: IAnimal,
    points: ["Performance & health", "Feed compatibility"],
  },
  {
    title: "Agri-Food",
    desc: "Clean-label flavors, colors and functional ingredients.",
    icon: IFood,
    points: ["Clean label", "Process-ready"],
  },
];

/* === Utils === */
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const finePointer = () =>
  typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;

export default function SectorsGrid() {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="sectors"
      className="relative overflow-hidden py-16 sm:py-20"
      onMouseMove={onMove}
    >
      {/* Aurora background — slow, classy */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background: `radial-gradient(1100px 480px at 50% -10%, var(--glow-a), transparent 62%),
             radial-gradient(900px 360px at 15% 80%, var(--glow-b), transparent 65%),
             radial-gradient(900px 360px at 85% 85%, var(--glow-b), transparent 70%)`,
          animation: "aurora-sway 30s ease-in-out infinite",
        }}
      />

      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--eye-brow)" }}
          >
            Sectors
          </div>
          <h2
            className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Industries We Serve
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-8 max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Card key={i} index={i} {...it} />
          ))}
          <div className="hidden lg:block rounded-2xl p-6 opacity-0">—</div>
        </div>
      </div>
    </section>
  );
}

/* === Card: glass, spotlight, minimal tilt, NO bg slug art === */
function Card({ title, desc, icon: Icon, points, index }) {
  const onMove = (e) => {
    if (!finePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    const rx = (y / r.height - 0.5) * -1.6;
    const ry = (x / r.width - 0.5) * 1.6;
    el.style.transform = `translateY(-2px) rotateX(${clamp(
      rx,
      -2,
      2
    )}deg) rotateY(${clamp(ry, -2, 2)}deg)`;
  };
  const reset = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <a
      href="#contact"
      aria-label={`${title} — ${desc}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="
        group relative block rounded-2xl border transition
        bg-[var(--surface-1)] border-[var(--border-subtle)]
        [box-shadow:var(--shadow-card)] hover:[box-shadow:var(--shadow-card-lg)]
        focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]
        will-change-transform opacity-0 translate-y-3
      "
      style={{
        animation: "sg-reveal .45s cubic-bezier(.2,.8,.2,1) forwards",
        animationDelay: `${index * 60}ms`,
      }}
      data-sg-anim
    >
      {/* soft spotlight near cursor (smaller, clipped) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          WebkitMaskImage:
            "radial-gradient(120px 90px at var(--mx,-200px) var(--my,-200px), #000 52%, transparent 72%)",
          maskImage:
            "radial-gradient(120px 90px at var(--mx,-200px) var(--my,-200px), #000 52%, transparent 72%)",
          background:
            "radial-gradient(160px 110px at var(--mx,-200px) var(--my,-200px), rgba(127,207,167,.08), transparent 60%)",
        }}
      />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-xl border transition will-change-transform group-hover:scale-[1.06]"
            style={{
              background:
                "color-mix(in srgb, var(--brand-400) 14%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--brand-400) 24%, transparent)",
              color: "var(--brand-700)",
            }}
          >
            <Icon />
          </span>
          <div className="min-w-0">
            <h3
              className="truncate text-[1.04rem] font-semibold leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
            <p
              className="mt-1 text-[0.95rem] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {desc}
            </p>
          </div>
        </div>

        <ul className="mt-1 flex flex-wrap gap-2">
          {points.map((p, j) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[0.8rem] font-medium"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--surface-2)",
                color: "var(--text-secondary)",
                animation: "sg-reveal .25s ease-out both",
                animationDelay: `${index * 60 + j * 70}ms`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--brand-700)" }}
              />
              {p}
            </li>
          ))}
        </ul>

        <div
          className="mt-auto flex items-center gap-2 text-sm font-semibold"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="group-hover:underline">Discuss a project</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* hairline brand outline on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--brand-700) 16%, transparent)",
        }}
      />
    </a>
  );
}
