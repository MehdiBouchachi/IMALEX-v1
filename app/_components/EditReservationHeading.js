"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function EditReservationHeading({ reservationId }) {
  const headingRef = useRef();

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <h2
      ref={headingRef}
      className="font-semibold text-2xl text-accent-400 mb-7"
    >
      Edit Reservation #{reservationId}
    </h2>
  );
}

export default EditReservationHeading;
