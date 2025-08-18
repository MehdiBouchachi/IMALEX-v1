export default function ServiceHeader({ title, Icon }) {
  return (
    <div className="grid grid-cols-[40px,1fr] items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl border bg-[var(--tile-icon-bg)] text-[var(--tile-icon-text)] border-[var(--tile-icon-border)]">
        {Icon ? <Icon /> : null}
      </span>
      <h3 className="text-lg font-semibold leading-snug text-[var(--text-primary)]">
        {title}
      </h3>
    </div>
  );
}
