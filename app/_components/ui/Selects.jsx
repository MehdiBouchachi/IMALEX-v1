// app/_components/contact/ui/Selects.jsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Label, Err } from "./Input";

export function SelectShell({
  id,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
  children,
  error,
  label,
}) {
  const selectId = id || name;
  return (
    <div>
      {label ? <Label htmlFor={selectId}>{label}</Label> : null}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange && onChange(e.target.value)}
          disabled={disabled}
          className={[
            "mt-1 w-full appearance-none rounded-lg bg-[var(--contact-input-bg)]",
            "border border-[var(--contact-input-border)] px-3 py-2 pr-8 outline-none",
            "text-[var(--contact-input-text)] focus:ring-4 focus:ring-[var(--contact-input-focus)] disabled:opacity-60",
            error
              ? "border-[var(--contact-danger)] focus:ring-[var(--contact-danger)]/30"
              : "",
          ].join(" ")}
          aria-invalid={!!error}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-2 grid place-items-center text-[var(--contact-ghost-text-muted)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </span>
      </div>
      {error ? <Err>{error}</Err> : null}
    </div>
  );
}

const FALLBACK_COUNTRIES = [
  "Algeria",
  "France",
  "Germany",
  "Morocco",
  "Spain",
  "Tunisia",
  "United Kingdom",
  "United States",
].map((name) => ({ name }));

export function CountrySelect({
  name,
  value,
  onChange,
  label = "Country",
  exclude = [],
  error,
}) {
  const [list, setList] = useState(FALLBACK_COUNTRIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("https://restcountries.com/v2/all?fields=name");
        const data = await res.json();
        const filtered = (data || [])
          .filter(
            (c) =>
              !exclude
                .map((x) => x.toLowerCase())
                .includes((c.name || "").toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        if (alive) setList(filtered);
      } catch {
        // keep fallback
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [exclude]);

  return (
    <SelectShell
      name={name}
      value={value}
      onChange={onChange}
      placeholder={loading ? "Loading countries…" : "Select country…"}
      label={label}
      error={error}
    >
      <option value="" disabled>
        {loading ? "Loading countries…" : "Select country…"}
      </option>
      {list.map((c) => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
    </SelectShell>
  );
}
