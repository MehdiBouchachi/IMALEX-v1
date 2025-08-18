import Button from "../../ui/Button";

function CTA() {
  return (
    <section
      className="
        relative overflow-hidden
        py-10 xs:py-12 sm:py-16
        border-y border-[var(--border-subtle)]
      "
    >
      {/* Full-bleed background locked to the viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100dvw]"
      >
        <div className="absolute inset-0 bg-[image:var(--cta-section-gradient)]" />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-4 xs:px-5 sm:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-5 sm:gap-6">
          <div className="min-w-0 text-center md:text-left">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Ready to formulate the future?
            </h3>
            <p className="mt-2 text-[14px] xs:text-[15px] text-[var(--text-secondary)]">
              Tell us about your project and we’ll propose the best path
              forward.
            </p>
          </div>

          {/* Buttons: stack on tiny phones, row on ≥360px */}
          <div className="w-full md:w-auto flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-2.5 xs:gap-3">
            <Button
              variant="primary"
              size="mlg"
              asLink
              href="#contact"
              className="w-full xs:w-auto"
            >
              Request a Quote
            </Button>

            <Button
              variant="secondary"
              size="mlg"
              asLink
              href="#services"
              className="w-full xs:w-auto"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
