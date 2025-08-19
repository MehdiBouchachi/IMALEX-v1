// app/_components/services/services.config.js
import { IFlask, IBeaker, IShield, IGauge, ILeaf, IFactory } from "./icons";

// Use your alias if configured; otherwise switch to relative paths like "../../public/…"
import imgFormulation from "../../../../public/images/services/formulation.jpg";
import imgPrototype from "../../../../public/images/services/prototype.jpg";
import imgRegulatory from "../../../../public/images/services/regulatory.jpg";
import imgStability from "../../../../public/images/services/stability.jpg";
import imgRnd from "../../../../public/images/services/rnd.jpg";
import imgMfg from "../../../../public/images/services/manufacturing.jpg";

export const SERVICES = [
  {
    slug: "formulation",
    title: "Custom Formulation",
    line: "Bespoke, natural-first formulas that hit claims—without trade-offs.",
    icon: IFlask,
    image: imgFormulation,
    bullets: [
      "Brief → functional & sensory targets",
      "Natural ingredient selection (local botanicals prioritized)",
      "Balanced efficacy, stability & cost-in-use",
    ],
    cta: "Start a brief",
    readMore: {
      panel:
        "Custom formulations built on natural ingredients and rigorous science.",
      intro:
        "We design formulations to your goals, technical constraints, and brief—balancing efficacy, stability, and compliance.",
      items: [
        "Brief & functional targets",
        "Natural ingredient selection and standardization",
        "Lab trials & sensorial optimization",
        "INCI compliance and regulatory readiness",
      ],
      cta: "Request full scope",
    },
  },
  {
    slug: "prototype",
    title: "Prototype Development",
    line: "Get lab samples fast to validate feasibility and sensorials.",
    icon: IBeaker,
    image: imgPrototype,
    bullets: [
      "Rapid bench samples & iteration",
      "Sensorial tuning (texture, scent, taste)",
      "Pre-stability checks & packaging screening",
    ],
    cta: "Request samples",
    readMore: {
      panel:
        "Functional prototypes to validate technical, sensory, and regulatory feasibility.",
      intro:
        "We produce quick lab samples to iterate, adjust, and shorten time-to-market.",
      items: [
        "Rapid lab samples & iterations",
        "Technical & sensorial validation",
        "Pre-stability tests & packaging fit",
      ],
      cta: "Request samples",
    },
  },
  {
    slug: "regulatory",
    title: "Regulatory Dossiers",
    line: "DZ/EU compliance, labels, INCI and technical files—done right.",
    icon: IShield,
    image: imgRegulatory,
    bullets: [
      "INCI & ingredient declarations",
      "Claims & artwork review",
      "Safety guidance & file compilation",
    ],
    cta: "Check compliance",
    readMore: {
      panel:
        "Algeria/EU compliance: labeling, INCI, safety, and technical documentation.",
      intro:
        "We help bring your products into compliance with local and international requirements.",
      items: [
        "Technical file compilation",
        "Artwork/label regulatory review",
        "Regulatory monitoring & registration guidance",
      ],
      cta: "Check compliance",
    },
  },
  {
    slug: "stability",
    title: "Stability & Efficacy",
    line: "Prove shelf-life and performance with the right test plan.",
    icon: IGauge,
    image: imgStability,
    bullets: [
      "Accelerated & real-time stability",
      "Micro / physico-chemical / packaging",
      "Partnered efficacy & tolerance studies",
    ],
    cta: "Plan testing",
    readMore: {
      panel: "Test plans to guarantee shelf life, integrity, and performance.",
      intro:
        "We run accelerated and real-time stability and coordinate efficacy studies with trusted partners.",
      items: [
        "Physico-chemical stability (accelerated/real)",
        "Packaging compatibility & microbiological control",
        "Sensory tests & partner efficacy studies",
      ],
      cta: "Plan tests",
    },
  },
  {
    slug: "rnd",
    title: "R&D & Ingredient Sourcing",
    line: "Unlock local botanicals & synergies with scientific rigor.",
    icon: ILeaf,
    image: imgRnd,
    bullets: [
      "Actives scouting & standardization",
      "Synergy design & eco-processes",
      "Sustainable, traceable sourcing",
    ],
    cta: "Explore actives",
    readMore: {
      panel: "Research & innovation on natural actives and eco-processes.",
      intro:
        "We develop local botanical extracts, synergistic blends, and sustainable processes with scientific validation.",
      items: [
        "New extracts & standardization",
        "Synergistic blends & active-level optimization",
        "Sustainable, traceable sourcing",
      ],
      cta: "Discuss R&D",
    },
  },
  {
    slug: "manufacturing",
    title: "Contract Manufacturing",
    line: "Pilot → small/medium series in compliant facilities.",
    icon: IFactory,
    image: imgMfg,
    bullets: [
      "Liquids / semi-solids / solids",
      "Primary packaging & QC",
      "Tech transfer & scale-up",
    ],
    cta: "Discuss production",
    readMore: {
      panel: "Small/medium-scale manufacturing that meets quality standards.",
      intro:
        "End-to-end production and filling with technology transfer and quality control.",
      items: [
        "Solid, liquid & semi-solid forms",
        "Primary packaging & QC",
        "Tech transfer & scale-up",
      ],
      cta: "Start production",
    },
  },
];
