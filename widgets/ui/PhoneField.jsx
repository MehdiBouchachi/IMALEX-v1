// app/_components/contact/ui/PhoneField.jsx
"use client";
import React from "react";
import PhoneInput from "react-phone-number-input";
import metadata from "libphonenumber-js/min/metadata";
import "react-phone-number-input/style.css";

import { Label, Err } from "./Input";

export default function PhoneField({
  id,
  label = "Phone number",
  name = "phone",
  value,
  onChange, // receives E.164 (e.g. +213…)
  defaultCountry, // e.g. "DZ", "MA", "US"
  error,
  disabled,
}) {
  const inputId = id || name;

  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>

      {/* Root gets the same shell as your <Input /> */}
      <PhoneInput
        id={inputId}
        name={name}
        value={value}
        onChange={(v) => onChange(v || "")}
        defaultCountry={defaultCountry}
        international
        withCountryCallingCode
        limitMaxLength
        countrySelectProps={{ unicodeFlags: true, disabled }}
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

      {/* Make inner elements match your design */}
      <style jsx global>{`
        /* Ensure the internal tel <input> blends with your field shell */
        .PhoneInput .PhoneInputInput {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--contact-input-text);
          font: inherit;
          padding: 0; /* we already padded the container */
        }
        /* Country select should look flat and inherit colors */
        .PhoneInput .PhoneInputCountry {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .PhoneInput .PhoneInputCountrySelect {
          background: transparent;
          border: 0;
          outline: 0;
          color: var(--contact-input-text);
          font: inherit;
          padding: 0;
          appearance: none;
          cursor: pointer;
        }
        /* Flag box subtle border to match your input border tone */
        .PhoneInput .PhoneInputCountryIcon {
          box-shadow: 0 0 0 1px var(--contact-input-border);
          border-radius: 2px;
          width: 1.25rem;
          height: 1rem;
          overflow: hidden;
        }
        /* Placeholder color to match your inputs */
        .PhoneInput .PhoneInputInput::placeholder {
          color: color-mix(
            in oklab,
            var(--contact-input-text) 45%,
            transparent
          );
          opacity: 0.7;
        }
        /* Disabled cursor for inner controls */
        .PhoneInput[disabled] .PhoneInputInput,
        .PhoneInput[disabled] .PhoneInputCountrySelect {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
