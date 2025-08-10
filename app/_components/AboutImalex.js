import { FiFlask, FiCheckCircle, FiLeaf, FiShield } from "react-icons/fi";

export default function AboutImalex() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      {/* background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(closest-side, #34d39955, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(closest-side, #14b8a655, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-200">
              <FiFlask className="h-4 w-4" />
              IMALEX — Natural Formulation Lab
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Science-grade natural formulations for industry
            </h2>

            <p className="mt-5 text-slate-700 dark:text-slate-300 leading-relaxed">
              IMALEX is an Algerian startup specializing in **custom natural
              formulation**. Our team of PhDs, engineers, and biotechnologists
              partners with brands and manufacturers to design, prototype,
              validate, and scale products that are **effective, compliant, and
              planet-minded**.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "End-to-end R&D: brief → prototype → stability → dossier → scale-up",
                "Sectors: cosmetics, nutraceuticals, biofertilizers/biopesticides, animal nutrition, agri-food",
                "Regulatory alignment (DZ / EU): labels, INCI, safety, technical files",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-slate-800 dark:text-slate-200"
                >
                  <FiCheckCircle className="mt-1 h-5 w-5 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Trust badges / values */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: <FiLeaf />, label: "Natural-first" },
                { icon: <FiFlask />, label: "Lab-validated" },
                { icon: <FiShield />, label: "Compliant" },
                { icon: <FiCheckCircle />, label: "Turnkey" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 text-center"
                >
                  <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                    {b.icon}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#services"
                className="inline-flex justify-center rounded-lg bg-teal-500 px-5 py-3 text-white font-semibold hover:bg-teal-600 transition"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center rounded-lg border border-emerald-500/20 bg-white/70 dark:bg-white/5 px-5 py-3 text-emerald-800 dark:text-emerald-200 font-semibold hover:bg-white/90 dark:hover:bg-white/10 backdrop-blur-sm transition"
              >
                Start a Project
              </a>
            </div>
          </div>

          {/* Visual / stats card */}
          <div className="relative">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md p-6 shadow-lg">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* stat tiles */}
                <StatTile kpi="120+" label="Formulas delivered" />
                <StatTile kpi="30–90d" label="Prototype lead time" />
                <StatTile kpi="EU/DZ" label="Regulatory ready" />
                <StatTile kpi="4+ labs" label="Test partners" />
              </div>

              {/* mini separators */}
              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

              {/* sectors list */}
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Key sectors
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cosmetics",
                    "Nutraceuticals",
                    "Biofertilizers",
                    "Biopesticides",
                    "Animal Nutrition",
                    "Agri-food",
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* assurance line */}
              <p className="mt-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                We combine **green chemistry** with **biotech** to engineer
                stable, effective, and compliant products — with full
                traceability from lab bench to scale-up.
              </p>
            </div>

            {/* decorative ring */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl border border-emerald-500/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* small KPI tile */
function StatTile({ kpi, label }) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
      <div className="text-2xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-300">
        {kpi}
      </div>
      <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
}
