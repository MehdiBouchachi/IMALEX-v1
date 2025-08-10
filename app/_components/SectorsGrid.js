// app/_components/SectorsGrid.js

/* --- tiny inline icons (stroke uses currentColor) --- */
const ICosmetics = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path d="M8 3h8M10 3v5M7 8h10M7 8l-2 12h14L17 8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const INutra = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <rect x="3" y="6" width="8" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M13 12c0-3 3-6 6-6 0 3-3 6-6 6zm0 0c0 3 3 6 6 6 0-3-3-6-6-6z" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);
const IAgriBio = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path d="M4 16c4-8 8-8 12-8M4 16c4 0 8 2 12 6" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);
const IAnimal = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path d="M7 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M5 14c2-2 12-2 14 0v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3z" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const IFood = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path d="M4 12h16M6 7h4v10H6zM14 7h4v6h-4z" fill="none" stroke="currentColor" strokeWidth="2" />
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

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ slug, title, desc, icon: Icon, points }) => (
        <a
          key={slug}
          href={`#contact`} // make card actionable; swap for /sectors/${slug} if you have detail pages
          className="
            group relative block overflow-hidden rounded-2xl
            bg-white/85 dark:bg-white/[0.04] backdrop-blur-sm
            border border-slate-200/80 dark:border-white/10
            shadow-[0_1px_2px_rgba(0,0,0,0.05)]
            hover:shadow-[0_14px_44px_rgba(20,184,166,0.16)]
            ring-emerald-400/30 focus:outline-none focus-visible:ring-4
            transition
          "
          aria-label={`${title} — ${desc}`}
        >
          {/* subtle skin (less busy in light mode) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.9] dark:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,184,166,0.045), transparent 35%), radial-gradient(600px 180px at 100% -10%, rgba(16,185,129,0.08), transparent 60%)",
            }}
          />
          {/* top accent hairline */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-70" />

          {/* content */}
          <div className="relative z-10 p-5 sm:p-6">
            {/* icon + title */}
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-700/10 dark:border-emerald-400/25 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                <Icon />
              </span>
              <div>
                <h3 className="text-[1.125rem] font-semibold leading-snug text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-700/90 dark:text-slate-300">
                  {desc}
                </p>
              </div>
            </div>

            {/* chips */}
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {points.map((p) => (
                <li
                  key={p}
                  className="
                    inline-flex items-center gap-2 rounded-full
                    border border-emerald-700/15 dark:border-emerald-400/25
                    bg-white/80 dark:bg-white/5
                    px-3 py-1.5 text-[0.8rem] font-medium
                    text-emerald-800 dark:text-emerald-200
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/90" />
                  {p}
                </li>
              ))}
            </ul>

            {/* footer arrow (clear affordance) */}
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:text-teal-700 dark:text-slate-200 dark:group-hover:text-teal-300">
              Discuss a project
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
        </a>
      ))}

      {/* balance third column at large widths */}
      <div className="hidden lg:block rounded-2xl p-6 opacity-0">—</div>
    </div>
  );
}
