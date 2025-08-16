"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DesktopNav({ sections = [], active }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // keep the current hash in state so route fallback is precise on home
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const normHash = (h) => {
    if (!h) return "";
    return h.startsWith("/#") ? h.slice(1) : h; // "/#about" -> "#about"
  };

  const isAnchor = (href) => href.startsWith("#") || href.startsWith("/#");

  const isRouteActive = (href) => {
    if (isAnchor(href)) {
      // anchors are only "active" on the home route
      if (pathname !== "/") return false;
      return normHash(href) === hash;
    }
    // blog index and articles
    if (href === "/blogs") return pathname.startsWith("/blogs");
    // exact route match
    return pathname === href;
  };

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-8 text-sm">
        {sections.map(([label, href]) => {
          // prefer scroll-spy on home; else use route/hash fallback
          const isActive = active
            ? normHash(active) === normHash(href)
            : isRouteActive(href);

          return (
            <li key={href}>
              <Link
                href={href}
                prefetch
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative rounded px-1 transition-colors",
                  isActive
                    ? ""
                    : "text-[var(--text-secondary)] hover:text-[var(--brand-700)]",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]",
                ].join(" ")}
              >
                {label}
                {/* underline indicator */}
                <span
                  aria-hidden
                  className={[
                    "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded bg-[var(--brand-600)]",
                    "origin-left transition-[opacity,transform] duration-300",
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0",
                  ].join(" ")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
