"use client";

import { useEffect, useState } from "react";

function idFrom(text) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildTOC(blocks = []) {
  const items = [];
  let h2 = 0,
    h3 = 0;
  for (const b of blocks) {
    if (b.t === "h2") {
      h2++;
      h3 = 0;
      items.push({ id: idFrom(b.x), text: b.x, level: 2, num: String(h2) });
    } else if (b.t === "h3") {
      if (h2 === 0) h2 = 1; // ensure parent exists
      h3++;
      items.push({ id: idFrom(b.x), text: b.x, level: 3, num: `${h2}.${h3}` });
    }
  }
  // fallback if no headings
  if (items.length === 0) {
    items.push({ id: "top", text: "Overview", level: 2, num: "1" });
  }
  return items;
}

export default function ArticleTOC({ items = [] }) {
  const [active, setActive] = useState(items[0]?.id || null);

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id);
            break;
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 1] }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="toc-wrap">
      <div className="toc-inner">
        <div className="toc-title">On this page</div>
        <nav className="toc-nav">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={`toc-link lvl-${it.level} ${
                active === it.id ? "active" : ""
              }`}
            >
              <span className="toc-num">{it.num}</span>
              <span className="toc-text">{it.text}</span>
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .toc-wrap {
          position: sticky;
          top: 90px; /* below header */
          align-self: start;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          padding-right: 4px;
        }
        .toc-inner {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface-1);
          padding: 16px;
          font-size: 14px;
        }
        .toc-title {
          font-weight: 800;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
          color: var(--text-muted);
        }
        .toc-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .toc-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 6px;
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .toc-link:hover {
          background: color-mix(in srgb, var(--brand-400) 12%, transparent);
          color: var(--text-primary);
        }
        .toc-link.active {
          background: color-mix(in srgb, var(--brand-400) 22%, transparent);
          color: var(--brand-800);
          font-weight: 700;
        }
        .toc-num {
          font-weight: 700;
          font-size: 12px;
          color: var(--brand-700);
          flex-shrink: 0;
        }
        .toc-text {
          flex: 1;
          line-height: 1.4;
        }
        .toc-link.lvl-3 {
          margin-left: 18px;
          font-size: 13px;
        }
        @media (max-width: 1024px) {
          .toc-wrap {
            display: none; /* hide on mobile */
          }
        }
      `}</style>
    </aside>
  );
}
