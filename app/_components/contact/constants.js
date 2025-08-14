export const TOTAL_STEPS = 3;
export const PROGRESS_LABELS = ["Contact", "Project", "Review"];

export const SECTOR_OPTIONS = [
  { value: "", label: "Select sector…", disabled: true },
  { value: "cosmetics", label: "Natural cosmetics" },
  { value: "supplements", label: "Dietary supplements" },
  { value: "biopesticides", label: "Biopesticides & biofertilizers" },
  { value: "animal-nutrition", label: "Animal nutrition" },
  { value: "agri-food", label: "Agri-food products" },
];

export const NEED_OPTIONS = [
  ["custom-formulation", "Custom formulation"],
  ["prototype", "Prototype"],
  ["stability", "Stability & efficacy study"],
  ["rnd", "Research & innovation"],
  ["regulatory", "Regulatory analysis"],
  ["other", "Other"],
];

export const STAGE_OPTIONS = [
  ["idea", "Idea"],
  ["early-rnd", "Early R&D"],
  ["in-production", "In production"],
];

export const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  sector: "",
  needs: [],
  stage: "",
  brief: "",
  company: "", // ← add this line
};

export const CONTACT = {
  eyebrow: "Contact",
  title: "Let’s talk formulation",
  blurb:
    "Share your goals, target market, regulatory region and any constraints. We’ll reply with a plan, timeline and budget options.",
  email: "hello@imalex.bio",
  phone: "+213000000000",
  phoneDisplay: "+213 000 000 000",
  city: "Algiers",
  country: "Algeria",
};
