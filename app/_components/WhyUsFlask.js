// app/_components/WhyUsFlask.js
"use client";

import { useEffect, useMemo, useState } from "react";

export default function WhyUsFlask() {
  const [isLite, setIsLite] = useState(true);

  // Heuristic: prefer lite mode on mobile, low memory, or prefers-reduced-motion
  useEffect(() => {
    const mqMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mqWidth =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches; // md+
    const mem = typeof navigator !== "undefined" ? navigator.deviceMemory : 8; // guess 8 if unknown

    // Full FX only on md+ screens, no reduced motion, and decent memory
    const enableFull = mqWidth && !mqMotion && (mem || 0) >= 4;
    setIsLite(!enableFull);
  }, []);

  const items = useMemo(
    () => [
      {
        title: "100% Natural First",
        desc: "Safe, bio-based actives with traceability.",
        icon: LeafIcon,
        spot: "tl",
      },
      {
        title: "Scientific Rigor",
        desc: "Doctoral-level team, QA and lab-proven methods.",
        icon: MicroscopeIcon,
        spot: "t",
      },
      {
        title: "Regulatory Confidence",
        desc: "DZ/EU requirements handled end-to-end.",
        icon: ComplianceIcon,
        spot: "tr",
      },
      {
        title: "Eco-Responsible",
        desc: "Low-impact processes & responsible sourcing.",
        icon: RecycleIcon,
        spot: "bl",
      },
      {
        title: "Partner Mindset",
        desc: "From idea to scale — your external R&D arm.",
        icon: HandshakeIcon,
        spot: "br",
      },
    ],
    []
  );

  return (
    <section
      id="why"
      className="relative isolate overflow-hidden py-20 sm:py-28
                 bg-[radial-gradient(1200px_520px_at_50%_-10%,rgba(16,185,129,0.10),transparent),linear-gradient(to_bottom,#f7fdfa,#ecf8f4)]
                 dark:bg-[radial-gradient(1200px_520px_at_50%_-10%,rgba(16,185,129,0.22),transparent),linear-gradient(to_bottom,#0b1a1c,#071012)]"
      data-lite={isLite ? "1" : "0"}
    >
      {/* scoped keyframes, with reduced-motion safety */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          [data-lite="0"] .anim-float,
          [data-lite="0"] .anim-tilt,
          [data-lite="0"] .anim-dash {
            animation: none !important;
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -1400;
          }
        }
        @keyframes float6s {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -6px, 0) scale(1.012);
          }
        }
        @keyframes tilt8s {
          0% {
            transform: rotateZ(0deg);
          }
          50% {
            transform: rotateZ(0.22deg);
          }
          100% {
            transform: rotateZ(0deg);
          }
        }
      `}</style>

      {/* ambient rays (pure CSS, zero SVG filter cost) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [contain:paint]"
      >
        <div className="absolute inset-0 opacity-60 dark:opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_10%,black,transparent)]">
          <div
            className={`absolute -top-16 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rotate-[8deg] 
                        bg-[conic-gradient(from_210deg,rgba(16,185,129,0.12),transparent_35%)]
                        ${isLite ? "" : "anim-tilt"}`}
            style={{
              animation: isLite ? "none" : "tilt8s 8s ease-in-out infinite",
            }}
          />
        </div>
        <div className="absolute inset-0 [background:radial-gradient(700px_300px_at_18%_18%,rgba(16,185,129,.10),transparent),radial-gradient(680px_320px_at_82%_62%,rgba(56,189,248,.06),transparent)] dark:[background:radial-gradient(880px_360px_at_18%_18%,rgba(16,185,129,.18),transparent),radial-gradient(820px_360px_at_82%_62%,rgba(45,212,191,.14),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Why IMALEX
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Science, Nature &amp; Accountability
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300/90">
            We fuse green chemistry with rigorous validation to create products
            that are effective, compliant and scalable — without compromising
            sustainability.
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Mobile grid — static, featherlight */}
          <ul className="grid gap-5 sm:grid-cols-2 md:hidden">
            {items.map(({ title, desc, icon: Icon }) => (
              <li
                key={title}
                className="relative rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm p-5 shadow-[0_10px_28px_-10px_rgba(16,185,129,0.20)]
                           dark:border-white/10 dark:bg-white/5 dark:shadow-[0_12px_32px_-10px_rgba(16,185,129,.22)]"
              >
                <Halo />
                <div className="relative flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white leading-snug">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {desc}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop scene */}
          <div className="hidden md:block relative mx-auto max-w-5xl">
            {/* Flask cluster */}
            <div
              className={`relative mx-auto w-[560px] max-w-full will-change-transform [contain:paint] ${
                isLite ? "" : "anim-float"
              }`}
              style={{
                animation: isLite ? "none" : "float6s 6s ease-in-out infinite",
              }}
            >
              <FlaskSVG />

              {/* Effects: expensive ones disabled in lite */}
              {isLite ? (
                <>
                  <MeniscusShineLite />
                </>
              ) : (
                <>
                  {/* NEW liquid stack */}
                  <ConvectionFlow />
                  <LiquidSurface />
                  <FoamRim />
                  <DriftParticles />

                  {/* existing optional shimmer */}
                  <LiquidWaves />
                  <MicroBubbles />
                  <Sparkles />
                  <Caustics />
                  <MeniscusShineLite />
                </>
              )}
            </div>

            {/* Connectors — lightweight gradient strokes; animate only when not lite */}
            <ConnectorsSVG animate={!isLite} />

            {/* Static junction pulses (tiny) */}
            <Junction x="400" y="90" />
            <Junction x="330" y="110" />
            <Junction x="470" y="110" />
            <Junction x="320" y="370" />
            <Junction x="480" y="370" />

            {/* orbiting badges */}
            {items.map((it) => (
              <Badge key={it.title} {...it} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- badge card ---------- */
function Badge({ title, desc, icon: Icon, spot }) {
  const pos =
    {
      tl: "left-[3%] top-[2%]",
      t: "left-1/2 -translate-x-1/2 -top-1",
      tr: "right-[3%] top-[4%]",
      bl: "left-[6%] bottom-[10%]",
      br: "right-[6%] bottom-[8%]",
    }[spot] || "";

  return (
    <div className={`absolute z-10 ${pos} w-[260px] max-w-[42vw]`}>
      <div
        className="relative group rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-4
                   shadow-[0_10px_28px_-10px_rgba(16,185,129,0.20)]
                   dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_14px_34px_-12px_rgba(16,185,129,.24)]
                   transition will-change-transform hover:-translate-y-0.5 [contain:paint]"
      >
        <Halo />
        <div className="relative flex items-start gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200">
            <Icon />
          </span>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white leading-tight">
              {title}
            </div>
            <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Halo() {
  return (
    <div
      aria-hidden
      className="absolute -inset-0.5 rounded-[18px] bg-[radial-gradient(120px_60px_at_20%_20%,rgba(16,185,129,.10),transparent),radial-gradient(120px_60px_at_80%_80%,rgba(20,184,166,.10),transparent)] blur-[6px]"
    />
  );
}

/* ---------- scene bits ---------- */
function Junction({ x, y }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 mx-auto w-[800px] max-w-full"
      viewBox="0 0 800 520"
      aria-hidden="true"
    >
      <circle cx={x} cy={y} r="4.5" fill="rgba(16,185,129,0.95)" />
      <circle
        cx={x}
        cy={y}
        r="4.5"
        className="motion-safe:animate-ping"
        style={{ animationDuration: "2.4s" }}
        fill="rgba(16,185,129,0.35)"
      />
    </svg>
  );
}

function ConnectorsSVG({ animate = true }) {
  const pathProps = {
    stroke: "url(#wire)",
    strokeWidth: 2.25,
    fill: "none",
    strokeLinecap: "round",
    filter: "url(#glow)",
    opacity: 0.95,
    className: animate
      ? "anim-dash motion-safe:[stroke-dasharray:6_10] motion-safe:[stroke-dashoffset:0]"
      : "",
    style: animate ? { animation: "dash 7s linear infinite" } : undefined,
  };
  return (
    <svg
      className="pointer-events-none absolute inset-0 mx-auto w-[840px] max-w-full [contain:paint]"
      viewBox="0 0 840 540"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="rgba(20,184,166,0.85)" offset="0" />
          <stop stopColor="rgba(94,234,212,0.35)" offset="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d="M360 130 C 285 135, 235 120, 155 92" {...pathProps} />
      <path
        d="M420 110 C 420 70, 420 52, 420 20"
        {...pathProps}
        style={animate ? { animation: "dash 6.4s linear infinite" } : undefined}
      />
      <path
        d="M480 130 C 550 135, 600 120, 680 95"
        {...pathProps}
        style={animate ? { animation: "dash 7.6s linear infinite" } : undefined}
      />
      <path
        d="M360 380 C 295 405, 240 432, 150 465"
        {...pathProps}
        style={animate ? { animation: "dash 7.2s linear infinite" } : undefined}
      />
      <path
        d="M480 380 C 545 405, 600 432, 690 468"
        {...pathProps}
        style={animate ? { animation: "dash 6.8s linear infinite" } : undefined}
      />
    </svg>
  );
}

/* ---------- flask & effects ---------- */
function FlaskSVG() {
  const glassD =
    "M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z";
  return (
    <svg
      viewBox="0 0 560 520"
      className="mx-auto w-full"
      role="img"
      aria-labelledby="flaskTitle flaskDesc"
    >
      <title id="flaskTitle">IMALEX botanical flask</title>
      <desc id="flaskDesc">
        Realistic glass, lightweight meniscus and crisp edges.
      </desc>

      <defs>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.94)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.52)" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(16,185,129,1)" />
          <stop offset="1" stopColor="rgba(5,150,105,1)" />
        </linearGradient>
        <linearGradient id="liquidDepth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(94,234,212,0.65)" />
          <stop offset="1" stopColor="rgba(16,185,129,0.85)" />
        </linearGradient>

        <clipPath id="flaskClip">
          <path d={glassD} />
        </clipPath>
        <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(0,0,0,0.6)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* base shadow (no blur filter — super cheap) */}
      <ellipse
        cx="280"
        cy="430"
        rx="168"
        ry="30"
        fill="url(#baseShadow)"
        opacity="0.26"
        className="dark:opacity-38"
      />

      {/* glass body */}
      <path d={glassD} fill="url(#glassGrad)" opacity="0.20" />
      {/* dual chroma edges (no filters) */}
      <path
        d={glassD}
        fill="none"
        stroke="rgba(16,185,129,0.38)"
        strokeWidth="5.5"
        opacity="0.72"
      />
      <path
        d={glassD}
        fill="none"
        stroke="rgba(56,189,248,0.20)"
        strokeWidth="7"
        opacity="0.45"
      />
      {/* fine rim line */}
      <path
        d={glassD}
        fill="none"
        stroke="rgba(255,255,255,0.42)"
        strokeWidth="1.1"
      />

      {/* liquid */}
      <g clipPath="url(#flaskClip)">
        <g transform="translate(0,12)">
          <path
            d="M280 330c-40-28-80-18-100 20 45 4 75-9 100-20z"
            fill="url(#liquidDepth)"
          />
          <path
            d="M280 330c40-28 80-18 100 20-45 4-75-9-100-20z"
            fill="url(#liquidGrad)"
          />
          <path
            d="M280 315c-18-38-55-52-90-38 25 29 55 38 90 38z"
            fill="rgba(94,234,212,0.9)"
          />
          <path
            d="M280 315c18-38 55-52 90-38-25 29-55 38-90 38z"
            fill="rgba(16,185,129,0.98)"
          />
        </g>
        {/* meniscus (kept as path — zero filters) */}
        <path
          d="M170 308 C 220 300, 340 300, 390 308 Q 280 314, 170 308 Z"
          fill="rgba(255,255,255,0.16)"
        />
      </g>

      {/* rim gloss strip */}
      <rect
        x="225"
        y="62"
        width="110"
        height="8"
        rx="4"
        fill="url(#rimGrad)"
        opacity="0.7"
      />
    </svg>
  );
}

/* Lightweight meniscus sheen overlay (no filters) */
function MeniscusShineLite() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [contain:paint]"
      style={{
        background:
          "linear-gradient(105deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.07) 60%, rgba(255,255,255,0.0) 85%)",
        mask: "radial-gradient(60% 70% at 50% 60%, black 55%, transparent 70%)",
        WebkitMask:
          "radial-gradient(60% 70% at 50% 60%, black 55%, transparent 70%)",
      }}
    />
  );
}

/* Animated liquid shimmer — only when not lite (uses 1 filter, small area) */
function LiquidWaves() {
  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full [contain:paint]"
      aria-hidden="true"
    >
      <defs>
        <filter id="ripples" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.02"
            numOctaves="2"
            seed="5"
          >
            <animate
              attributeName="baseFrequency"
              dur="7s"
              values="0.006 0.02;0.008 0.015;0.006 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="turb" scale="8" />
        </filter>
        <clipPath id="liq-clip">
          <path d="M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z" />
        </clipPath>
      </defs>
      <g clipPath="url(#liq-clip)" filter="url(#ripples)" opacity="0.26">
        <rect x="150" y="185" width="260" height="165" fill="white" />
      </g>
    </svg>
  );
}

/* Micro-bubbles — tiny, cheap; only when not lite */
function MicroBubbles() {
  const bubbles = [
    { cx: 240, r: 2.2, d: 2.8, delay: 0 },
    { cx: 260, r: 1.8, d: 3.2, delay: 0.4 },
    { cx: 300, r: 2.2, d: 3.2, delay: 0.8 },
    { cx: 320, r: 1.6, d: 3.0, delay: 1.2 },
    { cx: 280, r: 2.0, d: 3.4, delay: 1.6 },
  ];
  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full [contain:paint]"
      aria-hidden="true"
    >
      <clipPath id="inner-clip">
        <path d="M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z" />
      </clipPath>
      <g clipPath="url(#inner-clip)" opacity="0.9">
        {bubbles.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy="360"
            r={b.r}
            fill="rgba(255,255,255,0.85)"
          >
            <animate
              attributeName="cy"
              values="360; 210"
              dur={`${b.d + i * 0.4}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.9;0.25;0.9"
              dur={`${b.d + i * 0.4}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
}

/* Caustics under flask — gated; single filter, clipped ellipse */
function Caustics() {
  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full [contain:paint]"
      aria-hidden="true"
    >
      <defs>
        <filter id="caustic">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="7"
          >
            <animate
              attributeName="baseFrequency"
              dur="9s"
              values="0.012 0.02;0.016 0.015;0.012 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0.9   0 0 0 0 0.7   0 0 0 0 1"
          />
          <feGaussianBlur stdDeviation="5.5" />
        </filter>
        <clipPath id="ellipse-clip">
          <ellipse cx="280" cy="430" rx="158" ry="24" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#ellipse-clip)"
        opacity="0.26"
        className="dark:opacity-0"
      >
        <rect width="560" height="520" filter="url(#caustic)" />
      </g>
      <g
        clipPath="url(#ellipse-clip)"
        opacity="0.34"
        className="hidden dark:block"
      >
        <rect width="560" height="520" filter="url(#caustic)" />
      </g>
    </svg>
  );
}

/* ===== Liquid: animated surface (morphing meniscus) ===== */
function LiquidSurface() {
  // same flask path as other clips
  const flaskPath =
    "M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z";

  // three keyframes for gentle surface morphing around y≈306–312
  const k1 = "M160 306 C 220 300, 340 300, 400 306 Q 280 312, 160 306 Z";
  const k2 = "M160 308 C 220 302, 340 304, 400 308 Q 280 314, 160 308 Z";
  const k3 = "M160 310 C 220 304, 340 304, 400 310 Q 280 316, 160 310 Z";

  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="ls-clip">
          <path d={flaskPath} />
        </clipPath>
        {/* Soft highlight + depth under the surface */}
        <linearGradient id="ls-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>

      <g clipPath="url(#ls-clip)">
        {/* subtle darker lip beneath the wave for depth */}
        <path d={k1} fill="rgba(0,0,0,0.06)">
          <animate
            attributeName="d"
            dur="5.8s"
            repeatCount="indefinite"
            values={`${k1};${k2};${k3};${k1}`}
          />
        </path>

        {/* thin bright rim (meniscus highlight) */}
        <path
          d={k1}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.2"
        >
          <animate
            attributeName="d"
            dur="5.8s"
            repeatCount="indefinite"
            values={`${k1};${k2};${k3};${k1}`}
          />
        </path>

        {/* soft vertical sheen right below surface */}
        <path d={k1} fill="url(#ls-sheen)">
          <animate
            attributeName="d"
            dur="5.8s"
            repeatCount="indefinite"
            values={`${k1};${k2};${k3};${k1}`}
          />
        </path>
      </g>
    </svg>
  );
}

/* ===== Liquid: convection flow (slow vertical shimmer using only a moving gradient) ===== */
function ConvectionFlow() {
  const flaskPath =
    "M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z";

  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="conv-clip">
          <path d={flaskPath} />
        </clipPath>

        {/* Vertical stripes gradient that slowly moves upward */}
        <linearGradient
          id="conv-stripes"
          x1="0"
          y1="1"
          x2="0"
          y2="0"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="rgba(255,255,255,0.00)" />
          <stop offset="0.25" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.00)" />
          <stop offset="0.75" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
          <animate
            attributeName="gradientTransform"
            type="translate"
            dur="9s"
            values="0 0; 0 -0.35; 0 0"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      <g clipPath="url(#conv-clip)" opacity="0.18">
        {/* keep inside the lower half so it feels like interior motion */}
        <rect
          x="150"
          y="185"
          width="260"
          height="170"
          fill="url(#conv-stripes)"
        />
      </g>
    </svg>
  );
}

/* ===== Liquid: foam rim (tiny beads hugging the meniscus; super cheap) ===== */
function FoamRim() {
  // bead positions along the wave — keep sparse
  const beads = [
    { x: 200, y: 308, s: 1.6, d: 2.6 },
    { x: 230, y: 306.5, s: 1.8, d: 2.9 },
    { x: 260, y: 305.5, s: 1.4, d: 2.4 },
    { x: 300, y: 305.8, s: 1.7, d: 2.7 },
    { x: 340, y: 306.6, s: 1.5, d: 2.5 },
    { x: 370, y: 308.2, s: 1.3, d: 2.3 },
  ];
  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {beads.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.s} fill="rgba(255,255,255,0.85)">
          <animate
            attributeName="cy"
            values={`${b.y}; ${b.y - 1}; ${b.y}`}
            dur={`${b.d + i * 0.2}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;0.7;0.9"
            dur={`${b.d + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* ===== Liquid: slow drift particles (few specks for life; tiny count) ===== */
function DriftParticles() {
  const parts = [
    { x: 220, y: 360, r: 1.2, dy: 18, d: 7.5, delay: 0 },
    { x: 260, y: 350, r: 1.4, dy: 22, d: 8.2, delay: 0.6 },
    { x: 310, y: 355, r: 1.2, dy: 20, d: 7.8, delay: 1.2 },
    { x: 340, y: 365, r: 1.0, dy: 24, d: 8.6, delay: 1.8 },
  ];
  return (
    <svg
      viewBox="0 0 560 520"
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {parts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="rgba(255,255,255,0.75)">
          <animate
            attributeName="cy"
            values={`${p.y}; ${p.y - p.dy}; ${p.y}`}
            dur={`${p.d}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cx"
            values={`${p.x}; ${p.x + 8}; ${p.x}`}
            dur={`${p.d * 0.9}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;0.3;0.7"
            dur={`${p.d * 0.9}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* tiny star glints / ambient sparkle */
function Sparkles({ count = 40 }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-emerald-800/80 dark:bg-emerald-400/80"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: s.top,
            left: s.left,
            animation: `sparkle-fade 3s ease-in-out ${s.delay}s infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkle-fade {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
}

/* ===== Icons (lightweight inline) ===== */
function LeafIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 12c7-8 14-6 14-6s1 9-7 14C6 22 5 16 5 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 12c6 0 7 2 12 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function MicroscopeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 18h12M9 18a4 4 0 0 1 6 0M13 7l3 3M12 3l1 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="4" y="19" width="16" height="2" rx="1" />
    </svg>
  );
}
function ComplianceIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="5"
        y="3"
        width="12"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 7h6M9 11h6M9 15h4M16 21l3-3-1.5-1.5L14.5 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function RecycleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7 7l-3 5h6L7 7zm10 0l-3 5h6l-3-5zM12 12l-3 5h6l-3-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
function HandshakeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8 12l3 3 5-5M2 12l4-4 4 4m8 0l4-4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
