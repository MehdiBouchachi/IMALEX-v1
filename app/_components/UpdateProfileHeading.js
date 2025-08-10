"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function UpdateProfileHeading() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const h2 = el.querySelector("h2");
    const p = el.querySelector("p");

    gsap.fromTo(
      h2,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: h2,
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      p,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef}>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
    </div>
  );
}

export default UpdateProfileHeading;
