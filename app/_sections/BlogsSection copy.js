// app/_sections/BlogsSection.js
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../_components/ui/Button";
import EyebrowChip from "../_components/ui/EyebrowChip";

const cx = (...a) => a.filter(Boolean).join(" ");

export default function BlogsSection({
  eyebrow = "Latest insights",
  title = "From the blog",
  description = "Research notes, product science, and field learnings.",
  posts = [],
  basePath = "/blogs",
  showCTA = true,
}) {
  // Tags
  const tags = useMemo(() => {
    const s = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [posts]);

  const [selected, setSelected] = useState("All");
  useEffect(() => {
    if (!tags.includes(selected)) setSelected("All");
  }, [tags, selected]);

  const filtered =
    selected === "All"
      ? posts
      : posts.filter((p) => (p.tags || []).includes(selected));

  // Curated arrangement for first 8
  const items = filtered.slice(0, 8);

  return (
    <section id="blog" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <EyebrowChip>{eyebrow}</EyebrowChip>
            <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight tracking-[-0.02em] text-[var(--text-primary)]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-[15px] leading-7 text-[var(--text-secondary)]">
                {description}
              </p>
            ) : null}
          </div>

          {showCTA && posts.length > 0 && (
            <Button
              asLink
              href={basePath}
              size="sm"
              variant="secondary"
              rounded="lg"
              className="self-start sm:self-auto"
            >
              View all articles
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="-mr-0.5"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </Button>
          )}
        </div>

        {/* Filters */}
        {tags.length > 1 && (
          <div className="mt-6">
            <div
              className="
                -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 pt-0.5 no-scrollbar
                snap-x snap-mandatory md:overflow-visible md:flex-wrap md:snap-none
              "
              role="tablist"
              aria-label="Filter articles"
            >
              {tags.map((tag) => {
                const active = tag === selected;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelected(tag)}
                    className={cx("chip", active && "chip--active")}
                    aria-selected={active}
                    role="tab"
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <span className="sr-only" aria-live="polite">
              {items.length} articles shown
            </span>
          </div>
        )}

        {/* Empty */}
        {items.length === 0 && <EmptyState />}

        {/* Editorial grid */}
        {items.length > 0 && (
          <div className="mt-8 mb-0 magazine-grid">
            {items[0] && (
              <HeroWide
                post={items[0]}
                href={`${basePath}/${items[0].slug || items[0].id}`}
              />
            )}
            {items[1] && (
              <TallSplit
                post={items[1]}
                href={`${basePath}/${items[1].slug || items[1].id}`}
              />
            )}

            {items
              .slice(2)
              .map((p, i) =>
                i % 3 === 0 ? (
                  <SplitCardV2
                    key={p.slug || p.id}
                    post={p}
                    href={`${basePath}/${p.slug || p.id}`}
                  />
                ) : (
                  <SquareCard
                    key={p.slug || p.id}
                    post={p}
                    href={`${basePath}/${p.slug || p.id}`}
                  />
                )
              )}
          </div>
        )}
      </div>

      {/* Scoped styles */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* ensure no trailing margin from the last VISIBLE element */
        #blog > :not(style):last-child {
          margin-bottom: 0 !important;
        }

        /* ---------- HERO (classic: softer veil + readable text) ---------- */
        :root {
          --brandG-500: #3c8b63;
          --brandG-600: #2f5f4b;
          --gold-1: #eddcaa;
          --gold-2: #c6a763;
          --edge: color-mix(in srgb, var(--border) 82%, var(--gold-2) 18%);
        }

        .hero {
          position: relative;

          min-height: clamp(320px, 44vh, 520px);

          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--edge);
          background: var(--surface-0);
          box-shadow: 0 18px 56px rgba(0, 0, 0, 0.18);
          isolation: isolate;
        }
        .hero__media {
          position: absolute;
          inset: 0;
        }
        .hero__media img {
          object-fit: cover;
        }

        .hero__veil {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.42) 0%,
            rgba(0, 0, 0, 0.28) 40%,
            rgba(0, 0, 0, 0.12) 85%
          );
        }

        .hero__content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: grid;
          align-items: end;
          padding: clamp(16px, 4vw, 40px);
        }
        .hero__plate {
          max-width: min(86ch, 100%);
          border-radius: 16px;
          padding: clamp(14px, 2vw, 20px) clamp(16px, 3vw, 26px);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background: color-mix(in srgb, var(--surface-0) 14%, transparent);
          border: 1px solid var(--edge);
          box-shadow: 0 10px 34px rgba(0, 0, 0, 0.18);
        }
        .hero__meta,
        .hero__title,
        .hero__excerpt {
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
        }
        .hero__meta {
          color: #fff;
          opacity: 0.95;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.03em;
        }
        .hero__title {
          color: #fff;
          font-weight: 900;
          letter-spacing: -0.015em;
          font-size: clamp(26px, 3.5vw, 48px);
          line-height: 1.08;
          text-wrap: balance;
        }
        .hero__excerpt {
          color: #fff;
          opacity: 0.92;
          margin-top: 8px;
          font-size: clamp(14px, 1.5vw, 16px);
          line-height: 1.55;
          max-width: 70ch;
        }
        .hero__footer {
          margin-top: 12px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }
        .hero__cta {
          color: var(--gold-1);
          font-weight: 900;
          display: inline-flex;
          gap: 8px;
          text-decoration: none;
        }
        /* ---------- HERO HOVER EFFECT ---------- */
        .hero {
          transition: transform 0.35s ease, box-shadow 0.35s ease,
            border-color 0.35s ease;
        }
        .hero:hover {
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
          border-color: var(--edge-strong);
        }

        /* zoom on image */
        .hero__media img {
          transform: scale(1.02);
          transition: transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .hero:hover .hero__media img {
          transform: scale(1.06);
        }

        /* sheen sweep */
        .hero__sheen {
          position: absolute;
          inset: -40% -80%;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            75deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 60%
          );
          transform: translateX(-30%) rotate(8deg);
          opacity: 0;
          transition: opacity 0.25s ease,
            transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .hero:hover .hero__sheen {
          opacity: 1;
          transform: translateX(10%) rotate(8deg);
        }

        @media (max-width: 640px) {
          .hero__veil {
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.38) 0%,
              rgba(0, 0, 0, 0.22) 46%,
              rgba(0, 0, 0, 0.06) 82%
            );
          }
        }

        /* ---------- Mansory palette ---------- */
        :root {
          --brandG-500: #3c8b63;
          --brandG-600: #2f5f4b;
          --brandG-700: #244b3b;
          --gold-1: #eddcaa;
          --gold-2: #c6a763;
          --edge-strong: color-mix(
            in srgb,
            var(--border) 48%,
            var(--gold-2) 52%
          );
        }

        /* Chips */
        .chip {
          border: 1px solid var(--edge);
          background: color-mix(in srgb, var(--surface-0) 85%, transparent);
          color: var(--text-secondary);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
          transition: background 120ms ease, color 120ms ease,
            border-color 120ms ease;
        }
        .chip:hover {
          border-color: var(--edge-strong);
        }
        .chip--active {
          background: color-mix(in srgb, var(--brandG-500) 16%, transparent);
          color: var(--brandG-700);
          border-color: color-mix(in srgb, var(--brandG-500) 65%, transparent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        /* Editorial Grid — hero spans two rows */
        .magazine-grid {
          display: grid;
          gap: 24px;
          grid-template-areas:
            "hero hero tall"
            "hero hero tall"
            "split1 square1 square2";
          grid-template-columns: 2fr 1fr 1fr;
          align-items: stretch;
          grid-auto-rows: minmax(180px, auto);
        }
        @media (max-width: 1024px) {
          .magazine-grid {
            grid-template-areas:
              "hero  tall"
              "hero  tall"
              "split1 split1"
              "square1 square1"
              "square2 square2";
            grid-template-columns: 1.5fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .magazine-grid {
            grid-template-areas:
              "hero"
              "tall"
              "split1"
              "square1"
              "square2";
            grid-template-columns: 1fr;
          }
        }
        .magazine-grid > article:nth-child(1) {
          grid-area: hero;
        }
        .magazine-grid > article:nth-child(2) {
          grid-area: tall;
        }
        .magazine-grid > article:nth-child(3) {
          grid-area: split1;
        }
        .magazine-grid > article:nth-child(4) {
          grid-area: square1;
        }
        .magazine-grid > article:nth-child(5) {
          grid-area: square2;
        }
        .magazine-grid > article:nth-child(6) {
          grid-area: split2;
        }
        .magazine-grid > article:nth-child(7) {
          grid-area: square3;
        }
        .magazine-grid > article:nth-child(8) {
          grid-area: square4;
        }

        /* Card primitives + polish */
        .blog-card {
          background: var(--surface-0);
          border: 1px solid var(--edge);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
        }
        .dark .blog-card {
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
        }
        .blog-card .title {
          color: var(--text-primary);
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .blog-card .excerpt {
          color: var(--text-secondary);
        }
        .meta,
        .blog-card .meta {
          color: var(--text-muted);
          font-size: 12px;
        }

        /* Unified ONE-COLOR tag system (brand green) */
        .meta .pill,
        .blog-card .pill {
          border: 1px solid
            color-mix(in srgb, var(--brandG-500) 65%, transparent);
          background: color-mix(in srgb, var(--brandG-500) 18%, transparent);
          color: var(--brandG-600);
          padding: 5px 10px;
          border-radius: 999px;
          font-weight: 800;
        }

        .read-inline {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          font-weight: 800;
          font-size: 14px;
          color: var(--brandG-600);
        }
        .dark .read-inline {
          color: var(--brandG-500);
        }

        /* -------- Split Card V2 (editorial panel + diagonal seam) -------- */
        .split-v2 {
          position: relative;
        }
        .split-v2 .media-bleed > div {
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        .split-v2 .cut-corner {
          position: absolute;
          right: -1px;
          top: 0;
          bottom: 0;
          width: 26px;
          background: radial-gradient(
              36px 36px at 0 50%,
              transparent 69%,
              var(--surface-0) 70%
            )
            right/26px 100% no-repeat;
        }
        .split-v2 .inner {
          background: linear-gradient(
            180deg,
            var(--surface-0),
            color-mix(in srgb, var(--surface-0) 92%, transparent)
          );
          box-shadow: inset 0 0 0 1px var(--edge),
            0 1px 0 rgba(255, 255, 255, 0.02);
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        .split-v2 .divider {
          flex: 1 1 auto;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--edge),
            transparent
          );
        }
        .split-v2 .caption {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .split-v2 .bullets {
          margin: 0;
          padding-left: 18px;
          display: grid;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 13.5px;
        }
        .split-v2 .bullets li {
          list-style: disc;
        }

        @media (max-width: 1024px) {
          .split-v2 .cut-corner {
            display: none !important;
          }
          .split-v2 .inner {
            border-radius: 0 0 20px 20px;
          }
          .split-v2 .media-bleed > div {
            border-radius: 20px 20px 0 0;
          }
        }

        /* ---------- Extra polish for the Tall card image top ---------- */
        /* ---------------- Tall card: OVERLAY TITLE + TAGS ---------------- */
        .tall {
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
        }
        .tall .media-wrap {
          position: relative;
          height: min(48vw, 340px);

          overflow: hidden;
          border-radius: 20px 20px 0 0;
          isolation: isolate;
        }
        .tall .media-wrap img,
        .tall .media-wrap span[data-nimg="fill"] > img {
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .tall:hover .media-wrap img {
          transform: scale(1.06);
        }
        /* contrast + vignette */
        .tall .media__edge {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.22),
              rgba(0, 0, 0, 0) 56%
            ),
            radial-gradient(
              80% 60% at 10% 100%,
              rgba(0, 0, 0, 0.14),
              transparent 60%
            );
        }
        .tall .media__sheen {
          position: absolute;
          inset: -40% -80%;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            75deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 60%
          );
          transform: translateX(-30%) rotate(8deg);
          opacity: 0;
          transition: opacity 0.18s ease,
            transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .tall:hover .media__sheen {
          opacity: 1;
          transform: translateX(10%) rotate(8deg);
        }
        /* glass plate */
        .tall .plate {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 2;
          border-radius: 12px;
          padding: 10px 12px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background: color-mix(in srgb, var(--surface-0) 16%, transparent);
          border: 1px solid var(--edge);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
        }
        .tall .meta,
        .tall .title {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }
        .tall .meta {
          color: #fff;
          opacity: 0.96;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .tall .title {
          color: #fff;
          font-weight: 900;
          font-size: clamp(16px, 2vw, 20px);
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-wrap: balance;
        }
        /* body below */
        .tall .body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tall .excerpt {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.55;
        }
        .tall .t-footer {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--edge);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        /* mobile image height */
        @media (max-width: 640px) {
          .tall .media-wrap {
            height: 220px;
          }
        }

        /* ---------- HOVER POLISH for cards below hero ---------- */
        .hover-card {
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            border-color 0.18s ease, filter 0.18s ease;
        }
        .hover-card:hover {
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.2);
          border-color: var(--edge-strong);
          filter: saturate(1.02);
        }
        .media {
          position: relative;
          overflow: hidden;
        }
        .media img {
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .hover-card:hover .media img {
          transform: scale(1.06);
        }
        .media__edge {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.18),
              rgba(0, 0, 0, 0) 58%
            ),
            radial-gradient(
              80% 60% at 10% 100%,
              rgba(0, 0, 0, 0.14),
              transparent 60%
            );
          mix-blend-mode: multiply;
        }
        .media__sheen {
          position: absolute;
          inset: -40% -80%;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            75deg,
            transparent 40%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 60%
          );
          transform: translateX(-30%) rotate(8deg);
          opacity: 0;
          transition: opacity 0.2s ease,
            transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .hover-card:hover .media__sheen {
          opacity: 1;
          transform: translateX(10%) rotate(8deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .hover-card,
          .media img,
          .media__sheen {
            transition: none !important;
          }
          .hover-card:hover .media img {
            transform: none !important;
          }
          .hover-card:hover .media__sheen {
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------------------- Components ---------------------- */

function EmptyState() {
  return (
    <div
      className="mt-10 grid place-items-center rounded-xl border p-10 text-center"
      style={{ background: "var(--surface-0)", borderColor: "var(--edge)" }}
    >
      <div className="mx-auto max-w-xl">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          No articles yet
        </h3>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          We’re preparing research notes and case studies. Check back soon—or
          explore our services in the meantime.
        </p>
        <div className="mt-4">
          <Link href="/services" className="read-inline">
            Explore services <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* 1) HERO WIDE — fills two rows */
function HeroWide({ post, href, className = "" }) {
  const tags = (post.tags || []).slice(0, 3);
  return (
    <article className={`hero ${className}`}>
      <div className="hero__media" aria-hidden>
        <Image
          src={post.image || "/placeholder.png"}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% 40%" }}
          priority
        />
        <div className="hero__veil" />
        <span className="hero__sheen" aria-hidden /> {/* 👈 add this */}
      </div>

      <div className="hero__content">
        <div className="hero__plate">
          <div className="hero__meta">
            {tags.join(" · ")}
            {post.readTime ? ` · ${post.readTime}` : ""}
          </div>
          <h3 className="hero__title">
            <Link href={href} className="focus-visible:outline-none">
              {post.title}
            </Link>
          </h3>
          {post.excerpt && <p className="hero__excerpt">{post.excerpt}</p>}
          <div className="hero__footer">
            <Link href={href} className="hero__cta">
              Read article <span aria-hidden>→</span>
            </Link>
            <span className="hero__meta">
              {post.author?.name ? `By ${post.author.name}` : ""}
              {post.author?.name && post.date ? " · " : ""}
              {post.date || ""}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* 2) TALL SPLIT — column look with divider footer (kept) */
/* 2) TALL SPLIT — overlay title + tags inside image (no nested anchors) */
function TallSplit({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);

  return (
    <article className="blog-card tall flex flex-col overflow-hidden">
      {/* One link only (prevents hydration errors) */}
      <Link href={href} aria-label={post.title} className="block">
        <div className="media-wrap">
          <Image
            src={post.image || "/placeholder.png"}
            alt=""
            fill
            sizes="(min-width:1024px) 33vw, 100vw"
            className="object-cover"
            priority={false}
          />

          {/* soft edge + sheen */}
          <span className="media__edge" aria-hidden />
          <span className="media__sheen" aria-hidden />

          {/* glass plate with tags + title */}
          <div className="plate">
            {tags.length > 0 && (
              <div className="meta">
                {tags.join(" · ")}
                {post.readTime ? ` · ${post.readTime}` : ""}
              </div>
            )}
            <h3 className="title">
              {/* Use a <span> to avoid nested <a> inside the Link */}
              <span className="focus-visible:outline-none">{post.title}</span>
            </h3>
          </div>
        </div>
      </Link>

      {/* body below the image stays simple */}
      <div className="body">
        {post.excerpt && <p className="excerpt line-clamp-3">{post.excerpt}</p>}
        <div className="t-footer">
          <Link href={href} className="read-inline">
            Read article <span aria-hidden>→</span>
          </Link>
          <AuthorCompact
            name={post.author?.name}
            avatar={post.author?.avatar}
            date={post.date}
          />
        </div>
      </div>
    </article>
  );
}

/* 3) SPLIT CARD V2 — editorial inner panel + diagonal seam (+hover polish) */
function SplitCardV2({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);

  return (
    <article className="blog-card hover-card split-v2 grid grid-cols-1 md:grid-cols-[1.08fr_1fr] overflow-hidden">
      {/* Media */}
      <Link
        href={href}
        aria-label={post.title}
        className="relative block media-bleed"
      >
        <div className="relative media aspect-[16/10] md:aspect-auto md:h-full">
          <Image
            src={post.image || "/placeholder.png"}
            alt=""
            fill
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "55% 45%" }}
          />
          <span className="media__edge" />
          <span className="media__sheen" aria-hidden />
        </div>
        <div className="cut-corner hidden md:block" aria-hidden />
      </Link>

      {/* Content */}
      <div className="inner p-5 sm:p-6 md:p-7 flex flex-col">
        <div className="flex items-center gap-3 meta">
          {tags.map((t) => (
            <span
              key={t}
              className="pill"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--brand-700) 35%, transparent)",
                background:
                  "color-mix(in srgb, var(--brand-400) 12%, transparent)",
                color: "var(--brand-800)",
                borderRadius: "999px",
                padding: "4px 10px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
          {post.readTime && (
            <span
              className="ml-1 text-[11px] font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              • {post.readTime}
            </span>
          )}
        </div>

        <h3 className="title mt-2 text-[20px] md:text-[22px] leading-snug tracking-[-0.01em] line-clamp-2">
          <Link href={href}>{post.title}</Link>
        </h3>

        {post.excerpt && (
          <p className="excerpt mt-2 text-[14px] leading-relaxed md:line-clamp-4">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 mb-3 flex items-center gap-3">
          <span className="divider" />
          <span className="caption">Key takeaways</span>
        </div>

        <ul className="bullets">
          {(post.bullets && post.bullets.length > 0
            ? post.bullets.slice(0, 3)
            : [
                "Practical guidance for SMEs",
                "What to watch in regulation",
                "Process notes from the lab",
              ]
          ).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div
          className="mt-auto pt-4 border-t"
          style={{ borderColor: "var(--edge)" }}
        >
          <div className="flex items-center justify-between">
            <Link href={href} className="read-inline">
              Read article <span aria-hidden>→</span>
            </Link>
            <AuthorCompact
              name={post.author?.name}
              avatar={post.author?.avatar}
              date={post.date}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* 4) SQUARE CARD — classic image-top (+hover polish) */
function SquareCard({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);
  return (
    <article className="blog-card hover-card overflow-hidden">
      <Link href={href} aria-label={post.title} className="relative block">
        <div className="relative media aspect-[16/10]">
          <Image
            src={post.image || "/placeholder.png"}
            alt=""
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="media__edge" />
          <span className="media__sheen" aria-hidden />
        </div>
      </Link>
      <div className="p-5 sm:p-6">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="title mt-1 text-[16px] leading-snug line-clamp-2">
          <Link href={href}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <p className="excerpt mt-2 text-[13.5px] leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <Link href={href} className="read-inline">
            Read article <span aria-hidden>→</span>
          </Link>
          <AuthorCompact
            name={post.author?.name}
            avatar={post.author?.avatar}
            date={post.date}
          />
        </div>
      </div>
    </article>
  );
}

/* ------------- Bits ------------- */

function AuthorCompact({ name = "", avatar, date }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className="relative h-6 w-6 overflow-hidden rounded-full border"
        style={{ borderColor: "var(--edge)" }}
      >
        {avatar ? (
          <Image src={avatar} alt="" fill className="object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[10px]"
            style={{
              background: "var(--surface-1)",
              color: "var(--text-muted)",
            }}
          >
            {name ? name[0] : "?"}
          </div>
        )}
      </div>
      <div className="min-w-0 text-[12px] leading-tight">
        <div
          className="truncate font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {name || "—"}
        </div>
        {date && (
          <div className="truncate" style={{ color: "var(--text-muted)" }}>
            {date}
          </div>
        )}
      </div>
    </div>
  );
}

function AuthorRow({ name, avatar, date, invert = false, className = "" }) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <div
        className="relative h-8 w-8 overflow-hidden rounded-full border"
        style={{
          borderColor: invert ? "rgba(255,255,255,0.35)" : "var(--edge)",
        }}
      >
        {avatar ? (
          <Image src={avatar} alt="" fill className="object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[11px]"
            style={{
              background: invert
                ? "rgba(255,255,255,0.14)"
                : "var(--surface-1)",
              color: invert ? "rgba(255,255,255,0.92)" : "var(--text-muted)",
            }}
          >
            {name ? name[0] : "?"}
          </div>
        )}
      </div>
      <div className="min-w-0 text-[13px] leading-tight">
        <div
          className="truncate font-semibold"
          style={{ color: invert ? "#fff" : "var(--text-primary)" }}
        >
          {name || "—"}
        </div>
        {date && (
          <div
            className="truncate"
            style={{
              color: invert ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
            }}
          >
            {date}
          </div>
        )}
      </div>
    </div>
  );
}

function MetaRow({ tags = [], readTime, invert = false }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[12px] meta">
      {tags.map((t) => (
        <span
          key={t}
          className="pill"
          style={{
            border:
              "1px solid color-mix(in srgb, var(--brand-700) 35%, transparent)",
            background: "color-mix(in srgb, var(--brand-400) 12%, transparent)",
            color: "var(--brand-800)",
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {t}
        </span>
      ))}
      {readTime ? (
        <span
          className="ml-1 text-[11px] font-medium"
          style={{
            color: invert ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
          }}
        >
          • {readTime}
        </span>
      ) : null}
    </div>
  );
}
