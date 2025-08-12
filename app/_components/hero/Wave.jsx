"use client";
import React, { useMemo } from "react";

export default function Wave({ className = "", tone = "moss" }) {
  const id = React.useId(); // unique per instance

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
            id={`strokeGrad-${id}`}
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
          stroke={`url(#strokeGrad-${id})`}
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
