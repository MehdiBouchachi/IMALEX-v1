// app/_components/WhyUsFlask.js
"use client";

export default function WhyUsFlask() {
  const items = [
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
  ];

  return (
    <section
      id="why"
      className="relative isolate overflow-hidden py-20 sm:py-28
                 bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(16,185,129,0.18),transparent),linear-gradient(to_bottom,#0b1a1c,#071012)] 
                 dark:bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(16,185,129,0.22),transparent),linear-gradient(to_bottom,#071012,#05090a)]"
    >
      {/* very soft corner glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[12%] h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-[10%] h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Why IMALEX
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Science, Nature & Accountability
          </h2>
          <p className="mt-4 text-slate-300/90">
            We fuse green chemistry with rigorous validation to create products
            that are effective, compliant and scalable — without compromising
            sustainability.
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Mobile: tidy grid */}
          <ul className="grid gap-5 sm:grid-cols-2 md:hidden">
            {items.map(({ title, desc, icon: Icon }) => (
              <li
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-[0_6px_24px_rgba(16,185,129,.10)]"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 text-emerald-200">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white leading-snug">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">{desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop scene */}
          <div className="hidden md:block relative mx-auto max-w-5xl">
            {/* central flask */}
            <div className="relative mx-auto w-[560px] max-w-full">
              <FlaskSVG />
              <Shine />
              <Bubbles />
            </div>

            {/* connectors + junction pulses */}
            <ConnectorsSVG />
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

/* ---------- bits ---------- */

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
        className="group rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-4
                   shadow-[0_6px_28px_rgba(16,185,129,.14)]
                   transition will-change-transform hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(16,185,129,.22)]"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-200">
            <Icon />
          </span>
          <div>
            <div className="font-semibold text-white leading-tight">
              {title}
            </div>
            <div className="mt-1 text-sm text-slate-300">{desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Junction({ x, y }) {
  // subtle pulsing nodes where lines meet the flask area
  return (
    <svg
      className="pointer-events-none absolute inset-0 mx-auto w-[800px] max-w-full"
      viewBox="0 0 800 520"
      aria-hidden="true"
    >
      <circle cx={x} cy={y} r="5" fill="rgba(16,185,129,0.9)" />
      <circle
        cx={x}
        cy={y}
        r="5"
        className="motion-safe:animate-ping"
        style={{ animationDuration: "2.4s" }}
        fill="rgba(16,185,129,0.35)"
      />
    </svg>
  );
}

function ConnectorsSVG() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 mx-auto w-[840px] max-w-full"
      viewBox="0 0 840 540"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="rgba(20,184,166,0.65)" offset="0" />
          <stop stopColor="rgba(94,234,212,0.25)" offset="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* left top */}
      <path
        d="M360 130 C 285 135, 235 120, 155 92"
        stroke="url(#wire)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.9"
      />
      {/* top */}
      <path
        d="M420 110 C 420 70, 420 52, 420 20"
        stroke="url(#wire)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.95"
      />
      {/* right top */}
      <path
        d="M480 130 C 550 135, 600 120, 680 95"
        stroke="url(#wire)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.9"
      />
      {/* left bottom */}
      <path
        d="M360 380 C 295 405, 240 432, 150 465"
        stroke="url(#wire)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.9"
      />
      {/* right bottom */}
      <path
        d="M480 380 C 545 405, 600 432, 690 468"
        stroke="url(#wire)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.9"
      />
    </svg>
  );
}

function Bubbles() {
  const dots = [
    [44, 45, 3.2],
    [56, 48, 2.6],
    [48, 58, 2.8],
    [60, 62, 3.1],
    [52, 72, 2.4],
    [40, 70, 2.8],
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {dots.map(([x, y, s], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-emerald-400/70 motion-safe:animate-ping"
          style={{
            width: s * 3,
            height: s * 3,
            left: `${x}%`,
            top: `${y}%`,
            animationDuration: `${2 + i * 0.35}s`,
            filter: "blur(0.3px)",
            boxShadow: "0 0 10px rgba(16,185,129,0.35)",
          }}
        />
      ))}
    </div>
  );
}

function Shine() {
  // soft diagonal shine on the glass (subtle!)
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(105deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.0) 85%)",
        mask: "radial-gradient(60% 70% at 50% 60%, black 55%, transparent 70%)", // keep the shine mostly inside flask body
      }}
    />
  );
}

function FlaskSVG() {
  return (
    <svg
      viewBox="0 0 560 520"
      className="mx-auto w-full"
      aria-label="Glass flask"
    >
      {/* base shadow */}
      <ellipse cx="280" cy="430" rx="165" ry="28" fill="rgba(0,0,0,0.24)" />

      {/* body */}
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.45)" />
        </linearGradient>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(16,185,129,0.95)" />
          <stop offset="1" stopColor="rgba(5,150,105,0.95)" />
        </linearGradient>
      </defs>

      {/* glass silhouette */}
      <path
        d="M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z"
        fill="url(#glass)"
        opacity="0.22"
      />
      <path
        d="M210 60h140c6 0 10 5 10 11v12c0 6-4 11-10 11h-1l42 234c10 53-30 98-84 98h-54c-54 0-94-45-84-98l42-234h-1c-6 0-10-5-10-11V71c0-6 4-11 10-11z"
        fill="none"
        stroke="rgba(94,234,212,0.55)"
        strokeWidth="3.5"
      />

      {/* “liquid leaves” hybrid */}
      <g transform="translate(0,12)">
        <path
          d="M280 330c-40-28-80-18-100 20 45 4 75-9 100-20z"
          fill="url(#liquid)"
        />
        <path
          d="M280 330c40-28 80-18 100 20-45 4-75-9-100-20z"
          fill="rgba(16,185,129,1)"
        />
        <path
          d="M280 315c-18-38-55-52-90-38 25 29 55 38 90 38z"
          fill="rgba(45,212,191,0.95)"
        />
        <path
          d="M280 315c18-38 55-52 90-38-25 29-55 38-90 38z"
          fill="rgba(16,185,129,0.95)"
        />
      </g>
    </svg>
  );
}

/* ---- tiny inline icons (stroke currentColor) ---- */
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
