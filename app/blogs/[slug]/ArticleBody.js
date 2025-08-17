"use client";
import Inline from "./Inline";
import { idFrom } from "./utils";

export default function ArticleBody({ blocks = [] }) {
  let firstPara = true;

  return blocks.map((b, i) => {
    const key = makeKey(b, i);

    if (b.t === "h2") return <H2 key={key} text={b.x} />;
    if (b.t === "h3") return <H3 key={key} text={b.x} />;

    if (b.t === "blockquote")
      return <QuoteBox key={key} text={b.x} cite={b.cite} />;

    if (b.t === "callout")
      return (
        <div key={key} className="doc-callout" data-variant={b.v || "tip"}>
          <Inline text={b.x} />
        </div>
      );

    if (b.t === "code")
      return (
        <pre key={key}>
          <code>{b.x}</code>
        </pre>
      );

    if (b.t === "img")
      return (
        <figure
          key={key}
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
        <ul key={key} className="list-disc pl-6">
          {b.x.map((li, k) => (
            <li key={makeKey({ t: "li", x: li }, k)}>
              <Inline text={li} />
            </li>
          ))}
        </ul>
      );

    if (b.t === "ol")
      return (
        <ol key={key} className="list-decimal pl-6">
          {b.x.map((li, k) => (
            <li key={makeKey({ t: "li", x: li }, k)}>
              <Inline text={li} />
            </li>
          ))}
        </ol>
      );

    const el = (
      <p
        key={key}
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

function makeKey(b, i) {
  const sig = String(b.x || b.src || "").slice(0, 64);
  return `${b.t || "p"}:${sig}#${i}`;
}

/* ---- headings with anchors ---- */
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

/* ---- quote ---- */
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
