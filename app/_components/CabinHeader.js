"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CabinHeader({ delay = 0 }) {
  const containerRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const h1 = el.querySelector("h1");
    const p = el.querySelector("p");

    gsap.fromTo(
      h1,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: h1,
          start: "top 85%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      p,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: delay + 0.3,
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-200 mb-10 max-w-4xl">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
    </div>
  );
}

export default CabinHeader;
