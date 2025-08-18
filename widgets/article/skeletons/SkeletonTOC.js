// app/blogs/[slug]/skeletons/SkeletonTOC.js
export default function SkeletonTOC() {
  return (
    <nav className="sticky top-24 text-sm leading-6 animate-pulse">
      <h2
        className="mb-2 text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-secondary)" }}
      >
        On this page
      </h2>
      <ul className="space-y-2">
        {[1, 2, 3].map((i) => (
          <li key={i}>
            <div
              className="h-4 w-3/4 rounded"
              style={{ background: "var(--border)" }}
            />
            {i === 1 && (
              <ul className="ml-4 mt-2 space-y-1">
                <li>
                  <div
                    className="h-3 w-2/3 rounded"
                    style={{ background: "var(--border)" }}
                  />
                </li>
                <li>
                  <div
                    className="h-3 w-1/2 rounded"
                    style={{ background: "var(--border)" }}
                  />
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
