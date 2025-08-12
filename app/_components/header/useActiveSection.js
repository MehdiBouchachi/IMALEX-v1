"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-active section tracker (robust):
 * - waits until the target sections exist, then attaches IO
 * - updates on scroll (fallback) so the underline follows even when IO misses
 * - headerOffset = sticky header height
 */
export default function useActiveSection(sections, headerOffset = 64) {
  const [active, setActive] = useState(sections?.[0]?.[1] ?? "#about");
  const ioRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const ids = sections.map(([, id]) => id);
    const getEls = () =>
      ids.map((id) => document.querySelector(id)).filter(Boolean);

    const attachIO = () => {
      const els = getEls();
      if (!els.length) return false;

      const io = new IntersectionObserver(
        (entries) => {
          // prefer the most visible section
          const vis = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (vis) {
            setActive(`#${vis.target.id}`);
            return;
          }

          // fallback: pick the last section whose top is above the header
          const cur = els
            .map((el) => ({
              id: `#${el.id}`,
              top: el.getBoundingClientRect().top,
            }))
            .filter((t) => t.top - headerOffset <= 1)
            .sort((a, b) => b.top - a.top)[0];

          if (cur) setActive(cur.id);
        },
        {
          rootMargin: `-${headerOffset + 8}px 0px -55% 0px`,
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );

      els.forEach((el) => io.observe(el));
      ioRef.current = io;
      return true;
    };

    // try now, then retry each animation frame until sections mount
    if (!attachIO()) {
      let tries = 0;
      const retry = () => {
        if (attachIO() || tries > 40) return; // ~40 frames ≈ 0.7s
        tries += 1;
        rafRef.current = requestAnimationFrame(retry);
      };
      rafRef.current = requestAnimationFrame(retry);
    }

    // scroll fallback keeps it perfectly in sync
    const onScroll = () => {
      const els = getEls();
      if (!els.length) return;
      const cur = els
        .map((el) => ({ id: `#${el.id}`, top: el.getBoundingClientRect().top }))
        .filter((t) => t.top - headerOffset <= 1)
        .sort((a, b) => b.top - a.top)[0];
      if (cur) setActive(cur.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (ioRef.current) ioRef.current.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [sections, headerOffset]);

  return active;
}
