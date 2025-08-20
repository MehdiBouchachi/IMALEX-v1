// app/blogs/[slug]/page.js
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fakePosts } from "../../../data/fakePosts";
import Inline from "../../../widgets/article/Inline";
import RelatedCards from "../../../widgets/article/RelatedCards";
import SkeletonTOC from "../../../widgets/article/skeletons/SkeletonTOC";
import SkeletonArticle from "../../../widgets/article/skeletons/SkeletonArticle";
import PNCard from "../../../widgets/article/PNCard";
import { buildTOCGroups, formatDate } from "../../../widgets/blogs/utils";
import dynamic from "next/dynamic";

/* ⬇️ client enhancers with loading fallbacks */
const ReadingProgress = dynamic(
  () => import("../../../widgets/article/ReadingProgress"),
  {
    ssr: false,
    loading: () => null,
  }
);
const TOCSticky = dynamic(() => import("../../../widgets/article/TOCSticky"), {
  ssr: false,
  loading: () => <SkeletonTOC />,
});
/* ArticleBody is a client component in your repo — keep SSR for SEO,
   but show SkeletonArticle during client-side transitions */
const ArticleBody = dynamic(
  () => import("../../../widgets/article/ArticleBody"),
  {
    ssr: true,
    loading: () => <SkeletonArticle />,
  }
);
const CopyCodeButtons = dynamic(
  () => import("../../../widgets/article/CopyCodeButtons"),
  {
    ssr: false,
    loading: () => null,
  }
);
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

  const canonical = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${post.slug}`
    : "";

  const tocGroups = buildTOCGroups(post.content);

  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <ReadingProgress />
      <ProseGlobalStyles />

      <div className="mx-auto max-w-7xl px-4  pb-20 pt-20 md:pt-24 lg:grid lg:grid-cols-[minmax(260px,300px)_1px_minmax(0,1fr)] lg:gap-10">
        {/* Sticky TOC column (mirrors Services left column) */}
        <aside>
          <TOCSticky groups={tocGroups} />
        </aside>

        {/* Vertical divider */}
        <div
          aria-hidden
          className="hidden w-px self-stretch lg:block"
          style={{ background: "var(--border)" }}
        />

        <article className="mx-auto w-full max-w-3xl">
          <HeaderMeta post={post} />
          <HeroFigure post={post} />
          <MobileOutline groups={tocGroups} />

          <div className="prose-area max-w-none">
            <ArticleBody blocks={post.content} />
          </div>

          <CopyCodeButtons scopeSelector=".prose-area" />

          <RelatedCards
            posts={fakePosts.filter((p) => p.slug !== post.slug).slice(0, 2)}
          />

          <FooterNav
            prev={prev}
            next={next}
            canonical={canonical}
            post={post}
          />
        </article>
      </div>

      <BackToTop />
    </div>
  );
}

// ---------- Subcomponents ----------

function HeaderMeta({ post }) {
  return (
    <>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/blogs"
          className="underline-offset-2 hover:underline"
          style={{ color: "var(--brand-700)" }}
        >
          IMALEX Blog
        </Link>
        <span aria-hidden>•</span>
        <span style={{ color: "var(--text-secondary)" }}>
          {formatDate(post.date)} · {post.readTime} min read
        </span>
      </div>

      <h1
        className="mb-2 font-extrabold leading-tight tracking-[-0.015em]"
        style={{
          color: "var(--text-primary)",
          fontSize: "clamp(32px, 5.2vw, 46px)",
          textWrap: "balance",
        }}
      >
        <Inline text={post.title} />
      </h1>

      {post.excerpt && (
        <p
          className="leading-relaxed text-[18px]"
          style={{ color: "var(--text-secondary)", textWrap: "balance" }}
        >
          <Inline text={post.excerpt} />
        </p>
      )}

      <div
        className="mt-4 flex flex-wrap items-center gap-3 text-[13px]"
        style={{ color: "var(--text-secondary)" }}
      >
        <div className="flex items-center gap-2">
          {post.author?.avatar && (
            <Image
              src={post.author.avatar}
              alt={post.author?.name ?? ""}
              width={22}
              height={22}
              className="rounded-full"
              unoptimized
            />
          )}
          <span>{post.author?.name ?? "IMALEX"}</span>
        </div>
        {!!post.tags?.length && (
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
        )}
      </div>
    </>
  );
}

function HeroFigure({ post }) {
  if (!post.image) return null;
  return (
    <figure
      className="relative my-6 overflow-hidden rounded-[14px] border shadow-sm"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="aspect-[16/9]">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
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
  );
}

function MobileOutline({ groups }) {
  return (
    <details className="lg:hidden mb-4 group">
      <summary
        className="cursor-pointer select-none rounded-lg px-3 py-2 text-sm font-semibold"
        style={{
          color: "var(--text-primary)",
          background: "color-mix(in srgb, var(--brand-400) 10%, transparent)",
          border: "1px solid var(--border)",
        }}
      >
        On this page <span className="ml-1 opacity-60 text-xs">(outline)</span>
      </summary>
      <nav className="mt-2 pl-2">
        <ol className="list-none p-0 m-0">
          {groups.map((g) => (
            <li key={g.id} className="py-1">
              <a
                href={`#${g.id}`}
                className="inline-flex items-baseline gap-2 text-[15px] font-semibold hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                <span
                  className="inline-block h-[6px] w-[6px] rounded-full"
                  style={{ background: "var(--brand-700)" }}
                />
                {g.text}
              </a>
              {g.children.length > 0 && (
                <ol className="mt-1 ml-5 list-none">
                  {g.children.map((c) => (
                    <li key={c.id} className="py-0.5">
                      <a
                        href={`#${c.id}`}
                        className="text-[14px] text-[var(--text-secondary)] hover:underline"
                      >
                        {c.text}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

function FooterNav({ prev, next, canonical, post }) {
  return (
    <footer
      className="mt-10 border-t pt-6"
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
          <a href="#" className="underline-offset-2 hover:underline">
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href="#" className="underline-offset-2 hover:underline">
            X
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev && <PNCard dir="prev" post={prev} />}
        {next && <PNCard dir="next" post={next} />}
      </div>
    </footer>
  );
}

function BackToTop() {
  return (
    <a
      href="#top"
      className="fixed bottom-4 right-4 z-50 rounded-full border px-3 py-2 text-xs font-semibold backdrop-blur hover:opacity-95"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--surface-0) 80%, transparent)",
      }}
    >
      ↑ Top
    </a>
  );
}

function ProseGlobalStyles() {
  return (
    <style suppressHydrationWarning>{`
      :root { font-optical-sizing: auto; }
      .prose-area { color: var(--text-secondary); line-height: 1.84; font-size: 16.2px; }
      .prose-area p { margin: .7rem 0 1.05rem; }
      .prose-area p:first-of-type { font-size: 18px; color: var(--text-primary); text-wrap: balance; }
      .prose-area h2, .prose-area h3 { color: var(--text-primary); font-weight: 900; letter-spacing: -0.012em; scroll-margin-top: 112px; text-wrap: balance; }
      .prose-area h2 { margin: 1.9rem 0 .85rem; font-size: clamp(21px, 3.5vw, 28px); }
      .prose-area h3 { margin: 1.25rem 0 .7rem; font-size: clamp(18px, 2.8vw, 20px); }
      .prose-area a { color: var(--brand-700); text-underline-offset: 2px; }
      .prose-area a:hover, .prose-area a:focus { text-decoration: underline; }
      .prose-area ul, .prose-area ol { margin: .55rem 0 1.05rem; padding-left: 1.25rem; }
      .prose-area li { margin: .25rem 0; }
      .prose-area figure { margin: 1.2rem 0; }
      .prose-area figcaption { color: var(--text-secondary); }

      .prose-area blockquote, .doc-callout {
        margin: 1rem 0; padding: 16px 18px; border: 1px solid var(--border); border-radius: 14px;
        color: var(--text-primary);
        background:
          linear-gradient(180deg, color-mix(in oklab, var(--surface-0) 96%, transparent), color-mix(in oklab, var(--surface-0) 100%, transparent)),
          radial-gradient(120% 120% at -10% -30%, color-mix(in oklab, var(--brand-700) 10%, transparent), transparent 60%);
        box-shadow: 0 1px 0 rgba(0,0,0,.04);
      }
      .doc-callout[data-variant="tip"]    { border-color: color-mix(in srgb, #22c55e 40%, var(--border)); }
      .doc-callout[data-variant="warn"]   { border-color: color-mix(in srgb, #f59e0b 40%, var(--border)); }
      .doc-callout[data-variant="danger"] { border-color: color-mix(in srgb, #ef4444 40%, var(--border)); }

      .prose-area code {
        background: color-mix(in srgb, var(--brand-400) 12%, transparent);
        border: 1px solid color-mix(in srgb, var(--brand-700) 22%, transparent);
        padding: 0 .35em; border-radius: 6px; font-size: .95em;
      }
      .prose-area pre { position: relative; overflow:auto; margin: 1rem 0; padding: 14px; border-radius: 12px; border:1px solid var(--border);
        background: color-mix(in srgb, var(--surface-0) 94%, transparent); box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
      .prose-area pre code { background: transparent; border: 0; padding: 0; display:block; }
      .prose-area table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1rem 0; font-size: 14px; }
      .prose-area th, .prose-area td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
      .prose-area thead th { color: var(--text-primary); text-align: left; font-weight: 900; }

      .copy-btn {
        position: absolute; right: 8px; top: 8px; padding: 6px 8px; font-size: 12px; font-weight: 800;
        border-radius: 8px; border: 1px solid var(--border);
        background: color-mix(in srgb, var(--surface-0) 92%, transparent);
      }
      .copy-btn[data-ok="1"] {
        border-color: color-mix(in srgb, #22c55e 50%, var(--border));
      }
    `}</style>
  );
}
