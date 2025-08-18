// app/blogs/[slug]/_skeletons/SkeletonPN.js
export default function SkeletonPN() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 animate-pulse">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-[12px] border p-3"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-0)",
          }}
        >
          <div
            className="mb-1 h-3 w-20 rounded"
            style={{ background: "var(--border)" }}
          />
          <div
            className="h-4 w-3/4 rounded"
            style={{ background: "var(--border)" }}
          />
        </div>
      ))}
    </div>
  );
}
