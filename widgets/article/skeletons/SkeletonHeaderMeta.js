// app/blogs/[slug]/skeletons/SkeletonHeaderMeta.js
export default function SkeletonHeaderMeta() {
  return (
    <div className="animate-pulse">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="h-4 w-24 rounded"
          style={{ background: "var(--border)" }}
        />
        <span aria-hidden style={{ color: "var(--text-secondary)" }}>
          •
        </span>
        <div
          className="h-4 w-40 rounded"
          style={{ background: "var(--border)" }}
        />
      </div>

      <div
        className="mb-2 h-10 w-3/4 rounded"
        style={{ background: "var(--border)" }}
      />
      <div
        className="mb-4 h-4 w-2/3 rounded"
        style={{ background: "var(--border)" }}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="h-[22px] w-[22px] rounded-full"
            style={{ background: "var(--border)" }}
          />
          <div
            className="h-4 w-24 rounded"
            style={{ background: "var(--border)" }}
          />
        </div>
        <span aria-hidden style={{ color: "var(--text-secondary)" }}>
          •
        </span>
        <div className="flex gap-2">
          <div
            className="h-5 w-14 rounded-full border"
            style={{ borderColor: "var(--border)" }}
          />
          <div
            className="h-5 w-16 rounded-full border"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
      </div>
    </div>
  );
}
