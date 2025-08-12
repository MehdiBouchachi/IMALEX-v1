// app/_components/contact/ui/CheckboxChips.jsx
"use client";
import React from "react";
import { Label, Err } from "./Input";

/**
 * CheckboxChips
 * props:
 * - label: string (group label)
 * - name: string
 * - values: string[] (current selected)
 * - onToggle: (val: string) => void
 * - options: Array<[value: string, label: string]>
 * - error?: string
 * - cols?: 1|2|3|4 (grid cols on sm+)
 */
export default function CheckboxChips({
  label,
  name,
  values = [],
  onToggle,
  options = [],
  error,
  cols = 2,
}) {
  const gridCols =
    {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
    }[cols] || "sm:grid-cols-2";

  return (
    <div>
      <Label>{label}</Label>
      <div className={`mt-2 grid ${gridCols} gap-2`}>
        {options.map(([val, lab]) => {
          const checked = values.includes(val);
          return (
            <label
              key={val}
              className={[
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition border cursor-pointer",
                checked
                  ? "border-[var(--contact-chip-selected-border)] bg-[var(--contact-chip-selected-bg)]"
                  : "border-[var(--contact-input-border)] hover:bg-[var(--contact-chip-hover-bg)]",
              ].join(" ")}
            >
              <input
                type="checkbox"
                name={name}
                className="h-4 w-4 accent-[var(--cta-700)]"
                checked={checked}
                onChange={() => onToggle(val)}
                aria-invalid={!!error}
              />
              <span className="text-[var(--contact-ghost-text)]">{lab}</span>
            </label>
          );
        })}
      </div>
      {error ? <Err>{error}</Err> : null}
    </div>
  );
}
