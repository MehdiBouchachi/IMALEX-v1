import React from "react";
import Button from "../_components/ui/Button";
import HeroBackground from "../_components/hero/HeroBackground";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      <HeroBackground />

      {/* content */}
      <div className="relative z-[60] mx-auto max-w-5xl px-6">
        <div className="min-h-[100svh] grid place-items-center text-center pt-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] drop-shadow-sm">
              Science & Nature in Perfect Balance
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              Bespoke scientific formulation services — from research &
              prototypes to regulatory dossiers and scale-up for cosmetics, food
              supplements, biofertilizers, animal nutrition, and agri-food.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="xlg" asLink href="#contact">
                Request a Quote
              </Button>
              <Button variant="secondary" size="xlg" asLink href="#services">
                Discover Our Services
              </Button>
            </div>

            <p className="mt-12 text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              Trusted by innovators in clean beauty, nutrition & sustainable
              agriculture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
