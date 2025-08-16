// app/components/sections.js

// Order matches the homepage sections
const ITEMS = [
  ["Home", "hero"],
  ["About", "about"],
  ["Services", "services"],
  ["Sectors", "sectors"],
  ["Blogs", "blog"], // keep Blog right here (before Process)
  ["Process", "process"],
  ["Contact", "contact"],
];

// Used only by the scroll-spy hook on the home page
export const HOME_SECTIONS = ITEMS.map(([label, id]) => [label, `#${id}`]);

// Build the nav for any route without reordering items
export const buildSections = (isHome) =>
  ITEMS.map(([label, id]) => {
    if (label === "Blogs") {
      // Blog: anchor on home, route elsewhere
      return [label, isHome ? `#${id}` : "/blogs"];
    }
    // Other sections: anchor on home, link back to the home hash elsewhere
    return [label, isHome ? `#${id}` : `/#${id}`];
  });
