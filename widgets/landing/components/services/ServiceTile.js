// app/_components/services/ServiceTile.js
import Button from "../../../ui/Button";
import Bullets from "../../../ui/Bullets";
import ReadMore from "./ReadMore";
import ServiceHeader from "./ServiceHeader";
import ServiceImage from "./ServiceImage";

export default function ServiceTile({
  title,
  line,
  icon: Icon,
  image,
  bullets = [],
  cta,
}) {
  return (
    <article
      className={[
        "group relative isolate h-full overflow-hidden rounded-2xl border transition",
        "flex flex-col", // ⬅️ vertical layout
        "bg-[var(--tile-bg)] border-[var(--tile-border)]",
        "[box-shadow:var(--tile-shadow)] hover:[box-shadow:var(--tile-shadow-hover)]",
      ].join(" ")}
    >
      <div className="h-1 w-full bg-[image:var(--tile-accent)]" />

      {/* fixed media height keeps top consistent */}
      <ServiceImage src={image} title={title} />

      {/* growable content area */}
      <div className="flex flex-1 flex-col p-6 min-h-0">
        <ServiceHeader title={title} Icon={Icon} />

        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--tile-copy)]">
          {line}
        </p>

        <Bullets items={bullets} />

        {/* CTA row pinned to bottom, spacing consistent */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          <Button variant="primary" size="xs" asLink href="#contact">
            {cta}
          </Button>
          <ReadMore />
        </div>
      </div>
    </article>
  );
}
