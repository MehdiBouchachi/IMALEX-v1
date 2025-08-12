import Button from "./Button";

export default function CTAGroup({ items = [], size = "mlg" }) {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-3">
      {items.map(({ href, label, variant }) => (
        <Button key={href} variant={variant} size={size} asLink href={href}>
          {label}
        </Button>
      ))}
    </div>
  );
}
