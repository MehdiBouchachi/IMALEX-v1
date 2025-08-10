"use client";

import { useEffect, useRef } from "react";
import { updateBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function EditReservationForm({ reservationId, booking, maxCapacity }) {
  const formRef = useRef();
  const { numGuests, observations } = booking;

  useEffect(() => {
    const elements = formRef.current?.querySelectorAll(".form-animate");

    if (elements?.length) {
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <form
      ref={formRef}
      action={updateBooking}
      className="bg-primary-900 py-6 px-4 sm:px-8 md:px-12 text-base sm:text-lg flex flex-col gap-6"
    >
      <input type="hidden" value={reservationId} name="reservationId" />

      <div className="space-y-2 form-animate">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={numGuests}
          className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
        >
          <option value="">Select number of guests...</option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 form-animate">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={observations}
          className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6 form-animate">
        <SubmitButton>Update reservation</SubmitButton>
      </div>
    </form>
  );
}

export default EditReservationForm;
