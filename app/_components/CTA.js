function CTA() {
  return (
    <section
      className="
        py-16 border-y
        bg-[image:var(--cta-section-gradient)]
        border-[var(--border-subtle)]
      "
    >
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)]">
            Ready to formulate the future?
          </h3>
          <p className="mt-1 text-[var(--text-secondary)]">
            Tell us about your project and we’ll propose the best path forward.
          </p>
        </div>

        <div className="flex gap-3">
          {/* Primary (solid) */}
          <a
            href="#contact"
            className="
              inline-flex items-center justify-center
              rounded-lg px-6 py-3 font-semibold transition
              bg-[var(--cta-bg)] hover:bg-[var(--cta-bg-hover)]
              text-[var(--cta-50)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ring-offset-[var(--surface-0)] focus-visible:ring-[var(--ring)]
              shadow-sm
            "
          >
            Request a Quote
          </a>

          {/* Secondary (ghost) */}
          <a
            href="#services"
            className="
              inline-flex items-center justify-center
              rounded-lg px-6 py-3 font-semibold transition backdrop-blur-sm
              border bg-[var(--btn-ghost-bg)] hover:bg-[var(--btn-ghost-hover-bg)]
              border-[var(--btn-ghost-border)] text-[var(--btn-ghost-text)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ring-offset-[var(--surface-0)] focus-visible:ring-[var(--ring-subtle)]
            "
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
