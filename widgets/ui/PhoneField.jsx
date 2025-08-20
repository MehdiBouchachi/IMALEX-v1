"use client";
import React from "react";
import PhoneInput from "react-phone-number-input";
import metadata from "libphonenumber-js/min/metadata";
import "react-phone-number-input/style.css"; // base lib css

import { Label, Err } from "./Input";

export default function PhoneField({
  id,
  label = "Phone number",
  name = "phone",
  value,
  onChange, // receives E.164 (e.g. +213…)
  defaultCountry, // "DZ" | "MA" | "US" | ...
  error,
  disabled,
  placeholder = "Enter phone number", // optional
}) {
  const inputId = id || name;

  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>

      <PhoneInput
        id={inputId}
        name={name}
        value={value}
        onChange={(v) => onChange(v || "")}
        defaultCountry={defaultCountry}
        international
        withCountryCallingCode
        limitMaxLength
        placeholder={placeholder}
        countrySelectProps={{ disabled }} // no unicodeFlags
        metadata={metadata}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-err` : undefined}
        disabled={disabled}
        className={[
          // container styling (matches Input.jsx)
          "mt-1 w-full rounded-lg border px-3 py-2",
          "bg-[var(--contact-input-bg)] border-[var(--contact-input-border)]",
          "text-[var(--contact-input-text)] focus-within:ring-4 focus-within:ring-[var(--contact-input-focus)]",
          "outline-none flex items-center gap-2",
          error
            ? "border-[var(--contact-danger)] focus-within:ring-[var(--contact-danger)]/30"
            : "",
          disabled ? "opacity-60 pointer-events-none" : "",
          // library root class (kept for inner elements)
          "PhoneInput",
        ].join(" ")}
      />

      {error ? <Err id={`${inputId}-err`}>{error}</Err> : null}
    </div>
  );
}
