"use client";
import { FaLeaf, FaFlask, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

import labShot from "@/public/lab-shot.jpg";
import { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import Process from "./_components/Process";
import ServicesGrid from "./_components/ServicesGrid";
import SectorsGrid from "./_components/SectorsGrid";
import WhyUsFlask from "./_components/WhyUsFlask";
import ContactFormWizard from "./_components/ContactFormWizard";

/* ===================== PAGE (Light + Dark) ===================== */
export default function LandingV2Dark() {
  return (
    <div className=" selection:bg-teal-300/40">
      <main>
        <Hero />
        <Trusted />

        <AboutImalex imageSrc={labShot} />

        <Section id="services" title="Our Services" eyebrow="What we do">
          <ServicesGrid />
        </Section>

        <Section id="sectors" title="Industries We Serve" eyebrow="Sectors">
          <SectorsGrid />
        </Section>

        <WhyUsFlask />

        <Process />

        <CTA />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ===================== HEADER ===================== */

/**
 * Usage:
 * <AboutImalex />                       // uses the built-in DNA/Leaf SVG
 * <AboutImalex imageSrc="/lab.jpg" />   // uses your lab photo instead
 */

function AboutImalex({ imageSrc = "/lab-shot.jpg" }) {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      {/* soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(closest-side, #34d39955, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(closest-side, #14b8a655, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div className="max-w-xl lg:max-w-none">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-200">
              <FaFlask className="h-4 w-4" />
              IMALEX — Natural Formulation Lab
            </span>

            {/* Title */}
            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Science-grade natural formulations for industry
            </h2>

            {/* Lead */}
            <p className="mt-5 text-base sm:text-lg text-slate-700/90 dark:text-slate-300 leading-relaxed">
              IMALEX is an Algerian startup specializing in{" "}
              <strong>custom natural formulation</strong>. We partner with
              brands and manufacturers to design, prototype, validate, and scale
              products that are{" "}
              <strong>effective, compliant, and planet-minded</strong>.
            </p>

            {/* Subtle divider */}
            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            {/* Bullets */}
            <ul className="mt-6 space-y-4">
              {[
                "End-to-end R&D: brief → prototype → stability → dossier → scale-up",
                "Sectors: cosmetics, nutraceuticals, biofertilizers/biopesticides, animal nutrition, agri-food",
                "Regulatory alignment (DZ / EU): labels, INCI, safety, technical files",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-slate-800 dark:text-slate-200"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center">
                    <FaCheckCircle className="h-5 w-5 text-emerald-500" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
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
                  className="rounded-xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-4 text-center shadow-sm"
                >
                  <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                    {b.icon}
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA group */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#services"
                className="inline-flex justify-center rounded-lg bg-teal-500 px-5 py-3 text-white font-semibold hover:bg-teal-600 transition"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center rounded-lg border border-emerald-500/20 bg-white/70 dark:bg-white/5 px-5 py-3 text-emerald-800 dark:text-emerald-200 font-semibold hover:bg-white/90 dark:hover:bg-white/10 backdrop-blur-sm transition"
              >
                Start a Project
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            {/* frame with controlled aspect so it never collapses */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-white/85 to-white/60 dark:from-slate-900/70 dark:to-slate-900/40 backdrop-blur-md shadow-xl">
              <Image
                src={imageSrc}
                alt="IMALEX lab — natural formulation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
                priority={false}
              />

              {/* caption chip */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 text-white dark:bg-slate-800/70 px-3 py-1 text-xs backdrop-blur-sm">
                  <FaFlask className="h-3.5 w-3.5" />
                  In-house R&D & stability testing
                </span>
              </div>
            </div>

            {/* decorative ring pulled away from the frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl border border-emerald-500/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== THEME TOGGLE ===================== */

/* ===================== HERO ===================== */

/* ===================== HERO (fills screen with header) ===================== */
function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              var(--hero-top) 0%,
              var(--hero-mid) 40%,
              var(--hero-bot) 100%
            )
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 400px at 20% 20%, var(--glow-a), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 80% 60%, var(--glow-b), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')",
        }}
      />

      {/* Waves & dots */}
      <Wave tone="teal" className="top-[12%] h-[110px] opacity-35 z-[5]" />
      <Wave tone="emerald" className="top-[28%] h-[130px] opacity-30 z-[5]" />
      <Wave tone="mint" className="top-[44%] h-[120px] opacity-25 z-[5]" />
      <DotsOverlay count={42} />

      {/* Content — hero fills screen, content centered; pt-16 avoids overlap under fixed header */}
      <div className="relative z-[60] mx-auto max-w-5xl px-6">
        <div className="min-h-[100svh] grid place-items-center text-center pt-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
              Science & Nature in Perfect Balance
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Bespoke scientific formulation services — from research &
              prototypes to regulatory dossiers and scale-up for cosmetics,
              nutraceuticals, biofertilizers, animal nutrition, and agri-food.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="rounded-lg bg-teal-500 px-7 py-4 text-white font-semibold hover:bg-teal-600 transition shadow-md shadow-teal-500/20"
              >
                Request a Quote
              </a>
              <a
                href="#services"
                className="rounded-lg border border-emerald-900/10 dark:border-emerald-400/20 bg-white/70 dark:bg-white/5 px-7 py-4 text-emerald-800 dark:text-emerald-200 font-semibold hover:bg-white/90 dark:hover:bg-white/10 backdrop-blur-sm transition"
              >
                Discover Our Services
              </a>
            </div>

            <div className="mt-12 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Trusted by innovators in clean beauty, nutrition & sustainable
              agriculture
            </div>
          </div>
        </div>
      </div>

      {/* Optional bottom fade (keeps the vibe without changing layout height) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[10]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--hero-bot))",
        }}
      />

      {/* Theme tokens */}
      <style jsx global>{`
        :root {
          --hero-top: #f5fbfa;
          --hero-mid: #eefaf6;
          --hero-bot: #ffffff;
          --glow-a: rgba(16, 185, 129, 0.08);
          --glow-b: rgba(45, 212, 191, 0.06);
        }
        :root.dark {
          --hero-top: #0b1f24;
          --hero-mid: #0d2a23;
          --hero-bot: #071a19;
          --glow-a: rgba(16, 185, 129, 0.18);
          --glow-b: rgba(45, 212, 191, 0.14);
        }
      `}</style>
    </section>
  );
}

/* ===================== TRUSTED ===================== */
function Trusted() {
  const brands = ["ALPHA", "NOVALAB", "BOTANIQ", "NUTRIX", "AGROWISE"];
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center gap-6 opacity-70">
          {brands.map((b) => (
            <div
              key={b}
              className="text-center text-sm tracking-wider font-semibold text-slate-500 dark:text-slate-400"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== GENERIC SECTION ===================== */
function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h2>
          )}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ===================== SERVICES GRID ===================== */
/* function ServicesGrid() {
  const items = [
    {
      title: "Custom Formulation",
      desc: "Tailor-made recipes using natural, validated actives to meet your brief, constraints and target claims.",
      icon: Flask,
    },
    {
      title: "Prototype Development",
      desc: "Rapid lab samples to test feasibility, sensorials and stability before scale-up.",
      icon: Beaker,
    },
    {
      title: "Regulatory Dossiers",
      desc: "Labels, INCI, safety, and regional compliance (DZ / EU) with technical documentation.",
      icon: Shield,
    },
    {
      title: "Stability & Efficacy",
      desc: "Accelerated/real-time stability, packaging compatibility and efficacy studies with partners.",
      icon: Gauge,
    },
    {
      title: "R&D & Ingredient Sourcing",
      desc: "Exploration of local botanicals, synergistic blends and eco-processes to unlock performance.",
      icon: Leaf,
    },
    {
      title: "Contract Manufacturing",
      desc: "Small to medium series in compliant facilities: liquid, semi-solid and solid forms.",
      icon: Factory,
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ title, desc, icon: Icon }) => (
        <article
          key={title}
          className="rounded-2xl border border-teal-900/10 dark:border-teal-300/15 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6 hover:shadow-md hover:shadow-teal-500/10 transition"
        >
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-lg bg-teal-50 dark:bg-teal-400/10 grid place-items-center text-teal-700 dark:text-teal-300">
              <Icon />
            </span>
            <h3 className="font-semibold">{title}</h3>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {desc}
          </p>
        </article>
      ))}
    </div>
  );
}
 */
/* ===================== SECTORS GRID ===================== */
/* function SectorsGrid() {
  const items = [
    ["Cosmetics", "Skin, hair & body care with clean, effective actives."],
    ["Nutraceuticals", "Capsules, powders, liquids and gummies."],
    [
      "Biofertilizers & Biopesticides",
      "Plant-friendly actives and microbial solutions.",
    ],
    ["Animal Nutrition", "Phytogenic additives and functional oils."],
    ["Agri-Food", "Clean-label flavors, colors and functional ingredients."],
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(([title, desc]) => (
        <article
          key={title}
          className="rounded-2xl border border-emerald-900/10 dark:border-emerald-400/20 p-6 hover:bg-emerald-50/40 dark:hover:bg-emerald-400/5 transition"
        >
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {desc}
          </p>
        </article>
      ))}
      <div className="hidden lg:block rounded-2xl border border-emerald-900/10 dark:border-emerald-400/20 p-6 opacity-0">
        —
      </div>
    </div>
  );
} */

/* ===================== WHY US ===================== */
function WhyUs() {
  const values = [
    [
      "100% Natural First",
      "We prioritize safe, bio-based actives with traceability.",
    ],
    ["Scientific Rigor", "Doctoral-level team with lab-proven methods and QA."],
    ["Eco-Responsible", "Low-impact processes and responsible sourcing."],
    ["Regulatory Confidence", "We navigate DZ/EU requirements end-to-end."],
    ["Partner Mindset", "From idea to industrialization, we’re your R&D arm."],
  ];
  return (
    <section
      id="why"
      className="py-20 sm:py-24 bg-gradient-to-b from-teal-50/60 to-white dark:from-[#0c1c1c] dark:to-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
            Why IMALEX
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Science, Nature & Accountability
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300 max-w-2xl">
            We combine green chemistry with rigorous testing to deliver products
            that are effective, compliant and scalable—without compromising on
            sustainability.
          </p>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(([title, desc]) => (
            <li
              key={title}
              className="rounded-xl border border-teal-900/10 dark:border-teal-300/15 bg-white dark:bg-white/5 p-6"
            >
              <div className="font-semibold">{title}</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {desc}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===================== CTA ===================== */
function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-[#0e2323] dark:to-[#0e1a1a] border-y border-teal-900/10 dark:border-teal-300/15">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Ready to formulate the future?</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Tell us about your project and we’ll propose the best path forward.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="#contact"
            className="rounded-lg bg-teal-500 px-6 py-3 text-white font-semibold hover:bg-teal-600 transition "
          >
            Request a Quote
          </a>
          <a
            href="#services"
            className="rounded-lg border border-teal-900/10 dark:border-teal-300/15 bg-white/70 dark:bg-white/10 px-6 py-3 font-semibold hover:bg-white/90 dark:hover:bg-white/15 backdrop-blur-sm transition"
          >
            View Services
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===================== CONTACT ===================== */
/* ===================== CONTACT (upgraded) ===================== */

/* ===================== CONTACT (upgraded: EN + dark-friendly + city-by-country) ===================== */
function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        {/* Left copy */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
            Contact
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Let’s talk formulation
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            Share your goals, target market, regulatory region and any
            constraints. We’ll reply with a plan, timeline and budget options.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <div>
              <strong>Email:</strong> hello@imalex.bio
            </div>
            <div>
              <strong>Phone:</strong> +213 000 000 000
            </div>
            <div>
              <strong>Location:</strong> Algiers, Algeria
            </div>
          </div>
        </div>

        {/* Form */}
        <ContactFormWizard />
      </div>
    </section>
  );
}

/* -------- Form (kept in the same style, dark-mode friendly controls) -------- */
function EnhancedContactForm() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-2xl border border-teal-900/10 dark:border-teal-300/15 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-6"
    >
      {/* Basic identity */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full name" name="name" />
        <Input label="Email" name="email" type="email" />
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="+213…"
        />
        {/* Country & City (dark-friendly selects) */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Country (filterable, from your old component) */}
          <div>
            <Label>Country</Label>
            <CountrySelect
              name="country"
              value={country}
              onChange={setCountry}
            />
          </div>

          {/* City (free text) */}
          <div>
            <Label>City</Label>
            <input
              name="city"
              type="text"
              placeholder="Enter your city"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none
                 focus:ring-4 focus:ring-teal-300/30
                 bg-white/70 dark:bg-white/5
                 border-slate-300/70 dark:border-slate-600
                 text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Sector */}
      <div className="mt-6">
        <Label>Sector</Label>
        <SelectShell name="sector" defaultValue="">
          <option value="" disabled>
            Select sector…
          </option>
          <option value="cosmetics">Natural cosmetics</option>
          <option value="supplements">Dietary supplements</option>
          <option value="biopesticides">Biopesticides & biofertilizers</option>
          <option value="animal-nutrition">Animal nutrition</option>
          <option value="agri-food">Agri-food products</option>
        </SelectShell>
      </div>

      {/* Needs (checkboxes) */}
      <div className="mt-6">
        <Label>Type of need</Label>
        <div className="mt-2 grid sm:grid-cols-2 gap-2">
          {[
            ["custom-formulation", "Custom formulation"],
            ["prototype", "Prototype"],
            ["stability", "Stability & efficacy study"],
            ["rnd", "Research & innovation"],
            ["regulatory", "Regulatory analysis"],
            ["other", "Other"],
          ].map(([val, label]) => (
            <label
              key={val}
              className="flex items-center gap-2 rounded-lg border border-slate-300/70 dark:border-slate-600 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition"
            >
              <input
                type="checkbox"
                name="needs"
                value={val}
                className="accent-teal-600 h-4 w-4"
              />
              <span className="text-slate-700 dark:text-slate-300">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Progress (radio) */}
      <div className="mt-6">
        <Label>Project stage</Label>
        <div className="mt-2 grid sm:grid-cols-3 gap-2">
          {[
            ["idea", "Idea"],
            ["early-rnd", "Early R&D"],
            ["in-production", "In production"],
          ].map(([val, label]) => (
            <label
              key={val}
              className="flex items-center gap-2 rounded-lg border border-slate-300/70 dark:border-slate-600 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition"
            >
              <input
                type="radio"
                name="stage"
                value={val}
                className="accent-teal-600 h-4 w-4"
              />
              <span className="text-slate-700 dark:text-slate-300">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brief */}
      <div className="mt-6">
        <Label>Project brief</Label>
        <textarea
          className="mt-1 w-full rounded-lg border border-slate-300/70 dark:border-slate-600 px-3 py-2 outline-none focus:ring-4 focus:ring-teal-300/30 dark:bg-transparent"
          rows={5}
          name="brief"
          placeholder="What would you like to build?"
        />
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button className="rounded-lg bg-teal-500 px-6 py-3 text-white font-semibold hover:bg-teal-600 transition">
          Send inquiry
        </button>
        <a
          href="#services"
          className="rounded-lg border border-teal-900/10 dark:border-teal-300/15 bg-white/70 dark:bg-white/5 px-6 py-3 font-semibold hover:bg-white/90 dark:hover:bg-white/10 transition"
        >
          Explore services
        </a>
      </div>
    </form>
  );
}

/* ===================== Helper controls ===================== */

/* Shared select shell with improved dark styles + custom chevron (pure CSS/SVG) */
function SelectShell({
  children,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={[
          "mt-1 w-full appearance-none rounded-lg",
          "bg-white/80 dark:bg-slate-800/70",
          "border border-slate-300/70 dark:border-slate-600",
          "px-3 py-2 pr-8 outline-none",
          "text-slate-800 dark:text-slate-100",
          "placeholder:text-slate-400 dark:placeholder:text-slate-400",
          "focus:ring-4 focus:ring-teal-300/30 disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" ")}
        aria-placeholder={placeholder}
      >
        {children}
      </select>

      {/* chevron */}
      <span
        className="pointer-events-none absolute inset-y-0 right-2 grid place-items-center text-slate-500 dark:text-slate-300"
        aria-hidden="true"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </span>
    </div>
  );
}

/* Country select (filters Israel like your old one). Uses REST Countries; no key needed. */
function CountrySelect({ name, value, onChange }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v2/all?fields=name,flag"
        );
        const data = await res.json();
        const filtered = (data || []).filter(
          (c) => (c.name || "").toLowerCase() !== "israel"
        );
        if (alive) setList(filtered);
      } catch {
        if (alive) setList([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <SelectShell
      name={name}
      value={value}
      onChange={onChange}
      placeholder={loading ? "Loading countries…" : "Select country…"}
    >
      <option value="" disabled>
        {loading ? "Loading countries…" : "Select country…"}
      </option>
      {list.map((c) => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
    </SelectShell>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer className="border-t border-teal-900/10 dark:border-teal-300/15">
      <div className="mx-auto max-w-7xl px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-teal-500 text-white grid place-items-center font-bold">
              I
            </div>
            <div className="font-semibold">IMALEX</div>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Natural formulation R&D for cosmetics, nutraceuticals,
            biofertilizers and more.
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
          <div className="font-semibold">Follow</div>
          <div className="mt-3 flex gap-3 text-slate-500 dark:text-slate-400">
            <FooterIcon label="LinkedIn" />
            <FooterIcon label="Twitter" />
            <FooterIcon label="Instagram" />
          </div>
        </div>
      </div>

      <div className="border-t border-teal-900/10 dark:border-teal-300/15 py-5 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} IMALEX. All rights reserved.
      </div>
    </footer>
  );
}

/* ===================== REUSABLES ===================== */
function Label({ children }) {
  return (
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
      {children}
    </label>
  );
}
function Input({ label, name, type = "text", placeholder = "" }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-300/70 dark:border-slate-600 px-3 py-2 outline-none focus:ring-4 focus:ring-teal-300/30 dark:bg-transparent"
      />
    </div>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div className="font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map(([label, href]) => (
          <li key={label}>
            <a
              className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              href={href}
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
      className="h-9 w-9 grid place-items-center rounded-full border border-slate-300/70 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-300 hover:text-teal-600 dark:hover:text-teal-300 transition"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="6" />
      </svg>
    </a>
  );
}

/* ===================== ICONS ===================== */
function Flask() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M9 3h6M10 3v3l-5 8a5 5 0 004 8h6a5 5 0 004-8l-5-8V3" />
      <path d="M7 17h10" />
    </svg>
  );
}
function Beaker() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M4 3h16M9 3v7l-5 8a3 3 0 003 3h10a3 3 0 003-3l-5-8V3" />
      <path d="M7 16h10" />
    </svg>
  );
}
function Shield() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
    </svg>
  );
}
function Gauge() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12l4-2" />
      <path d="M7 12h.01M17 12h.01M12 7h.01M12 17h.01" />
    </svg>
  );
}
function Leaf() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M12 2C7 3 4 7 4 12a8 8 0 0016 0c0-5-3-9-8-10z" />
      <path d="M12 2v20" />
    </svg>
  );
}
function Factory() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M3 21V10l6 3V9l6 3V8l6 4v9H3z" />
      <path d="M7 21v-4M11 21v-4M15 21v-4M19 21v-4" />
    </svg>
  );
}

/* ===================== WAVES & DOTS ===================== */
function Wave({ className = "", tone = "teal" }) {
  const grad = {
    teal: { from: "#4fd1c5", to: "#16a394" },
    emerald: { from: "#6ee7b7", to: "#059669" },
    mint: { from: "#a7f3d0", to: "#34d399" },
  }[tone] || { from: "#6ee7b7", to: "#059669" };

  // brighter strokes for dark mode
  const from = grad.from;
  const to = grad.to;

  return (
    <div className={`pointer-events-none absolute inset-x-0 ${className}`}>
      <svg
        viewBox="0 0 2880 160"
        preserveAspectRatio="none"
        className="w-[200%] h-full"
      >
        <defs>
          <linearGradient
            id={`strokeGrad-${tone}`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="2880"
            y2="0"
          >
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <g
          stroke={`url(#strokeGrad-${tone})`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90 dark:opacity-95"
        >
          {waveSet(0)}
          {waveSet(1439.5)}
        </g>
      </svg>
    </div>
  );

  function waveSet(tx) {
    return (
      <g transform={`translate(${tx} 0)`}>
        <path
          strokeWidth="2"
          d="M0,92  C180,72  360,132 540,112  C720,92  900,52 1080,72  C1260,92 1350,112 1440,102"
        />
        <path
          strokeWidth="3"
          d="M0,104 C200,84  400,144 600,124 C800,104 1000,64 1200,84  C1350,99  1390,114 1440,108"
        />
        <path
          strokeWidth="2.5"
          d="M0,118 C220,98  420,152 640,132 C860,112 1030,88  1240,98  C1360,103 1400,111 1440,112"
        />
      </g>
    );
  }
}

function DotsOverlay({ count = 42 }) {
  const dots = useMemo(() => {
    const light = [
      "rgba(20,184,166,0.90)",
      "rgba(16,185,129,0.90)",
      "rgba(52,211,153,0.90)",
      "rgba(79,209,197,0.90)",
    ];
    const neon = ["rgba(94,240,214,0.95)", "rgba(45,212,191,0.95)"]; // darker theme pop
    const isDark =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark");
    const palette = isDark ? neon : light;

    return Array.from({ length: count }).map((_, i) => {
      const size = Math.round(Math.random() * 12) + 6;
      const left = Math.random() * 100;
      const startYOffset = 10 + Math.random() * 30;
      const rise = 12 + Math.random() * 12;
      const delay = Math.random() * 10;
      const swayDur = 5 + Math.random() * 6;
      const swayAmplitude = 10 + Math.random() * 16;
      const color = palette[Math.floor(Math.random() * palette.length)];
      const blur = Math.random() < 0.35 ? 4 : 0;
      return {
        id: i,
        size,
        left,
        startYOffset,
        rise,
        delay,
        swayDur,
        swayAmplitude,
        color,
        blur,
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[80]">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            bottom: `-${d.startYOffset}vh`,
            backgroundColor: d.color,
            filter: d.blur ? `blur(${d.blur}px)` : "none",
            boxShadow: `0 0 ${Math.max(
              10,
              d.size * 2.2
            )}px rgba(20,184,166,0.30)`,
            animation: `
              floatRise ${d.rise}s linear ${d.delay}s infinite,
              sway ${d.swayDur}s ease-in-out ${Math.random() * 6}s infinite
            `,
            ["--swayStart"]: `${-d.swayAmplitude}px`,
            ["--swayEnd"]: `${d.swayAmplitude}px`,
          }}
        />
      ))}
    </div>
  );
}
