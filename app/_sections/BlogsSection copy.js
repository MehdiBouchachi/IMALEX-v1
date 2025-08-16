// app/_sections/BlogsSection.js
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * BlogsSection — feature + grid + tag filters
 * Now with a locked-height top row (equal height left/right on lg+)
 */
export default function BlogsSection({
  eyebrow = "Latest insights",
  title = "From the blog",
  description = "Research notes, product science, and field learnings.",
  posts = [],
  basePath = "/blogs",
  showCTA = true,
}) {
  // unique tags (stable)
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

  const items = filtered.slice(0, 7); // 1 feature + up to 6

  return (
    <section id="blog" className="relative scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
                background: "var(--surface-0)",
              }}
            >
              {eyebrow}
            </div>
            <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight text-[var(--text-primary)]">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-[var(--text-secondary)]">{description}</p>
            )}
          </div>

          {showCTA && posts.length > 0 && (
            <div className="shrink-0">
              <Link
                href={basePath}
                className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-[10px] text-sm font-medium transition"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface-0)",
                  color: "var(--text-primary)",
                }}
              >
                View all articles
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* filters */}
        {tags.length > 1 && (
          <div className="mt-6">
            <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 py-1">
              {tags.map((tag) => {
                const active = tag === selected;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelected(tag)}
                    className="whitespace-nowrap rounded-full border px-3 py-1 text-sm transition"
                    style={{
                      borderColor: active
                        ? "var(--brand-600)"
                        : "var(--border)",
                      background: active
                        ? "color-mix(in oklab, var(--brand-600) 12%, transparent)"
                        : "var(--surface-0)",
                      color: active
                        ? "var(--brand-700)"
                        : "var(--text-secondary)",
                    }}
                    aria-pressed={active}
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

        {/* ================= Top row (equal height on lg+) ================= */}
        {items.length > 0 && (
          <div
            className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]"
            style={{
              // one source of truth for the row height
              ["--hero-h"]: "clamp(280px, 38vw, 440px)",
            }}
          >
            {/* Left: Feature, forced to var(--hero-h) */}
            <FeatureTall
              post={items[0]}
              href={`${basePath}/${items[0].slug || items[0].id}`}
            />

            {/* Right: Tall standard card with the same height */}
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

        {/* ================= Rest of grid ================= */}
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

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .blog-card {
          transition: transform 0.24s ease, box-shadow 0.24s ease,
            border-color 0.24s ease;
          will-change: transform;
        }
        .blog-card:hover {
          transform: translateY(-4px);
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
/* ================= Feature (left, tall, no CTA) ================= */
function FeatureTall({ post, href }) {
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];
  return (
    <article
      className="blog-card relative isolate overflow-hidden rounded-[16px] border focus-within:ring-4 focus-within:ring-[var(--ring)]"
      style={{
        background: "var(--surface-0)",
        borderColor: "var(--border)",
        height: "var(--hero-h)",
      }}
    >
      {/* full-bleed link + image — kill UA outline on the link */}
      <Link
        href={href}
        aria-label={post.title}
        className="absolute inset-0 block focus:outline-none focus-visible:outline-none focus-visible:ring-0"
      >
        <Image
          src={post.image || "/placeholder.png"}
          alt=""
          fill
          sizes="(min-width:1024px) 66vw, 100vw"
          className="object-cover"
        />
      </Link>

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset"
        style={{ ringColor: "rgb(0 0 0 / 6%)" }}
      />

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
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
    </article>
  );
}

/* ================= Right (tall) card — CTA in footer, green pill ================= */
function CardTall({ post, href }) {
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];
  return (
    <article
      className="blog-card grid overflow-hidden rounded-[14px] border focus-within:ring-3 focus-within:ring-[var(--ring)]"
      style={{
        background: "var(--surface-0)",
        borderColor: "var(--border)",
        height: "var(--hero-h)",
        gridTemplateRows: "minmax(0, 58%) auto auto", // image / content / footer
      }}
    >
      {/* image (top) */}
      <Link
        href={href}
        aria-label={post.title}
        className="relative block min-h-0 group focus:outline-none focus-visible:outline-none focus-visible:ring-0"
      >
        <Image
          src={post.image || "/placeholder.png"}
          alt=""
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset"
          style={{ ringColor: "rgb(0 0 0 / 6%)" }}
        />
      </Link>

      {/* copy + ghost CTA */}
      <div className="min-h-0 p-4 sm:p-5">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="mt-1 line-clamp-2 text-[16px] font-semibold leading-snug">
          <Link
            href={href}
            className="focus:outline-none focus-visible:ring-2"
            style={{ color: "var(--text-primary)" }}
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

        {/* refined CTA (ghost) */}
        <Link href={href} className="btn-ghost mt-3">
          Read article
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12h14M13 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>

      {/* footer (author/date only) */}
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

/* ================= Grid card — CTA in footer, green pill ================= */
function Card({ post, href }) {
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];
  return (
    <article
      className="blog-card grid overflow-hidden rounded-[14px] border focus-within:ring-3 focus-within:ring-[var(--ring)]"
      style={{
        background: "var(--surface-0)",
        borderColor: "var(--border)",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Link
        href={href}
        aria-label={post.title}
        className="relative block group focus:outline-none focus-visible:outline-none focus-visible:ring-0"
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
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset"
          style={{ ringColor: "rgb(0 0 0 / 6%)" }}
        />
      </Link>

      <div className="p-4 sm:p-5">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="mt-1 line-clamp-2 text-[16px] font-semibold leading-snug">
          <Link
            href={href}
            className="focus:outline-none focus-visible:ring-2"
            style={{ color: "var(--text-primary)" }}
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

        {/* refined CTA (ghost) */}
        <Link href={href} className="btn-ghost mt-3">
          Read article
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12h14M13 5l7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>

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

/* ================= Shared bits ================= */
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
