"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DesktopNav({ sections = [], active }) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => setHash(window.location.hash || "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const normHash = (h) => (!h ? "" : h.startsWith("/#") ? h.slice(1) : h);
  const isAnchor = (href) => href.startsWith("#") || href.startsWith("/#");

  const isRouteActive = (href) => {
    if (isAnchor(href)) {
      if (pathname !== "/") return false;
      return normHash(href) === hash;
    }
    if (href === "/blogs") return pathname.startsWith("/blogs");
    return pathname === href;
  };

  return (
    // visible only from xl+
    <nav className="hidden nav:block min-w-0">
      <ul className="flex items-center gap-3 lg:gap-4.5 xl:gap-6 text-[15px] xl:text-base min-w-0">
        {sections.map(([label, href]) => {
          const isActive = active
            ? normHash(active) === normHash(href)
            : isRouteActive(href);

          return (
            <li key={href} className="min-w-0">
              <Link
                href={href}
                prefetch
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative rounded px-1 transition-colors whitespace-nowrap",
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--brand-700)]",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]",
                ].join(" ")}
              >
                {label}
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
