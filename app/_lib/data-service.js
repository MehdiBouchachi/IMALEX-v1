/////////////
// GET

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();

    return countries.filter(
      (country) => country.name.toLowerCase() !== "israel"
    );
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export const cx = (...a) => a.filter(Boolean).join(" ");
export function renderInlineB(str) {
  if (typeof str !== "string") return str;

  // Split on <b>, </b>, and <br> (any casing, with/without slash)
  const tokens = str.split(/(<\/?b>|<br\s*\/?>)/gi);
  const out = [];
  let key = 0;
  let isBold = false;

  for (const t of tokens) {
    if (!t) continue;

    if (/^<b>$/i.test(t)) {
      isBold = true;
      continue;
    }
    if (/^<\/b>$/i.test(t)) {
      isBold = false;
      continue;
    }
    if (/^<br\s*\/?>$/i.test(t)) {
      out.push(<br key={`br-${key++}`} />);
      continue;
    }

    out.push(isBold ? <strong key={`b-${key++}`}>{t}</strong> : t);
  }
  return out;
}
