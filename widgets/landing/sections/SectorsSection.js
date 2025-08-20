import Card from "../components/sectors/Card";
import { SECTORS } from "../components/sectors/sectors.config";
import SectionHeader from "../../ui/SectionHeader";

export default function SectorsSection() {
  return (
    <section id="sectors" className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 animate-[aurora-sway_30s_ease-in-out_infinite]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--eye-brow)]">
            Sectors
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Industries We Serve
          </h2>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s, i) => (
            <Card key={s.title} index={i} {...s} />
          ))}
          <div className="hidden lg:block rounded-2xl p-6 opacity-0">—</div>
        </div>
      </div>
    </section>
  );
}
