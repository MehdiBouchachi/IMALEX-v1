export default function SectionHeader({
  eyebrow,
  title,
  align = "left", // "left" | "center"
  className = "",
}) {
  return (
    <header
      className={[
        align === "center" ? "text-center mx-auto" : "",
        "max-w-3xl",
        className,
      ].join(" ")}
    >
      {/* Eyebrow (simple text, no border) */}
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eye-brow)]">
          {eyebrow}
        </p>
      )}

      {/* Title (unified size across all sections) */}
      <h2 className="mt-2 text-[clamp(26px,4vw,42px)] font-extrabold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
    </header>
  );
}
