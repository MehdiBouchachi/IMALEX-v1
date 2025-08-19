"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // --- FAST preset ---
    const DURATION = 0.65; // was 1.1 → lower = snappier
    const WHEEL_MULT = 1.85; // was 1.05 → higher = faster wheel
    const TOUCH_MULT = isTouch ? 3.2 : 2.2; // more speed on touch

    // snappier easing (easeOutCubic)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const setHeaderVar = () => {
      const headerEl =
        document.querySelector("[data-header]") ||
        document.querySelector("header");
      const h = headerEl?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderVar();
    window.addEventListener("resize", setHeaderVar);

    const lenis = new Lenis({
      duration: DURATION,
      easing: easeOutCubic,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: WHEEL_MULT,
      touchMultiplier: TOUCH_MULT,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // faster anchor jumps (own duration)
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerOffset =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-h"
          )
        ) || 0;
      lenis.scrollTo(target, {
        offset: -headerOffset,
        duration: 0.45, // quicker anchor animation
        easing: easeOutCubic,
      });
    };
    document.addEventListener("click", onClick);

    const onHashChange = () => {
      const target = document.querySelector(location.hash);
      if (!target) return;
      const headerOffset =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-h"
          )
        ) || 0;
      lenis.scrollTo(target, {
        offset: -headerOffset,
        duration: 0.45,
        easing: easeOutCubic,
      });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("resize", setHeaderVar);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
