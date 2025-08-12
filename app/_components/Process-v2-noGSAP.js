// app/_components/Process.js
"use client";

import {
  FaFlask,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";
import React, { useEffect, useMemo, useRef, useState } from "react";

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

  const sectionRef = useRef(null);
  const railNumRef = useRef(null);
  const railTitleWrapRef = useRef(null);
  const railBarRef = useRef(null);
  const itemsRef = useRef([]);
  const [active, setActive] = useState(0);

  // Active chapter (viewport-based)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const idx = Number(best.target.dataset.idx || 0);
        if (idx !== active) setActive(idx);
      },
      { root: null, threshold: [0.35, 0.6, 0.75] }
    );
    itemsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [active]);

  // Rail progress + number/title (page scroll, rAF-throttled)
  useEffect(() => {
    const el = sectionRef.current;
    const titles = Array.from(
      railTitleWrapRef.current?.querySelectorAll("[data-title]") || []
    );
    if (!el) return;

    let rafId = 0;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const total = Math.max(1, rect.height - vh);
        const progressed = clamp01(-rect.top / total); // 0..1 while section is in view

        // progress bar
        if (railBarRef.current) {
          railBarRef.current.style.width = `${
            Math.max(0.02, progressed) * 100
          }%`;
        }

        // chapter mapping
        const v = progressed * (steps.length - 1);
        const idx = Math.round(v);

        if (railNumRef.current) {
          railNumRef.current.textContent = String(idx + 1).padStart(2, "0");
        }
        titles.forEach((el, i) => {
          el.style.opacity = i === idx ? "1" : "0";
          el.style.transform = i === idx ? "translateY(0)" : "translateY(6px)";
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      aria-label="Process"
      className="relative"
      style={{ paddingBottom: "max(16vh, 96px)" }} // extra bottom room so nothing kisses the edge
    >
      {/* Ambient (CSS-only, subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 420px at 16% 18%, var(--glow-a), transparent)",
          opacity: 0.42,
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          mask: "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          animation: "ambientA 14s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(840px 420px at 84% 64%, var(--glow-b), transparent)",
          opacity: 0.38,
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          mask: "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          animation: "ambientB 16s ease-in-out infinite alternate",
        }}
      />

      {/* Intro */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-6">
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
            Scroll the page — the chapter rail follows you.
          </p>
        </div>
      </div>

      {/* Grid (PAGE SCROLL — no inner scroller, no snap) */}
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[360px,1fr] gap-10 md:gap-14">
        {/* Sticky rail that “follows” while you scroll */}
        <aside
          className="relative sticky self-start hidden md:block"
          style={{ top: "clamp(56px, 8vh, 112px)" }}
        >
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
              ref={railNumRef}
              className="mt-1 font-black tabular-nums tracking-tight leading-none"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(48px, 7vw, 96px)",
                letterSpacing: "-0.02em",
              }}
            >
              01
            </div>

            <div
              ref={railTitleWrapRef}
              className="relative h-7 mt-2 overflow-hidden"
              style={{ color: "var(--text-secondary)" }}
            >
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  data-title
                  className="absolute inset-0 flex items-center"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 220ms ease, transform 220ms ease",
                    willChange: "opacity, transform",
                  }}
                >
                  {s.title}
                </div>
              ))}
            </div>

            <div className="mt-5 relative">
              <div
                className="h-1.5 w-full rounded-full"
                style={{ background: "var(--border-subtle)" }}
              />
              <div
                ref={railBarRef}
                className="h-1.5 -mt-1.5 rounded-full relative overflow-hidden"
                style={{ width: "2%", background: "var(--g-accent-bar)" }}
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

              <ul className="mt-5 space-y-2">
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className="flex items-center gap-3 text-sm"
                    style={{
                      color:
                        i === active
                          ? "var(--text-primary)"
                          : "var(--text-muted)",
                    }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        background:
                          i <= active ? "var(--brand-700)" : "var(--border)",
                      }}
                    />
                    <span className="truncate">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Chapters scroll past (no snap) */}
        <ol className="relative">
          {steps.map(({ title, desc, Icon }, i) => (
            <li
              key={title}
              data-idx={i}
              ref={(el) => (itemsRef.current[i] = el)}
              className="relative"
              style={{ minHeight: "78vh", marginBottom: "8vh" }}
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
                  filter: "saturate(0.9)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <ArticleCard
                title={title}
                desc={desc}
                Icon={Icon}
                active={i === active}
              />
            </li>
          ))}

          {/* Finale */}
          <li className="relative" style={{ minHeight: "64vh" }}>
            <Finale />
          </li>

          {/* Spacer so last card never kisses the section bottom or next section */}
          <li aria-hidden className="h-[14vh]" />
        </ol>
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes gloss {
          0% {
            background-position: -240px 0;
          }
          100% {
            background-position: 240px 0;
          }
        }
        @keyframes ambientA {
          0% {
            filter: hue-rotate(0deg) saturate(1);
          }
          100% {
            filter: hue-rotate(18deg) saturate(1.05);
          }
        }
        @keyframes ambientB {
          0% {
            filter: hue-rotate(0deg) saturate(1);
          }
          100% {
            filter: hue-rotate(12deg) saturate(1.05);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation: ambient"],
          [style*="animation: gloss"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ——— Pieces ——— */

function ArticleCard({ title, desc, Icon, active }) {
  return (
    <article
      className="group relative max-w-xl"
      style={{
        opacity: active ? 1 : 0.92,
        transform: active ? "translateY(0)" : "translateY(6px)",
        transition:
          "opacity 180ms ease, transform 260ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        className="rounded-xl p-5 sm:p-6 relative"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: active ? "var(--shadow-card-lg)" : "var(--shadow-card)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="flex items-start gap-4">
          <span
            className="grid h-10 w-10 flex-none place-items-center rounded-full"
            style={{
              background: "var(--tile-icon-bg)",
              border: `1px solid ${
                active
                  ? "color-mix(in srgb, var(--brand-400) 55%, transparent)"
                  : "var(--tile-icon-border)"
              }`,
              color: "var(--brand-700)",
            }}
          >
            <Icon className="text-sm" />
          </span>

          <div className="min-w-0">
            <div
              className="text-[11px] font-semibold tracking-wider mb-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              STEP
            </div>
            <h3
              className="text-lg sm:text-xl font-semibold"
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
        className="rounded-xl p-6 sm:p-7 text-center max-w-xl"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: "var(--shadow-card-lg)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h3
          className="text-xl sm:text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Journey Complete
        </h3>
        <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
          Ready to turn your hypothesis into a compliant, scalable product?
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
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
            Request a Quote
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
