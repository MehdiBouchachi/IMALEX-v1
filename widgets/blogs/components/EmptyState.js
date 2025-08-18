// app/blogs/_ui/components/EmptyState.js
"use client";

export default function EmptyState() {
  return (
    <div className="mt-10 grid place-items-center rounded-xl border border-border bg-surface-0 p-10 text-center">
      <div className="mx-auto max-w-xl">
        <h3 className="text-lg font-semibold text-text-primary">No results</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Try a different keyword or switch the search mode.
        </p>
      </div>
    </div>
  );
}
