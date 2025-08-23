import Button from "../../../ui/Button";
import ReadMore from "./ReadMore";
import ServiceHeader from "./ServiceHeader";
import ServiceImage from "./ServiceImage";

const cx = (...a) => a.filter(Boolean).join(" ");

function Root({ children, className = "" }) {
  return (
    <article
      className={cx(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border transition",
        "bg-[var(--tile-bg)] border-[var(--tile-border)]",
        "[box-shadow:var(--tile-shadow)] hover:[box-shadow:var(--tile-shadow-hover)]",
        className
      )}
    >
      {/* accent */}
      <div className="h-1 w-full bg-[image:var(--tile-accent)]" />
      {children}
    </article>
  );
}

function Media(props) {
  return <ServiceImage {...props} />;
}

function Content({ children, className = "" }) {
  return (
    <div className={cx("flex flex-1 flex-col min-h-0", className)}>
      {children}
    </div>
  );
}

function Header({ title, Icon }) {
  return (
    <div className="px-6 pt-6">
      <ServiceHeader title={title} Icon={Icon} />
    </div>
  );
}

function Body({ children, className = "" }) {
  return (
    <div
      className={cx(
        "px-6 pt-3 text-[0.95rem] leading-relaxed text-[var(--tile-copy)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* lightweight bullets (inline so card is self-contained) */
function Bullets({ items = [] }) {
  if (!items?.length) return null;
  return (
    <ul className="px-6 pt-3 grid gap-2">
      {items.map((k, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--bullet)]" />
          <span className="min-w-0">{k}</span>
        </li>
      ))}
    </ul>
  );
}

function Actions({ children, className = "" }) {
  return (
    <div
      className={cx(
        "mt-auto flex flex-wrap items-center gap-3 px-6 pb-6 pt-4",
        className
      )}
    >
      {children}
    </div>
  );
}

/* convenience wrappers */
function CTA({ href = "#contact", children }) {
  return (
    <Button variant="primary" size="xs" asLink href={href}>
      {children}
    </Button>
  );
}

function More({ data }) {
  return <ReadMore data={data} />;
}

/* namespace exports */
const ServiceCard = Object.assign(Root, {
  Media,
  Content,
  Header,
  Body,
  Bullets,
  Actions,
  CTA,
  More,
});

export default ServiceCard;
