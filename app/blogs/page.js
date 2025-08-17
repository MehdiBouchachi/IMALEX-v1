// app/blogs/page.js
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  useDeferredValue,
  memo,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
// Swap with your real data source
import { fakePosts } from "../_data/fakePosts";

/* ---------- helpers ---------- */
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const chunkSizeForWidth = () => {
  if (typeof window === "undefined") return 9;
  const w = window.innerWidth;
  if (w >= 1024) return 12; // 3 cols x 4 rows
  if (w >= 640) return 10; // 2 cols x 5 rows
  return 8; // 1 col  x 8 rows
};

/* ---------- pre-index once ---------- */
const indexedPosts = fakePosts.map((p, i) => ({
  ...p,
  _id: p.id ?? p.slug ?? `p-${i}`,
  _lcTitle: (p.title || "").toLowerCase(),
  _lcAuthor: (p.author?.name || "").toLowerCase(),
  _lcTags: (p.tags || []).map((t) => (t || "").toLowerCase()),
}));

export default function BlogIndexPage() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("all"); // all | title | author | tag
  const [sortBy, setSortBy] = useState("date_desc"); // date_desc | date_asc | name_asc | name_desc
  const [openMode, setOpenMode] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const searchRef = useRef(null);

  const deferredQ = useDeferredValue(q);

  // Debounce input for smooth typing
  const debTimer = useRef(null);
  const onType = (val) => {
    window.clearTimeout(debTimer.current);
    debTimer.current = window.setTimeout(() => setQ(val), 120);
  };

  // Press "/" to focus the search
  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement;
      if (
        e.key === "/" &&
        el?.tagName !== "INPUT" &&
        el?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Filter (pre-indexed lowercased fields)
  const filtered = useMemo(() => {
    const txt = deferredQ.trim().toLowerCase();
    if (!txt) return indexedPosts;
    return indexedPosts.filter((p) => {
      if (mode === "title") return p._lcTitle.includes(txt);
      if (mode === "author") return p._lcAuthor.includes(txt);
      if (mode === "tag") return p._lcTags.some((t) => t.includes(txt));
      return (
        p._lcTitle.includes(txt) ||
        p._lcAuthor.includes(txt) ||
        p._lcTags.some((t) => t.includes(txt))
      );
    });
  }, [deferredQ, mode]);

  // Sort (non-blocking)
  const [isPending, startTransition] = useTransition();
  const [sorted, setSorted] = useState(filtered);
  useEffect(() => {
    startTransition(() => {
      const arr = [...filtered];
      const toTime = (d) => (d ? new Date(d).getTime() : 0);
      switch (sortBy) {
        case "date_asc":
          arr.sort((a, b) => toTime(a.date) - toTime(b.date));
          break;
        case "name_asc":
          arr.sort((a, b) =>
            (a.title || "").localeCompare(b.title || "", undefined, {
              sensitivity: "base",
            })
          );
          break;
        case "name_desc":
          arr.sort((a, b) =>
            (b.title || "").localeCompare(a.title || "", undefined, {
              sensitivity: "base",
            })
          );
          break;
        case "date_desc":
        default:
          arr.sort((a, b) => toTime(b.date) - toTime(a.date));
      }
      setSorted(arr);
    });
  }, [filtered, sortBy]);

  // Incremental render (IO-based)
  const [visible, setVisible] = useState(chunkSizeForWidth());
  const sentinelRef = useRef(null);
  useEffect(() => setVisible(chunkSizeForWidth()), [deferredQ, mode, sortBy]);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible((v) => clamp(v + chunkSizeForWidth(), 0, sorted.length));
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sorted.length]);

  // Options
  const MODE_OPTIONS = [
    { type: "group", label: "Search in" },
    { value: "all", label: "All fields", desc: "Title, writer & tags" },
    { value: "title", label: "Titles only" },
    { value: "author", label: "Writers only" },
    { value: "tag", label: "Tags only" },
  ];
  const SORT_OPTIONS = [
    { type: "group", label: "Date" },
    { value: "date_desc", label: "Newest first" },
    { value: "date_asc", label: "Oldest first" },
    { type: "group", label: "Name" },
    { value: "name_asc", label: "Name A–Z" },
    { value: "name_desc", label: "Name Z–A" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-0)] pb-16 pt-20 md:pt-24">
      <header className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-extrabold tracking-wide"
            style={{
              background: "var(--g-accent-chip)",
              color: "var(--brand-800)",
              border: "1px solid var(--border)",
            }}
          >
            All articles
          </span>
          <h1 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
            Blog
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[var(--text-secondary)]">
            Research notes, product science, and field learnings—curated by
            IMALEX across cosmetics, food supplements, biopesticides, animal
            nutrition, and agri-food.
          </p>
        </div>

        {/* Controls */}
        <div
          className="blog-controls"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-1)",
          }}
        >
          <CustomSelect
            ariaLabel="Search mode"
            value={mode}
            onChange={(v) => {
              setMode(v);
              setOpenMode(false);
            }}
            open={openMode}
            setOpen={setOpenMode}
            options={MODE_OPTIONS}
            className="w-[min(150px,100%)]"
          />

          <div className="blog-input-wrap">
            <label htmlFor="q" className="sr-only">
              Search
            </label>
            <input
              ref={searchRef}
              id="q"
              defaultValue={q}
              onChange={(e) => onType(e.target.value)}
              placeholder="Search by title, writer, or tag…  (press / to focus)"
              className="blog-input"
              inputMode="search"
              autoComplete="off"
            />
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="blog-input-icon"
            >
              <path
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <CustomSelect
            ariaLabel="Sort articles"
            value={sortBy}
            onChange={(v) => {
              setSortBy(v);
              setOpenSort(false);
            }}
            open={openSort}
            setOpen={setOpenSort}
            options={SORT_OPTIONS}
            align="end"
            className="w-[min(180px,100%)] justify-self-end"
          />
        </div>

        <p className="mt-3 text-sm text-[var(--text-muted)]" aria-live="polite">
          {isPending
            ? "Updating…"
            : `${sorted.length} article${sorted.length === 1 ? "" : "s"} found`}
        </p>
      </header>

      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        {sorted.length === 0 ? (
          <Empty />
        ) : (
          <>
            <ul className="cards-grid" aria-label="Search results">
              {sorted.slice(0, visible).map((p) => (
                <li key={p._id}>
                  <MemoBlogCard post={p} href={`/blogs/${p.slug || p._id}`} />
                </li>
              ))}
            </ul>
            <div ref={sentinelRef} aria-hidden className="h-8" />
          </>
        )}
      </main>

      {/* Styles (global so they style portal content too) */}
      <style jsx global>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .blog-controls {
          display: grid;
          gap: 12px;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid var(--border);
          grid-template-columns: minmax(110px, 150px) 1fr minmax(150px, 180px);
          align-items: center;
          contain: content;
        }
        @media (max-width: 520px) {
          .blog-controls {
            grid-template-columns: 1fr;
          }
        }

        .blog-input-wrap {
          position: relative;
        }
        .blog-input {
          height: 46px;
          width: 100%;
          border-radius: 14px;
          padding: 0 12px 0 40px;
          border: 1px solid var(--border);
          background: linear-gradient(0deg, var(--surface-0), var(--surface-0)),
            color-mix(in srgb, var(--brand-400) 6%, transparent);
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
          transition: box-shadow 0.15s, border-color 0.15s, background 0.2s;
        }
        .blog-input::placeholder {
          color: var(--text-muted);
          opacity: 0.9;
        }
        .blog-input:focus {
          outline: none;
          border-color: color-mix(in srgb, var(--brand-600) 55%, var(--border));
          box-shadow: 0 0 0 3px
              color-mix(in srgb, var(--brand-400) 18%, transparent),
            0 1px 0 0 rgba(0, 0, 0, 0.02) inset;
        }
        .blog-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          opacity: 0.85;
          pointer-events: none;
        }

        /* ======= Cards grid: equal widths & heights ======= */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 24px;
          align-items: stretch;
        }
        @media (min-width: 640px) {
          .cards-grid {
            gap: 28px;
          }
        }
        @media (min-width: 1024px) {
          .cards-grid {
            gap: 32px;
          }
        }

        /* ======= Card base (strict flex column) ======= */
        .blog-card {
          position: relative;
          display: flex; /* strict flex */
          flex-direction: column; /* vertical stacking */
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          background: var(--surface-1);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card, 0 6px 22px rgba(0, 0, 0, 0.06));
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
          contain: layout paint;
        }
        .blog-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          background: radial-gradient(
              60% 80% at 10% 0%,
              color-mix(in srgb, var(--brand-500) 45%, transparent),
              transparent 60%
            ),
            radial-gradient(
              70% 80% at 100% 120%,
              color-mix(in srgb, var(--brand-700) 25%, transparent),
              transparent 60%
            );
          opacity: 0;
          transition: opacity 0.25s;
          pointer-events: none;
          z-index: 0;
        }
        .blog-card:hover::before {
          opacity: 0.6;
        }
        .blog-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--brand-600) 28%, var(--border));
          box-shadow: 0 12px 28px
              color-mix(in srgb, var(--brand-700) 12%, transparent),
            0 6px 20px rgba(0, 0, 0, 0.1);
        }

        /* fixed media ratio for uniform height */
        .blog-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
          flex: 0 0 auto; /* fixed height block */
        }
        .blog-card-media img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          transition: transform 0.35s;
          transform-origin: 50% 50%;
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-card-media img {
            transition: none;
          }
        }
        .blog-card:hover .blog-card-media img {
          transform: scale(1.06) translateY(-1.5%);
        }
        .blog-card-mediaFx {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.08),
              rgba(0, 0, 0, 0) 58%
            ),
            radial-gradient(
              90% 60% at 10% 100%,
              rgba(0, 0, 0, 0.12),
              transparent 60%
            );
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        /* body flex column with spacer to push footer */
        .blog-card-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
          min-height: 0;
          flex: 1 1 auto;
        }
        .blog-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .blog-tag {
          border: 1px solid
            color-mix(in srgb, var(--brand-700) 30%, transparent);
          background: color-mix(in srgb, var(--brand-400) 10%, transparent);
          color: var(--brand-800);
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 800;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .blog-card-title {
          color: var(--text-primary);
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.01em;
          line-height: 1.28;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .blog-card-title {
            font-size: 18px;
            -webkit-line-clamp: 3;
          }
        }

        /* excerpt is allowed to grow but clamped for consistency */
        .blog-card-excerpt {
          color: var(--text-secondary);
          font-size: 13.5px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1 1 auto;
        }

        /* spacer ensures footer stays at the bottom even with short text */
        .blog-card-spacer {
          flex: 1 1 auto;
          min-height: 0;
        }

        /* footer pinned to bottom */
        .blog-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: var(--text-muted);
          font-size: 12px;
          flex: 0 0 auto;
        }
        .blog-card-author {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .blog-card-avatar {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          object-fit: cover;
        }

        .read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          border: 1px solid
            color-mix(in srgb, var(--brand-700) 30%, transparent);
          background: color-mix(in srgb, var(--brand-400) 10%, transparent);
          color: var(--brand-800);
          padding: 6px 12px;
          border-radius: 999px;
          transition: transform 0.15s, background 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .read-btn:hover {
          transform: translateY(-1px);
          background: color-mix(in srgb, var(--brand-400) 20%, transparent);
          border-color: color-mix(in srgb, var(--brand-700) 45%, transparent);
        }
        .read-btn span[aria-hidden] {
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}

/* ================= Custom Select (portal menu + inside-click fix) ================= */
const CustomSelect = memo(function CustomSelect({
  ariaLabel,
  value,
  onChange,
  options,
  align = "start",
  className = "",
  open,
  setOpen,
}) {
  const [highlight, setHighlight] = useState(-1);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 240 });
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const popRef = useRef(null); // portal menu ref

  const flat = useMemo(
    () =>
      options
        .map((o, idx) => (o.type === "group" ? null : { ...o, _i: idx }))
        .filter(Boolean),
    [options]
  );

  // Position popup (fixed to viewport)
  const place = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const desiredWidth = Math.max(r.width, 240);
    const vw = window.innerWidth;
    const leftStart = align === "end" ? r.right - desiredWidth : r.left;
    const left = Math.max(8, Math.min(leftStart, vw - desiredWidth - 8));
    const top = Math.min(window.innerHeight - 10, r.bottom + 8);
    setPos({ top, left, width: desiredWidth });
  };

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) {
      place();
      const onScroll = () => place();
      const onResize = () => place();
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", onResize);
      };
    }
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    const i = flat.findIndex((o) => o.value === value);
    setHighlight(i >= 0 ? i : 0);
  }, [open, flat, value]);

  // Close on outside click but ignore clicks inside the portal menu
  useEffect(() => {
    const handler = (e) => {
      const t = e.target;
      const clickedTrigger = rootRef.current?.contains(t);
      const clickedMenu = popRef.current?.contains(t);
      if (clickedTrigger || clickedMenu) return;
      setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  // Keyboard nav
  const onKeyDown = (e) => {
    if (
      !open &&
      (e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter" ||
        e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, flat.length - 1));
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setHighlight(flat.length - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const sel = flat[highlight];
      if (sel) {
        onChange(sel.value);
        setOpen(false);
        btnRef.current?.focus();
      }
    }
  };

  const current = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  return (
    <div className={`csel ${className}`} data-align={align} ref={rootRef}>
      <button
        type="button"
        ref={btnRef}
        className="csel-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
      >
        <span>{current?.label || "Select"}</span>
      </button>
      <span className="csel-arrow" aria-hidden />

      {mounted &&
        open &&
        createPortal(
          <div
            ref={popRef}
            role="listbox"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
              zIndex: 9999,
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--surface-0)",
              boxShadow:
                "0 18px 44px rgba(0,0,0,.18), 0 6px 20px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.06)",
              padding: 8,
              maxHeight: "60svh",
              overflow: "auto",
              transformOrigin: "top",
              animation: "cselIn .12s ease-out",
            }}
            className="csel-pop"
          >
            {options.map((opt, idx) =>
              opt.type === "group" ? (
                <div
                  key={`g-${idx}`}
                  className="csel-optgrp"
                  style={{
                    padding: "8px 10px 6px",
                    color: "var(--text-muted)",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                  }}
                >
                  {opt.label}
                </div>
              ) : (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  data-active={opt.value === value}
                  data-highlight={flat[highlight]?.value === opt.value}
                  className="csel-opt"
                  onMouseEnter={() =>
                    setHighlight(flat.findIndex((o) => o.value === opt.value))
                  }
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 10,
                    cursor: "pointer",
                    border: "1px solid transparent",
                  }}
                >
                  <div>
                    <div
                      className="csel-opt-label"
                      style={{
                        fontWeight: 800,
                        fontSize: 13.5,
                        color: "var(--text-primary)",
                      }}
                    >
                      {opt.label}
                    </div>
                    {opt.desc ? (
                      <div
                        className="csel-opt-desc"
                        style={{ fontSize: 12, color: "var(--text-secondary)" }}
                      >
                        {opt.desc}
                      </div>
                    ) : null}
                  </div>
                  {opt.value === value ? (
                    <span
                      className="csel-check"
                      style={{ fontWeight: 900, color: "var(--brand-700)" }}
                    >
                      ✓
                    </span>
                  ) : (
                    <span aria-hidden style={{ opacity: 0 }}>
                      ✓
                    </span>
                  )}
                </div>
              )
            )}
          </div>,
          document.body
        )}

      {mounted &&
        createPortal(
          <style>{`
            @keyframes cselIn{from{opacity:.001;transform:translateY(-4px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
            .csel-opt[data-active="true"]{background:color-mix(in srgb,var(--brand-400) 10%,transparent);border-color:color-mix(in srgb,var(--brand-600) 22%,transparent)}
            .csel-opt[data-highlight="true"]{background:color-mix(in srgb,var(--brand-400) 18%,transparent)}
          `}</style>,
          document.body
        )}
    </div>
  );
});

/* ================= Cards (memoized) & Empty ================= */
const MemoBlogCard = memo(function BlogCard({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);
  return (
    <article className="blog-card">
      {/* media (fixed height) */}
      <div className="blog-card-media">
        <Image
          src={post.image || "/placeholder.png"}
          alt=""
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover"
          loading="lazy"
        />
        <span aria-hidden className="blog-card-mediaFx" />
      </div>

      {/* body (flex column) */}
      <div className="blog-card-body">
        {tags.length > 0 && (
          <div className="blog-card-tags">
            {tags.map((t) => (
              <span key={t} className="blog-tag">
                {t}
              </span>
            ))}
          </div>
        )}

        <h3 className="blog-card-title">{post.title}</h3>
        {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}

        {/* spacer pushes footer down if content is short */}
        <div className="blog-card-spacer" />

        {/* footer (always at bottom) */}
        <div className="blog-card-footer">
          <span className="blog-card-author">
            {post.author?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.author.avatar}
                alt=""
                width={18}
                height={18}
                className="blog-card-avatar"
                loading="lazy"
              />
            ) : null}
            <span className="truncate">
              {post.author?.name ? `By ${post.author.name}` : ""}
              {post.author?.name && post.date ? " · " : ""}
              {post.date || ""}
            </span>
          </span>

          <Link
            href={href}
            className="read-btn"
            aria-label={`Read ${post.title}`}
          >
            Read more <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
});

function Empty() {
  return (
    <div
      className="mt-10 grid place-items-center rounded-xl border p-10 text-center"
      style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-xl">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          No results
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Try a different keyword or switch the search mode.
        </p>
      </div>
    </div>
  );
}
