export default function MobileGrid({ items }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 md:hidden">
      {items.map(({ title, desc, icon: Icon }) => (
        <li
          key={title}
          className="relative rounded-2xl border border-[var(--tile-border)] bg-[var(--surface-1)] backdrop-blur-sm p-5 
                     shadow-[0_10px_28px_-10px_var(--effect-glow-a)] dark:shadow-[0_12px_32px_-10px_var(--effect-glow-b)]"
        >
          <Halo />
          <div className="relative flex items-start gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--tile-icon-border)] 
                         bg-[var(--tile-icon-bg)] text-[var(--brand-700)] dark:bg-[var(--tile-icon-bg-dark)] dark:text-[var(--brand-800)]"
            >
              <Icon />
            </span>
            <div>
              <h3 className="font-semibold leading-snug text-[var(--text-primary)]">
                {title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {desc}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Halo() {
  return (
    <div
      aria-hidden
      className="absolute -inset-0.5 rounded-[18px] bg-[radial-gradient(120px_60px_at_20%_20%,var(--effect-glow-a),transparent),radial-gradient(120px_60px_at_80%_80%,var(--effect-glow-b),transparent)] blur-[6px]"
    />
  );
}
