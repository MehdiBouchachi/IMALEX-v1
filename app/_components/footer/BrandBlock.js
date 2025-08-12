export default function BrandBlock({ name, initials, tagline }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full grid place-items-center font-bold bg-[var(--cta-700)] text-[var(--cta-50)]">
          {initials}
        </div>
        <div className="font-semibold text-[var(--text-primary)]">{name}</div>
      </div>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">{tagline}</p>
    </div>
  );
}
