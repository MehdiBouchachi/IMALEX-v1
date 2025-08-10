"use client";
import Link from "next/link";

export default function Navigation({ isMobile = false, session, onClickLink }) {
  const base =
    "transition-colors text-slate-700 hover:text-accent-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300/50 rounded-sm";
  const items = [
    { href: "/#services", label: "Services" },
    { href: "/#sectors", label: "Sectors" },
    { href: "/#why", label: "Why IMALEX" },
    { href: "/#process", label: "Process" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="z-10 text-[15px] w-full">
      <ul
        className={`flex ${
          isMobile
            ? "flex-col items-center justify-center w-full space-y-6 font-medium"
            : "items-center gap-10"
        }`}
      >
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              onClick={isMobile ? onClickLink : undefined}
              className={base}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
