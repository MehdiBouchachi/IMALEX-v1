"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

/** Global smooth scroll with Lenis — except on /process, where we use native. */
export default function SmoothScroll() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const onProcess =
      (pathname && pathname.includes("process")) ||
      (typeof window !== "undefined" && window.location.hash === "#process");

    // helper for header offset
    const headerH = () =>
      ((
        document.querySelector("[data-header]") ||
        document.querySelector("header")
      )?.getBoundingClientRect().height || 64) + 8;

    // Always provide anchor smoothing with offset (works in both modes)
    const anchorHandler = () => {
      const scrollToHash = (hash) => {
        if (!hash || hash === "#") return;
        const id = hash.replace(/^#/, "");
        const el =
          document.getElementById(id) ||
          document.querySelector(`[name="${CSS.escape(id)}"]`);
        if (!el) return;

        const y = el.getBoundingClientRect().top + window.scrollY - headerH();
        window.scrollTo({ top: y, behavior: "smooth" });
      };

      // initial hash
      if (window.location.hash)
        requestAnimationFrame(() => scrollToHash(window.location.hash));

      // intercept same-page anchor clicks
      const onClick = (e) => {
        const a = e.target.closest("a[href*='#']");
        if (!a) return;

        const url = new URL(a.href, window.location.origin);
        const samePath =
          url.origin === window.location.origin &&
          url.pathname.replace(/\/+$/, "") ===
            window.location.pathname.replace(/\/+$/, "");

        if (samePath && url.hash) {
          e.preventDefault();
          history.pushState(null, "", url.hash);
          scrollToHash(url.hash);
        }
      };

      const onHash = () => scrollToHash(window.location.hash);
      document.addEventListener("click", onClick, true);
      window.addEventListener("hashchange", onHash);

      return () => {
        document.removeEventListener("click", onClick, true);
        window.removeEventListener("hashchange", onHash);
      };
    };

    // --- MODE A: Native (Process page) ---
    if (onProcess) {
      const cleanupAnchors = anchorHandler();
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "smooth"; // native smooth
      return () => {
        cleanupAnchors?.();
        document.documentElement.style.scrollBehavior = prev;
      };
    }

    // --- MODE B: Lenis (everywhere else) ---
    const DURATION = 0.45; // your old timing
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const lenis = new Lenis({
      duration: DURATION,
      easing: easeOutCubic,
      smoothWheel: true,
      smoothTouch: false, // let phones use native physics
      wheelMultiplier: 1.2,
      touchMultiplier: 1.0,
      syncTouch: true,
    });

    // avoid double-smooth
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const cleanupAnchors = anchorHandler();

    return () => {
      cleanupAnchors?.();
      cancelAnimationFrame(rafId);
      document.documentElement.style.scrollBehavior = prev;
      lenis.destroy();
    };
  }, [pathname, search]);

  return null;
}
