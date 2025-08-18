// app/blogs/_skeletons/SkeletonControls.js
export default function SkeletonControls() {
  return (
    <div
      className={[
        "grid items-center gap-3 rounded-2xl border border-border bg-surface-1 p-3",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        "grid-cols-1",
        "sm:[grid-template-columns:minmax(120px,160px)_1fr_minmax(160px,200px)]",
      ].join(" ")}
    >
      <div className="h-[46px] w-full animate-pulse rounded-xl border border-border bg-[color-mix(in_srgb,var(--brand-400)_12%,transparent)]" />
      <div className="h-[46px] w-full animate-pulse rounded-xl border border-border bg-[linear-gradient(0deg,var(--surface-0),var(--surface-0)),color-mix(in_srgb,var(--brand-400)_12%,transparent)]" />
      <div className="h-[46px] w-full animate-pulse rounded-xl border border-border bg-[color-mix(in_srgb,var(--brand-400)_12%,transparent)] sm:w-[min(200px,100%)] sm:justify-self-end" />
    </div>
  );
}
