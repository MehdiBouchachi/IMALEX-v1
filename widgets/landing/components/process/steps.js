
import {
  FaFlask,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";

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
