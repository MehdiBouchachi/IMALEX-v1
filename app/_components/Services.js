// app/_components/Services.js
const ITEMS = [
  {
    title: "Custom Formulation",
    desc: "Tailored formulas using validated natural actives aligned with your brief, claims, and regulatory needs.",
  },
  {
    title: "Prototype Development",
    desc: "Rapid lab samples to validate feasibility, sensorials, and stability before scale-up.",
  },
  {
    title: "Regulatory & Dossiers",
    desc: "Labels, INCI, PIF/notification guidance, and international compliance (DZ/EU, etc.).",
  },
  {
    title: "Stability & Efficacy",
    desc: "Accelerated/real-time stability, packaging compatibility, microbiological control, partners for efficacy tests.",
  },
  {
    title: "Research & Innovation",
    desc: "Novel botanical actives, synergistic blends, eco-processes, and evidence-led optimization.",
  },
  {
    title: "Small-Batch Production",
    desc: "Pilot and pre-industrial batches in liquid/semisolid/solid forms with strict QA practices.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Our Services
        </h2>
        <p className="mt-3 max-w-2xl text-slate-700">
          End-to-end formulation support. Choose a single module or a turnkey
          project.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-emerald-700/10 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-700"></span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
