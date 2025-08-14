import React from "react";
import { Input } from "../../ui/Input";
import { CountrySelect } from "../../ui/Selects";

export function StepOne({ form, setField, errors, disabled }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Input
        label="Full name"
        name="name"
        value={form.name}
        onChange={(e) => setField("name", e.target.value)}
        error={errors.name}
        disabled={disabled}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => setField("email", e.target.value)}
        error={errors.email}
        disabled={disabled}
      />
      <Input
        label="Phone number"
        name="phone"
        type="tel"
        placeholder="+213…"
        value={form.phone}
        onChange={(e) => setField("phone", e.target.value)}
        error={errors.phone}
        disabled={disabled}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <CountrySelect
          name="country"
          value={form.country}
          onChange={(v) => setField("country", v)}
          // if you want to exclude any:
          exclude={["Israel"]}
          error={errors.country}
        />
        <Input
          label="City"
          name="city"
          placeholder="Enter your city"
          value={form.city}
          onChange={(e) => setField("city", e.target.value)}
          error={errors.city}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
