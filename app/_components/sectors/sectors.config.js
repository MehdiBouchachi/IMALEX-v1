import { ICosmetics, INutra, IAgriBio, IAnimal, IFood } from "./icons";

export const SECTORS = [
  {
    title: "Cosmetics",
    desc: "Skin, hair & body care with clean, effective actives.",
    icon: ICosmetics,
    points: ["Leave-on & rinse-off", "Claims & sensorials"],
  },
  {
    title: "Nutraceuticals",
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
