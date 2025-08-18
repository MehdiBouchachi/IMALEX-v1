"use client";
import { useEffect, useRef, useState } from "react";

export function useProcessController({ stepsLength, stickyTop = 96 }) {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);

  // Display just follows active (no RAF re-render of the whole section)
  const smoothDisplay = String(
    Math.max(1, Math.min(stepsLength, active + 1))
  ).padStart(2, "0");

  // Which chapter is centered
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-step"));
            setActive(idx);
          }
        }
      },
      { threshold: 0.6, rootMargin: `-${stickyTop}px 0px -${stickyTop}px 0px` }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [stickyTop]);

  // Section progress (throttled to rAF + change ≥ 1.5%)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = null;

    const measure = () => {
      rafId = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(r.height - vh, 1);
      const passed = Math.min(Math.max(-r.top, 0), total);
      const next = passed / total;
      setJourneyProgress((prev) =>
        Math.abs(prev - next) >= 0.015 ? next : prev
      );
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(measure);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    containerRef,
    stepRefs,
    active,
    journeyProgress,
    smoothDisplay,
    stickyTop,
  };
}
