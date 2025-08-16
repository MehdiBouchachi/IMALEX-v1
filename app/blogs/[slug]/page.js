// app/blogs/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fakePosts } from "../../_data/fakePosts";
import ArticleTOC from "./ArticleTOC";
import RelatedCards from "./RelatedCards";
import Inline from "./Inline"; // keep your existing path

const idFrom = (txt) =>
  String(txt)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

export function generateStaticParams() {
  return fakePosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = fakePosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: { images: post.image ? [post.image] : [] },
  };
}

export default function BlogPost({ params }) {
  const idx = fakePosts.findIndex((p) => p.slug === params.slug);
  const post = fakePosts[idx];
  if (!post) return notFound();

  const prev = idx > 0 ? fakePosts[idx - 1] : null;
  const next = idx < fakePosts.length - 1 ? fakePosts[idx + 1] : null;

  // absolute URL for share links (set NEXT_PUBLIC_SITE_URL="https://your-domain")
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = base ? `${base}/blogs/${post.slug}` : "";

  return (
    <div className="min-h-screen pb-12 pt-20 md:pt-24 mx-auto max-w-7xl px-4 py-10 lg:grid lg:grid-cols-[280px_1px_minmax(0,1fr)] lg:gap-8">
      {/* LEFT: TOC */}
      <aside className="sticky top-24 hidden self-start lg:block">
        <ArticleTOC blocks={post.content} />
      </aside>

      {/* VERTICAL DIVIDER */}
      <div
        aria-hidden
        className="hidden w-px self-stretch lg:block"
        style={{ background: "var(--border)" }}
      />

      {/* RIGHT: article */}
      <article className="mx-auto w-full max-w-3xl">
        {/* breadcrumb */}
        <div className="mb-2 text-sm">
          <Link
            href="/blogs"
            className="underline-offset-2 hover:underline"
            style={{ color: "var(--brand-700)" }}
          >
            IMALEX Blog
          </Link>
        </div>

        {/* title */}
        <h1
          className="mb-2 font-semibold"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(28px, 5vw, 40px)",
          }}
        >
          <Inline text={post.title} />
        </h1>

        {/* standfirst */}
        {post.excerpt && (
          <p
            className="leading-relaxed"
            style={{ color: "var(--text-secondary)", fontSize: "18px" }}
          >
            <Inline text={post.excerpt} />
          </p>
        )}

        {/* meta row */}
        <div
          className="mt-3 flex flex-wrap items-center gap-3 text-[13px]"
          style={{ color: "var(--text-secondary)" }}
        >
          <div className="flex items-center gap-2">
            {post.author?.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author?.name ?? ""}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span>{post.author?.name ?? "IMALEX"}</span>
          </div>
          <span>•</span>
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
          {post.tags?.length ? (
            <>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2 py-0.5 text-[12px]"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* hero image */}
        {post.image && (
          <figure
            className="relative my-5 overflow-hidden rounded-[12px] border shadow-sm"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="aspect-[16/9]">
              <Image src={post.image} alt="" fill className="object-cover" />
            </div>
            {post.caption && (
              <figcaption
                className="px-3 py-2 text-center text-[12px]"
                style={{ color: "var(--text-secondary)" }}
              >
                <Inline text={post.caption} />
              </figcaption>
            )}
          </figure>
        )}

        {/* mobile TOC */}
        <div className="mb-6 lg:hidden">
          <ArticleTOC blocks={post.content} />
        </div>

        {/* body */}
        <div className="max-w-none" style={{ lineHeight: 1.78 }}>
          <Article blocks={post.content} />
        </div>

        {/* related cards */}
        <RelatedCards
          posts={fakePosts.filter((p) => p.slug !== post.slug).slice(0, 2)}
        />

        {/* footer */}
        <footer
          className="mt-8 border-t pt-5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              href="/blogs"
              className="text-sm underline-offset-2 hover:underline"
              style={{ color: "var(--brand-700)" }}
            >
              ← Back to blog
            </Link>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Share:{" "}
              <a
                className="underline-offset-2 hover:underline"
                href={
                  canonical
                    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        canonical
                      )}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {" · "}
              <a
                className="underline-offset-2 hover:underline"
                href={
                  canonical
                    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        canonical
                      )}&text=${encodeURIComponent(post.title)}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            </div>
          </div>

          {/* prev / next */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {prev && <PNCard dir="prev" post={prev} />}
            {next && <PNCard dir="next" post={next} />}
          </div>
        </footer>
      </article>
    </div>
  );
}

/* ---------- content renderer (denser spacing + inline formatting) ---------- */

function Article({ blocks = [] }) {
  let firstPara = true;
  return blocks.map((b, i) => {
    if (b.t === "h2") return <H2 key={i} text={b.x} />;
    if (b.t === "h3") return <H3 key={i} text={b.x} />;
    if (b.t === "blockquote")
      return <QuoteBox key={i} text={b.x} cite={b.cite} />;
    if (b.t === "img")
      return (
        <figure
          key={i}
          className="my-5 overflow-hidden rounded-[12px] border"
          style={{ borderColor: "var(--border)" }}
        >
          <img src={b.src} alt={b.alt || ""} className="block w-full" />
          {b.cap && (
            <figcaption
              className="px-3 py-2 text-center text-[12px]"
              style={{ color: "var(--text-secondary)" }}
            >
              <Inline text={b.cap} />
            </figcaption>
          )}
        </figure>
      );
    if (b.t === "ul")
      return (
        <ul
          key={i}
          className="mt-1.5 mb-3 list-disc pl-6 space-y-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {b.x.map((li, k) => (
            <li key={k}>
              <Inline text={li} />
            </li>
          ))}
        </ul>
      );
    if (b.t === "ol")
      return (
        <ol
          key={i}
          className="mt-1.5 mb-3 list-decimal pl-6 space-y-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {b.x.map((li, k) => (
            <li key={k}>
              <Inline text={li} />
            </li>
          ))}
        </ol>
      );

    // paragraphs
    const el = (
      <p
        key={i}
        className={
          firstPara ? "mt-2 mb-3 text-[18px]" : "mt-1.5 mb-3 text-[16px]"
        }
        style={{ color: "var(--text-secondary)" }}
      >
        <Inline text={b.x} />
      </p>
    );
    firstPara = false;
    return el;
  });
}

function H2({ text }) {
  const id = idFrom(text);
  return (
    <h2
      id={id}
      className="mb-1.5 mt-4 md:mt-6 font-semibold"
      style={{
        color: "var(--text-primary)",
        fontSize: "clamp(20px, 3.4vw, 26px)",
        scrollMarginTop: "88px",
      }}
    >
      <Anchor text={text} />
    </h2>
  );
}

function H3({ text }) {
  const id = idFrom(text);
  return (
    <h3
      id={id}
      className="mb-1 mt-3 md:mt-4 font-semibold"
      style={{
        color: "var(--text-primary)",
        fontSize: "clamp(18px, 2.8vw, 20px)",
        scrollMarginTop: "88px",
      }}
    >
      <Anchor text={text} />
    </h3>
  );
}

function Anchor({ text }) {
  const id = idFrom(text);
  return (
    <span className="group inline-flex items-center gap-2">
      <span>
        <Inline text={text} />
      </span>
      <a
        href={`#${id}`}
        className="opacity-0 transition-opacity group-hover:opacity-100 text-[13px]"
        style={{ color: "var(--brand-700)" }}
      >
        #
      </a>
    </span>
  );
}

function PNCard({ dir, post }) {
  const isPrev = dir === "prev";
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={`block rounded-[12px] border p-3 text-sm hover:opacity-95 ${
        isPrev ? "" : "text-right"
      }`}
      style={{
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
        background: "var(--surface-0)",
      }}
    >
      <div className="mb-1 opacity-80">{isPrev ? "← Previous" : "Next →"}</div>
      <div style={{ color: "var(--text-primary)" }}>{post.title}</div>
    </Link>
  );
}
function QuoteBox({ text, cite, role, avatar, href, pull = false }) {
  return (
    <figure
      className={`relative my-6 overflow-hidden rounded-[14px] border shadow-sm ${
        pull ? "p-6 md:p-8" : "p-4 md:p-5"
      }`}
      style={{
        borderColor: "var(--border)",
        // soft brandy glow—works in light/dark
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--surface-0) 96%, transparent), color-mix(in oklab, var(--surface-0) 100%, transparent)), radial-gradient(120% 120% at -10% -30%, color-mix(in oklab, var(--brand-700) 10%, transparent), transparent 60%)",
      }}
    >
      {/* decorative quote mark */}
      <svg
        aria-hidden
        viewBox="0 0 48 48"
        className="pointer-events-none absolute -left-1 -top-1 h-16 w-16"
        style={{ opacity: 0.12, color: "var(--text-secondary)" }}
      >
        <path
          fill="currentColor"
          d="M19 11c-5 0-9 4-9 9 0 4 3 7 7 7-1 6-5 10-10 10v4c9 0 16-7 16-16 0-7-4-14-4-14zm23 0c-5 0-9 4-9 9 0 4 3 7 7 7-1 6-5 10-10 10v4c9 0 16-7 16-16 0-7-4-14-4-14z"
        />
      </svg>

      <blockquote
        className={`relative ${
          pull ? "text-[18px] md:text-[20px]" : "text-[16px] md:text-[17px]"
        } leading-relaxed`}
        style={{ color: "var(--text-primary)" }}
      >
        <Inline text={text} />
      </blockquote>

      {(cite || role || avatar || href) && (
        <figcaption
          className="mt-3 flex items-center gap-3 text-[13px]"
          style={{ color: "var(--text-secondary)" }}
        >
          {avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt=""
              width={28}
              height={28}
              className="rounded-full border"
              style={{ borderColor: "var(--border)" }}
            />
          )}
          <div className="min-w-0">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate underline-offset-2 hover:underline"
                style={{ color: "var(--brand-700)" }}
              >
                {cite || "—"}
              </a>
            ) : (
              <span className="truncate">{cite || "—"}</span>
            )}
            {role && (
              <div className="truncate text-[12px] opacity-80">{role}</div>
            )}
          </div>
        </figcaption>
      )}
    </figure>
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
