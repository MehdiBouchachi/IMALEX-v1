"use client";

import { useEffect, useState } from "react";
import MobileGrid from "../_components/whyUs/MobileGrid";
import DesktopScene from "../_components/whyUs/DesktopScene";
import ConnectorsSVG, { Junction } from "../_components/whyUs/Connectors";
import Badge from "../_components/whyUs/Badge";
import items from "../_components/whyUs/items";

export default function WhyUsSection() {
  const [isLite, setIsLite] = useState(true);

  useEffect(() => {
    const mqMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mqWidth =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;
    const mem = typeof navigator !== "undefined" ? navigator.deviceMemory : 8;
    const enableFull = mqWidth && !mqMotion && (mem || 0) >= 4;
    setIsLite(!enableFull);
  }, []);

  return (
    <section
      id="why"
      className="relative isolate overflow-hidden py-20 sm:py-28 bg-why-sky"
      data-lite={isLite ? "1" : "0"}
    >
      {/* ambient rays / glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [contain:paint]"
      >
        <div className="absolute inset-0 opacity-60 dark:opacity-40 mask-why-top">
          <div
            className={[
              "absolute -top-16 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rotate-[8deg]",
              "bg-why-conic",
              !isLite ? "anim-tilt" : "",
            ].join(" ")}
          />
        </div>
        <div className="absolute inset-0 bg-why-spots" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-700)] dark:text-[var(--brand-800)]">
            Why IMALEX
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Science, Nature &amp; Accountability
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            We fuse green chemistry with rigorous validation to create products
            that are effective, compliant and scalable — without compromising
            sustainability.
          </p>
        </div>

        <div className="mt-12 relative">
          <MobileGrid items={items} />

          <div className="hidden md:block relative mx-auto max-w-5xl">
            <DesktopScene isLite={isLite} />
            <ConnectorsSVG animate={!isLite} />

            <Junction x="400" y="90" />
            <Junction x="330" y="110" />
            <Junction x="470" y="110" />
            <Junction x="320" y="370" />
            <Junction x="480" y="370" />

            {items.map((it) => (
              <Badge key={it.title} {...it} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
