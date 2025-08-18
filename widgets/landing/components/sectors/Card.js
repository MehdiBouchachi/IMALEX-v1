import Spotlight from "./Spotlight";

export default function Card({ title, desc, icon: Icon, points = [], index }) {
  return (
    <Spotlight href="#contact" ariaLabel={`${title} — ${desc}`} index={index}>
      <div className="relative z-10 flex h-full flex-col gap-3.5 p-4 xs:p-5 sm:p-6 min-w-0">
        {/* header */}
        <div className="flex items-start gap-3 xs:gap-3.5">
          <span
            className="
              grid h-10 w-10 xs:h-11 xs:w-11 place-items-center
              rounded-xl border transition
              group-hover:scale-[1.06]
              flex-none
            "
            style={{
              background:
                "color-mix(in srgb, var(--brand-400) 14%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--brand-400) 24%, transparent)",
              color: "var(--brand-700)",
            }}
          >
            {Icon ? <Icon /> : null}
          </span>

          <div className="min-w-0">
            <h3 className="text-[1rem] xs:text-[1.05rem] font-semibold leading-snug text-[var(--text-primary)] break-words">
              {title}
            </h3>
            <p className="mt-1 text-[13.5px] xs:text-[14px] leading-relaxed text-[var(--text-secondary)] break-words">
              {desc}
            </p>
          </div>
        </div>

        {/* chips */}
        <ul className="mt-1.5 flex flex-wrap gap-1.5 xs:gap-2">
          {points.map((p, j) => (
            <li
              key={p}
              className="
                inline-flex items-center gap-2 rounded-full border
                px-2.5 py-1.5 text-xs xs:text-[13px] font-medium
                max-w-full
              "
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--surface-2)",
                color: "var(--text-secondary)",
                animation: "sg-reveal .25s ease-out both",
                animationDelay: `${index * 60 + j * 70}ms`,
              }}
              title={p}
            >
              <span
                className="h-1.5 w-1.5 rounded-full flex-none"
                style={{ background: "var(--brand-700)" }}
              />
              <span className="truncate">{p}</span>
            </li>
          ))}
        </ul>

        {/* footer link */}
        <div className="mt-auto flex items-center gap-2 text-[13px] xs:text-sm font-semibold text-[var(--text-secondary)]">
          <span className="group-hover:underline truncate">
            Discuss a project
          </span>
          <svg
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Spotlight>
  );
}
