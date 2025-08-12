"use client";

import { useEffect, useRef, useState } from "react";

export function useProcessController({ stepsLength, stickyTop = 96 }) {
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);

  // Smooth display follows the active step
  const displayRef = useRef(1);
  const [, force] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      const target = active + 1;
      const cur = displayRef.current;
      displayRef.current = cur + (target - cur) * 0.28;
      force((n) => n + 1); // trigger re-render
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  // 🔥 derive on every render (no memo)
  const smoothDisplayInt = Math.max(
    1,
    Math.min(stepsLength, Math.round(displayRef.current || 1))
  );
  const smoothDisplay = String(smoothDisplayInt).padStart(2, "0");

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

  // Section progress for the rail bar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = Math.max(r.height - vh, 1);
      const passed = Math.min(Math.max(-r.top, 0), total);
      setJourneyProgress(passed / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
