export default function ConnectorsSVG({ animate = true }) {
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
  };

  return (
    <svg
      className="pointer-events-none absolute inset-0 mx-auto w-[840px] max-w-full [contain:paint]"
      viewBox="0 0 840 540"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--effect-wire-start)" />
          <stop offset="1" stopColor="var(--effect-wire-end)" />
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
      <path d="M420 110 C 420 70, 420 52, 420 20" {...pathProps} />
      <path d="M480 130 C 550 135, 600 120, 680 95" {...pathProps} />
      <path d="M360 380 C 295 405, 240 432, 150 465" {...pathProps} />
      <path d="M480 380 C 545 405, 600 432, 690 468" {...pathProps} />
    </svg>
  );
}

export function Junction({ x, y }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 mx-auto w-[800px] max-w-full"
      viewBox="0 0 800 520"
      aria-hidden="true"
    >
      <circle cx={x} cy={y} r="4.5" fill="var(--effect-dot)" />
      <circle
        cx={x}
        cy={y}
        r="4.5"
        className="anim-sparkle"
        style={{ animationDuration: "2.4s" }}
        fill="var(--effect-wire-end)"
      />
    </svg>
  );
}
