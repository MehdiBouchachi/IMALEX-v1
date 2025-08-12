"use client";

import { useEffect, useMemo, useState } from "react";

export default function DotsOverlay({ count = 42 }) {
  const [isDark, setIsDark] = useState(false);

  // Read theme on client
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const dots = useMemo(() => {
    const light = [
      "rgba(20,184,166,0.90)",
      "rgba(16,185,129,0.90)",
      "rgba(52,211,153,0.90)",
      "rgba(79,209,197,0.90)",
    ];
    const neon = ["rgba(94,240,214,0.95)", "rgba(45,212,191,0.95)"];
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
  }, [count, isDark]);

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
