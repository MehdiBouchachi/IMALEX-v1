"use client";
import ArticleCard from "../components/process/ArticleCard";
import Rail from "../components/process/Rail";
import Finale from "../components/process/Finale";
import { useProcessController } from "../components/process/useProcessController";
import { DEFAULT_STEPS } from "../components/process/steps";

export default function ProcessSection({ steps = DEFAULT_STEPS }) {
  const {
    containerRef,
    stepRefs,
    active,
    journeyProgress,
    smoothDisplay,
    stickyTop, // px value already accounting for your header height
  } = useProcessController({ stepsLength: steps.length, stickyTop: 96 });

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative pb-24 sm:pb-32 md:pb-40"
    >
      {/* Ambient gradient that does NOT create overflow or break sticky */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          "--p": journeyProgress,
          background:
            "radial-gradient(900px 420px at calc(18% + 10% * var(--p)) 22%, var(--glow-a), transparent), radial-gradient(820px 420px at calc(82% - 8% * var(--p)) 62%, var(--glow-b), transparent)",
          opacity: 0.55,
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          mask: "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      />

      {/* Intro */}
      <div className="mx-auto max-w-6xl px-4 xs:px-5 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-10">
        <div className="text-center">
          <div
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: "var(--brand-700)" }}
          >
            Our method
          </div>
          <h2
            className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            A Guided Journey — Quiet, Precise, Inevitable.
          </h2>
          <p
            className="mt-3 max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Scroll to move through each chapter — from hypothesis to scale.
          </p>
        </div>
      </div>

      {/* Layout: note transform-none so sticky works; min-w-0 so nothing widens the page */}
      <div className="mx-auto max-w-6xl w-full min-w-0 px-4 xs:px-5 sm:px-6 grid gap-6 sm:gap-10 md:gap-14 md:grid-cols-[minmax(260px,320px),1fr] transform-none">
        {/* Sticky rail — sticky on ALL sizes */}
        <aside
          className="sticky self-start z-[1] mb-6 sm:mb-8 md:mb-0"
          style={{ top: stickyTop }}
        >
          <Rail
            smoothDisplay={smoothDisplay}
            steps={steps}
            active={active}
            progress={journeyProgress}
          />
        </aside>

        {/* Chapters column with scroll snap */}
        <ol
          className="relative min-w-0"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {steps.map(({ title, desc, Icon }, i) => {
            const isActive = i === active;
            return (
              <li
                key={title}
                ref={(el) => (stepRefs.current[i] = el)}
                data-step={i}
                className="relative min-h-[78svh] sm:min-h-[84svh] md:min-h-[92svh]"
                style={{ scrollSnapAlign: "start", scrollMarginTop: stickyTop }}
              >
                {/* Big chapter watermark number */}
                <div
                  aria-hidden
                  className="absolute -z-10 right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none tracking-tighter"
                  style={{
                    fontSize: "clamp(64px, 24vw, 180px)",
                    background: "var(--g-accent-bar)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    opacity: 0.18,
                    backgroundSize: "200% 100%",
                    backgroundPosition: isActive ? "100% 0" : "0 0",
                    transition: "background-position 1200ms ease",
                    filter: "saturate(0.9)",
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </div>

                <ArticleCard
                  title={title}
                  desc={desc}
                  Icon={Icon}
                  active={isActive}
                />
              </li>
            );
          })}

          {/* Finale */}
          <li
            className="relative  z-20 min-h-[70svh] sm:min-h-[78svh] md:min-h-[84svh]"
            style={{ scrollSnapAlign: "start", scrollMarginTop: stickyTop }}
          >
            <Finale />
          </li>
        </ol>
      </div>
    </section>
  );
}
