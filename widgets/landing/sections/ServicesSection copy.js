import ServiceTile from "../components/services/ServiceTile";
import { SERVICES } from "../components/services/services.config.js";
export default function ServicesSection() {
  return (
    <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 isolate">
      {SERVICES.map((it) => (
        <ServiceTile key={it.slug} {...it} />
      ))}
    </div>
  );
}
