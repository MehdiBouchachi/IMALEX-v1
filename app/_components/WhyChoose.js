// app/_components/WhyChoose.js
const VALUES = [
  {
    k: "100% Natural Focus",
    d: "Botanical ingredients, clean processes, and traceability.",
  },
  {
    k: "Scientific Rigor",
    d: "Researchers & engineers with reproducible, data-driven methods.",
  },
  {
    k: "Regulatory Safety",
    d: "Compliance-first mindset for local and international markets.",
  },
  {
    k: "Confidential & Custom",
    d: "NDA-friendly workflows, tailored deliverables, turnkey or modular.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Why Choose IMALEX
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div
              key={v.k}
              className="rounded-2xl border border-emerald-700/10 bg-white p-6 shadow-sm"
            >
              <div className="text-emerald-700 font-semibold">{v.k}</div>
              <p className="mt-2 text-slate-700 text-sm leading-relaxed">
                {v.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
