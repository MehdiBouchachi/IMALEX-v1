// app/_sections/ServicesSection.js
"use client";

import { useState } from "react";
import { SERVICES, SERVICES_DATA } from "../../../app/_config/sections.config";
import ServiceTile from "../components/services/ServiceTile";
import Outcome from "../components/services/Outcome";
import SectionHeader from "../../ui/SectionHeader";
import ModeSwitch from "../../ui/ModeSwitch";

// same rows you already use

const tabs = [
  { id: "services", label: "Services" },
  { id: "outcome", label: "Outcome" },
];

export default function ServicesSection() {
  const [mode, setMode] = useState("services");

  return (
    <section id="services" className="relative isolate py-16 sm:py-20">
      {/* ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(980px 420px at 20% 18%, var(--cta-section-gradient), transparent),
            radial-gradient(920px 420px at 78% 64%, var(--brand-700-a14), transparent)
          `,
          mask: "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 7%, black 93%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-6">
        {/* Header + top-right toggle */}
        <div className="relative mb-8">
          <SectionHeader
            center={false}
            eyebrow={SERVICES.eyebrow}
            title={SERVICES.title}
            blurb={SERVICES.blurb}
          />
          <ModeSwitch
            tabs={tabs}
            value={mode}
            onChange={setMode}
            className="mt-4 sm:absolute sm:right-0 sm:top-0 sm:mt-0"
          />
        </div>

        {/* Body */}
        {mode === "services" ? <CardsOnly /> : <Outcome />}
      </div>
    </section>
  );
}

/* ----------------------------- Header copy ----------------------------- */

function CardsOnly() {
  return (
    <div className="grid gap-6 items-stretch [grid-auto-rows:1fr] sm:grid-cols-2 xl:grid-cols-3">
      {SERVICES_DATA.map((s, i) => (
        <ServiceTile key={s.slug} {...s} index={i} />
      ))}
    </div>
  );
}

/* ------------------------ Segmented toggle (UX) ------------------------ */
