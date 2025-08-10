"use client";

import { useEffect, useRef, useOptimistic } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import deleteBooking from "../_lib/actions";
import ReservationCard from "./ReservationCard";

gsap.registerPlugin(ScrollTrigger);

function ReservationList({ bookings }) {
  const listRef = useRef(null);

  const [optimisticBookings, OptimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    OptimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  // GSAP animation
  useEffect(() => {
    const items = listRef.current?.querySelectorAll(".reservation-item");

    if (items?.length) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, [optimisticBookings]); // Re-run on bookings change

  return (
    <ul ref={listRef} className="space-y-6">
      {optimisticBookings.map((booking) => (
        <li key={booking.id} className="reservation-item">
          <ReservationCard onDelete={handleDelete} booking={booking} />
        </li>
      ))}
    </ul>
  );
}

export default ReservationList;
