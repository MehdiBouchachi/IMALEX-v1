// app/blogs/[slug]/skeletons/SkeletonArticle.js
export default function SkeletonArticle() {
  return (
    <div className="animate-pulse space-y-4">
      {/* a few “paragraph” lines */}
      <div
        className="h-4 w-full rounded"
        style={{ background: "var(--border)" }}
      />
      <div
        className="h-4 w-5/6 rounded"
        style={{ background: "var(--border)" }}
      />
      <div
        className="h-4 w-2/3 rounded"
        style={{ background: "var(--border)" }}
      />

      {/* image / code block proxy */}
      <div
        className="my-3 h-64 w-full rounded-[12px] border"
        style={{ borderColor: "var(--border)", background: "var(--surface-0)" }}
      />

      {/* more text */}
      <div
        className="h-4 w-4/5 rounded"
        style={{ background: "var(--border)" }}
      />
      <div
        className="h-4 w-11/12 rounded"
        style={{ background: "var(--border)" }}
      />
      <div
        className="h-4 w-2/3 rounded"
        style={{ background: "var(--border)" }}
      />

      {/* list proxy */}
      <div className="mt-2 space-y-2 pl-5">
        <div
          className="h-3 w-2/3 rounded"
          style={{ background: "var(--border)" }}
        />
        <div
          className="h-3 w-1/2 rounded"
          style={{ background: "var(--border)" }}
        />
        <div
          className="h-3 w-3/4 rounded"
          style={{ background: "var(--border)" }}
        />
      </div>
    </div>
  );
}
