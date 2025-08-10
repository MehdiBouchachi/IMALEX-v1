// app/_components/ContactBlock.js
export default function ContactBlock() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-24 bg-gradient-to-b from-teal-50 to-emerald-50"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Start Your Formulation Project
        </h2>
        <p className="mt-3 text-slate-700">
          Tell us about your product vision, target claims, constraints, and
          timeline. We’ll reply with a proposal.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://docs.google.com/forms" // replace with your live form
            target="_blank"
            className="rounded-lg bg-teal-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/50 transition"
          >
            Fill the Project Brief
          </a>
          <a
            href="mailto:hello@imalex.example" // replace
            className="rounded-lg border border-emerald-700/20 bg-white px-6 py-3 text-emerald-800 font-semibold hover:bg-white/90 transition"
          >
            Email Us Directly
          </a>
        </div>

        <div className="mt-8 text-sm text-slate-600">
          Or call us:{" "}
          <span className="font-semibold text-slate-800">
            +213 ••• •• •• ••
          </span>
        </div>
      </div>
    </section>
  );
}
