import FooterLink from "./FooterLink";

export default function FooterCol({ title, items = [] }) {
  return (
    <nav aria-label={title}>
      <div className="font-semibold text-[var(--text-primary)]">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
        {items.map(({ label, href }) => (
          <li key={label}>
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
