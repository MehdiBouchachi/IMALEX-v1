import Bullets from "../../../ui/Bullets";
import ReadMore from "./ReadMore";
import ServiceHeader from "./ServiceHeader";
import ServiceImage from "./ServiceImage";
import Button from "../../../ui/Button";

export default function ServiceTile({
  title,
  line,
  icon: Icon,
  image,
  bullets = [],
  cta,
}) {
  return (
    <article className="group relative isolate overflow-hidden rounded-2xl border transition bg-[var(--tile-bg)] border-[var(--tile-border)] [box-shadow:var(--tile-shadow)] hover:[box-shadow:var(--tile-shadow-hover)]">
      <div className="h-1 w-full bg-[image:var(--tile-accent)]" />
      <ServiceImage src={image} title={title} />

      <div className="p-6">
        <ServiceHeader title={title} Icon={Icon} />
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--tile-copy)]">
          {line}
        </p>
        <Bullets items={bullets} />

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button variant="primary" size="xs" asLink href="#contact">
            {cta}
          </Button>
          <ReadMore />
        </div>
      </div>
    </article>
  );
}
