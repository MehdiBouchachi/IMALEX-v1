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
  const [journeyProgress, setJourneyProgress] = useState(0); // 0..1
  const smoothNumRef = useRef(1);
  const [, force] = useState(0);

  // Which chapter is centered
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-step"));
            setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Section progress
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth chapter counter
  useEffect(() => {
    let raf;
    const tick = () => {
      const target = 1 + journeyProgress * Math.max(steps.length - 1, 0);
      const cur = smoothNumRef.current;
      const next = cur + (target - cur) * 0.18;
      smoothNumRef.current = next;
      force((x) => x + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [journeyProgress, steps.length]);

  const smoothDisplay = Math.max(
    1,
    Math.min(steps.length, Math.round(smoothNumRef.current))
  )
    .toString()
    .padStart(2, "0");

  return (
    <section ref={containerRef} className="relative">
      {/* Seamless ambient overlay that FADES at edges (so it never “breaks” neighbors) */}
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

      {/* Intro/handoff from Why Us */}
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
        {/* Sticky rail (works on all sizes) */}
        <aside
          className="relative sticky self-start mb-10 md:mb-0"
          style={{ top: "clamp(56px, 8vh, 112px)" }}
        >
          <Rail
            smoothDisplay={smoothDisplay}
            steps={steps}
            active={active}
            progress={journeyProgress}
          />
        </aside>

        {/* Chapters */}
        <ol className="relative">
          {steps.map(({ title, desc, Icon }, i) => {
            const isActive = i === active;
            return (
              <li
                key={title}
                ref={(el) => (stepRefs.current[i] = el)}
                data-step={i}
                className="relative snap-start"
                style={{ minHeight: "92svh" }}
              >
                {/* Luxe watermark number with calm gradient sweep */}
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
          <li className="relative snap-start" style={{ minHeight: "84svh" }}>
            <Finale />
          </li>
        </ol>
      </div>

      {/* local keyframes */}
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

/* ————— Pieces ————— */

function Rail({ smoothDisplay, steps, active, progress }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        // gradient border glass: classy!
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

      {/* progress bar with subtle gloss */}
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
          // gradient border glass
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: active ? "var(--shadow-card-lg)" : "var(--shadow-card)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* top accent hairline */}
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
          {/* Icon medallion (breath when active) */}
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
              STEP {/* visually small, classy */}
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
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
            style={{
              background: "var(--cta-bg)",
              color: "var(--cta-50)",
              boxShadow: "0 10px 24px -12px var(--effect-glow-a)",
              transition: "background 160ms ease, transform 160ms ease",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "translateY(1px)")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
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
