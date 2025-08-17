// app/blogs/_ui/BlogIndexClient.js
"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  useDeferredValue,
} from "react";
import ControlsBar from "./components/ControlsBar";
import CardsGrid from "./components/CardsGrid";
import EmptyState from "./components/EmptyState";
import SkeletonGrid from "../_skeletons/SkeletonGrid";
import useDelayedBusy from "./useDelayedBusy";

/* helpers */
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const indexPosts = (posts = []) =>
  posts.map((p, i) => ({
    ...p,
    _id: p.id ?? p.slug ?? `p-${i}`,
    _lcTitle: (p.title || "").toLowerCase(),
    _lcAuthor: (p.author?.name || "").toLowerCase(),
    _lcTags: (p.tags || []).map((t) => (t || "").toLowerCase()),
  }));

export default function BlogIndexClient({ posts }) {
  const indexed = useMemo(() => indexPosts(posts), [posts]);

  // search + filters
  const [q, setQ] = useState("");
  const [mode, setMode] = useState("all"); // all | title | author | tag
  const [sortBy, setSortBy] = useState("date_desc"); // date_desc | date_asc | name_asc | name_desc
  const [openMode, setOpenMode] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  // deferred input + debounce
  const deferredQ = useDeferredValue(q);
  const debTimer = useRef(null);
  const onType = (val) => {
    window.clearTimeout(debTimer.current);
    debTimer.current = window.setTimeout(() => setQ(val), 120);
  };

  // press "/" to focus search
  const searchRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement;
      if (
        e.key === "/" &&
        el?.tagName !== "INPUT" &&
        el?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // filter
  const filtered = useMemo(() => {
    const txt = (deferredQ || "").trim().toLowerCase();
    if (!txt) return indexed;
    return indexed.filter((p) => {
      if (mode === "title") return p._lcTitle.includes(txt);
      if (mode === "author") return p._lcAuthor.includes(txt);
      if (mode === "tag") return p._lcTags.some((t) => t.includes(txt));
      return (
        p._lcTitle.includes(txt) ||
        p._lcAuthor.includes(txt) ||
        p._lcTags.some((t) => t.includes(txt))
      );
    });
  }, [indexed, deferredQ, mode]);

  // sort (non-blocking)
  const [isPending, startTransition] = useTransition();
  const [sorted, setSorted] = useState(filtered);
  useEffect(() => {
    startTransition(() => {
      const arr = [...filtered];
      const toTime = (d) => (d ? new Date(d).getTime() : 0);
      switch (sortBy) {
        case "date_asc":
          arr.sort((a, b) => toTime(a.date) - toTime(b.date));
          break;
        case "name_asc":
          arr.sort((a, b) =>
            (a.title || "").localeCompare(b.title || "", undefined, {
              sensitivity: "base",
            })
          );
          break;
        case "name_desc":
          arr.sort((a, b) =>
            (b.title || "").localeCompare(a.title || "", undefined, {
              sensitivity: "base",
            })
          );
          break;
        case "date_desc":
        default:
          arr.sort((a, b) => toTime(b.date) - toTime(a.date));
      }
      setSorted(arr);
    });
  }, [filtered, sortBy]);

  // infinite reveal
  const [visible, setVisible] = useState(9);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const chunk = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 12;
      if (w >= 640) return 10;
      return 8;
    };
    setVisible(chunk());
  }, [deferredQ, mode, sortBy]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          const chunk = () => {
            const w = window.innerWidth;
            if (w >= 1024) return 12;
            if (w >= 640) return 10;
            return 8;
          };
          setVisible((v) => clamp(v + chunk(), 0, sorted.length));
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sorted.length]);

  /* ---------------- client transition skeletons ---------------- */
  // Busy whenever:
  // 1) React transition is pending (sorting), or
  // 2) deferred search input hasn't settled yet (typing).
  const filterTyping = q !== deferredQ;
  const gridBusyRaw = isPending || filterTyping;

  // Smooth it (don’t flash for micro-changes)
  const showGridSkeleton = useDelayedBusy(gridBusyRaw, 100, 200);

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

        <ControlsBar
          searchRef={searchRef}
          mode={mode}
          setMode={setMode}
          openMode={openMode}
          setOpenMode={setOpenMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          openSort={openSort}
          setOpenSort={setOpenSort}
          onType={onType}
        />

        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {gridBusyRaw
            ? "Updating…"
            : `${sorted.length} article${sorted.length === 1 ? "" : "s"} found`}
        </p>
      </header>

      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
        {sorted.length === 0 && !showGridSkeleton ? (
          <EmptyState />
        ) : (
          <div aria-busy={showGridSkeleton ? "true" : "false"}>
            {showGridSkeleton ? (
              // keep skeleton count roughly equal to visible grid size
              <SkeletonGrid count={Math.max(visible, 8)} />
            ) : (
              <>
                <CardsGrid posts={sorted.slice(0, visible)} />
                <div ref={sentinelRef} aria-hidden className="h-8" />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
