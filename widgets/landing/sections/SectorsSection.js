import Card from "../components/sectors/Card";
import { SECTORS, SECTORS_DATA } from "../../../app/_config/sections.config.js";
import SectionHeader from "../../ui/SectionHeader";

export default function SectorsSection() {
  return (
    <section id="sectors" className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 animate-[aurora-sway_30s_ease-in-out_infinite]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={SECTORS.eyebrow} title={SECTORS.title} />
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS_DATA.map((s, i) => (
            <Card key={s.title} index={i} {...s} />
          ))}
          <div className="hidden lg:block rounded-2xl p-6 opacity-0">—</div>
        </div>
      </div>
    </section>
  );
}
