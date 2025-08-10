"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCard({ children, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    const baseDelay =
      typeof window !== "undefined" && window.__firstRenderDone
        ? 0 // no delay on scroll after initial load
        : (index % 2) * 0.15;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: baseDelay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // mark that first render animation is done
            if (typeof window !== "undefined") window.__firstRenderDone = true;
          },
        },
      }
    );
  }, [index]);

  return <div ref={cardRef}>{children}</div>;
}
