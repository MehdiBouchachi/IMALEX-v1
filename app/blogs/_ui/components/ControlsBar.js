// app/blogs/_ui/components/ControlsBar.js
"use client";

import CustomSelect from "./CustomSelect";

export default function ControlsBar({
  searchRef,
  mode,
  setMode,
  openMode,
  setOpenMode,
  sortBy,
  setSortBy,
  openSort,
  setOpenSort,
  onType,
}) {
  const MODE_OPTIONS = [
    { type: "group", label: "Search in" },
    { value: "all", label: "All fields", desc: "Title, writer & tags" },
    { value: "title", label: "Titles only" },
    { value: "author", label: "Writers only" },
    { value: "tag", label: "Tags only" },
  ];

  const SORT_OPTIONS = [
    { type: "group", label: "Date" },
    { value: "date_desc", label: "Newest first" },
    { value: "date_asc", label: "Oldest first" },
    { type: "group", label: "Name" },
    { value: "name_asc", label: "Name A–Z" },
    { value: "name_desc", label: "Name Z–A" },
  ];

  return (
    <div
      className={[
        "grid items-center gap-3 rounded-2xl border border-border bg-surface-1 p-3",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
        // mobile: single column; from sm: 3 columns
        "grid-cols-1",
        "sm:[grid-template-columns:minmax(120px,160px)_1fr_minmax(160px,200px)]",
      ].join(" ")}
    >
      {/* left select */}
      <CustomSelect
        ariaLabel="Search mode"
        value={mode}
        onChange={(v) => {
          setMode(v);
          setOpenMode(false);
        }}
        open={openMode}
        setOpen={setOpenMode}
        options={MODE_OPTIONS}
        // full width on mobile; constrain only at sm+
        className="w-full sm:w-[min(160px,100%)]"
      />

      {/* search */}
      <div className="relative w-full">
        <label htmlFor="q" className="sr-only">
          Search
        </label>
        <input
          ref={searchRef}
          id="q"
          onChange={(e) => onType(e.target.value)}
          placeholder="Search by title, writer, or tag…  (press / to focus)"
          className={[
            "h-[46px] w-full rounded-xl border border-border pl-10 pr-3 text-[14px] font-semibold text-text-primary placeholder:text-muted outline-none transition",
            "bg-[linear-gradient(0deg,var(--surface-0),var(--surface-0)),color-mix(in_srgb,var(--brand-400)_6%,transparent)]",
            "focus:border-[color-mix(in_srgb,var(--brand-600)_55%,var(--border))]",
            "focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand-400)_18%,transparent),_0_1px_0_0_rgba(0,0,0,.02)_inset]",
          ].join(" ")}
          inputMode="search"
          autoComplete="off"
        />
        <svg
          aria-hidden
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        >
          <path
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* right select */}
      <CustomSelect
        ariaLabel="Sort articles"
        value={sortBy}
        onChange={(v) => {
          setSortBy(v);
          setOpenSort(false);
        }}
        open={openSort}
        setOpen={setOpenSort}
        options={SORT_OPTIONS}
        align="end"
        // full width on mobile; right-align only at sm+
        className="w-full sm:w-[min(200px,100%)] sm:justify-self-end"
      />
    </div>
  );
}
