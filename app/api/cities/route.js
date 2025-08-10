// app/api/cities/route.js
export const dynamic = "force-dynamic";

const uniqSorted = (arr = []) =>
  Array.from(new Set(arr.filter(Boolean))).sort((a, b) => a.localeCompare(b));

async function tryGeoDB(iso2, q = "") {
  const key = process.env.RAPIDAPI_KEY;
  if (!key || !iso2) return [];
  const url = new URL(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${iso2}/cities`
  );
  url.searchParams.set("limit", "1000");
  url.searchParams.set("sort", "name");
  if (q) url.searchParams.set("namePrefix", q);

  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json?.data || []).map((c) => c.name);
}

async function tryGeoNames(iso2, q = "") {
  const user = process.env.GEONAMES_USER || "demo"; // demo = rate-limited, but works
  if (!iso2 || !user) return [];
  const url = new URL("https://secure.geonames.org/searchJSON");
  url.searchParams.set("country", iso2);
  url.searchParams.set("featureClass", "P"); // populated places (cities/towns)
  url.searchParams.set("maxRows", "1000");
  url.searchParams.set("username", user);
  if (q) url.searchParams.set("name_startsWith", q);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return (json?.geonames || []).map((g) => g.name);
}

async function tryCountriesNow(countryName) {
  if (!countryName) return [];
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: countryName }),
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    const j = await res.json();
    return Array.isArray(j?.data) ? j.data : [];
  } catch {
    return [];
  }
}

export async function POST(req) {
  try {
    const { countryName, countryIso2, q = "" } = await req.json();

    // 1) GeoDB
    let out = await tryGeoDB(countryIso2, q);
    if (out.length) return Response.json({ cities: uniqSorted(out) });

    // 2) GeoNames
    out = await tryGeoNames(countryIso2, q);
    if (out.length) return Response.json({ cities: uniqSorted(out) });

    // 3) countriesnow
    out = await tryCountriesNow(countryName);
    return Response.json({ cities: uniqSorted(out) });
  } catch {
    return Response.json({ cities: [] });
  }
}
