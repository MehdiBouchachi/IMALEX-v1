"use client";
import Link from "next/link";
import Logo from "../ui/Logo";
import DesktopNav from "../ui/DesktopNav";
import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { SECTIONS } from "./sections";
import useScrollSolidHidden from "./useScrollSolidHidden";
import useActiveSection from "./useActiveSection";

export default function Header({ sections = SECTIONS }) {
  const { solid, hidden } = useScrollSolidHidden(64);
  const active = useActiveSection(sections);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100] will-change-transform",
        "transition-[transform,background-color,backdrop-filter,border-color] duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid
          ? "supports-[backdrop-filter]:backdrop-blur-md bg-[var(--surface-1)] border-b border-[var(--border-subtle)]"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] rounded-lg"
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <DesktopNav sections={sections} active={active} />

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
