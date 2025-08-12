"use client";
import React from "react";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const finePointer = () =>
  typeof window !== "undefined" && matchMedia("(pointer:fine)").matches;

export default function Spotlight({ children, index = 0, href, ariaLabel }) {
  const onMove = (e) => {
    if (!finePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    const rx = (y / r.height - 0.5) * -1.6;
    const ry = (x / r.width - 0.5) * 1.6;
    el.style.transform = `translateY(-2px) rotateX(${clamp(
      rx,
      -2,
      2
    )}deg) rotateY(${clamp(ry, -2, 2)}deg)`;
  };
  const reset = (e) => (e.currentTarget.style.transform = "");

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group relative block rounded-2xl border transition bg-[var(--surface-1)] border-[var(--border-subtle)] [box-shadow:var(--shadow-card)] hover:[box-shadow:var(--shadow-card-lg)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] will-change-transform opacity-0 translate-y-3"
      style={{
        animation: "sg-reveal .45s cubic-bezier(.2,.8,.2,1) forwards",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          WebkitMaskImage:
            "radial-gradient(120px 90px at var(--mx,-200px) var(--my,-200px), #000 52%, transparent 72%)",
          maskImage:
            "radial-gradient(120px 90px at var(--mx,-200px) var(--my,-200px), #000 52%, transparent 72%)",
          background:
            "radial-gradient(160px 110px at var(--mx,-200px) var(--my,-200px), rgba(127,207,167,.08), transparent 60%)",
        }}
      />
      {children}
      {/* hairline outline */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--brand-700) 16%, transparent)",
        }}
      />
    </a>
  );
}
