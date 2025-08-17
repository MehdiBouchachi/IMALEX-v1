// app/_components/about/about.config.js
import { FaFlask, FaCheckCircle, FaLeaf, FaShieldAlt } from "react-icons/fa";

export const ABOUT_COPY = {
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
    src: "/lab-shot.jpg",
    alt: "IMALEX leader in bioformulation",
    captionIcon: FaFlask,
    caption: "In-house R&D & stability testing",
  },
};
