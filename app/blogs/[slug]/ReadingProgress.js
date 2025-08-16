"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress({ targetSelector = "article" }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.querySelector(targetSelector);
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight + rect.top;
      const read = Math.min(
        Math.max(window.scrollY - el.offsetTop + 1, 0),
        total || 1
      );
      setPct(Math.round((read / (total || 1)) * 100));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetSelector]);

  return (
    <div
      className="sticky top-16 z-20 mb-4 h-1 w-full rounded-full"
      style={{ background: "var(--surface-2)" }}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: "var(--brand-700)" }}
      />
    </div>
  );
}
