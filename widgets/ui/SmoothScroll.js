// app/_components/SmoothScroll.jsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;

    // --- input detection ----------------------------------------------------
    const mqlCoarse = window.matchMedia?.("(pointer: coarse)") || {
      matches: false,
    };
    const pointerCoarse = mqlCoarse.matches; // phones/tablets
    const touchPoints = navigator.maxTouchPoints || 0;
    // iPadOS can report as Mac; treat as touch if it has touch points
    const isIOSlike =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (/Mac/.test(navigator.platform) && touchPoints > 0);
    const isTouchDevice = pointerCoarse || isIOSlike || touchPoints > 0;

    // --- tuned preset -------------------------------------------------------
    // Shorter easing window feels snappier on pointer devices
    const DURATION = isTouchDevice ? 0.45 : 0.6;
    // Faster wheel (good for Magic Mouse / trackpads)
    const WHEEL_MULT = 2.6;
    // Keep touch fast, but rely on native physics when possible
    const TOUCH_MULT = 3.2;

    // easeOutCubic
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // keep header height as CSS var for anchor offsets
    const setHeaderVar = () => {
      const headerEl =
        document.querySelector("[data-header]") ||
        document.querySelector("header");
      const h = headerEl?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderVar();
    window.addEventListener("resize", setHeaderVar, { passive: true });

    // IMPORTANT: ensure browser smooth scrolling is off (avoid double-smoothing)
    document.documentElement.style.scrollBehavior = "auto";

    const lenis = new Lenis({
      duration: DURATION,
      easing: easeOutCubic,
      // Let wheel be smooth everywhere
      smoothWheel: true,
      // On true touch devices, use native physics (no extra smoothing)
      smoothTouch: !isTouchDevice ? true : false,
      // But keep finger tracking in sync when we do handle touch
      syncTouch: true,
      wheelMultiplier: WHEEL_MULT,
      touchMultiplier: TOUCH_MULT,
      gestureOrientation: "vertical",
      normalizeWheel: true, // harmless if not supported
    });

    // Auto-boost for very tiny wheel deltas (some drivers)
    let boosted = false;
    const onFirstWheel = (e) => {
      if (boosted) return;
      // If deltas are tiny, bump up multiplier once
      if (Math.abs(e.deltaY) < 2.5) {
        lenis.options.wheelMultiplier = 3.2;
      }
      boosted = true;
      window.removeEventListener("wheel", onFirstWheel);
    };
    window.addEventListener("wheel", onFirstWheel, { passive: true });

    // RAF loop
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth anchors (respect header offset)
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
        duration: 0.42,
        easing: easeOutCubic,
      });
    };
    document.addEventListener("click", onClick, { passive: false });

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
        duration: 0.42,
        easing: easeOutCubic,
      });
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("resize", setHeaderVar);
      window.removeEventListener("wheel", onFirstWheel);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
