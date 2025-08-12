// app/_components/ProcessGSAP_SnapClean.js
"use client";

import {
  FaFlask,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";
import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
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
  const ambientRef = useRef(null);

  const railRef = useRef(null);
  const railNumRef = useRef(null);
  const [active, setActive] = useState(0);

  const stepRefs = useRef([]);
  const cardRefs = useRef([]);
  const watermarkRefs = useRef([]);
  const shimmerRefs = useRef([]);

  const snapPointsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const ambient = ambientRef.current;
      const rail = railRef.current;

      // ------- Section progress & ambient -------
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top+=1",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          const p = self.progress;
          if (ambient) {
            ambient.style.setProperty("--p", p.toFixed(4));
            ambient.style.filter = `hue-rotate(${Math.round(p * 22)}deg)`;
            // fade ambient near the end so it never blends into next section
            const fade = p < 0.92 ? 1 : Math.max(0, 1 - (p - 0.92) / 0.06);
            ambient.style.opacity = String(0.55 * fade);
          }
          const bar = rail?.querySelector("[data-railbar]");
          if (bar) bar.style.width = `${Math.max(0.02, p) * 100}%`;
        },
      });

      // ------- Rail number (smooth 1..N) -------
      const chapters = steps.length;
      const counter = { v: 1 };
      const renderCount = () => {
        if (!railNumRef.current) return;
        const d = Math.max(1, Math.min(chapters, Math.round(counter.v)))
          .toString()
          .padStart(2, "0");
        railNumRef.current.textContent = d;
      };
      gsap.to(counter, {
        v: chapters,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: renderCount,
          onScrubComplete: renderCount,
        },
      });

      // ------- Card enters + active state -------
      stepRefs.current.forEach((wrap, i) => {
        const card = cardRefs.current[i];
        const mark = watermarkRefs.current[i];
        const shim = shimmerRefs.current[i];

        if (card) {
          gsap.fromTo(
            card,
            { y: 28, opacity: 0, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrap,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: wrap,
          start: "center center+=8%",
          end: "center center-=8%",
          onEnter: () => {
            setActive(i);
            if (shim) {
              gsap.fromTo(
                shim,
                { backgroundPosition: "-200% 0", opacity: 0.0 },
                {
                  backgroundPosition: "200% 0",
                  opacity: 0.85,
                  duration: 1.05,
                  ease: "power2.out",
                }
              );
            }
            if (mark) {
              gsap.to(mark, {
                backgroundPosition: "100% 0",
                duration: 1.1,
                ease: "power2.out",
              });
            }
            if (card) {
              gsap.to(card, {
                boxShadow: "var(--shadow-card-lg)",
                duration: 0.32,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            if (mark)
              gsap.to(mark, {
                backgroundPosition: "0% 0",
                duration: 0.6,
                ease: "power2.out",
              });
            if (card)
              gsap.to(card, {
                boxShadow: "var(--shadow-card)",
                duration: 0.28,
                ease: "power2.out",
              });
          },
        });
      });

      // ------- Clean SNAP (no “jump to end”) -------
      const computeSnapPoints = () => {
        const vh = window.innerHeight || 1;
        const secRect = section.getBoundingClientRect();
        const secTop = window.scrollY + secRect.top;
        const secHeight = section.offsetHeight;
        const maxWithin = Math.max(1, secHeight - vh);

        const nodes = section.querySelectorAll("[data-step-wrap]");
        const pts = Array.from(nodes).map((el) => {
          const r = el.getBoundingClientRect();
          const elTop = window.scrollY + r.top;
          const centerWithinSection = elTop - secTop + r.height / 2;
          const target = (centerWithinSection - vh / 2) / maxWithin; // 0..1
          return Math.min(1, Math.max(0, target));
        });

        // must be strictly increasing & within [0,1]
        const cleaned = pts
          .filter((v) => Number.isFinite(v))
          .sort((a, b) => a - b);

        snapPointsRef.current = cleaned.length ? cleaned : [0, 1];
      };

      const applySnap = () => {
        computeSnapPoints();
        // kill previous snap trigger if any
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars && t.vars.id === "processSnap") t.kill();
        });
        ScrollTrigger.create({
          id: "processSnap",
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          snap: {
            snapTo: (value) => gsap.utils.snap(snapPointsRef.current)(value),
            duration: { min: 0.14, max: 0.36 },
            ease: "power2.out",
            delay: 0.02,
          },
        });
      };

      applySnap();
      // Recompute on resize/refresh
      const onResize = () => applySnap();
      window.addEventListener("resize", onResize);
      ScrollTrigger.addEventListener("refresh", onResize);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.removeEventListener("refresh", onResize);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="relative" id="process">
      {/* Ambient (masked, fades near end) */}
      <div
        ref={ambientRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          "--p": 0,
          background:
            "radial-gradient(900px 420px at calc(18% + 10% * var(--p)) 22%, var(--glow-a), transparent), radial-gradient(820px 420px at calc(82% - 8% * var(--p)) 62%, var(--glow-b), transparent)",
          opacity: 0.55,
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          mask: "linear-gradient(to bottom, transparent 0, black 6%, black 94%, transparent 100%)",
          transition: "opacity 200ms linear",
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
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[340px,1fr] gap-10 md:gap-14">
        {/* Sticky rail (smaller number) */}
        <aside
          ref={railRef}
          className="relative sticky self-start mb-10 md:mb-0"
          style={{ top: "clamp(56px, 8vh, 112px)" }}
        >
          <Rail railNumRef={railNumRef} steps={steps} active={active} />
        </aside>

        {/* Chapters */}
        <ol className="relative">
          {steps.map(({ title, desc, Icon }, i) => (
            <li
              key={title}
              data-step-wrap
              ref={(el) => (stepRefs.current[i] = el)}
              className="relative snap-start"
              style={{ minHeight: "92svh", scrollMarginTop: "12vh" }}
            >
              {/* watermark number */}
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
              />
            </li>
          ))}

          {/* Finale / CTA (also a snap point) */}
          <li
            data-step-wrap
            className="relative snap-start"
            style={{ minHeight: "84svh", scrollMarginTop: "12vh" }}
          >
            <Finale />
          </li>
        </ol>
      </div>

      {/* bottom guard so sticky rail & ambient never overlap next section */}
      <div className="h-24" />

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
      `}</style>
    </section>
  );
}

/* --- pieces --- */

function Rail({ railNumRef, steps, active }) {
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

      {/* smaller, elegant number */}
      <div
        ref={railNumRef}
        className="mt-1 font-black tabular-nums tracking-tight leading-none"
        style={{
          color: "var(--text-primary)",
          fontSize: "clamp(40px, 5.6vw, 84px)",
          letterSpacing: "-0.02em",
        }}
      >
        01
      </div>

      {/* progress */}
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

function ArticleCard({ title, desc, Icon, active, cardRef, shimmerRef }) {
  return (
    <article
      ref={cardRef}
      className="group relative max-w-2xl"
      style={{
        opacity: active ? 1 : 0.86,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity 220ms ease, transform 420ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        className="rounded-2xl p-7 sm:p-8 relative"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: active ? "var(--shadow-card-lg)" : "var(--shadow-card)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* shimmer overlay */}
        <span
          ref={shimmerRef}
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
        }}
      >
        <h3
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to formulate the future?
        </h3>
        <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
          Tell us about your project and we’ll propose the best path forward.
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
