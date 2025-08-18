"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { HOME_SECTIONS, buildSections } from "./sections";
import useScrollSolidHidden from "./useScrollSolidHidden";
import useActiveSection from "./useActiveSection";
import Logo from "../../../ui/Logo";
import DesktopNav from "../../../ui/DesktopNav";
import Button from "../../../ui/Button";

export default function Header() {
  const { solid, hidden } = useScrollSolidHidden(64);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname?.startsWith("/#");

  const active = useActiveSection(HOME_SECTIONS);
  const sections = buildSections(isHome);
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        // Glass when solid, fully transparent at the top
        solid
          ? [
              "border-b shadow-[0_10px_28px_rgba(0,0,0,.10)]",
              // fallback tint (when no backdrop-filter)
              "bg-[color:color-mix(in_srgb,var(--surface-1)_46%,transparent)]",
              "border-[color:color-mix(in_srgb,var(--border)_55%,transparent)]",
              // true glass on capable browsers
              "supports-[backdrop-filter]:backdrop-blur-md",
              "supports-[backdrop-filter]:backdrop-saturate-125",
              "supports-[backdrop-filter]:bg-[color:color-mix(in_srgb,var(--surface-1)_68%,transparent)]",
              "supports-[backdrop-filter]:border-[color:color-mix(in_srgb,var(--border)_65%,transparent)]",
            ].join(" ")
          : "bg-transparent border-transparent shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl h-16 flex items-center justify-between gap-2 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-3 min-w-0"
        >
          <Logo />
        </Link>

        {/* Desktop nav -> only from lg+ to avoid iPad overflow */}
        <div className="hidden nav:block min-w-0">
          <DesktopNav sections={sections} active={active} />
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-1.5 lg:gap-2 nav:gap-2.5 xl:gap-3">
          {/* Show CTA only on large screens; on tablets it’s inside the MobileMenu */}
          <Button
            variant="primary"
            size="sm"
            asLink
            href={contactHref}
            className="hidden nav:inline-flex"
          >
            Request a Quote
          </Button>

          <ThemeToggle />
          {/* Hamburger is visible up to lg */}
          <MobileMenu sections={sections} contactHref={contactHref} />
        </div>
      </div>
    </header>
  );
}
