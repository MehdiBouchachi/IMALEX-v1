// app/_components/SectorsGrid.js
/* icons (unchanged) */
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
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
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
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
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

export default function SectorsGrid() {
  const items = [
    {
      slug: "cosmetics",
      title: "Cosmetics",
      desc: "Skin, hair & body care with clean, effective actives.",
      icon: ICosmetics,
      points: ["Leave-on & rinse-off", "Claims & sensorials"],
    },
    {
      slug: "nutra",
      title: "Nutraceuticals",
      desc: "Capsules, powders, liquids and gummies.",
      icon: INutra,
      points: ["Dose & bioavailability", "Tasty formats"],
    },
    {
      slug: "agri-bio",
      title: "Biofertilizers & Biopesticides",
      desc: "Plant-friendly actives and microbial solutions.",
      icon: IAgriBio,
      points: ["Botanical actives", "Field-ready stability"],
    },
    {
      slug: "animal",
      title: "Animal Nutrition",
      desc: "Phytogenic additives and functional oils.",
      icon: IAnimal,
      points: ["Performance & health", "Feed compatibility"],
    },
    {
      slug: "agri-food",
      title: "Agri-Food",
      desc: "Clean-label flavors, colors and functional ingredients.",
      icon: IFood,
      points: ["Clean label", "Process-ready"],
    },
  ];

  // spotlight position per-card
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ slug, title, desc, icon: Icon, points }, i) => (
        <a
          key={slug}
          href="#contact"
          aria-label={`${title} — ${desc}`}
          onMouseMove={handleMove}
          className="
            group relative block rounded-2xl border transition
            bg-[var(--surface-1)] border-[var(--border-subtle)]
            [box-shadow:var(--shadow-card)]
            hover:[box-shadow:var(--shadow-card-lg)]
            focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]
            motion-safe:hover:[transform:translateY(-2px) rotateX(0.5deg) rotateY(-0.5deg)]
            will-change-transform
            opacity-0 translate-y-2
          "
          style={{
            // staggered reveal – super light
            animation: "sg-reveal .5s ease-out forwards",
            animationDelay: `${i * 60}ms`,
            // spotlight follows the mouse (uses your brand/effect tokens)
            backgroundImage: `radial-gradient(260px 160px at var(--mx, 50%) var(--my, -40px), var(--effect-glow-a), transparent 55%)`,
          }}
        >
          {/* content */}
          <div className="flex h-full flex-col gap-4 p-5 sm:p-6">
            {/* icon + title */}
            <div className="flex items-start gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl border transition"
                style={{
                  background:
                    "color-mix(in srgb, var(--brand-400) 16%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--brand-400) 32%, transparent)",
                  color: "var(--brand-700)",
                }}
              >
                <Icon />
              </span>

              <div className="min-w-0">
                <h3 className="truncate text-[1.06rem] font-semibold leading-snug text-[var(--text-primary)]">
                  {title}
                </h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
                  {desc}
                </p>
              </div>
            </div>

            {/* chips */}
            <ul className="mt-1 flex flex-wrap gap-2">
              {points.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[0.8rem] font-medium transition"
                  style={{
                    borderColor: "var(--border-subtle)",
                    background: "var(--surface-2)",
                    color: "var(--text-secondary)",
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

            {/* footer */}
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
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

          {/* subtle outline tint on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-[box-shadow,opacity] opacity-0 group-hover:opacity-100"
            style={{
              boxShadow:
                "0 0 0 2px color-mix(in srgb, var(--brand-700) 28%, transparent)",
            }}
          />
        </a>
      ))}
    </div>
  );
}
