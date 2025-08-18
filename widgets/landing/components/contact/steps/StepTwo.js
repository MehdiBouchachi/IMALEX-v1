"use client";
import React from "react";
import { SelectShell } from "../../../../ui/Selects";
import { Label } from "../../../../ui/Input";
import CheckboxChips from "../../../../ui/CheckboxChips";
import { NEED_OPTIONS, SECTOR_OPTIONS } from "../constants";

export function StepTwo({ form, setField, toggleNeed, errors, disabled }) {
  return (
    <>
      <div>
        <Label>Sector</Label>
        <SelectShell
          name="sector"
          value={form.sector}
          onChange={(v) => setField("sector", v)}
          defaultValue=""
          error={errors.sector}
          disabled={disabled}
        >
          {SECTOR_OPTIONS.map(({ value, label, disabled }) => (
            <option key={label} value={value} disabled={disabled}>
              {label}
            </option>
          ))}
        </SelectShell>
      </div>

      <CheckboxChips
        label="Type of need"
        name="needs"
        values={form.needs}
        onToggle={toggleNeed}
        options={NEED_OPTIONS} // [ [value, label], ... ]
        error={errors.needs}
        cols={2}
        disabled={disabled}
      />
    </>
  );
}
