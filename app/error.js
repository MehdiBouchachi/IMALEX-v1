"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Button from "../widgets/ui/Button";

export default function Error({ error, reset }) {
  const pathname = usePathname();
  const email = process.env.TO_EMAIL; // ← change if needed

  useEffect(() => {
    console.error(error);
  }, [error]);

  const mailto = useMemo(() => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://imalex.bio${pathname || ""}`;
    const ref = typeof document !== "undefined" ? document.referrer : "";
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

    const subject = `Error on IMALEX — ${pathname || "/"}`;
    const body = [
      "Hi IMALEX team,",
      "",
      "I encountered an error while browsing.",
      "",
      `URL: ${url}`,
      `Referrer: ${ref || "n/a"}`,
      `User agent: ${ua}`,
      "",
      `Error: ${String(error?.message || "(no message)")}`,
      "",
      "Additional details: ",
    ].join("");

    return `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [pathname, error]);

  return (
    <main aria-labelledby="err-title" className="px-4 py-16 sm:py-24">
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--text-secondary)] border-[var(--tile-border)]">
          Unexpected error
        </span>
        <h1
          id="err-title"
          className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Something went wrong.
        </h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          You can try again, or send us an email with the error details.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Button
            href={mailto}
            variant="outline"
            prefetch={false}
            aria-label={`Email ${email} about this error`}
          >
            Email us
          </Button>
        </div>
        <details className="mx-auto mt-6 max-w-xl rounded-lg border border-[var(--tile-border)] bg-[var(--surface-0)] p-4 text-left text-sm text-[var(--text-secondary)] open:shadow-sm">
          <summary className="cursor-pointer select-none font-semibold">
            Technical details
          </summary>
          <pre className="mt-3 overflow-auto whitespace-pre-wrap text-xs opacity-80">
            {String(error?.message || "")}
          </pre>
        </details>
      </section>
    </main>
  );
}
