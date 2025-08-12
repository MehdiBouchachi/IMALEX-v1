"use client";

import { useEffect, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import Button from "../ui/Button";

export default function MobileMenu({ sections = [] }) {
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

  // close on hash nav
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
        {/* Scrim */}
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

        {/* Top sheet */}
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
            background: "var(--surface-0)",
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
                    className="block rounded px-3 py-2 transition-colors duration-200 text-[var(--text-primary)] hover:bg-[var(--brand-100)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Button
                variant="primary"
                size="lg"
                asLink
                href="#contact"
                className="w-full"
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
