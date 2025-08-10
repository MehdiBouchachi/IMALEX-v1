"use client";

import { useEffect, useRef } from "react";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function UpdateProfileForm({ children, guest }) {
  const formRef = useRef();
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  useEffect(() => {
    const elements = formRef.current?.querySelectorAll(".form-animate");

    if (elements?.length) {
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          delay: 0.6,
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
      action={updateGuest}
      className="bg-primary-900 py-6 px-4 sm:px-8 md:px-12 text-base sm:text-lg flex flex-col gap-6"
    >
      <div className="space-y-2 form-animate">
        <label>Full name</label>
        <input
          name="fullName"
          disabled
          defaultValue={fullName}
          className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2 form-animate">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2 form-animate">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            name="countryFlag"
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2 form-animate">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6 form-animate">
        <SubmitButton>Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
