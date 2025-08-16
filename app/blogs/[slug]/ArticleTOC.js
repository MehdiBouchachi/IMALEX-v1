"use client";
import { useEffect, useMemo, useState } from "react";

export default function ArticleTOC({ blocks = [], title = "On this page" }) {
  const items = useMemo(() => {
    const out = [];
    for (const b of blocks) {
      if (b?.t === "h2" || b?.t === "h3")
        out.push({ id: idFrom(b.x), text: String(b.x), level: b.t });
    }
    return out;
  }, [blocks]);

  const [active, setActive] = useState(items[0]?.id || "");

  useEffect(() => {
    if (!items.length) return;
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top
          )[0];
        if (top?.target?.id) setActive(top.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  if (!items.length) return null;

  return (
    <nav
      aria-label="Article table of contents"
      className="text-[14px]"
      style={{ color: "var(--text-secondary)" }}
    >
      <div
        className="mb-3 text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        {title}
      </div>

      <ul className="relative space-y-1">
        {/* soft vertical rail inside the TOC itself */}

        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li
              key={it.id}
              className={`relative ${it.level === "h3" ? "pl-6" : "pl-4"}`}
            >
              {/* dot */}
              <span
                aria-hidden
                className="absolute left-[-3px] top-[10px] h-2 w-2 rounded-full transition-colors"
                style={{
                  background: isActive ? "var(--brand-700)" : "var(--border)",
                }}
              />
              <a
                href={`#${it.id}`}
                onClick={(e) => go(e, it.id)}
                className="block py-1 pr-2 underline-offset-2 hover:underline focus:underline outline-none"
                style={{
                  color: isActive
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                }}
              >
                {/* FREE TEXT: no clamp/truncate, allow wrapping */}
                <span className="whitespace-normal leading-snug break-words">
                  {it.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function idFrom(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}
