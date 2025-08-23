// app/_components/about/about.config.js
import {
  FaFlask,
  FaCheckCircle,
  FaLeaf,
  FaShieldAlt,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";

import {
  IFlask,
  IBeaker,
  IShield,
  IGauge,
  ILeaf,
  IFactory,
  ICosmetics,
  INutra,
  IAgriBio,
  IAnimal,
  IFood,
  LeafIcon,
  MicroscopeIcon,
  ComplianceIcon,
  RecycleIcon,
  HandshakeIcon,
} from "../_styles/icons";

import imgFormulation from "../../public/images/services/formulation.jpg";
import imgPrototype from "../../public/images/services/prototype.jpg";
import imgRegulatory from "../../public/images/services/regulatory.jpg";
import imgStability from "../../public/images/services/stability.jpg";
import imgRnd from "../../public/images/services/rnd.jpg";
import imgMfg from "../../public/images/services/manufacturing.jpg";
import imgAbout from "../../public/lab-shot.jpg";
/******  ABOUT DATA SECTION  ******/
export const ABOUT = {
  eyebrowIcon: FaFlask,
  eyebrowText: "IMALEX — Natural Formulation Lab",
  title: "Science-grade natural formulations for industry",
  lead: `IMALEX is an Algerian startup specializing in custom natural formulation.
We partner with brands and manufacturers to design, prototype, validate, and scale products that are effective, compliant, and planet-minded.`,
  bullets: [
    "End-to-end R&D: brief → prototype → stability → dossier → scale-up",
    "Sectors: cosmetics, food supplements, biofertilizers/biopesticides, animal nutrition, agri-food",
    "Regulatory alignment (DZ / EU): labels, INCI, safety, technical files",
  ],
  badges: [
    { icon: FaLeaf, label: "Natural-first" },
    { icon: FaFlask, label: "Lab-validated" },
    { icon: FaShieldAlt, label: "Compliant" },
    { icon: FaCheckCircle, label: "Turnkey" },
  ],
  ctas: [
    { href: "#services", label: "Explore Services", variant: "primary" },
    { href: "#contact", label: "Start a Project", variant: "secondary" },
  ],
  image: {
    src: imgAbout,
    alt: "IMALEX leader in bioformulation",
    captionIcon: FaFlask,
    caption: "In-house R&D & stability testing",
  },
};

/******  CONTACT DATA SECTION  ******/

export const CONTACT = {
  eyebrow: "Get in touch",
  title: "Let’s talk formulation",
  blurb:
    "Share your goals, target market, regulatory region and any constraints. We’ll reply with a plan, timeline and budget options.",
  email: "contact.imalex.dz@gmail.com",
  phone: "+213000000000",
  phoneDisplay: "+213 000 000 000",
  city: "Algiers",
  country: "Algeria",
};

/******  FOOTER DATA SECTION  ******/

export const DEFAULT_BRAND = {
  name: "IMALEX",
  initials: "I",
  tagline:
    "Natural formulation R&D for food supplements, cosmetics, agriculture and more.",
};

export const DEFAULT_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Why IMALEX", href: "/#why" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Formulation", href: "/#services" },
      { label: "Regulatory", href: "/#services" },
      { label: "Manufacturing", href: "/#services" },
    ],
  },
];

export const DEFAULT_SOCIALS = [
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "Twitter (X)", href: "#", Icon: FaTwitter },
  {
    label: "Instagram",
    href: "https://www.instagram.com/imalex_dz",
    Icon: FaInstagram,
  },
];

/******  PROCESS DATA SECTION  ******/
export const PROCESS = {
  eyebrow: "Our Process",
  title: "A Guided Journey — Quiet, Precise, Inevitable.",
  blurb: "Scroll to move through each chapter — from hypothesis to scale.",
};
export const DEFAULT_STEPS = [
  {
    title: "Discovery",
    desc: "Brief, goals, constraints and regulatory targets.",
    Icon: FaSearch,
  },
  {
    title: "Research",
    desc: "Actives screening, concepting, feasibility.",
    Icon: FaMicroscope,
  },
  {
    title: "Prototype",
    desc: "Bench samples, iteration, stability pre-checks.",
    Icon: FaFlask,
  },
  {
    title: "Validation",
    desc: "Stability, compatibility, claims & dossiers.",
    Icon: FaCheck,
  },
  {
    title: "Scale-Up",
    desc: "Tech transfer and pilot → production.",
    Icon: FaIndustry,
  },
];

/******  SECTORS DATA SECTION  ******/
export const SECTORS = {
  eyebrow: "Sectors",
  title: "Industries We Serve",
};
export const SECTORS_DATA = [
  {
    title: "Cosmetics",
    desc: "Skin, hair & body care with clean, effective actives.",
    icon: ICosmetics,
    points: ["Leave-on & rinse-off", "Claims & sensorials"],
  },
  {
    title: "Food supplements",
    desc: "Capsules, powders, liquids and gummies.",
    icon: INutra,
    points: ["Dose & bioavailability", "Tasty formats"],
  },
  {
    title: "Biofertilizers & Biopesticides",
    desc: "Plant-friendly actives and microbial solutions.",
    icon: IAgriBio,
    points: ["Botanical actives", "Field-ready stability"],
  },
  {
    title: "Animal Nutrition",
    desc: "Phytogenic additives and functional oils.",
    icon: IAnimal,
    points: ["Performance & health", "Feed compatibility"],
  },
  {
    title: "Agri-Food",
    desc: "Clean-label flavors, colors and functional ingredients.",
    icon: IFood,
    points: ["Clean label", "Process-ready"],
  },
];

/******  SERVICES DATA SECTION  ******/

export const SERVICES = {
  eyebrow: "Our Services",
  title: "From brief to shelf, without the friction",
  blurb:
    "From custom formulation to compliant production. We turn <b>local botanicals</b> into high-performance products for <b>cosmetics</b>, <b>food supplements</b>, <b>agri-food</b>, <b> biopesticides</b> and <b>animal nutrition</b>.",
};
export const SERVICES_DATA = [
  {
    slug: "formulation",
    title: "Custom Formulation",
    line: "Bespoke, natural-first formulas that hit claims—without trade-offs.",
    icon: IFlask,
    image: imgFormulation, // default center crop
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
    // Reframe so the packaging cluster is dominant (~upper-middle)
    image: { src: imgPrototype, focal: { x: 0, y: 0.6 } },
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
    image: { src: imgRegulatory, focal: { x: 0, y: 0.7 } }, // keep default framing
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
    image: { src: imgStability, focal: { x: 0.5, y: 0.9 } },
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
    // Show the **ingredients at the bottom** of the image (spices/jars)
    image: { src: imgRnd, focal: { x: 0.52, y: 0.86 } },
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
    image: imgMfg, // default framing is fine
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
export const SERVICES_TABLE = [
  { label: "Compliance", diy: "varies", imalex: "EU/DZ ready" },
  { label: "Stability", diy: "uncertain", imalex: "validated" },
  { label: "Tech transfer", diy: "ad-hoc", imalex: "structured" },
  { label: "Time-to-market", diy: "slower", imalex: "accelerated" },
  { label: "Cost-in-use", diy: "unoptimized", imalex: "optimized" },
  { label: "QA / QC", diy: "spot checks", imalex: "QC plan" },
];
export const WHYUS = {
  eyebrow: "Why IMALEX",
  title: " Science, Nature & Accountability",
  blurb:
    "We fuse green chemistry with rigorous validation to create products that are effective, compliant and scalable — without compromising sustainability.",
};

export const items = [
  {
    title: "100% Natural First",
    desc: "Safe, bio-based actives with traceability.",
    icon: LeafIcon,
    spot: "tl",
  },
  {
    title: "Scientific Rigor",
    desc: "Doctoral-level team, QA and lab-proven methods.",
    icon: MicroscopeIcon,
    spot: "t",
  },
  {
    title: "Regulatory Confidence",
    desc: "DZ/EU requirements handled end-to-end.",
    icon: ComplianceIcon,
    spot: "tr",
  },
  {
    title: "Eco-Responsible",
    desc: "Low-impact processes & responsible sourcing.",
    icon: RecycleIcon,
    spot: "bl",
  },
  {
    title: "Partner Mindset",
    desc: "From idea to scale — your external R&D arm.",
    icon: HandshakeIcon,
    spot: "br",
  },
];
