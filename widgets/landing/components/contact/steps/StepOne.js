import React from "react";
import { Input } from "../../../../ui/Input";
import { CountrySelect } from "../../../../ui/Selects";
import PhoneField from "../../../../ui/PhoneField";
const NAME_TO_ISO = {
  Algeria: "DZ",
  Morocco: "MA",
  Tunisia: "TN",
  France: "FR",
  Spain: "ES",
  Portugal: "PT",
  "United States": "US",
  USA: "US",
  Canada: "CA",
  Germany: "DE",
  Italy: "IT",
  "United Kingdom": "GB",
  UK: "GB",
  "Saudi Arabia": "SA",
  "United Arab Emirates": "AE",
  UAE: "AE",
};
export function StepOne({ form, setField, errors, disabled }) {
  const defaultCountry =
    NAME_TO_ISO[form.country] ||
    (typeof form.country === "string" && form.country.length === 2
      ? form.country.toUpperCase()
      : "DZ");
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
      <PhoneField
        label="Phone number"
        name="phone"
        value={form.phone}
        onChange={(v) => setField("phone", v)}
        defaultCountry={defaultCountry}
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
