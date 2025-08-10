"use client";

import { useState, useEffect, useRef } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import gsap from "gsap";
import Navigation from "./Navigation";

export default function MobileNavToggle({ session }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  useEffect(() => {
    if (!sidebarRef.current || !backdropRef.current) return;
    if (open) {
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.25,
        pointerEvents: "auto",
      });
      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: 0, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        pointerEvents: "none",
      });
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-slate-800 hover:text-accent-500"
        aria-label="Open menu"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 right-0 z-50 h-full w-[76vw] max-w-[420px] bg-white border-l border-slate-200 shadow-xl translate-x-full"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <span className="text-base font-semibold text-slate-900">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-800 hover:text-accent-500"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-8">
          <Navigation
            isMobile
            session={session}
            onClickLink={() => setOpen(false)}
          />
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-teal-500 px-4 py-3 text-white font-semibold hover:bg-teal-600 transition"
          >
            Request a Quote
          </a>
        </div>
      </aside>
    </>
  );
}
