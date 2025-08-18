// app/blogs/[slug]/skeletons/SkeletonHero.js
export default function SkeletonHero() {
  return (
    <div
      className="my-6 overflow-hidden rounded-[14px] border animate-pulse"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="aspect-[16/9] w-full"
        style={{ background: "var(--border)" }}
      />
      <div className="px-3 py-2">
        <div
          className="mx-auto h-3 w-1/2 rounded"
          style={{ background: "var(--border)" }}
        />
      </div>
    </div>
  );
}
