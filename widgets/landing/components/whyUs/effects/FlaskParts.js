export function FlaskSVG() {
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
          <stop offset="0" stopColor="white" stopOpacity="0.94" />
          <stop offset="1" stopColor="white" stopOpacity="0.52" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--brand-800)" />
          <stop offset="1" stopColor="var(--brand-700)" />
        </linearGradient>
        <linearGradient id="liquidDepth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--brand-900)" stopOpacity="0.65" />
          <stop offset="1" stopColor="var(--brand-800)" stopOpacity="0.85" />
        </linearGradient>
        <clipPath id="flaskClip">
          <path d={glassD} />
        </clipPath>
        <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="black" stopOpacity="0.6" />
          <stop offset="1" stopColor="black" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx="280"
        cy="430"
        rx="168"
        ry="30"
        fill="url(#baseShadow)"
        opacity="0.26"
      />
      <path d={glassD} fill="url(#glassGrad)" opacity="0.20" />
      <path
        d={glassD}
        fill="none"
        stroke="var(--brand-700)"
        strokeWidth="5.5"
        strokeOpacity="0.72"
      />
      <path
        d={glassD}
        fill="none"
        stroke="var(--brand-400)"
        strokeWidth="7"
        strokeOpacity="0.45"
      />
      <path
        d={glassD}
        fill="none"
        stroke="white"
        strokeWidth="1.1"
        strokeOpacity="0.42"
      />

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
            fill="var(--brand-900)"
            fillOpacity="0.9"
          />
          <path
            d="M280 315c18-38 55-52 90-38-25 29-55 38-90 38z"
            fill="var(--brand-800)"
            fillOpacity="0.98"
          />
        </g>
        <path
          d="M170 308 C 220 300, 340 300, 390 308 Q 280 314, 170 308 Z"
          fill="white"
          opacity="0.16"
        />
      </g>

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

export function ConvectionFlow() {
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

export function MeniscusShineLite() {
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

export function LiquidWaves() {
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

export function MicroBubbles() {
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
            fill="white"
            fillOpacity="0.85"
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

export function Caustics() {
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

export function LiquidSurface() {
  const flaskPath =
    "M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z";
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
        <linearGradient id="ls-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g clipPath="url(#ls-clip)">
        <path d={k1} fill="black" opacity="0.06">
          <animate
            attributeName="d"
            dur="5.8s"
            repeatCount="indefinite"
            values={`${k1};${k2};${k3};${k1}`}
          />
        </path>
        <path
          d={k1}
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          strokeOpacity="0.45"
        >
          <animate
            attributeName="d"
            dur="5.8s"
            repeatCount="indefinite"
            values={`${k1};${k2};${k3};${k1}`}
          />
        </path>
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

export function FoamRim() {
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
        <circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.s}
          fill="white"
          fillOpacity="0.85"
        >
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

export function DriftParticles() {
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
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill="white"
          fillOpacity="0.75"
        >
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

export function Sparkles({ count = 40 }) {
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
          className="absolute rounded-full anim-sparkle"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: s.top,
            left: s.left,
            background: "var(--effect-dot)",
            opacity: 0.8,
            filter: "blur(0.5px)",
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
