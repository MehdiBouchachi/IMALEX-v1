import Image from "next/image";
import { FaFlask, FaCheckCircle, FaLeaf, FaShieldAlt } from "react-icons/fa";

function AboutImalex({ imageSrc = "/lab-shot.jpg" }) {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      {/* soft background accents (pull from brand with alpha fallbacks) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-300-a28, rgba(127,207,167,0.28)), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, var(--brand-700-a26, rgba(60,139,99,0.26)), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div className="max-w-xl lg:max-w-none">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border bg-clip-padding"
              style={{
                borderColor: "var(--brand-700-a25, rgba(60,139,99,0.25))",
                background: "var(--brand-700-a10, rgba(60,139,99,0.10))",
                color: "var(--brand-700)",
              }}
            >
              <FaFlask className="h-4 w-4" />
              IMALEX — Natural Formulation Lab
            </span>

            {/* Title */}
            <h2
              className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Science-grade natural formulations for industry
            </h2>

            {/* Lead */}
            <p
              className="mt-5 text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              IMALEX is an Algerian startup specializing in{" "}
              <strong>custom natural formulation</strong>. We partner with
              brands and manufacturers to design, prototype, validate, and scale
              products that are{" "}
              <strong>effective, compliant, and planet-minded</strong>.
            </p>

            {/* Subtle divider */}
            <div
              className="mt-8 h-px w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--brand-700-a22, rgba(60,139,99,0.22)), transparent)",
              }}
            />

            {/* Bullets */}
            <ul className="mt-6 space-y-4">
              {[
                "End-to-end R&D: brief → prototype → stability → dossier → scale-up",
                "Sectors: cosmetics, nutraceuticals, biofertilizers/biopesticides, animal nutrition, agri-food",
                "Regulatory alignment (DZ / EU): labels, INCI, safety, technical files",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center">
                    <FaCheckCircle
                      className="h-5 w-5"
                      style={{ color: "var(--brand-700)" }}
                    />
                  </span>
                  <span
                    className="leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: <FaLeaf />, label: "Natural-first" },
                { icon: <FaFlask />, label: "Lab-validated" },
                { icon: <FaShieldAlt />, label: "Compliant" },
                { icon: <FaCheckCircle />, label: "Turnkey" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl backdrop-blur-sm p-4 text-center shadow-sm border"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "linear-gradient(135deg, color-mix(in srgb, var(--surface-0) 85%, transparent), color-mix(in srgb, var(--surface-0) 60%, transparent))",
                  }}
                >
                  <div
                    className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full"
                    style={{
                      background: "var(--brand-700-a15, rgba(60,139,99,0.15))",
                      color: "var(--brand-700)",
                    }}
                  >
                    {b.icon}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {b.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA group */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#services"
                className="inline-flex justify-center rounded-lg px-5 py-3 font-semibold
              transition bg-[var(--cta-700)] hover:bg-[var(--cta-800)] text-white"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center rounded-lg px-5 py-3 font-semibold transition
              backdrop-blur-sm border
              bg-[var(--btn-ghost-bg)] hover:bg-[var(--btn-ghost-hover-bg)]
              text-[var(--btn-ghost-text)] border-[var(--btn-ghost-border)]"
              >
                Start a Project
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div
              className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl backdrop-blur-md shadow-xl border"
              style={{
                borderColor: "var(--border-subtle, rgba(0,0,0,0.06))",
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--surface-0) 85%, transparent), color-mix(in srgb, var(--surface-0) 60%, transparent))",
              }}
            >
              <Image
                src={imageSrc}
                alt="IMALEX lab — natural formulation"
                fill
                placeholder="blur" // built-in LQIP
                quality={60} // jpeg/webp quality (0–100)
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority={false}
              />

              {/* caption chip */}
              <div className="absolute bottom-4 left-4">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs backdrop-blur-sm"
                  style={{
                    background: "rgba(15,23,42,0.7)",
                    color: "#fff",
                  }}
                >
                  <FaFlask className="h-3.5 w-3.5" />
                  In-house R&D & stability testing
                </span>
              </div>
            </div>

            {/* decorative ring */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
              style={{
                border: "1px solid var(--brand-700-a22, rgba(60,139,99,0.22))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutImalex;
