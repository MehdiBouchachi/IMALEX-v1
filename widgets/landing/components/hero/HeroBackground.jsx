"use client";
import React from "react";
import Wave from "./Wave";
import DotsOverlay from "./DotsOverlay";

export default function HeroBackground() {
  return (
    <>
      {/* gradient stack */}
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

      {/* waves + dots */}
      <Wave tone="moss" className="top-[12%] h-[110px] opacity-35 z-[5]" />
      <Wave tone="mint" className="top-[28%] h-[130px] opacity-30 z-[5]" />
      <Wave tone="sage" className="top-[44%] h-[120px] opacity-25 z-[5]" />
      <DotsOverlay count={42} />

      {/* bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[10]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--hero-bot))",
        }}
      />
    </>
  );
}
