import Link from "next/link";

export default function PNCard({ dir, post }) {
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
