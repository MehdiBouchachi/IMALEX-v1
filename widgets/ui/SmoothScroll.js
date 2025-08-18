// app/widgets/ui/SmoothScroll.js
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const prefersReduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduce) return;

    const DURATION = 0.6; // ← same as your old scroll duration
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const lenis = new Lenis({
      duration: DURATION, // ← use 0.45s base timing
      easing: easeOutCubic,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.6,
      touchMultiplier: 2.2,
    });

    const setHeaderVar = () => {
      const h =
        (
          document.querySelector("[data-header]") ||
          document.querySelector("header")
        )?.offsetHeight || 64;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setHeaderVar();
    window.addEventListener("resize", setHeaderVar);

    // avoid native + Lenis double-smooth
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const headerOffset = () => {
      const v = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-h"
        )
      );
      return (Number.isFinite(v) ? v : 64) + 8;
    };

    const scrollToHash = (hash) => {
      if (!hash || hash === "#") return;
      const id = hash.replace(/^#/, "");
      const el =
        document.getElementById(id) ||
        document.querySelector(`[name="${CSS.escape(id)}"]`);
      if (!el) return;
      lenis.scrollTo(el, {
        offset: -headerOffset(),
        duration: DURATION, // ← force 0.45s on anchor jumps too
        easing: easeOutCubic,
      });
    };

    if (window.location.hash)
      requestAnimationFrame(() => scrollToHash(window.location.hash));

    const onClick = (e) => {
      const a = e.target.closest("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href, window.location.origin);
      if (!url.hash) return;

      const samePath =
        url.origin === window.location.origin &&
        url.pathname.replace(/\/+$/, "") ===
          window.location.pathname.replace(/\/+$/, "");

      if (samePath) {
        e.preventDefault();
        history.pushState(null, "", url.hash);
        scrollToHash(url.hash);
      }
    };
    document.addEventListener("click", onClick, true);

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("resize", setHeaderVar);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
      cancelAnimationFrame(rafId);
      document.documentElement.style.scrollBehavior = prev;
      lenis.destroy();
    };
  }, [pathname, search]);

  return null;
}
