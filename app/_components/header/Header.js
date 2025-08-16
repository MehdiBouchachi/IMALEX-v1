"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { HOME_SECTIONS, buildSections } from "./sections";
import useScrollSolidHidden from "./useScrollSolidHidden";
import useActiveSection from "./useActiveSection";
import Logo from "../ui/Logo";
import DesktopNav from "../ui/DesktopNav";
import Button from "../ui/Button";
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
        "fixed inset-x-0 top-0 z-[100] transition duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
        solid
          ? "supports-[backdrop-filter]:backdrop-blur-md bg-[var(--surface-1)] border-b border-[var(--border-subtle)]"
          : "bg-transparent border-transparent",
        isHome
          ? "border-transparent"
          : "border-b border-[var(--border-subtle)]",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={"/"}
          aria-label="Go to homepage"
          className="flex items-center gap-3"
        >
          <Logo />
        </Link>

        {/* Your DesktopNav should accept `active` (can be null off home) */}
        <DesktopNav sections={sections} active={active} />

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            asLink
            href={contactHref}
            className="hidden sm:inline-flex"
          >
            Request a Quote
          </Button>

          <ThemeToggle />
          <MobileMenu sections={sections} contactHref={contactHref} />
        </div>
      </div>
    </header>
  );
}
