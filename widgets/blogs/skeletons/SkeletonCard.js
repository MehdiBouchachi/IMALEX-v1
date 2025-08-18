// app/blogs/_skeletons/SkeletonCard.js
export default function SkeletonCard() {
  return (
    <article
      className={[
        "relative flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-border bg-surface-1",
        "shadow-[var(--shadow-card,0_6px_22px_rgba(0,0,0,0.06))]",
      ].join(" ")}
    >
      {/* media */}
      <div className="relative aspect-[16/10] w-full flex-none animate-pulse bg-[color-mix(in_srgb,var(--brand-400)_12%,transparent)]" />

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* tags */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full border border-brand-700/30 bg-brand-400/20" />
          <div className="h-6 w-24 animate-pulse rounded-full border border-brand-700/30 bg-brand-400/20" />
        </div>

        {/* title lines */}
        <div className="space-y-2">
          <div className="h-5 w-11/12 animate-pulse rounded bg-white/10" />
          <div className="h-5 w-8/12 animate-pulse rounded bg-white/10" />
        </div>

        {/* excerpt lines */}
        <div className="mt-1 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-white/10" />
          <div className="h-4 w-[85%] animate-pulse rounded bg-white/10" />
          <div className="h-4 w-[70%] animate-pulse rounded bg-white/10" />
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="h-[18px] w-[18px] animate-pulse rounded-full bg-white/15" />
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full border border-brand-700/30 bg-brand-400/15" />
        </div>
      </div>
    </article>
  );
}
