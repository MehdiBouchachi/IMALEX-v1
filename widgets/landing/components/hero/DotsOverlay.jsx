"use client";

import { useMemo } from "react";

export default function DotsOverlay({ count = 20 }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const dots = useMemo(() => {
    if (prefersReduced) return [];
    const css =
      typeof window !== "undefined"
        ? getComputedStyle(document.documentElement)
        : null;

    const pick = (v, fb) => (css ? css.getPropertyValue(v).trim() || fb : fb);
    const toRgba = (hex, a = 1) => {
      const h = hex.replace("#", "");
      const b =
        h.length === 3
          ? h
              .split("")
              .map((x) => x + x)
              .join("")
          : h;
      const r = parseInt(b.slice(0, 2), 16),
        g = parseInt(b.slice(2, 4), 16),
        bl = parseInt(b.slice(4, 6), 16);
      return `rgba(${r},${g},${bl},${a})`;
    };

    const b700 = pick("--brand-700", "#3C8B63");
    const b500 = pick("--brand-500", "#57A87A");
    const b300 = pick("--brand-300", "#9ED7BD");
    const b200 = pick("--brand-200", "#CDEFE0");

    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    const palette = isDark
      ? [toRgba(b300, 0.95), toRgba(b500, 0.95)]
      : [
          toRgba(b700, 0.85),
          toRgba(b500, 0.85),
          toRgba(b300, 0.85),
          toRgba(b200, 0.85),
        ];

    return Array.from({ length: count }).map((_, i) => {
      const size = Math.round(Math.random() * 12) + 6; // 6–18px
      const left = Math.random() * 100; // 0–100%
      const startOffset = 10 + Math.random() * 30; // 10–40vh below
      const riseDur = 10 + Math.random() * 12; // 10–22s
      const riseDelay = Math.random() * 6; // 0–6s
      const swayDur = 4 + Math.random() * 8; // 4–12s
      const swayDelay = Math.random() * 6; // 0–6s
      const swayAmp = 8 + Math.random() * 18; // 8–26px
      const color = palette[Math.floor(Math.random() * palette.length)];
      const blur = Math.random() < 0.35 ? 4 : 0;

      return {
        id: i,
        size,
        left,
        startOffset,
        riseDur,
        riseDelay,
        swayDur,
        swayDelay,
        swayAmp,
        color,
        blur,
      };
    });
  }, [count, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[80]">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full will-change-transform will-change-opacity"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            bottom: `-${d.startOffset}vh`, // start below viewport
            backgroundColor: d.color,
            filter: d.blur ? `blur(${d.blur}px)` : "none",
            boxShadow: `0 0 ${Math.max(10, d.size * 2.2)}px var(--effect-dot)`,

            // pass timings via CSS vars
            ["--riseDur"]: `${d.riseDur}s`,
            ["--riseDelay"]: `${d.riseDelay}s`,
            ["--swayDur"]: `${d.swayDur}s`,
            ["--swayDelay"]: `${d.swayDelay}s`,
            ["--swayStart"]: `${-d.swayAmp}px`,
            ["--swayEnd"]: `${d.swayAmp}px`,

            // infinite animations
            animation: `
              riseLoop var(--riseDur) linear var(--riseDelay) infinite,
              sway var(--swayDur) ease-in-out var(--swayDelay) infinite alternate
            `,
          }}
        />
      ))}
    </div>
  );
}
