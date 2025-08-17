// app/blogs/[slug]/utils.js

export const idFrom = (txt) =>
  String(txt)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

// Strictly normalize various date inputs into a UTC date
const parseDateUTC = (input) => {
  if (input instanceof Date && !Number.isNaN(input.getTime())) {
    return new Date(
      Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate())
    );
  }
  const s = String(input || "").trim();
  // YYYY-MM-DD
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  // YYYY/MM/DD
  m = s.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  // If it looks like a date-only ISO prefix, force midnight Z
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return new Date(`${s}T00:00:00Z`);
  // Fallback: let JS parse (may include timezone)
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? new Date(NaN) : d;
};

const dtf = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

export const formatDate = (input) => {
  const d = parseDateUTC(input);
  return Number.isNaN(d.getTime()) ? "" : dtf.format(d);
};

// Grouped TOC (unchanged)
export const buildTOCGroups = (blocks = []) => {
  const groups = [];
  let cur = null;
  let n2 = 0;
  let n3 = 0;
  for (const b of blocks) {
    if (b.t === "h2") {
      n2 += 1;
      n3 = 0;
      cur = {
        id: idFrom(b.x),
        text: b.x,
        num: String(n2),
        level: 2,
        children: [],
      };
      groups.push(cur);
    } else if (b.t === "h3") {
      if (!cur) {
        n2 = 1;
        cur = {
          id: idFrom(b.x),
          text: b.x,
          num: String(n2),
          level: 2,
          children: [],
        };
        groups.push(cur);
      } else {
        n3 += 1;
        cur.children.push({
          id: idFrom(b.x),
          text: b.x,
          num: `${n2}.${n3}`,
          level: 3,
        });
      }
    }
  }
  if (!groups.length)
    groups.push({
      id: "top",
      text: "Overview",
      num: "1",
      level: 2,
      children: [],
    });
  return groups;
};
