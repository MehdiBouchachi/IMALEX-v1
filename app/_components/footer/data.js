import { FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

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
      { label: "Why IMALEX", href: "#why" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Formulation", href: "#services" },
      { label: "Regulatory", href: "#services" },
      { label: "Manufacturing", href: "#services" },
    ],
  },
];

export const DEFAULT_SOCIALS = [
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "Twitter", href: "#", Icon: FaTwitter },
  { label: "Instagram", href: "#", Icon: FaInstagram },
];
