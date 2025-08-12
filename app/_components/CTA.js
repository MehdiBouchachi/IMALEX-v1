import Button from "./ui/Button";

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
          <Button variant="primary" size="mlg" asLink href="#contact">
            Request a Quote
          </Button>

          <Button variant="secondary" size="mlg" asLink href="#services">
            View Services
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
