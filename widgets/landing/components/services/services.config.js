// app/_components/services/services.config.js
import { IFlask, IBeaker, IShield, IGauge, ILeaf, IFactory } from "./icons";

export const SERVICES = [
  {
    slug: "formulation",
    title: "Custom Formulation",
    line: "Bespoke, natural-first formulas that hit claims—without trade-offs.",
    icon: IFlask,
    image: "/images/services/formulation.jpg",
    bullets: [
      "Brief → functional & sensory targets",
      "Ingredient selection (local botanicals prioritized)",
      "Balanced efficacy, stability & cost-in-use",
    ],
    cta: "Start a brief",
  },
  {
    slug: "prototype",
    title: "Prototype Development",
    line: "Get lab samples fast to validate feasibility and sensorials.",
    icon: IBeaker,
    image: "/images/services/prototype.jpg",
    bullets: [
      "Rapid bench samples & iteration",
      "Sensorial tuning (texture, scent, taste)",
      "Pre-stability checks & packaging screening",
    ],
    cta: "Request samples",
  },
  {
    slug: "regulatory",
    title: "Regulatory Dossiers",
    line: "DZ/EU compliance, labels, INCI and technical files—done right.",
    icon: IShield,
    image: "/images/services/regulatory.jpg",
    bullets: [
      "INCI & ingredient declarations",
      "Claims & artwork review",
      "Safety guidance & file compilation",
    ],
    cta: "Check compliance",
  },
  {
    slug: "stability",
    title: "Stability & Efficacy",
    line: "Prove shelf-life and performance with the right test plan.",
    icon: IGauge,
    image: "/images/services/stability.jpg",
    bullets: [
      "Accelerated & real-time stability",
      "Micro / physico-chemical / packaging",
      "Partnered efficacy & tolerance studies",
    ],
    cta: "Plan testing",
  },
  {
    slug: "rnd",
    title: "R&D & Ingredient Sourcing",
    line: "Unlock local botanicals & synergies with scientific rigor.",
    icon: ILeaf,
    image: "/images/services/rnd.jpg",
    bullets: [
      "Actives scouting & standardization",
      "Synergy design & eco-processes",
      "Sustainable, traceable sourcing",
    ],
    cta: "Explore actives",
  },
  {
    slug: "manufacturing",
    title: "Contract Manufacturing",
    line: "Pilot → small/medium series in compliant facilities.",
    icon: IFactory,
    image: "/images/services/manufacturing.jpg",
    bullets: [
      "Liquids / semi-solids / solids",
      "Primary packaging & QC",
      "Tech transfer & scale-up",
    ],
    cta: "Discuss production",
  },
];
