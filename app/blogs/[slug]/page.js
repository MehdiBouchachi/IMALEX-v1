// app/blogs/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fakePosts } from "../../_data/fakePosts";
import Inline from "./Inline";
import RelatedCards from "./RelatedCards";

/* ---------- utils ---------- */
const idFrom = (txt) =>
  String(txt)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

const buildTOC = (blocks = []) => {
  const items = [];
  let h2 = 0,
    h3 = 0;
  for (const b of blocks) {
    if (b.t === "h2") {
      h2 += 1;
      h3 = 0;
      items.push({ id: idFrom(b.x), text: b.x, level: 2, num: String(h2) });
    } else if (b.t === "h3") {
      if (h2 === 0) h2 = 1;
      h3 += 1;
      items.push({ id: idFrom(b.x), text: b.x, level: 3, num: `${h2}.${h3}` });
    }
  }
  return items.length
    ? items
    : [{ id: "top", text: "Overview", level: 2, num: "1" }]; // fallback
};

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

/* ---------- reading bar (unchanged) ---------- */
function ReadingProgress() {
  return (
    <>
      <div className="read-progress" aria-hidden />
      <style>{`
        @supports (scroll-timeline: auto) {
          .read-progress{position:fixed;inset:0 auto auto 0;height:3px;width:100%;background:linear-gradient(90deg,var(--brand-700) 0 0) no-repeat var(--surface-0);z-index:60;--_size:0%;background-size:var(--_size) 100%;border-radius:0 0 2px 0;scroll-timeline:--doc both;animation-timeline:--doc;animation:grow 1s both}
          @scroll-timeline --doc {source:auto;orientation:block}
          @keyframes grow{from{--_size:0%}to{--_size:100%}}
        }
        @supports not (scroll-timeline: auto) {
          .read-progress{position:fixed;left:0;top:0;height:3px;background:var(--brand-700);width:var(--_w,0%);z-index:60;box-shadow:0 1px 0 rgba(0,0,0,.04)}
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(){ if (CSS.supports && CSS.supports('scroll-timeline:auto')) return;
          var bar=document.querySelector('.read-progress'); if(!bar) return;
          function onScroll(){var el=document.documentElement; var h=el.scrollHeight-el.clientHeight; var p=h>0?(el.scrollTop/h)*100:0; bar.style.setProperty('--_w',p.toFixed(2)+'%');}
          onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
        })();
      `,
        }}
      />
    </>
  );
}

/* ---------- PRO TOC (sticky in column) ---------- */
function ProTOC({ items, id = "toc-desktop" }) {
  return (
    <nav className="toc" aria-label="On this page" id={id}>
      <div className="toc__header">
        <span className="toc__title">On this page</span>
      </div>
      <ol className="toc__list">
        {items.map((it) => (
          <li key={it.id} className={`toc__item toc__lvl-${it.level}`}>
            <a href={`#${it.id}`} className="toc__link">
              <span className="toc__num" aria-hidden>
                {it.num}
              </span>
              <span className="toc__text">{it.text}</span>
            </a>
          </li>
        ))}
      </ol>

      <style>{`
        .toc{position:sticky; top:96px; padding:12px; border:1px solid var(--border); border-radius:14px; background:var(--surface-0);
             box-shadow:0 1px 0 rgba(255,255,255,.06); max-height:calc(100svh - 110px); overflow:auto}
        .toc__header{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
        .toc__title{font-weight:900;letter-spacing:.03em;font-size:12px;text-transform:uppercase;color:var(--text-secondary)}
        .toc__list{list-style:none;padding:6px 2px 4px 2px;margin:0;display:grid;gap:4px}
        .toc__lvl-3{padding-left:16px}
        .toc__link{position:relative;display:grid;grid-template-columns:auto 1fr;align-items:center;gap:10px;
                   text-decoration:none;color:var(--text-secondary);font-size:13px;padding:6px 10px;border-radius:8px;border:1px solid transparent}
        .toc__link:hover{background:color-mix(in srgb,var(--brand-400) 10%, transparent)}
        .toc__link[aria-current="true"]{color:var(--text-primary);background:color-mix(in srgb,var(--brand-400) 14%,transparent);
                   border-color:color-mix(in srgb,var(--brand-700) 26%,transparent)}
        .toc__link[aria-current="true"]::before{content:"";position:absolute;left:-12px;top:8px;bottom:8px;width:3px;background:color-mix(in srgb,var(--brand-700) 70%,transparent);border-radius:2px}
        .toc__num{min-width:32px;height:22px;display:inline-grid;place-items:center;font-variant-numeric:tabular-nums;font-weight:900;font-size:11px;letter-spacing:.02em;
                  color:var(--brand-800);background:color-mix(in srgb,var(--brand-400) 14%,transparent);border:1px solid color-mix(in srgb,var(--brand-700) 22%,transparent);border-radius:6px}
        @media (max-width:1023px){ .toc{display:none} } /* hide desktop TOC on mobile */
      `}</style>

      {/* scroll-spy + keyboard nav, scoped to this nav */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(){
          var panel=document.getElementById('${id}'); if(!panel) return;
          var links=[].slice.call(panel.querySelectorAll('.toc__link'));
          // keyboard
          panel.addEventListener('keydown',function(e){
            var i=links.findIndex(l=>l===document.activeElement);
            if(e.key==='ArrowDown'){e.preventDefault();(links[i+1]||links[0]).focus();}
            if(e.key==='ArrowUp'){e.preventDefault();(links[i-1]||links[links.length-1]).focus();}
            if(e.key==='Home'){e.preventDefault();links[0].focus();}
            if(e.key==='End'){e.preventDefault();links[links.length-1].focus();}
          });
          // spy
          var map=new Map(); links.forEach(a=>map.set(a.getAttribute('href').slice(1),a));
          var spy=new IntersectionObserver((entries)=>{
            var vis=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
            if(!vis.length) return;
            var id=vis[0].target.id;
            links.forEach(a=>a.removeAttribute('aria-current'));
            var active=map.get(id); if(active) active.setAttribute('aria-current','true');
          },{rootMargin:'-40% 0px -55% 0px',threshold:[0,.25,.5,.75,1]});
          map.forEach((a,id)=>{var el=document.getElementById(id); if(el) spy.observe(el);});
        })();
      `,
        }}
      />
    </nav>
  );
}

/* ---------------------------------- page --------------------------------- */
export default function BlogPost({ params }) {
  const idx = fakePosts.findIndex((p) => p.slug === params.slug);
  const post = fakePosts[idx];
  if (!post) return notFound();

  const prev = idx > 0 ? fakePosts[idx - 1] : null;
  const next = idx < fakePosts.length - 1 ? fakePosts[idx + 1] : null;

  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = base ? `${base}/blogs/${post.slug}` : "";
  const tocItems = buildTOC(post.content);

  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <ReadingProgress />

      {/* Desktop grid: left TOC column, divider, content */}
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 md:pt-24 lg:grid lg:grid-cols-[300px_1px_minmax(0,1fr)] lg:gap-10">
        {/* DESKTOP TOC in the left column (sticky) */}
        <aside className="hidden self-start lg:block">
          <ProTOC items={tocItems} />
        </aside>

        {/* Divider */}
        <div
          aria-hidden
          className="hidden w-px self-stretch lg:block"
          style={{ background: "var(--border)" }}
        />

        {/* Article */}
        <article className="mx-auto w-full max-w-3xl">
          <div className="mb-2 text-sm">
            <Link
              href="/blogs"
              className="underline-offset-2 hover:underline"
              style={{ color: "var(--brand-700)" }}
            >
              IMALEX Blog
            </Link>
          </div>

          <h1
            className="mb-2 font-extrabold leading-tight tracking-[-0.015em]"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(30px, 5vw, 44px)",
              textWrap: "balance",
            }}
          >
            <Inline text={post.title} />
          </h1>

          {post.excerpt && (
            <p
              className="leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                fontSize: "18px",
                textWrap: "balance",
              }}
            >
              <Inline text={post.excerpt} />
            </p>
          )}

          <div
            className="mt-3 flex flex-wrap items-center gap-3 text-[13px]"
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
                />
              )}
              <span>{post.author?.name ?? "IMALEX"}</span>
            </div>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
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

          {post.image && (
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
          )}

          {/* Mobile TOC — simple collapsible: you can keep your previous mobile version if you like; 
              here we just hide desktop TOC and let readers scroll on mobile. */}

          <div className="prose-area max-w-none">
            <Article blocks={post.content} />
          </div>

          <RelatedCards
            posts={fakePosts.filter((p) => p.slug !== post.slug).slice(0, 2)}
          />

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
              <div
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
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

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {prev && <PNCard dir="prev" post={prev} />}
              {next && <PNCard dir="next" post={next} />}
            </div>
          </footer>
        </article>
      </div>

      {/* Back to top */}
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

      {/* Prose styles (unchanged) */}
      <style>{`
        :root { font-optical-sizing: auto; }
        .prose-area { color: var(--text-secondary); line-height: 1.82; font-size: 16.2px; }
        .prose-area p { margin: .7rem 0 1rem; }
        .prose-area p:first-of-type { font-size: 18px; color: var(--text-primary); text-wrap: balance; }
        .prose-area h2, .prose-area h3 { color: var(--text-primary); font-weight: 900; letter-spacing: -0.012em; scroll-margin-top: 92px; text-wrap: balance; }
        .prose-area h2 { margin: 1.8rem 0 .8rem; font-size: clamp(20px, 3.3vw, 27px); }
        .prose-area h3 { margin: 1.25rem 0 .65rem; font-size: clamp(18px, 2.8vw, 20px); }
        .prose-area a { color: var(--brand-700); text-underline-offset: 2px; }
        .prose-area a:hover, .prose-area a:focus { text-decoration: underline; }
        .prose-area ul, .prose-area ol { margin: .55rem 0 1.05rem; padding-left: 1.25rem; }
        .prose-area li { margin: .25rem 0; }
        .prose-area figure { margin: 1.2rem 0; }
        .prose-area figcaption { color: var(--text-secondary); }
        .prose-area blockquote, .doc-callout {
          margin: 1rem 0; padding: 16px 18px; border: 1px solid var(--border); border-radius: 14px;
          color: var(--text-primary);
          background: linear-gradient(180deg, color-mix(in oklab, var(--surface-0) 96%, transparent), color-mix(in oklab, var(--surface-0) 100%, transparent)),
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
        .prose-area tbody tr:hover { background: color-mix(in srgb, var(--brand-400) 8%, transparent); }
        .prose-area kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: .825em; border: 1px solid var(--border); border-bottom-width: 2px; border-radius: 6px; padding: .1em .35em;
          background: color-mix(in srgb, var(--surface-0) 90%, transparent); }
        .copy-btn{ position:absolute; right:8px; top:8px; padding:6px 8px; font-size:12px; font-weight:800; border-radius:8px; border:1px solid var(--border);
          background: color-mix(in srgb, var(--surface-0) 92%, transparent); }
        .copy-btn[data-ok="1"]{ border-color: color-mix(in srgb, #22c55e 50%, var(--border)); }
      `}</style>

      {/* copy buttons for code (unchanged) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(){
          document.querySelectorAll('.prose-area pre').forEach(function(pre){
            if (pre.querySelector('.copy-btn')) return;
            var btn=document.createElement('button'); btn.className='copy-btn'; btn.type='button'; btn.textContent='Copy';
            btn.addEventListener('click', function(){
              var code=pre.querySelector('code'); if(!code) return;
              navigator.clipboard.writeText(code.innerText||'').then(function(){
                btn.dataset.ok='1'; btn.textContent='Copied'; setTimeout(function(){btn.dataset.ok=''; btn.textContent='Copy';},1200);
              });
            }); pre.appendChild(btn);
          });
        })();
      `,
        }}
      />
    </div>
  );
}

/* ------------------------------- Article (unchanged API) ------------------------------- */
function Article({ blocks = [] }) {
  let firstPara = true;
  return blocks.map((b, i) => {
    if (b.t === "h2") return <H2 key={i} text={b.x} />;
    if (b.t === "h3") return <H3 key={i} text={b.x} />;
    if (b.t === "blockquote")
      return <QuoteBox key={i} text={b.x} cite={b.cite} />;
    if (b.t === "callout")
      return (
        <div key={i} className="doc-callout" data-variant={b.v || "tip"}>
          <Inline text={b.x} />
        </div>
      );
    if (b.t === "code")
      return (
        <pre key={i}>
          <code>{b.x}</code>
        </pre>
      );
    if (b.t === "img")
      return (
        <figure
          key={i}
          className="my-6 overflow-hidden rounded-[12px] border"
          style={{ borderColor: "var(--border)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.src}
            alt={b.alt || ""}
            className="block w-full"
            loading="lazy"
          />
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
        <ul key={i} className="list-disc pl-6">
          {b.x.map((li, k) => (
            <li key={k}>
              <Inline text={li} />
            </li>
          ))}
        </ul>
      );
    if (b.t === "ol")
      return (
        <ol key={i} className="list-decimal pl-6">
          {b.x.map((li, k) => (
            <li key={k}>
              <Inline text={li} />
            </li>
          ))}
        </ol>
      );

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

/* ----------------------- Headings with anchor links ---------------------- */
function H2({ text }) {
  return (
    <h2 id={idFrom(text)}>
      <Anchor text={text} />
    </h2>
  );
}
function H3({ text }) {
  return (
    <h3 id={idFrom(text)}>
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

/* ----------------------------- Prev/Next cards --------------------------- */
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

/* --------------------------------- Quote -------------------------------- */
function QuoteBox({ text, cite, role, avatar, href, pull = false }) {
  return (
    <figure
      className={`relative my-6 overflow-hidden rounded-[14px] border shadow-sm ${
        pull ? "p-6 md:p-8" : "p-4 md:p-5"
      }`}
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--surface-0) 96%, transparent), color-mix(in oklab, var(--surface-0) 100%, transparent)), radial-gradient(120% 120% at -10% -30%, color-mix(in oklab, var(--brand-700) 10%, transparent), transparent 60%)",
      }}
    >
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
            /* eslint-disable-next-line @next/next/no-img-element */ <img
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
