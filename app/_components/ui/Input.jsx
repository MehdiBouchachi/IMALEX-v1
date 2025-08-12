// app/_components/contact/ui/Input.jsx
"use client";
import React from "react";

export function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-[var(--contact-ghost-text)]"
    >
      {children}
    </label>
  );
}

export function Err({ id, children }) {
  return (
    <div id={id} className="mt-1 text-xs text-[var(--contact-danger)]">
      {children}
    </div>
  );
}

export function Input({
  id,
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}) {
  const inputId = id || name;
  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[
          "mt-1 w-full rounded-lg border px-3 py-2 outline-none",
          "bg-[var(--contact-input-bg)] border-[var(--contact-input-border)]",
          "text-[var(--contact-input-text)] focus:ring-4 focus:ring-[var(--contact-input-focus)]",
          error
            ? "border-[var(--contact-danger)] focus:ring-[var(--contact-danger)]/30"
            : "",
        ].join(" ")}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-err` : undefined}
      />
      {error ? <Err id={`${inputId}-err`}>{error}</Err> : null}
    </div>
  );
}

export function TextArea({
  id,
  label,
  name,
  rows = 5,
  placeholder = "",
  value,
  onChange,
  error,
}) {
  const areaId = id || name;
  return (
    <div>
      <Label htmlFor={areaId}>{label}</Label>
      <textarea
        id={areaId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[
          "mt-1 w-full rounded-lg px-3 py-2 outline-none",
          "bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)]",
          "text-[var(--contact-input-text)] focus:ring-4 focus:ring-[var(--contact-input-focus)]",
          error
            ? "border-[var(--contact-danger)] focus:ring-[var(--contact-danger)]/30"
            : "",
        ].join(" ")}
        aria-invalid={!!error}
        aria-describedby={error ? `${areaId}-err` : undefined}
      />
      {error ? <Err id={`${areaId}-err`}>{error}</Err> : null}
    </div>
  );
}
