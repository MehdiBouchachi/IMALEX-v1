export default function Footer() {
  return (
    <footer className="border-t border-[var(--footer-border)]">
      <div className="mx-auto max-w-7xl px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            {/* keep solid green badge like before */}
            <div className="h-9 w-9 rounded-full grid place-items-center font-bold bg-[var(--cta-700)] text-[var(--cta-50)]">
              I
            </div>
            <div className="font-semibold text-[var(--text-primary)]">
              IMALEX
            </div>
          </div>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Natural formulation R&amp;D for food supplements, cosmetics,
            agriculture and more.
          </p>
        </div>

        <FooterCol
          title="Company"
          items={[
            ["Why IMALEX", "#why"],
            ["Process", "#process"],
            ["Contact", "#contact"],
          ]}
        />
        <FooterCol
          title="Services"
          items={[
            ["Formulation", "#services"],
            ["Regulatory", "#services"],
            ["Manufacturing", "#services"],
          ]}
        />
        <div>
          <div className="font-semibold text-[var(--text-primary)]">Follow</div>
          <div className="mt-3 flex gap-3 text-[var(--text-muted)]">
            <FooterIcon label="LinkedIn" />
            <FooterIcon label="Twitter" />
            <FooterIcon label="Instagram" />
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--footer-border)] py-5 text-center text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} IMALEX. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div className="font-semibold text-[var(--text-primary)]">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="transition-colors hover:text-[var(--footer-link-hover)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterIcon({ label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="
        h-9 w-9 grid place-items-center rounded-full transition
        border text-[var(--text-secondary)]
        border-[var(--btn-ghost-border)]
        hover:border-[var(--footer-icon-hover-border)]
        hover:text-[var(--footer-link-hover)]
      "
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="6" />
      </svg>
    </a>
  );
}
