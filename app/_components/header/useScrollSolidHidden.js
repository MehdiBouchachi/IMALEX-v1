"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks:
 *  - solid: when header should use a solid/blurred background
 *  - hidden: slide away when scrolling down
 */
export default function useScrollSolidHidden(headerH = 64) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const computeSolid = () => {
    if (typeof window === "undefined") return false;
    const y = window.scrollY || 0;
    if (y <= 1) return false;

    const hero = document.getElementById("hero");
    if (!hero) return y > headerH;

    const rect = hero.getBoundingClientRect();
    // solid once the bottom of hero is above the header
    return rect.bottom <= headerH;
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > 120);
      lastY.current = y;
      setSolid(computeSolid());
    };
    const onResize = () => setSolid(computeSolid());
    const onHash = () => setTimeout(() => setSolid(computeSolid()), 0);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);

    // recompute when root theme class changes
    const mo = new MutationObserver(() => setSolid(computeSolid()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
      mo.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { solid, hidden };
}
