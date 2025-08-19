export default function ReadMore({ data }) {
  const panel =
    data?.panel ?? "Full scope & documentation available on request.";
  const intro =
    data?.intro ??
    "You’ll receive a clear process map, QA/QC checkpoints, artwork guidance and a transfer package for scale-up.";
  const items = data?.items ?? [
    "Process flow & roles",
    "QA/QC checkpoints",
    "Artwork/label checklist",
    "Tech transfer package",
  ];
  const cta = data?.cta ?? "Ask for full scope";

  return (
    <details className="group/details relative w-auto">
      <summary className="list-none cursor-pointer select-none inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-primary)] hover:underline focus:outline-none rounded">
        <span>Read more</span>
        <svg
          className="h-3.5 w-3.5 text-[var(--text-muted)] transition-transform group-open/details:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>

      <div className="mt-3 h-px bg-gradient-to-r from-transparent via-[var(--effect-wire-start)]/30 to-transparent" />

      <div className="mt-3 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open/details:grid-rows-[1fr]">
        <div className="overflow-hidden w-full">
          {/* soft panel */}
          <div className="max-w-full rounded-lg border px-3 py-2 text-xs border-[var(--tile-softpanel-border)] bg-[var(--tile-softpanel-bg)] text-[var(--brand-700)] dark:text-[var(--brand-800)]">
            {panel}
          </div>

          {/* intro + bullets */}
          <div className="mt-3 text-sm leading-relaxed text-[var(--tile-copy)]">
            {Array.isArray(intro) ? (
              intro.map((p, i) => (
                <p key={i} className={i ? "mt-2" : "mb-2"}>
                  {p}
                </p>
              ))
            ) : (
              <p className="mb-2">{intro}</p>
            )}

            {items?.length ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {items.map((k, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--bullet)]" />
                    <span className="min-w-0">{k}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* CTA */}
          <div className="mt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition border-[color:var(--tile-softpanel-border)] text-[var(--brand-700)] dark:text-[var(--brand-800)] hover:bg-[var(--tile-softpanel-bg)]"
            >
              {cta}
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </details>
  );
}
