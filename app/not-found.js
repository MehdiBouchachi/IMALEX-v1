"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Button from "../widgets/ui/Button";

/**
 * IMALEX — Simple 404 (keeps header & footer)
 * - Minimal copy, two CTAs (Home + Email)
 * - "Email us" opens the user's mail app with useful context prefilled
 * - Uses brand tokens only
 */
export default function NotFound() {
  const pathname = usePathname();
  const email = process.env.TO_EMAIL; // ← change if needed

  const mailto = useMemo(() => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://imalex.bio${pathname || ""}`;
    const ref = typeof document !== "undefined" ? document.referrer : "";
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

    const subject = `404 on IMALEX — ${pathname || "/"}`;
    const body = [
      "Hi IMALEX team,",
      "",
      "I landed on a missing page.",
      "",
      `URL: ${url}`,
      `Referrer: ${ref || "n/a"}`,
      `User agent: ${ua}`,
      "",
      "Additional details: ",
    ].join("");

    return `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [pathname]);

  return (
    <main className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--text-primary)] border-[var(--tile-border)]">
          404 — Not found
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-[var(--text-primary)]">
            We couldn’t find that page
          </span>
        </h1>
        <p className="mt-3 text-base text-[var(--text-secondary)]">
          The link may be broken or the page moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" className="min-w-[9rem]">
            Back to home
          </Button>
          <Button
            href={mailto}
            variant="outline"
            className="min-w-[9rem]"
            prefetch={false}
            aria-label={`Email ${email} about this 404`}
          >
            Email us
          </Button>
        </div>
        <p className="mt-4 text-xs text-[var(--contact-ghost-text)]">
          We’ll receive the broken URL automatically in your email draft.
        </p>
      </div>
    </main>
  );
}
