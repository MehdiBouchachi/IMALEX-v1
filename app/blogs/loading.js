import SkeletonControls from "../../widgets/blogs/skeletons/SkeletonControls";
import SkeletonGrid from "../../widgets/blogs/skeletons/SkeletonGrid";

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-0 pb-16 pt-20 md:pt-24">
      <header className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-[image:var(--g-accent-chip)] px-2.5 py-1 text-xs font-extrabold tracking-wide text-brand-800">
            All articles
          </span>
          <h1 className="mt-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight tracking-[-0.02em] text-text-primary">
            Blog
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-text-secondary">
            Research notes, product science, and field learnings—curated by
            IMALEX across cosmetics, food supplements, biopesticides, animal
            nutrition, and agri-food.
          </p>
        </div>

        <SkeletonControls />
        <p className="mt-3 h-4 w-40 animate-pulse rounded bg-white/10" />
      </header>

      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        <SkeletonGrid count={9} />
      </main>
    </div>
  );
}
