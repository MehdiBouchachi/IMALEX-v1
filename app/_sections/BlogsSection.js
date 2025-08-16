// app/_sections/BlogsSection.js
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../_components/ui/Button";
import EyebrowChip from "../_components/ui/EyebrowChip";

/** tiny helper */
const cx = (...a) => a.filter(Boolean).join(" ");

export default function BlogsSection({
  eyebrow = "Latest insights",
  title = "From the blog",
  description = "Research notes, product science, and field learnings.",
  posts = [],
  basePath = "/blogs",
  showCTA = true,
}) {
  // gather unique tags
  const tags = useMemo(() => {
    const s = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [posts]);

  const [selected, setSelected] = useState("All");
  useEffect(() => {
    if (!tags.includes(selected)) setSelected("All");
  }, [tags, selected]);

  const filtered = useMemo(
    () =>
      selected === "All"
        ? posts
        : posts.filter((p) => (p.tags || []).includes(selected)),
    [posts, selected]
  );

  const items = filtered.slice(0, 7); // 1 feature + up to 6 cards

  return (
    <section id="blog" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <EyebrowChip>{eyebrow}</EyebrowChip>
            <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight text-[var(--text-primary)]">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-[var(--text-secondary)]">{description}</p>
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

        {/* responsive filter chips (scrollable on mobile) */}
        {tags.length > 1 && (
          <div className="mt-6">
            <div
              className="
    chips-row no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 pt-0.5
    snap-x snap-mandatory
    md:overflow-visible md:flex-wrap md:snap-none
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
                    className={cx(
                      "chip snap-start",
                      active && "chip--active",
                      "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
                    )}
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

        {/* ===== Top row: same height left/right on lg+ ===== */}
        {items.length > 0 && (
          <div
            className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
            style={{ ["--hero-h"]: "clamp(280px, 38vw, 440px)" }}
          >
            <FeatureTall
              post={items[0]}
              href={`${basePath}/${items[0].slug || items[0].id}`}
            />
            {items[1] ? (
              <CardTall
                post={items[1]}
                href={`${basePath}/${items[1].slug || items[1].id}`}
              />
            ) : (
              <div className="hidden lg:block" aria-hidden />
            )}
          </div>
        )}

        {/* grid */}
        {items.length > 2 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(2).map((p) => (
              <Card
                key={p.slug || p.id}
                post={p}
                href={`${basePath}/${p.slug || p.id}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* light hover lift, no heavy motion */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .blog-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            border-color 0.2s ease;
        }
        .blog-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }
        .dark .blog-card:hover {
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-card,
          .blog-card:hover {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ————— Feature (left) ————— */
function FeatureTall({ post, href }) {
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];

  return (
    <article
      className="blog-card overflow-hidden rounded-[16px] border"
      style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}
    >
      {/* Image
          - mobile: aspect box
          - lg+: fixed equal height via --hero-h */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-auto lg:h-[var(--hero-h)]">
        <Link
          href={href}
          aria-label={post.title}
          className="absolute inset-0 block focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
        >
          <Image
            src={post.image || "/placeholder.png"}
            alt=""
            fill
            sizes="(min-width:1024px) 66vw, 100vw"
            className="object-cover"
          />
        </Link>

        {/* OVERLAY content → shown from md: up only */}
        <div className="pointer-events-none absolute inset-0 hidden md:block bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 hidden md:block p-5 sm:p-6">
          <MetaRow tags={tags} readTime={post.readTime} invert />
          <h3 className="mt-1 line-clamp-2 text-[clamp(18px,2.2vw,28px)] font-semibold leading-snug text-white">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-white/85">
              {post.excerpt}
            </p>
          )}
          <AuthorRow
            className="mt-3"
            name={post.author?.name}
            avatar={post.author?.avatar}
            date={post.date}
            invert
          />
        </div>
      </div>

      {/* MOBILE content (no overlay) */}
      <div className="md:hidden p-4 sm:p-5">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="mt-1 text-[18px] font-semibold leading-snug">
          <Link
            href={href}
            style={{ color: "var(--text-primary)" }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p
            className="mt-2 text-[13.5px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>
        )}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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

/* ————— Right tall card ————— */
function CardTall({ post, href }) {
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];

  return (
    <article
      className="blog-card flex flex-col overflow-hidden rounded-[14px] border lg:h-[var(--hero-h)]"
      style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}
    >
      {/* Image: mobile has its own height; desktop uses a calc of --hero-h */}
      <Link
        href={href}
        aria-label={post.title}
        className="relative block group focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
      >
        <div className="relative h-[min(52vw,260px)] lg:h-[calc(var(--hero-h)*0.58)]">
          <Image
            src={post.image || "/placeholder.png"}
            alt=""
            fill
            sizes="(min-width:1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="mt-1 text-[17px] sm:text-[16px] font-semibold leading-snug line-clamp-2">
          <Link
            href={href}
            style={{ color: "var(--text-primary)" }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p
            className="mt-2 text-[13.5px] leading-relaxed line-clamp-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Actions: stack on mobile, inline ≥sm */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
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

/* ————— Standard grid cards ————— */
function Card({ post, href }) {
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];
  return (
    <article
      className="blog-card grid overflow-hidden rounded-[14px] border"
      style={{
        background: "var(--surface-0)",
        borderColor: "var(--border)",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Link
        href={href}
        aria-label={post.title}
        className="relative block group focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={post.image || "/placeholder.png"}
            alt=""
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="mt-1 line-clamp-2 text-[16px] font-semibold leading-snug">
          <Link
            href={href}
            style={{ color: "var(--text-primary)" }}
            className="focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p
            className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* INLINE CTA (brand green) */}
        <Link href={href} className="read-inline mt-3">
          Read article <span aria-hidden>→</span>
        </Link>
      </div>

      {/* footer: just author/date (no button) */}
      <div
        className="border-t px-4 py-3 sm:px-5"
        style={{ borderColor: "var(--border)" }}
      >
        <AuthorRow
          name={post.author?.name}
          avatar={post.author?.avatar}
          date={post.date}
        />
      </div>
    </article>
  );
}

function AuthorCompact({ name = "", avatar, date }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className="relative h-6 w-6 overflow-hidden rounded-full border"
        style={{ borderColor: "var(--border)" }}
      >
        {avatar ? (
          <Image src={avatar} alt="" fill className="object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[10px]"
            style={{
              background: "var(--surface-1)",
              color: "var(--text-secondary)",
            }}
          >
            {name?.[0]?.toUpperCase() || ""}
          </div>
        )}
      </div>
      <span
        className="truncate text-[13px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {name}
      </span>
      {date ? (
        <>
          <span
            className="mx-1 opacity-40"
            style={{ color: "var(--text-secondary)" }}
          >
            •
          </span>
          <time
            className="text-[12px] tabular-nums opacity-80"
            dateTime={date}
            style={{ color: "var(--text-secondary)" }}
          >
            {formatDate(date)}
          </time>
        </>
      ) : null}
    </div>
  );
}

/* ————— shared bits ————— */
function Author({ name = "", avatar }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className="relative h-7 w-7 overflow-hidden rounded-full border"
        style={{ borderColor: "var(--border)" }}
      >
        {avatar ? (
          <Image src={avatar} alt="" fill className="object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[10px]"
            style={{
              background: "var(--surface-1)",
              color: "var(--text-secondary)",
            }}
          >
            {name?.[0]?.toUpperCase() || ""}
          </div>
        )}
      </div>
      <span
        className="truncate text-[13px]"
        style={{ color: "var(--text-secondary)" }}
      >
        {name}
      </span>
    </div>
  );
}
function AuthorRow({
  name = "",
  avatar,
  date,
  invert = false,
  className = "",
}) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <div className="flex min-w-0 items-center gap-2">
        <div
          className="relative h-7 w-7 overflow-hidden rounded-full border"
          style={{ borderColor: invert ? "white/25" : "var(--border)" }}
        >
          {avatar ? (
            <Image src={avatar} alt="" fill className="object-cover" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-[10px]"
              style={{
                background: invert
                  ? "color-mix(in oklab, white 16%, transparent)"
                  : "var(--surface-1)",
                color: invert ? "white" : "var(--text-secondary)",
              }}
            >
              {name?.[0]?.toUpperCase() || ""}
            </div>
          )}
        </div>
        <span
          className="truncate text-[13px]"
          style={{ color: invert ? "white" : "var(--text-secondary)" }}
        >
          {name}
        </span>
      </div>

      <time
        className="text-[12px] tabular-nums opacity-80"
        dateTime={date}
        style={{ color: invert ? "white" : "var(--text-secondary)" }}
      >
        {formatDate(date)}
      </time>
    </div>
  );
}
function MetaRow({ tags = [], readTime, invert = false }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <div className="flex flex-wrap items-center gap-2">
        {tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-[8px] px-2 py-1 border"
            style={{
              background: invert
                ? "color-mix(in oklab, white 16%, transparent)"
                : "var(--surface-1)",
              color: invert ? "white" : "var(--text-secondary)",
              borderColor: invert ? "white/20" : "var(--border)",
              backdropFilter: invert ? "blur(4px)" : undefined,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {readTime ? (
        <>
          <span
            className="opacity-50 mx-1"
            style={{ color: invert ? "white" : "var(--text-secondary)" }}
          >
            •
          </span>
          <span
            className="tabular-nums"
            style={{ color: invert ? "white" : "var(--text-secondary)" }}
          >
            {readTime} min read
          </span>
        </>
      ) : null}
    </div>
  );
}
function formatDate(input) {
  try {
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return "";
  }
}
