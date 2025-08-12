"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import Button from "./ui/Button";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const headerH = 64; // h-16

  const computeSolid = () => {
    const y = typeof window !== "undefined" ? window.scrollY || 0 : 0;
    if (y <= 1) return false;
    const hero = document.getElementById("hero");
    if (!hero) return y > headerH;
    const rect = hero.getBoundingClientRect();
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

  useEffect(() => {
    const obs = new MutationObserver(() => setSolid(computeSolid()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => obs.disconnect();
  }, []);

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
        "fixed inset-x-0 top-0 z-[100] will-change-transform",
        "transition-[transform,background-color,backdrop-filter,border-color] duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid
          ? // solid: blur + tinted surface + subtle border (all from vars)
            "supports-[backdrop-filter]:backdrop-blur-md bg-[var(--surface-1)] border-b border-[var(--border-subtle)]"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] rounded-lg"
        >
          <div
            className="h-9 w-9 rounded-full grid place-items-center font-bold text-white"
            style={{ background: "var(--cta-700)" }}
          >
            I
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight text-[var(--text-primary)]">
              IMALEX
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
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
                      "text-[var(--text-secondary)] hover:text-[var(--brand-700)]",
                      isActive ? "text-[var(--brand-700)]" : "",
                      "focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]",
                    ].join(" ")}
                  >
                    {label}
                    <span
                      aria-hidden
                      className={[
                        "absolute -bottom-1 left-0 h-[2px] w-full rounded bg-[var(--brand-600)]",
                        "origin-left transition-[opacity,transform] duration-300",
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0",
                      ].join(" ")}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            asLink
            href="#contact"
            className="hidden sm:inline-flex"
          >
            Request a Quote
          </Button>

          <ThemeToggle />
          <MobileMenu sections={sections} />
        </div>
      </div>
    </header>
  );
}

/* -------- Theme toggle  -------- */
function ThemeToggle() {
  const [mode, setMode] = useState("system");
  const mediaRef = useRef(null);

  const apply = (m) => {
    const root = document.documentElement;
    // trigger smooth transition
    root.classList.add("theme-animating");
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = m === "dark" || (m === "system" && systemDark);
    root.classList.toggle("dark", isDark);
    root.dataset.theme = m;
    root.classList.add("theme-animating");
    requestAnimationFrame(() => {
      // ensure transitions kick in
      const systemDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = m === "dark" || (m === "system" && systemDark);
      root.classList.toggle("dark", isDark);
      root.dataset.theme = m;
      setTimeout(() => root.classList.remove("theme-animating"), 320);
    });
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
      className="ml-1 rounded-full p-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] border bg-[var(--surface-1)]"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

/* ---------------- Mobile menu ---------------- */
function MobileMenu({ sections }) {
  const [open, setOpen] = useState(false);

  // lock page scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // close on nav hash change
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // esc to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="md:hidden inline-flex items-center justify-center rounded-lg p-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] border bg-[var(--surface-1)]"
        style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        aria-expanded={open}
        aria-controls="mobile-overlay"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
      </button>

      {/* Fullscreen overlay */}
      <div
        id="mobile-overlay"
        className={[
          "md:hidden fixed inset-0 z-[110] transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Scrim: solid token with fallback, blocks clicks to page */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--overlay-70, rgba(0,0,0,0.48))",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Top sheet: SOLID surface so content underneath never shows through */}
        <div
          className={[
            "absolute inset-x-0 top-0 rounded-b-2xl shadow-lg",
            "transition-transform duration-300",
            open ? "translate-y-0" : "-translate-y-full",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          style={{
            background: "var(--surface-0)", // solid
            borderBottom: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <div className="px-6 pt-4 pb-2 flex items-center justify-between">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              Menu
            </div>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-lg p-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] border bg-[var(--surface-1)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
              aria-label="Close menu"
              title="Close"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <ul className="space-y-2 text-base">
              {sections.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="
    block rounded px-3 py-2
    transition-colors duration-200
    text-[var(--text-primary)]
    hover:bg-[var(--brand-100)]
  "
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Button
                variant="primary"
                size="lg" // <- matches CTA (px-6 py-3)
                asLink
                href="#contact"
                className="w-full" // keep it inline-sized; use "w-full" if you want full width
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </Button>
            </div>

            <div className="mt-3 text-center text-xs text-[var(--text-secondary)]">
              IMALEX — Natural Formulation Lab
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
