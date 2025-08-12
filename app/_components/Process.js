"use client";
import {
  FaFlask,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Process() {
  const steps = useMemo(
    () => [
      {
        title: "Discovery",
        desc: "Brief, goals, constraints and regulatory targets.",
        Icon: FaSearch,
      },
      {
        title: "Research",
        desc: "Actives screening, concepting, feasibility.",
        Icon: FaMicroscope,
      },
      {
        title: "Prototype",
        desc: "Bench samples, iteration, stability pre-checks.",
        Icon: FaFlask,
      },
      {
        title: "Validation",
        desc: "Stability, compatibility, claims & dossiers.",
        Icon: FaCheck,
      },
      {
        title: "Scale‑Up",
        desc: "Tech transfer and pilot → production.",
        Icon: FaIndustry,
      },
    ],
    []
  );

  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);

  // Smooth display that follows the ACTIVE step
  const displayRef = useRef(1);
  const [, force] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      const target = active + 1;
      const cur = displayRef.current;
      displayRef.current = cur + (target - cur) * 0.28;
      force((n) => n + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const smoothDisplay = Math.max(
    1,
    Math.min(steps.length, Math.round(displayRef.current))
  )
    .toString()
    .padStart(2, "0");

  // Which chapter is centered (robust with snap + top offset)
  useEffect(() => {
    const topOffset = 96; // must match sticky top below
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-step"));
            setActive(idx);
          }
        }
      },
      {
        threshold: 0.6,
        // compensate sticky top so the visible card counts as "active"
        rootMargin: `-${topOffset}px 0px -${topOffset}px 0px`,
      }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Section progress only for the bar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(r.height - vh, 1);
      const passed = Math.min(Math.max(-r.top, 0), total);
      setJourneyProgress(passed / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative pb-32 md:pb-40">
      {/* ambient overlay */}
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
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <div className="text-center">
          <div
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: "var(--brand-700)" }}
          >
            Process
          </div>
          <h2
            className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight"
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

      {/* Layout */}
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[360px,1fr] gap-10 md:gap-14">
        {/* STICKY RAIL (always sticky; no absolute freeze) */}
        <aside
          className="relative self-start mb-10 md:mb-0"
          style={{ position: "sticky", top: 96, alignSelf: "start" }}
        >
          <Rail
            smoothDisplay={smoothDisplay}
            steps={steps}
            active={active}
            progress={journeyProgress}
          />
        </aside>

        {/* Chapters with SNAP SCROLL */}
        <ol
          className="relative"
          style={{
            scrollSnapType: "y mandatory",
          }}
        >
          {steps.map(({ title, desc, Icon }, i) => {
            const isActive = i === active;
            return (
              <li
                key={title}
                ref={(el) => (stepRefs.current[i] = el)}
                data-step={i}
                className="relative"
                style={{
                  minHeight: "92svh",
                  scrollSnapAlign: "start",
                  scrollMarginTop: 96, // match sticky top
                }}
              >
                {/* watermark number */}
                <div
                  aria-hidden
                  className="absolute -z-10 right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none tracking-tighter"
                  style={{
                    fontSize: "clamp(84px, 18vw, 180px)",
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

          {/* Finale / CTA */}
          <li
            className="relative"
            style={{
              minHeight: "84svh",
              scrollSnapAlign: "start",
              scrollMarginTop: 96,
            }}
          >
            <Finale />
          </li>
        </ol>
      </div>

      <style jsx>{`
        @keyframes gloss {
          0% {
            background-position: -240px 0;
          }
          100% {
            background-position: 240px 0;
          }
        }
        @keyframes breath {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes pop {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

/* ——— Pieces ——— */

function Rail({ smoothDisplay, steps, active, progress }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
        boxShadow: "var(--shadow-card)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Chapter
      </div>
      <div
        className="mt-1 text-5xl font-black tabular-nums tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {smoothDisplay}
      </div>

      {/* progress bar (section progress) */}
      <div className="mt-6 relative">
        <div
          className="h-2 w-full rounded-full"
          style={{ background: "var(--border-subtle)" }}
        />
        <div
          className="h-2 -mt-2 rounded-full relative overflow-hidden"
          style={{
            width: `${Math.max(0.02, progress) * 100}%`,
            background: "var(--g-accent-bar)",
            transition: "width 100ms linear",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.26), transparent)",
              backgroundSize: "240px 100%",
              animation: "gloss 5.6s linear infinite",
              mixBlendMode: "soft-light",
            }}
          />
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="flex items-center gap-3 text-sm"
            style={{
              color: i === active ? "var(--text-primary)" : "var(--text-muted)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                background: i <= active ? "var(--brand-700)" : "var(--border)",
              }}
            />
            <span className="truncate">{s.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArticleCard({ title, desc, Icon, active }) {
  return (
    <article
      className="group relative max-w-2xl"
      style={{
        opacity: active ? 1 : 0.86,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 220ms ease, transform 420ms cubic-bezier(.2,.7,.2,1)",
        animation: "pop 420ms ease both",
      }}
    >
      <div
        className="rounded-2xl p-7 sm:p-8"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: active ? "var(--shadow-card-lg)" : "var(--shadow-card)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* top hairline */}
        <span
          aria-hidden
          className="absolute left-7 right-7 -top-px h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in srgb, var(--brand-400) 24%, transparent), transparent)",
            filter: "blur(0.6px)",
            opacity: 0.75,
          }}
        />

        <div className="flex items-start gap-5">
          <span
            className="relative grid h-12 w-12 flex-none place-items-center rounded-full"
            style={{
              background: "var(--tile-icon-bg)",
              border: `1px solid ${
                active
                  ? "color-mix(in srgb, var(--brand-400) 55%, transparent)"
                  : "var(--tile-icon-border)"
              }`,
              color: "var(--brand-700)",
              animation: active ? "breath 3.6s ease-in-out infinite" : "none",
            }}
          >
            <Icon className="text-base" />
          </span>

          <div className="min-w-0">
            <div
              className="text-[11px] font-semibold tracking-wider mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              STEP
            </div>
            <h3
              className="text-xl sm:text-2xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
            <p
              className="mt-2 text-[15px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {desc}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Finale() {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="rounded-2xl p-8 sm:p-10 text-center max-w-2xl"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: "var(--shadow-card-lg)",
          backdropFilter: "blur(8px)",
          animation: "pop 600ms ease both",
        }}
      >
        <h3
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Journey Complete
        </h3>
        <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
          Ready to turn your hypothesis into a compliant, scalable product?
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#contact"
            className="
                inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold
                transition-transform duration-150 ease-in-out
                active:translate-y-[1px]
                bg-[var(--cta-bg)] text-[var(--cta-50)]
                shadow-[0_10px_24px_-12px_var(--effect-glow-a)]
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand-400)]
                                                        "
          >
            Start a Project
          </a>
          <a
            href="#services"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              background: "var(--btn-ghost-bg)",
              color: "var(--btn-ghost-text)",
              border: "1px solid var(--btn-ghost-border)",
            }}
          >
            View Services
          </a>
        </div>
      </div>
    </div>
  );
}
