// app/_components/HeaderClient.js
"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileNavToggle from "./MobileNavToggle";

export default function HeaderClient({ session }) {
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      const y = window.scrollY || 0;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setAtTop(y < 10);

          // Hide when scrolling down, show when scrolling up
          if (y > lastY.current && y > 120) setHidden(true);
          else setHidden(false);

          lastY.current = y;
          ticking = false;
        });
        ticking = true;
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Base: fixed, full width
  const base =
    "fixed inset-x-0 top-0 z-50 transition-all duration-300 will-change-transform";

  // Visual states
  const bg =
    atTop && !hidden
      ? "bg-transparent"
      : "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-emerald-700/10";

  const translate = hidden ? "-translate-y-full" : "translate-y-0";
  const shadow = !atTop && !hidden ? "shadow-sm" : "";

  return (
    <header className={`${base} ${bg} ${translate} ${shadow}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:block">
          <Navigation session={session} />
        </nav>

        <a
          href="/#contact"
          className="hidden sm:inline-flex items-center rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/50 transition"
        >
          Request a Quote
        </a>

        <div className="md:hidden">
          <MobileNavToggle session={session} />
        </div>
      </div>
    </header>
  );
}
