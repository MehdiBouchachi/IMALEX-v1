import { cx } from "../../app/_lib/data-service";

export default function ModeSwitch({ value, onChange, tabs, className = "" }) {
  return (
    <div
      role="tablist"
      aria-label="Services view"
      className={[
        "relative inline-grid grid-cols-2 rounded-xl  border p-1 shadow-sm",
        "border-[var(--tile-border)] bg-[var(--surface-0)]",
        className,
      ].join(" ")}
    >
      {tabs.map(({ id, label, Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={cx(
              "px-3 py-1.5 text-sm font-semibold rounded-lg transition",
              active
                ? "bg-[color:var(--cta-700)] text-[var(--cta-50)] "
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-1)]"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
