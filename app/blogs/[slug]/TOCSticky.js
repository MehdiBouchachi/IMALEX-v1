// app/blogs/[slug]/TOCSticky.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TOCSticky({ groups }) {
  const [active, setActive] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const headings = groups.flatMap((g) => [
      { id: g.id },
      ...(g.children || []).map((c) => ({ id: c.id })),
    ]);

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis.length > 0) setActive(vis[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [groups, mounted]);

  if (!mounted) {
    // SSR-safe static version
    return (
      <nav className="sticky top-24 text-sm leading-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          On this page
        </h2>
        <ul className="space-y-1">
          {groups.map((g) => (
            <li key={g.id}>
              <Link
                href={`#${g.id}`}
                className="block px-2 py-1 rounded text-[var(--text-secondary)]"
              >
                {g.num} {g.text}
              </Link>
              {g.children?.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1">
                  {g.children.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`#${c.id}`}
                        className="block px-2 py-1 rounded text-[var(--text-secondary)]"
                      >
                        {c.num} {c.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Client-enhanced version with active highlighting
  return (
    <nav className="sticky top-24 text-sm leading-6">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
        On this page
      </h2>
      <ul className="space-y-1">
        {groups.map((g) => (
          <li key={g.id}>
            <Link
              href={`#${g.id}`}
              className={`block px-2 py-1 rounded ${
                active === g.id
                  ? "bg-[var(--brand-100)] text-[var(--brand-800)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {g.num} {g.text}
            </Link>
            {g.children?.length > 0 && (
              <ul className="ml-4 mt-1 space-y-1">
                {g.children.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`#${c.id}`}
                      className={`block px-2 py-1 rounded ${
                        active === c.id
                          ? "bg-[var(--brand-100)] text-[var(--brand-800)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {c.num} {c.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
