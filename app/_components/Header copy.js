// app/_components/Header.js
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const headerH = 64; // h-16

  // decide when header should be solid vs transparent
  const computeSolid = () => {
    const y = typeof window !== "undefined" ? window.scrollY || 0 : 0;
    if (y <= 1) return false;

    const hero = document.getElementById("hero");
    if (!hero) return y > headerH;

    const rect = hero.getBoundingClientRect();
    // solid only when hero's bottom is at/above the header height
    return rect.bottom <= headerH;
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastY.current;
      setHidden(goingDown && y > 120);
      lastY.current = y;
      setSolid(computeSolid());
    };
    const onResize = () => setSolid(computeSolid());
    const onHash = () => setTimeout(() => setSolid(computeSolid()), 0);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  // keep header in sync if theme toggles while at top
  useEffect(() => {
    const obs = new MutationObserver(() => setSolid(computeSolid()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  // active link highlight
  const sections = useMemo(
    () => [
      ["About", "#about"],
      ["Services", "#services"],
      ["Sectors", "#sectors"],
      ["Why IMALEX", "#why"],
      ["Process", "#process"],
      ["Contact", "#contact"],
    ],
    []
  );
  const [active, setActive] = useState("#services");

  useEffect(() => {
    const targets = sections
      .map(([, id]) => document.querySelector(id))
      .filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (e) => e.isIntersecting && setActive(`#${e.target.id}`)
        );
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <header
      className={[
        // FIXED so hero sits behind it (true transparency on top)
        "fixed inset-x-0 top-0 z-[100] will-change-transform",
        "transition-[transform,background-color,backdrop-filter,border-color] duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid
          ? // solid state: blur + tint + subtle border
            "supports-[backdrop-filter]:backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10"
          : // transparent over hero (no blur, no border, truly see the hero)
            "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/35 rounded-lg"
        >
          <div className="h-9 w-9 rounded-full bg-green-700 text-white grid place-items-center font-bold">
            I
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              IMALEX
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Natural Formulation Lab
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 text-sm">
            {sections.map(([label, href]) => {
              const isActive = active === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={[
                      "relative rounded px-1 transition-colors",
                      "text-slate-700 dark:text-slate-200",
                      "hover:text-green-700 dark:hover:text-green-300",
                      isActive ? "text-green-700 dark:text-green-300" : "",
                      "focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/35",
                    ].join(" ")}
                  >
                    {label}
                    <span
                      className={[
                        "absolute -bottom-1 left-0 h-[2px] w-full rounded transition-opacity",
                        "bg-green-600/70 dark:bg-green-300/70",
                        isActive ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center rounded-lg bg-green-700 px-4 py-2 text-white text-sm font-semibold hover:bg-green-800 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/35"
          >
            Request a Quote
          </a>
          <ThemeToggle />
          <MobileMenu sections={sections} />
        </div>
      </div>
    </header>
  );
}

/* -------- Theme toggle -------- */
function ThemeToggle() {
  const [mode, setMode] = useState("system");
  const mediaRef = useRef(null);

  const apply = (m) => {
    const root = document.documentElement;
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = m === "dark" || (m === "system" && systemDark);
    root.classList.toggle("dark", isDark);
    root.dataset.theme = m;
  };

  useEffect(() => {
    const stored = localStorage.getItem("themeMode");
    const initial = stored || "system";
    setMode(initial);
    apply(initial);

    if (window.matchMedia) {
      mediaRef.current = window.matchMedia("(prefers-color-scheme: dark)");
      const onMedia = () => {
        const current = localStorage.getItem("themeMode") || "system";
        if (current === "system") apply("system");
      };
      mediaRef.current.addEventListener?.("change", onMedia);
      return () => mediaRef.current?.removeEventListener?.("change", onMedia);
    }
  }, []);

  const cycle = () => {
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    let next;
    if (mode === "system") next = systemDark ? "light" : "dark";
    else next = mode === "light" ? "dark" : "light";

    setMode(next);
    localStorage.setItem("themeMode", next);
    apply(next);
  };

  const effectiveDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const Icon = effectiveDark ? FiMoon : FiSun;
  const label = effectiveDark ? "Dark mode" : "Light mode";

  return (
    <button
      onClick={cycle}
      aria-label={`Toggle theme (${label})`}
      title={label}
      className="ml-1 rounded-full border border-slate-300/70 dark:border-slate-700/70 p-2 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/35"
    >
      <Icon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
    </button>
  );
}

/* ---------------- Mobile menu ---------------- */
function MobileMenu({ sections }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300/70 dark:border-slate-700/70 p-2 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/35"
        aria-expanded={open}
        aria-controls="mobile-overlay"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <FiX className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        ) : (
          <FiMenu className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        )}
      </button>

      <div
        id="mobile-overlay"
        className={[
          "md:hidden fixed inset-0 z-[110] transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <div
          className={[
            "absolute inset-x-0 top-0 rounded-b-2xl shadow-lg",
            "bg-white/95 dark:bg-slate-900/95 border-b border-black/5 dark:border-white/10",
            "transition-transform duration-300",
            open ? "translate-y-0" : "-translate-y-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="px-6 pt-4 pb-2 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Menu
            </div>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300/70 dark:border-slate-700/70 p-2 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/35"
              aria-label="Close menu"
              title="Close"
            >
              <FiX className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <ul className="space-y-2 text-base">
              {sections.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 text-slate-800 dark:text-slate-100 hover:bg-green-50 dark:hover:bg-white/10 transition"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block text-center rounded-lg bg-green-700 px-4 py-2 text-white font-semibold hover:bg-green-800 transition"
              >
                Request a Quote
              </a>
            </div>

            <div className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              IMALEX — Natural Formulation Lab
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
