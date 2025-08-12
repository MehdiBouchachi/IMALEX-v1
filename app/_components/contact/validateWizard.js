export function validate(step, f) {
  const e = {};

  if (step === 1) {
    if (!f.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.phone.trim()) e.phone = "Required";
    if (!f.country) e.country = "Select a country";
    if (!f.city.trim()) e.city = "Enter your city"; // ← NEW
  }

  if (step === 2) {
    if (!f.sector) e.sector = "Select a sector";
    if (!f.needs?.length) e.needs = "Pick at least one need";
  }

  if (step === 3) {
    if (!f.stage) e.stage = "Select a stage";
    if (f.brief.trim().length < 10) e.brief = "Add a few more details";
  }

  return e;
}
