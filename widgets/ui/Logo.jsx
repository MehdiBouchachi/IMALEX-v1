export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-9 w-9 rounded-full grid place-items-center font-bold text-white"
        style={{ background: "var(--cta-700)" }}
      >
        I
      </div>
      <div className="leading-tight">
        <div className="font-semibold tracking-tight text-[var(--text-primary)]">
          IMALEX
        </div>
        <div className="text-xs text-[var(--text-secondary)]">
          Natural Formulation Lab
        </div>
      </div>
    </div>
  );
}
