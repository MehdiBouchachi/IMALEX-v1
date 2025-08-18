export default function ReadMore() {
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
          <div className="max-w-full rounded-lg border px-3 py-2 text-xs border-[var(--tile-softpanel-border)] bg-[var(--tile-softpanel-bg)] text-[var(--brand-700)] dark:text-[var(--brand-800)]">
            Full scope & documentation available on request.
          </div>

          <div className="mt-3 text-sm leading-relaxed text-[var(--tile-copy)]">
            <p className="mb-2">
              You’ll receive a clear process map, QA/QC checkpoints, templates
              for labels & dossiers, and a transfer package to accelerate
              scale-up.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "Process flow & roles",
                "QA/QC checkpoints",
                "Artwork/label checklist",
                "Tech transfer package",
              ].map((k) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--bullet)]" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition border-[color:var(--tile-softpanel-border)] text-[var(--brand-700)] dark:text-[var(--brand-800)] hover:bg-[var(--tile-softpanel-bg)]"
            >
              Ask for full scope
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
