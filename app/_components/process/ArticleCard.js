export default function ArticleCard({ title, desc, Icon, active }) {
  return (
    <article
      className="group relative max-w-2xl anim-pop"
      style={{
        opacity: active ? 1 : 0.86,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 220ms ease, transform 420ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        className="rounded-2xl p-7 sm:p-8"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: active ? "var(--shadow-card-lg)" : "var(--shadow-card)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* top hairline */}
        <span
          aria-hidden
          className="absolute left-7 right-7 -top-px h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in srgb, var(--brand-400) 24%, transparent), transparent)",
            filter: "blur(0.6px)",
            opacity: 0.75,
          }}
        />

        <div className="flex items-start gap-5">
          <span
            className="relative grid h-12 w-12 flex-none place-items-center rounded-full"
            style={{
              background: "var(--tile-icon-bg)",
              border: `1px solid ${
                active
                  ? "color-mix(in srgb, var(--brand-400) 55%, transparent)"
                  : "var(--tile-icon-border)"
              }`,
              color: "var(--brand-700)",
              animation: active ? "breath 3.6s ease-in-out infinite" : "none",
            }}
          >
            <Icon className="text-base" />
          </span>

          <div className="min-w-0">
            <div
              className="text-[11px] font-semibold tracking-wider mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              STEP
            </div>
            <h3
              className="text-xl sm:text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
            <p
              className="mt-2 text-[15px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {desc}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
