// app/_sections/BlogsSection.js
"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../ui/Button";
import EyebrowChip from "../../ui/EyebrowChip";

const cx = (...a) => a.filter(Boolean).join(" ");

export default function BlogsSection({
  eyebrow = "Latest insights",
  title = "From the blog",
  description = "Research notes, product science, and field learnings.",
  posts = [],
  basePath = "/blogs",
  showCTA = true,
}) {
  const tags = useMemo(() => {
    const s = new Set();
    posts.forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, [posts]);

  const [selected, setSelected] = useState("All");
  useEffect(() => {
    if (!tags.includes(selected)) setSelected("All");
  }, [tags, selected]);

  const items = posts.slice(0, 8);

  return (
    <section id="blog" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <EyebrowChip>{eyebrow}</EyebrowChip>

            <h2 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight tracking-[-0.02em] text-primary">
              {title}
            </h2>

            {description ? (
              <p className="mt-2 text-[15px] leading-7 text-secondary">
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

        {/* Empty */}
        {items.length === 0 && <EmptyState />}

        {/* Editorial grid */}
        {items.length > 0 && (
          <div className="magazine-grid mt-8 mb-0">
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
    </section>
  );
}

/* ---------------------- Components ---------------------- */

function EmptyState() {
  return (
    <div className="mt-10 grid place-items-center rounded-xl border border-[var(--edge)] bg-[var(--surface-0)] p-10 text-center">
      <div className="mx-auto max-w-xl">
        <h3 className="text-lg font-semibold text-primary">No articles yet</h3>
        <p className="mt-1 text-sm text-secondary">
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

/* 1) HERO WIDE — fills two rows (group for sheen hover) */
function HeroWide({ post, href, className = "" }) {
  const tags = (post.tags || []).slice(0, 3);
  return (
    <article className={cx("hero group", className)}>
      <div className="hero-media" aria-hidden>
        <Image
          src={post.image || "/placeholder.png"}
          alt={post.title}
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
          style={{ objectPosition: "60% 40%" }}
          priority
        />
        <div className="hero-veil" />
        <span className="hero-sheen" aria-hidden />
      </div>

      <div className="hero-content">
        <div className="hero-plate">
          <div className="hero-meta">
            {tags.join(" · ")}
            {post.readTime ? ` · ${post.readTime}` : ""}
          </div>

          <h3 className="hero-title">
            <Link href={href} className="focus-visible:outline-none">
              {post.title}
            </Link>
          </h3>

          {post.excerpt && <p className="hero-excerpt">{post.excerpt}</p>}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Link href={href} className="hero-cta">
              Read article <span aria-hidden>→</span>
            </Link>
            <span className="hero-meta">
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

/* 2) TALL SPLIT — overlay title + tags inside image */
function TallSplit({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);

  return (
    <article className="blog-card tall flex flex-col overflow-hidden">
      {/* One link only (no nested anchors) */}
      <Link href={href} aria-label={post.title} className="block">
        <div className="media-wrap relative isolate h-[min(48vw,340px)] overflow-hidden rounded-t-[20px]">
          <Image
            src={post.image || "/placeholder.png"}
            alt={post.title}
            fill
            quality={60}
            sizes="(min-width:1024px) 33vw, 100vw"
            className="object-cover"
          />

          <span className="media__edge" aria-hidden />
          <span className="media__sheen" aria-hidden />

          <div className="plate absolute bottom-3 left-3 right-3 z-20 rounded-[12px] border border-[var(--edge)] bg-[color-mix(in_srgb,var(--surface-0)_16%,transparent)] px-3 py-2.5 backdrop-blur-md shadow-[0_10px_28px_rgba(0,0,0,0.18)]">
            {tags.length > 0 && (
              <div className="meta text-white/95 text-[12px] font-extrabold tracking-wide">
                {tags.join(" · ")}
                {post.readTime ? ` · ${post.readTime}` : ""}
              </div>
            )}
            <h3 className="title text-balance text-[clamp(16px,2vw,20px)] font-black leading-[1.2] tracking-[-0.01em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <span className="focus-visible:outline-none">{post.title}</span>
            </h3>
          </div>
        </div>
      </Link>

      <div className="body flex flex-col gap-2.5 px-5 pb-5 pt-[18px] sm:px-6">
        {post.excerpt && (
          <p className="excerpt line-clamp-3 text-[14px] leading-[1.55] text-secondary">
            {post.excerpt}
          </p>
        )}
        <div className="t-footer mt-[14px] flex items-center justify-between border-t border-[var(--edge)] pt-[14px]">
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

/* 3) SPLIT CARD V2 — editorial inner panel + diagonal seam */
function SplitCardV2({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);

  return (
    <article className="split-v2 blog-card hover-card grid grid-cols-1 overflow-hidden md:grid-cols-[1.08fr_1fr]">
      {/* Media */}
      <Link
        href={href}
        aria-label={post.title}
        className="media-bleed relative block"
      >
        <div className="media relative aspect-[16/10] md:h-full md:aspect-auto">
          <Image
            src={post.image || "/placeholder.png"}
            alt={post.title}
            fill
            quality={60}
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
      <div className="inner flex flex-col rounded-b-[20px] p-5 sm:p-6 md:rounded-r-[20px] md:p-7">
        <div className="meta flex items-center gap-3 text-[12px] text-muted">
          {tags.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
          {post.readTime && (
            <span className="ml-1 text-[11px] font-medium text-muted">
              • {post.readTime}
            </span>
          )}
        </div>

        <h3 className="mt-2 line-clamp-2 text-[20px] leading-snug tracking-[-0.01em] text-primary md:text-[22px]">
          <Link href={href}>{post.title}</Link>
        </h3>

        {post.excerpt && (
          <p className="excerpt mt-2 text-[14px] leading-relaxed text-secondary md:line-clamp-4">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 mb-3 flex items-center gap-3">
          <span className="divider h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--edge),transparent)]" />
          <span className="caption whitespace-nowrap text-[11px] uppercase tracking-[0.08em] text-muted">
            Key takeaways
          </span>
        </div>

        <ul className="bullets grid gap-[6px] pl-[18px] text-[13.5px] text-secondary">
          {(post.bullets && post.bullets.length > 0
            ? post.bullets.slice(0, 3)
            : [
                "Practical guidance for SMEs",
                "What to watch in regulation",
                "Process notes from the lab",
              ]
          ).map((b, i) => (
            <li key={i} className="list-disc">
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-[var(--edge)] pt-4">
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

/* 4) SQUARE CARD — classic image-top */
function SquareCard({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);
  return (
    <article className="blog-card hover-card overflow-hidden">
      <Link href={href} aria-label={post.title} className="relative block">
        <div className="media relative aspect-[16/10]">
          <Image
            src={post.image || "/placeholder.png"}
            alt={post.title}
            fill
            quality={60}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="media__edge" />
          <span className="media__sheen" aria-hidden />
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <MetaRow tags={tags} readTime={post.readTime} />
        <h3 className="title mt-1 line-clamp-2 text-[16px] leading-snug text-primary">
          <Link href={href}>{post.title}</Link>
        </h3>
        {post.excerpt && (
          <p className="excerpt mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-secondary">
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

/* Bits */
function AuthorCompact({ name = "", avatar, date }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[var(--edge)]">
        {avatar ? (
          <Image
            src={avatar}
            alt={name + "avatar"}
            quality={60}
            fill
            className="object-cover"
          />
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
        <div className="truncate font-semibold text-primary">{name || "—"}</div>
        {date && <div className="truncate text-muted">{date}</div>}
      </div>
    </div>
  );
}

function MetaRow({ tags = [], readTime }) {
  return (
    <div className="meta flex flex-wrap items-center gap-3 text-[12px] text-muted">
      {tags.map((t) => (
        <span key={t} className="pill">
          {t}
        </span>
      ))}
      {readTime ? (
        <span className="ml-1 text-[11px] font-medium text-muted">
          • {readTime}
        </span>
      ) : null}
    </div>
  );
}
