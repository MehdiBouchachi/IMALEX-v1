// app/_components/contact/ui/RadioChips.jsx
"use client";
import React from "react";
import { Label, Err } from "./Input";

/**
 * RadioChips
 * props:
 * - label: string (group label)
 * - name: string (radio group name)
 * - value: string (current value)
 * - onChange: (newVal: string) => void
 * - options: Array<[value: string, label: string]>
 * - error?: string
 * - cols?: number (grid columns on sm+)
 */
export default function RadioChips({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  cols = 3,
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className={`mt-2 grid sm:grid-cols-${cols} gap-2`}>
        {options.map(([val, lab]) => {
          const selected = value === val;
          return (
            <label
              key={val}
              className={[
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition border cursor-pointer",
                selected
                  ? "border-[var(--contact-chip-selected-border)] bg-[var(--contact-chip-selected-bg)]"
                  : "border-[var(--contact-input-border)] hover:bg-[var(--contact-chip-hover-bg)]",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                className="h-4 w-4 accent-[var(--cta-600)]"
                checked={selected}
                onChange={() => onChange(val)}
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
