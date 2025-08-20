import { isValidPhoneNumber } from "react-phone-number-input";

export function validate(step, f) {
  const e = {};

  if (step === 1) {
    if (!f.name?.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(f.email || "")) e.email = "Enter a valid email";

    // Require global-valid phone in E.164
    if (!f.phone || !isValidPhoneNumber(f.phone)) {
      e.phone = "Enter a valid phone";
    }

    if (!f.country) e.country = "Select a country";
    if (!f.city?.trim()) e.city = "Enter your city";
  }

  if (step === 2) {
    if (!f.sector) e.sector = "Select a sector";
    if (!f.needs?.length) e.needs = "Pick at least one need";
  }

  if (step === 3) {
    if (!f.stage) e.stage = "Select your project stage";
    // brief optional but encourage clarity if too short and user typed something
    if (f.brief && f.brief.trim().length > 0 && f.brief.trim().length < 12) {
      e.brief = "Add a few more details";
    }
  }

  return e;
}
