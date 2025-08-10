// app/_components/Hero.js
import Link from "next/link";
import { useMemo } from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden text-center"
    >
      {/* Base gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% -10%, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 60%), linear-gradient(180deg, #F7FFFB 0%, #E9FFF6 30%, #DDF8EB 55%, #D1FAE5 100%)",
        }}
      />
      {/* Soft vignette + ultra-light texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_300px_at_center_108%,rgba(15,118,110,0.07),transparent)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22 opacity=%220.7%22/></svg>')",
        }}
      />

      {/* Static, seamless waves (kept below dots) */}
      <StaticWave
        tone="teal"
        className="top-[10%] h-[115px] opacity-35 z-[5]"
      />
      <StaticWave
        tone="emerald"
        className="top-[26%] h-[135px] opacity-30 z-[5]"
      />
      <StaticWave
        tone="mint"
        className="top-[42%] h-[125px] opacity-25 z-[5]"
      />

      {/* Floating dots overlay – above everything visual */}
      <DotsOverlay count={50} />

      {/* Content */}
      <div className="relative z-[60] mx-auto w-full max-w-5xl px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Science & Nature in Perfect Balance
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-700">
          Bespoke scientific formulation services — from research & prototypes
          to regulatory dossiers and scale-up for cosmetics, nutraceuticals,
          biofertilizers, animal nutrition, and agri-food.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#contact"
            className="rounded-lg bg-teal-500 px-7 py-4 text-white font-semibold shadow-sm hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/50 transition"
          >
            Request a Quote
          </Link>
          <Link
            href="/#services"
            className="rounded-lg border border-emerald-700/20 bg-white/70 px-7 py-4 text-emerald-800 font-semibold hover:bg-white/90 backdrop-blur-sm transition"
          >
            Discover Our Services
          </Link>
        </div>

        <div className="mt-12 text-xs uppercase tracking-wider text-slate-500">
          Trusted by innovators in clean beauty, nutrition & sustainable
          agriculture
        </div>
      </div>

      {/* Bottom fade kept UNDER dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/85 z-[10]" />
    </section>
  );
}

/* ======== Static Seamless Waves ======== */
function StaticWave({ className = "", tone = "teal" }) {
  const grad = {
    teal: { from: "#4fd1c5", to: "#16a394" },
    emerald: { from: "#6ee7b7", to: "#059669" },
    mint: { from: "#a7f3d0", to: "#34d399" },
  }[tone] || { from: "#6ee7b7", to: "#059669" };

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
            <stop offset="0" stopColor={grad.from} />
            <stop offset="1" stopColor={grad.to} />
          </linearGradient>
        </defs>

        <g
          stroke={`url(#strokeGrad-${tone})`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {waveSet(0)}
          {waveSet(1439.5)} {/* slight overlap kills any seam */}
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

/* ======== Floating Dots Overlay (fixed clipping & layering) ======== */
function DotsOverlay({ count = 50 }) {
  // Precompute dots so SSR==CSR
  const dots = useMemo(() => {
    const palette = [
      "rgba(20,184,166,0.90)", // teal-500
      "rgba(16,185,129,0.90)", // emerald-500
      "rgba(52,211,153,0.90)", // emerald-400
      "rgba(79,209,197,0.90)", // teal-300
    ];
    const arr = [];
    for (let i = 0; i < count; i++) {
      const size = Math.round(Math.random() * 12) + 6; // 6–18px
      const left = Math.random() * 100; // %
      const startYOffset = 10 + Math.random() * 30; // 10–40vh (enters sooner, not half-cut)
      const rise = 12 + Math.random() * 12; // 12–24s
      const delay = Math.random() * 10; // 0–10s
      const swayDur = 5 + Math.random() * 6; // 5–11s
      const swayAmplitude = 10 + Math.random() * 16; // 10–26px
      const color = palette[Math.floor(Math.random() * palette.length)];
      arr.push({
        id: i,
        size,
        left,
        startYOffset,
        rise,
        delay,
        swayDur,
        swayAmplitude,
        color,
        blur: Math.random() < 0.35 ? 4 : 0, // some out-of-focus
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[80]">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full dot-float"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            bottom: `-${d.startYOffset}vh`,
            backgroundColor: d.color,
            filter: d.blur ? `blur(${d.blur}px)` : "none",
            boxShadow: `0 0 ${Math.max(
              10,
              d.size * 2.2
            )}px rgba(20,184,166,0.30)`,
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
