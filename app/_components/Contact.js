import ContactFormWizard from "./contact/ContactFormWizard";

function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        {/* Left copy */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--eye-brow)]">
            Contact
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Let’s talk formulation
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            Share your goals, target market, regulatory region and any
            constraints. We’ll reply with a plan, timeline and budget options.
          </p>

          <div className="mt-8 space-y-3 text-sm text-[var(--text-secondary)]">
            <div>
              <strong className="text-[var(--text-primary)]">Email:</strong>{" "}
              hello@imalex.bio
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">Phone:</strong>{" "}
              +213 000 000 000
            </div>
            <div>
              <strong className="text-[var(--text-primary)]">Location:</strong>{" "}
              Algiers, Algeria
            </div>
          </div>
        </div>

        {/* Form */}
        <ContactFormWizard />
      </div>
    </section>
  );
}

export default Contact;
