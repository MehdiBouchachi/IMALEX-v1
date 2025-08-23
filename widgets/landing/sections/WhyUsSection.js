"use client";

import { useEffect, useState } from "react";
import MobileGrid from "../components/whyUs/MobileGrid";
import DesktopScene from "../components/whyUs/DesktopScene";
import ConnectorsSVG, { Junction } from "../components/whyUs/Connectors";
import Badge from "../components/whyUs/Badge";
import { items, WHYUS } from "../../../app/_config/sections.config";
import AmbientRays from "../../ui/AmbientRays";
import SectionHeader from "../../ui/SectionHeader";

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
      <AmbientRays isLite={isLite} />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={WHYUS.eyebrow}
          title={WHYUS.title}
          blurb={WHYUS.blurb}
          center={true}
        />

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
