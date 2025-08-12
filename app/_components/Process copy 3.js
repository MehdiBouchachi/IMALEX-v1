// app/_components/ProcessGSAPTranscendent.js
"use client";

import {
  FaFlask,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  // ambience layers
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const vignetteRef = useRef(null);

  // rail & mobile pill
  const railRef = useRef(null);
  const railNumRef = useRef(null);
  const railTitleRef = useRef(null);
  const pillRef = useRef(null);
  const [active, setActive] = useState(0);

  // per-step refs
  const stepRefs = useRef([]);
  const cardRefs = useRef([]);
  const watermarkRefs = useRef([]);
  const shimmerRefs = useRef([]);
  const ringRefs = useRef([]); // rotating conic ring behind icon

  // accessibility: respect reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (prefersReduced) return; // keep your previous non-GSAP smoothness

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const layerA = layerARef.current;
      const layerB = layerBRef.current;
      const vignette = vignetteRef.current;
      const rail = railRef.current;
      const pill = pillRef.current;

      // MASTER progress for the whole section
      const master = ScrollTrigger.create({
        trigger: section,
        start: "top top+=1",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress; // 0..1
          // parallax positions
          if (layerA) {
            layerA.style.setProperty("--p", p.toFixed(4));
            layerA.style.filter = `hue-rotate(${Math.round(p * 28)}deg)`;
          }
          if (layerB) {
            layerB.style.setProperty("--p", p.toFixed(4));
            layerB.style.filter = `hue-rotate(${Math.round(p * 18)}deg)`;
          }
          if (vignette) {
            vignette.style.opacity = String(0.25 + p * 0.12);
          }
          // bars
          const railBar = rail?.querySelector("[data-railbar]");
          if (railBar) railBar.style.width = `${Math.max(0.02, p) * 100}%`;
          const pillBar = pill?.querySelector("[data-pillbar]");
          if (pillBar) pillBar.style.width = `${Math.max(0.02, p) * 100}%`;
        },
      });

      // Smooth BIG number + crossfading chapter title in the rail
      const chapters = steps.length;
      const counter = { v: 1 };
      const titleWrap = railTitleRef.current;
      const titleSlots = steps.map((s, i) => {
        const el = titleWrap?.querySelector(`[data-title="${i}"]`);
        return el || null;
      });

      const renderCountAndTitle = () => {
        // number
        if (railNumRef.current) {
          const display = Math.max(1, Math.min(chapters, Math.round(counter.v)))
            .toString()
            .padStart(2, "0");
          railNumRef.current.textContent = display;
        }
        // title crossfade (closest index)
        const idx = Math.max(
          0,
          Math.min(chapters - 1, Math.round(counter.v) - 1)
        );
        titleSlots.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = String(i === idx ? 1 : 0);
          el.style.transform = i === idx ? "translateY(0)" : "translateY(6px)";
        });
      };

      gsap.to(counter, {
        v: chapters,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          onUpdate: renderCountAndTitle,
          onScrubComplete: renderCountAndTitle,
        },
      });

      // Each step: enter, activate, parallax tilt, shimmer, watermark sweep, rotating conic ring
      stepRefs.current.forEach((wrap, i) => {
        const card = cardRefs.current[i];
        const mark = watermarkRefs.current[i];
        const shim = shimmerRefs.current[i];
        const ring = ringRefs.current[i];

        // 1) enter
        if (card) {
          gsap.fromTo(
            card,
            { y: 36, opacity: 0, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrap,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 2) 3D tilt/parallax while scrolling through the card
        if (card) {
          const tilt = gsap.timeline({
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom-=10%",
              end: "bottom top+=10%",
              scrub: 0.5,
            },
          });
          tilt
            .to(
              card,
              {
                rotateX: -2,
                rotateY: 1,
                transformPerspective: 900,
                transformOrigin: "50% 50%",
                ease: "none",
              },
              0
            )
            .to(card, { rotateX: 2, rotateY: -1, ease: "none" }, 0.5)
            .to(card, { rotateX: 0, rotateY: 0, ease: "none" }, 1);
        }

        // 3) activate spotlight
        ScrollTrigger.create({
          trigger: wrap,
          start: "center center+=8%",
          end: "center center-=8%",
          onEnter: () => {
            setActive(i);
            // shimmer
            if (shim) {
              gsap.fromTo(
                shim,
                { backgroundPosition: "-200% 0", opacity: 0.0 },
                {
                  backgroundPosition: "200% 0",
                  opacity: 0.85,
                  duration: 1.15,
                  ease: "power2.out",
                }
              );
            }
            // watermark sweep
            if (mark) {
              gsap.to(mark, {
                backgroundPosition: "100% 0",
                duration: 1.2,
                ease: "power2.out",
              });
            }
            // box shadow lift
            if (card) {
              gsap.to(card, {
                boxShadow: "var(--shadow-card-lg)",
                duration: 0.35,
                ease: "power2.out",
              });
            }
            // rotate conic ring gently
            if (ring) {
              gsap.to(ring, {
                "--rot": "+=180",
                duration: 4,
                ease: "power1.inOut",
              });
            }
          },
          onLeaveBack: () => {
            if (mark) {
              gsap.to(mark, {
                backgroundPosition: "0% 0",
                duration: 0.7,
                ease: "power2.out",
              });
            }
            if (card) {
              gsap.to(card, {
                boxShadow: "var(--shadow-card)",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          },
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length, prefersReduced]);

  return (
    <section ref={sectionRef} className="relative">
      {/* Ambient: two parallax layers + soft vignette (masked so no hard seams) */}
      <div
        ref={layerARef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          "--p": 0,
          background:
            "radial-gradient(900px 420px at calc(16% + 8% * var(--p)) 18%, var(--glow-a), transparent)",
          opacity: 0.55,
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          mask: "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      />
      <div
        ref={layerBRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          "--p": 0,
          background:
            "radial-gradient(840px 420px at calc(84% - 8% * var(--p)) 64%, var(--glow-b), transparent)",
          opacity: 0.5,
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          mask: "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      />
      <div
        ref={vignetteRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 50%, transparent 60%, rgba(0,0,0,0.06))",
          opacity: 0.28,
        }}
      />

      {/* Intro / handoff */}
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

      {/* Mobile floating pill */}
      <div ref={pillRef} className="sticky top-2 z-30 mx-auto w-fit md:hidden">
        <div
          className="rounded-full px-4 py-2 text-xs font-semibold"
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--tile-border)",
            boxShadow: "var(--shadow-card)",
            color: "var(--text-secondary)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            ref={railNumRef /* reuse same render node on small screens */}
            style={{ color: "var(--text-primary)" }}
          >
            01
          </span>{" "}
          / {steps.length.toString().padStart(2, "0")}
          <div
            className="mt-1 h-1 w-full rounded-full"
            style={{ background: "var(--border-subtle)" }}
          />
          <div
            data-pillbar
            className="-mt-1 h-1 rounded-full"
            style={{ background: "var(--g-accent-bar)", width: "2%" }}
          />
        </div>
      </div>

      {/* Grid layout */}
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[360px,1fr] gap-10 md:gap-14">
        {/* Sticky rail */}
        <aside
          ref={railRef}
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

            {/* XXL smooth number */}
            <div
              ref={railNumRef}
              className="mt-1 font-black tabular-nums tracking-tight leading-none"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(56px, 7.5vw, 112px)",
                letterSpacing: "-0.02em",
              }}
            >
              01
            </div>

            {/* Crossfading chapter title */}
            <div
              ref={railTitleRef}
              className="relative h-7 mt-3 overflow-hidden"
              style={{ color: "var(--text-secondary)" }}
            >
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  data-title={i}
                  className="absolute inset-0 flex items-center justify-start"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 240ms ease, transform 240ms ease",
                    willChange: "opacity, transform",
                  }}
                >
                  {s.title}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6 relative">
              <div
                className="h-2 w-full rounded-full"
                style={{ background: "var(--border-subtle)" }}
              />
              <div
                data-railbar
                className="h-2 -mt-2 rounded-full relative overflow-hidden"
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
              {/* tiny ticks */}
              <div className="absolute inset-x-0 -bottom-2 flex justify-between">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: 2,
                      height: 6,
                      background:
                        i <= active ? "var(--brand-700)" : "var(--border)",
                      display: "inline-block",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Legend */}
            <ul className="mt-7 space-y-2">
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
        </aside>

        {/* Chapters */}
        <ol className="relative">
          {steps.map(({ title, desc, Icon }, i) => (
            <li
              key={title}
              ref={(el) => (stepRefs.current[i] = el)}
              className="relative snap-start"
              style={{ minHeight: "92svh" }}
            >
              {/* watermark number behind the card */}
              <div
                ref={(el) => (watermarkRefs.current[i] = el)}
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
                  backgroundPosition: "0% 0",
                  filter: "saturate(0.9)",
                }}
              >
                {(i + 1).toString().padStart(2, "0")}
              </div>

              <ArticleCard
                title={title}
                desc={desc}
                Icon={Icon}
                active={i === active}
                cardRef={(el) => (cardRefs.current[i] = el)}
                shimmerRef={(el) => (shimmerRefs.current[i] = el)}
                ringRef={(el) => (ringRefs.current[i] = el)}
              />
            </li>
          ))}

          {/* Finale */}
          <li className="relative snap-start" style={{ minHeight: "84svh" }}>
            <Finale />
          </li>
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
        @keyframes breath {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-anim="ring"],
          [data-shimmer] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ————— Pieces ————— */

function ArticleCard({
  title,
  desc,
  Icon,
  active,
  cardRef,
  shimmerRef,
  ringRef,
}) {
  return (
    <article
      ref={cardRef}
      className="group relative max-w-2xl will-change-transform"
      style={{
        opacity: active ? 1 : 0.88,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 220ms ease, transform 420ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        className="rounded-2xl p-7 sm:p-8 relative"
        style={{
          // gradient-border glass
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: active ? "var(--shadow-card-lg)" : "var(--shadow-card)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* shimmer overlay (GSAP drives) */}
        <span
          ref={shimmerRef}
          data-shimmer
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
            backgroundSize: "200% 100%",
            mixBlendMode: "soft-light",
            borderRadius: "inherit",
            mask: "linear-gradient(#000,#000) padding-box, linear-gradient(#000,#000) border-box",
            WebkitMask:
              "linear-gradient(#000,#000) padding-box, linear-gradient(#000,#000) border-box",
            opacity: 0,
          }}
        />
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
          {/* Icon medallion + conic rotating ring (subtle) */}
          <span className="relative grid h-12 w-12 flex-none place-items-center">
            <span
              ref={ringRef}
              data-anim="ring"
              className="absolute inset-[-6px] rounded-full"
              style={{
                "--rot": 0,
                background:
                  "conic-gradient(from calc(var(--rot)*1deg), color-mix(in srgb, var(--brand-400) 35%, transparent), transparent 30%, transparent 70%, color-mix(in srgb, var(--brand-700) 28%, transparent))",
                filter: "blur(0.4px)",
                WebkitMask:
                  "radial-gradient(circle at center, transparent 64%, black 66%, black 84%, transparent 86%)",
                mask: "radial-gradient(circle at center, transparent 64%, black 66%, black 84%, transparent 86%)",
              }}
            />
            <span
              className="grid h-12 w-12 place-items-center rounded-full"
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
          </span>

          <div className="min-w-0">
            <div
              className="text-[11px] font-semibold tracking-wider mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              STEP {title ? "" : ""}
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
