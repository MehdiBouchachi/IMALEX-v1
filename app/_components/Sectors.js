// app/_components/Sectors.js
const SECTORS = [
  { title: "Cosmetics", ex: "Creams, serums, hair care" },
  { title: "Nutraceuticals", ex: "Capsules, powders, gummies" },
  { title: "Biofertilizers", ex: "Foliar sprays, activators" },
  { title: "Animal Nutrition", ex: "Phytogenic additives" },
  { title: "Agri-food", ex: "Functional foods, clean-label" },
];

export default function Sectors() {
  return (
    <section
      id="sectors"
      className="relative py-20 md:py-24 bg-gradient-to-b from-emerald-50 to-teal-50"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Sectors We Serve
        </h2>
        <p className="mt-3 max-w-2xl text-slate-700">
          Scientific rigor for multiple applications — grounded in sustainable,
          natural formulation.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SECTORS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-white border border-emerald-700/10 p-5 text-center shadow-sm"
            >
              <div className="mx-auto h-10 w-10 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-teal-600"></span>
              </div>
              <div className="mt-3 font-semibold">{s.title}</div>
              <div className="text-sm text-slate-600">{s.ex}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
