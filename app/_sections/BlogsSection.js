"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

/**
 * BlogsSection
 * - Clean, readable blog grid that follows your token system (CSS variables)
 * - Minimal rounding, no flashy gradients, subtle motion
 * - Dark mode auto via `.dark` theme (uses CSS vars, not Tailwind `dark:` colors)
 * - Drop-in: <BlogsSection posts={posts} basePath="/blog" />
 */
export default function BlogsSection({
  title = "Latest insights",
  eyebrow = "From our lab journal",
  description = "Research notes, product science, and field learnings.",
  posts = [],
  basePath = "/blog",
  showCTA = true,
}) {
  const items = useMemo(() => posts.slice(0, 6), [posts]);

  return (
    <section
      id="blog"
      className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-labelledby="blog-title"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Header */}
      <header className="mb-8 sm:mb-10 md:mb-12">
        <div
          className="mb-2 text-sm tracking-wide opacity-80"
          style={{ color: "var(--text-secondary)" }}
        >
          {eyebrow}
        </div>
        <h2
          id="blog-title"
          className="text-2xl font-semibold sm:text-3xl"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
        {description ? (
          <p
            className="mt-2 max-w-3xl text-[15px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>
        ) : null}
      </header>

      {/* Grid */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6"
        role="list"
        aria-label="Blog posts"
      >
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((p) => (
            <ArticleCard key={p.slug || p.id} post={p} basePath={basePath} />
          ))
        )}
      </div>

      {/* Footer CTA */}
      {showCTA && posts.length > 6 ? (
        <div className="mt-8 flex items-center justify-center">
          <Link
            href={basePath}
            className="inline-flex items-center gap-2 px-4 py-[10px] text-sm font-medium border transition-shadow"
            style={{
              borderColor: "var(--border, #e6e9ee)",
              color: "var(--text-primary)",
              background: "var(--surface-0, #ffffff)",
              boxShadow: "0 1px 0 0 rgba(16,24,40,.04)",
            }}
          >
            View all articles
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
      ) : null}
    </section>
  );
}

/* =================== Card =================== */
function ArticleCard({ post, basePath }) {
  const href = `${basePath}/${post.slug || post.id || ""}`;
  const tags = Array.isArray(post.tags) ? post.tags.slice(0, 3) : [];

  return (
    <article
      className="group relative overflow-hidden rounded-[10px] border"
      style={{
        background: "var(--surface-0, #ffffff)",
        borderColor: "var(--border, #e6e9ee)",
      }}
    >
      {/* Media */}
      <Link
        href={href}
        className="block focus:outline-none"
        aria-label={post.title}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              priority={false}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-xs"
              style={{
                background: "var(--surface-1, #f7f8fa)",
                color: "var(--text-secondary)",
              }}
            >
              No image
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-[8px] px-2 py-1 text-[11px] leading-none border"
              style={{
                background: "var(--surface-1, #f7f8fa)",
                color: "var(--text-secondary)",
                borderColor: "var(--border, #e6e9ee)",
              }}
            >
              {t}
            </span>
          ))}
          {post.readTime ? (
            <span
              className="ml-auto text-[11px] opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.readTime} min read
            </span>
          ) : null}
        </div>

        <h3 className="line-clamp-2 text-base font-semibold leading-snug">
          <Link
            href={href}
            className="focus:outline-none focus-visible:ring-2"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? (
          <p
            className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-4 flex items-center justify-between gap-3">
          <Author
            id={post.author?.id}
            name={post.author?.name}
            avatar={post.author?.avatar}
          />
          <time
            className="text-[12px] tabular-nums opacity-80"
            dateTime={post.date}
            style={{ color: "var(--text-secondary)" }}
          >
            {formatDate(post.date)}
          </time>
        </div>
      </div>

      {/* Bottom bar link */}
      <Link
        href={href}
        className="mt-1 block border-t px-4 py-3 text-sm font-medium transition-colors"
        style={{
          borderColor: "var(--border, #e6e9ee)",
          color: "var(--brand-700, #147a52)",
        }}
      >
        Read article →
      </Link>

      {/* Focus ring (token-based) */}
      <style jsx>{`
        article:has(a:focus-visible) {
          outline: 2px solid var(--ring, #94c2b1);
          outline-offset: 2px;
        }
      `}</style>
    </article>
  );
}

/* ============== Author ============== */
function Author({ name = "", avatar }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className="relative h-7 w-7 overflow-hidden rounded-full border"
        style={{ borderColor: "var(--border, #e6e9ee)" }}
      >
        {avatar ? (
          <Image src={avatar} alt="" fill className="object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-[10px]"
            style={{
              background: "var(--surface-1, #f2f4f7)",
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

/* ============== Empty State ============== */
function EmptyState() {
  return (
    <div
      className="col-span-full flex items-center justify-center rounded-[10px] border p-10 text-center"
      style={{
        background: "var(--surface-0, #ffffff)",
        borderColor: "var(--border, #e6e9ee)",
        color: "var(--text-secondary)",
      }}
    >
      <div>
        <div
          className="mb-2 text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          No articles yet
        </div>
        <p className="max-w-md text-[13.5px]">
          Publish your first post to see it here. Titles, tags, and read time
          are supported out of the box.
        </p>
      </div>
    </div>
  );
}

/* ============== Utils ============== */
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

/* =================== Sample Data (remove in prod) =================== */
export function DemoBlogs() {
  const demo = [
    {
      id: "1",
      slug: "why-natural-formulation-scales",
      title: "Why natural formulation scales in 2025",
      excerpt:
        "Bench to pilot: de-risking bio‑based actives with fast iteration and solid QC.",
      image: "/demo/blog-1.jpg",
      tags: ["R&D", "Formulation"],
      readTime: 6,
      author: { name: "IMALEX Team", avatar: "/demo/avatar-1.jpg" },
      date: "2025-07-21",
    },
    {
      id: "2",
      slug: "stability-testing-checklist",
      title: "Stability testing: a 10‑point checklist for SMEs",
      excerpt:
        "How we structure quick stability pre‑checks before committing to full studies.",
      image: "/demo/blog-2.jpg",
      tags: ["QA", "Process"],
      readTime: 5,
      author: { name: "Dr. Lina Saada", avatar: "/demo/avatar-2.jpg" },
      date: "2025-06-05",
    },
    {
      id: "3",
      slug: "nutraceuticals-grit",
      title: "Nutraceuticals: where efficacy meets manufacturing reality",
      excerpt:
        "Choosing actives is easy. Scaling with supply chain and compliance in mind isn’t.",
      image: "/demo/blog-3.jpg",
      tags: ["Nutraceuticals"],
      readTime: 7,
      author: { name: "IMALEX Lab" },
      date: "2025-05-12",
    },
    {
      id: "4",
      slug: "biopesticides-field-notes",
      title: "Field notes from biopesticides pilots",
      excerpt:
        "What we learned moving from growth chamber to field plots in semi‑arid climates.",
      image: "/demo/blog-4.jpg",
      tags: ["Biopesticides", "Agri"],
      readTime: 8,
      author: { name: "R&D Ops" },
      date: "2025-04-18",
    },
  ];

  return (
    <div className="py-10" style={{ background: "var(--surface-0)" }}>
      <BlogsSection posts={demo} basePath="/blog" showCTA />
    </div>
  );
}
