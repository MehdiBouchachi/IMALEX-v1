// app/blogs/_ui/components/BlogCard.js
"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

export default memo(function BlogCard({ post, href }) {
  const tags = (post.tags || []).slice(0, 3);

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "bg-[var(--surface-1)] border border-[var(--border)]",
        "shadow-[var(--shadow-card,0_6px_22px_rgba(0,0,0,0.06))]",
        // transitions identical to your CSS
        "[transition-property:transform,box-shadow,border-color] duration-[220ms]",
        "contain-[layout_paint]",
        // gradient glow layer (exact as before)
        "before:content-[''] before:absolute before:inset-[-1px] before:rounded-2xl",
        "before:[background:radial-gradient(60%_80%_at_10%_0%,color-mix(in_srgb,var(--brand-500)_45%,transparent),transparent_60%),_radial-gradient(70%_80%_at_100%_120%,color-mix(in_srgb,var(--brand-700)_25%,transparent),transparent_60%)]",
        "before:opacity-0 before:transition-opacity before:pointer-events-none before:z-0",
        "hover:before:opacity-60",
        // hover lift + border/shadow like before
        "hover:-translate-y-[3px]",
        "hover:border-[color-mix(in_srgb,var(--brand-600)_28%,var(--border))]",
        "hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--brand-700)_12%,transparent),0_6px_20px_rgba(0,0,0,0.10)]",
      ].join(" ")}
    >
      {/* media (fixed ratio) */}
      <div className="relative aspect-[16/10] w-full flex-none overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          placeholder="blur"
          quality={60}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:-translate-y-[1.5%] group-hover:scale-[1.06]"
          loading="lazy"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply [background:linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0)_58%),radial-gradient(90%_60%_at_10%_100%,rgba(0,0,0,0.12),transparent_60%)]"
        />
      </div>

      {/* body */}
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col gap-[10px] p-4">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="max-w-full truncate rounded-full border px-[10px] py-1 text-[12px] font-extrabold text-[var(--brand-800)] border-[color-mix(in_srgb,var(--brand-700)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand-400)_10%,transparent)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <h3 className="line-clamp-2 text-[17px] font-extrabold leading-[1.28] tracking-[-0.01em] text-[var(--text-primary)] lg:line-clamp-3 lg:text-[18px]">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="line-clamp-3 flex-1 text-[13.5px] leading-[1.6] text-[var(--text-secondary)]">
            {post.excerpt}
          </p>
        )}

        {/* footer pinned to bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 text-[12px] text-[var(--text-muted)]">
          <span className="inline-flex min-w-0 items-center gap-2">
            {post.author?.avatar ? (
              <Image
                src={post.author.avatar}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-full object-cover"
                loading="lazy"
              />
            ) : null}
            <span className="truncate">
              {post.author?.name ? `By ${post.author.name}` : ""}
              {post.author?.name && post.date ? " · " : ""}
              {post.date || ""}
            </span>
          </span>

          {/* original chip-style CTA */}
          <Link
            href={href}
            className={[
              "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 font-extrabold text-[var(--brand-800)]",
              "border border-[color-mix(in_srgb,var(--brand-700)_30%,transparent)]",
              "bg-[color-mix(in_srgb,var(--brand-400)_10%,transparent)]",
              "transition [transition-property:transform,background-color,border-color]",
              "hover:-translate-y-[1px]",
              "hover:bg-[color-mix(in_srgb,var(--brand-400)_20%,transparent)]",
              "hover:border-[color-mix(in_srgb,var(--brand-700)_45%,transparent)]",
            ].join(" ")}
            aria-label={`Read ${post.title}`}
          >
            Read more{" "}
            <span aria-hidden className="font-black">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
});
