// app/_components/contact/steps/StepThree.jsx
"use client";
import React from "react";
import { STAGE_OPTIONS } from "../constants";
import { TextArea } from "../../../../ui/Input"; // or your Field/TextArea
import RadioChips from "../../../../ui/RadioChips";
import InlineNote from "../../../../ui/InlineNote";

export function StepThree({ form, setField, errors, disabled }) {
  const showBriefNote = !form.brief?.trim() || !!errors.brief;
  return (
    <>
      <RadioChips
        label="Project stage"
        name="stage"
        value={form.stage}
        onChange={(v) => setField("stage", v)}
        options={STAGE_OPTIONS} // [ [value, label], ... ]
        error={errors.stage}
        cols={3}
        disabled={disabled}
      />

      <TextArea
        label="Project brief"
        name="brief"
        rows={5}
        placeholder="What would you like to build?"
        value={form.brief}
        onChange={(e) => setField("brief", e.target.value)}
        error={errors.brief}
        disabled={disabled}
      />

      <InlineNote show={showBriefNote} tone="info" title="Heads up:">
        A short project brief is required to send your request. Tell us the
        goal, target market, and any constraints (min. ~10 characters).
      </InlineNote>

      <div className="rounded-xl px-4 py-3 border border-[var(--contact-panel-border)] bg-[var(--contact-panel-bg)]">
        <div className="text-sm text-[var(--contact-ghost-text)]">
          <strong>Quick review:</strong> {form.name || "—"} •{" "}
          {form.email || "—"} • {form.phone || "—"} • {form.country || "—"}{" "}
          {form.city ? `(${form.city})` : ""}
          <br />
          <span className="opacity-80">
            {form.sector || "—"} • {form.needs.join(", ") || "—"} •{" "}
            {form.stage || "—"}
          </span>
        </div>
      </div>
    </>
  );
}
