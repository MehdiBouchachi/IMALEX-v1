// app/blogs/[slug]/RelatedCards.js
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "../blogs/utils";

export default function RelatedCards({ posts = [] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-12">
      <h4
        className="mb-4 font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Related articles
      </h4>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blogs/${p.slug}`}
            className="group overflow-hidden rounded-[12px] border transition-[transform,box-shadow,opacity] hover:opacity-95"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-0)",
              boxShadow: "0 1px 0 rgba(0,0,0,.04)",
            }}
          >
            {p.image && (
              <div className="relative aspect-[16/9]">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            )}
            <div className="p-3">
              <div
                className="mb-1 text-[12px]"
                style={{ color: "var(--text-secondary)" }}
              >
                {formatDate(p.date)} • {p.readTime} min
              </div>
              <div
                className="line-clamp-2 font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {p.title}
              </div>
              {p.tags?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2 py-0.5 text-[11px]"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
