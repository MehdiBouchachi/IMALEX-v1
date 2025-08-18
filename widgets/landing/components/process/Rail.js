export default function Rail({ smoothDisplay, steps, active, progress }) {
  return (
    <div
      className="w-full rounded-2xl p-4 sm:p-6"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
        boxShadow: "var(--shadow-card)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Chapter
      </div>
      <div
        className="mt-1 text-4xl sm:text-5xl font-black tabular-nums tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {smoothDisplay}
      </div>

      {/* progress bar */}
      <div className="mt-6 relative">
        <div
          className="h-1.5 sm:h-2 w-full rounded-full"
          style={{ background: "var(--border-subtle)" }}
        />
        <div
          className="h-1.5 sm:h-2 -mt-1.5 sm:-mt-2 rounded-full relative overflow-hidden"
          style={{
            width: `${Math.max(0.02, progress) * 100}%`,
            background: "var(--g-accent-bar)",
            transition: "width 100ms linear",
          }}
        >
          <span aria-hidden className="absolute inset-0 anim-gloss" />
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex items-center gap-3 text-sm min-w-0"
            style={{
              color: i === active ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full flex-none"
              style={{
                background: i <= active ? "var(--brand-700)" : "var(--border)",
              }}
            />
            <span className="truncate">{s.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
