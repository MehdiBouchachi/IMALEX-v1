// app/blogs/[slug]/skeletons/SkeletonRelated.js
export default function SkeletonRelated() {
  return (
    <section className="mt-12 animate-pulse">
      <div
        className="mb-4 h-5 w-36 rounded"
        style={{ background: "var(--border)" }}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[12px] border"
            style={{
              borderColor: "var(--border)",
              background: "var(--surface-0)",
            }}
          >
            <div
              className="aspect-[16/9]"
              style={{ background: "var(--border)" }}
            />
            <div className="p-3 space-y-2">
              <div
                className="h-3 w-24 rounded"
                style={{ background: "var(--border)" }}
              />
              <div
                className="h-4 w-5/6 rounded"
                style={{ background: "var(--border)" }}
              />
              <div className="mt-2 flex gap-2">
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
        ))}
      </div>
    </section>
  );
}
