"use client";
import { useMemo } from "react";

function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden">
      {/* Background layers from tokens */}
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
      <Wave tone="moss" className="top-[12%] h-[110px] opacity-35 z-[5]" />
      <Wave tone="mint" className="top-[28%] h-[130px] opacity-30 z-[5]" />
      <Wave tone="sage" className="top-[44%] h-[120px] opacity-25 z-[5]" />
      <DotsOverlay count={42} />

      {/* Content */}
      <div className="relative z-[60] mx-auto max-w-5xl px-6">
        <div className="min-h-[100svh] grid place-items-center text-center pt-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] drop-shadow-sm">
              Science & Nature in Perfect Balance
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              Bespoke scientific formulation services — from research &
              prototypes to regulatory dossiers and scale-up for cosmetics,
              nutraceuticals, biofertilizers, animal nutrition, and agri-food.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="rounded-lg px-7 py-4 font-semibold text-white transition shadow-md"
                style={{
                  background: "var(--cta-700)",
                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.12), 0 8px 18px var(--ring-pulse)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--cta-800)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--cta-700)")
                }
              >
                Request a Quote
              </a>
              <a
                href="#services"
                className="rounded-lg px-7 py-4 font-semibold backdrop-blur-sm transition"
                style={{
                  background: "var(--btn-ghost-bg)",
                  color: "var(--btn-ghost-text)",
                  border: "1px solid var(--btn-ghost-border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "var(--btn-ghost-hover-bg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--btn-ghost-bg)")
                }
              >
                Discover Our Services
              </a>
            </div>

            <div
              className="mt-12 text-xs uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              Trusted by innovators in clean beauty, nutrition & sustainable
              agriculture
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[10]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--hero-bot))",
        }}
      />
    </section>
  );
}

/* ===================== WAVES & DOTS ===================== */

// Map wave tones to brand tokens
function Wave({ className = "", tone = "moss" }) {
  // Read CSS vars once so waves follow brand automatically
  const stops = useMemo(() => {
    const css =
      typeof window !== "undefined"
        ? getComputedStyle(document.documentElement)
        : null;
    const pick = (v, fallback) =>
      css ? css.getPropertyValue(v).trim() || fallback : fallback;

    const fromTo = {
      moss: {
        from: pick("--brand-300", "#9ED7BD"),
        to: pick("--brand-700", "#3C8B63"),
      },
      mint: {
        from: pick("--brand-200", "#CDEFE0"),
        to: pick("--brand-500", "#57A87A"),
      },
      sage: {
        from: pick("--brand-400", "#7FCFA7"),
        to: pick("--brand-600", "#4FA37D"),
      },
    };

    return fromTo[tone] || fromTo.moss;
  }, [tone]);

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
            <stop offset="0" stopColor={stops.from} />
            <stop offset="1" stopColor={stops.to} />
          </linearGradient>
        </defs>
        <g
          stroke={`url(#strokeGrad-${tone})`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
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
    const css =
      typeof window !== "undefined"
        ? getComputedStyle(document.documentElement)
        : null;

    // helper to turn hex -> rgba with alpha
    const hexToRgba = (hex, a = 1) => {
      const h = hex.replace("#", "");
      const b =
        h.length === 3
          ? h
              .split("")
              .map((x) => x + x)
              .join("")
          : h;
      const r = parseInt(b.slice(0, 2), 16);
      const g = parseInt(b.slice(2, 4), 16);
      const bl = parseInt(b.slice(4, 6), 16);
      return `rgba(${r},${g},${bl},${a})`;
    };

    const b700 = css?.getPropertyValue("--brand-700").trim() || "#3C8B63";
    const b500 = css?.getPropertyValue("--brand-500").trim() || "#57A87A";
    const b300 = css?.getPropertyValue("--brand-300").trim() || "#9ED7BD";
    const b200 = css?.getPropertyValue("--brand-200").trim() || "#CDEFE0";

    const light = [
      hexToRgba(b700, 0.85),
      hexToRgba(b500, 0.85),
      hexToRgba(b300, 0.85),
      hexToRgba(b200, 0.85),
    ];

    const neon = [hexToRgba(b300, 0.95), hexToRgba(b500, 0.95)];

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
            boxShadow: `0 0 ${Math.max(10, d.size * 2.2)}px var(--effect-dot)`,
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

export default Hero;
