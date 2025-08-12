"use client";

export default function DesktopNav({ sections, active }) {
  return (
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
                aria-current={isActive ? "page" : undefined}
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
  );
}
