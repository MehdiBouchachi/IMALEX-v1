// app/blogs/[slug]/_skeletons/SkeletonPage.js
import SkeletonTOC from "./SkeletonTOC";
import SkeletonHeaderMeta from "./SkeletonHeaderMeta";
import SkeletonHero from "./SkeletonHero";
import SkeletonArticle from "./SkeletonArticle";
import SkeletonRelated from "./SkeletonRelated";
import SkeletonPN from "./SkeletonPN";

export default function SkeletonPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 md:pt-24 lg:grid lg:grid-cols-[300px_1px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden self-start lg:block">
          <SkeletonTOC />
        </aside>

        <div
          aria-hidden
          className="hidden w-px self-stretch lg:block"
          style={{ background: "var(--border)" }}
        />

        <article className="mx-auto w-full max-w-3xl">
          <SkeletonHeaderMeta />
          <SkeletonHero />
          {/* mobile outline skeleton */}
          <div className="lg:hidden mb-4 animate-pulse">
            <div
              className="h-8 w-40 rounded"
              style={{ background: "var(--border)" }}
            />
            <div className="mt-2 space-y-2 pl-2">
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

          <SkeletonArticle />
          <SkeletonRelated />

          <footer
            className="mt-10 border-t pt-6"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="mb-6 h-4 w-24 rounded animate-pulse"
              style={{ background: "var(--border)" }}
            />
            <SkeletonPN />
          </footer>
        </article>
      </div>
    </div>
  );
}
