"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function CountryCitySelect({
  defaultCountry = "",
  nameCountry = "country",
  nameCity = "city",
}) {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState(defaultCountry);
  const [countryIso2, setCountryIso2] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState(""); // optional client-side filter
  const inflight = useRef(null);

  // Load countries (try v3.1 first, then v2)
  useEffect(() => {
    (async () => {
      try {
        let list;
        try {
          const r3 = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,cca2",
            { cache: "no-store" }
          );
          if (!r3.ok) throw new Error("v3 failed");
          const j3 = await r3.json();
          list = j3
            .map((c) => ({
              name: c?.name?.common,
              iso2: c?.cca2,
            }))
            .filter((c) => c.name && c.iso2);
        } catch {
          const r2 = await fetch(
            "https://restcountries.com/v2/all?fields=name,alpha2Code",
            { cache: "no-store" }
          );
          const j2 = await r2.json();
          list = (j2 || [])
            .map((c) => ({
              name: c?.name,
              iso2: c?.alpha2Code,
            }))
            .filter((c) => c.name && c.iso2);
        }

        list.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(list);

        // preselect default by name if provided
        if (defaultCountry) {
          const match = list.find(
            (c) => c.name.toLowerCase() === defaultCountry.toLowerCase()
          );
          if (match) {
            setCountryName(match.name);
            setCountryIso2(match.iso2);
          }
        }
      } catch {
        setCountries([]);
      }
    })();
  }, [defaultCountry]);

  // Fetch cities when country changes (via our /api/cities proxy)
  useEffect(() => {
    if (!countryIso2 && !countryName) {
      setCities([]);
      return;
    }

    // cancel previous request if still running
    if (inflight.current) inflight.current.abort();
    const ac = new AbortController();
    inflight.current = ac;

    setLoading(true);
    setCity(""); // reset selected city whenever country changes

    fetch("/api/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        countryName,
        countryIso2,
        q: q.trim(),
      }),
      signal: ac.signal,
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : { cities: [] }))
      .then((d) => setCities(Array.isArray(d.cities) ? d.cities : []))
      .catch((e) => {
        if (e?.name !== "AbortError") setCities([]);
      })
      .finally(() => {
        if (inflight.current === ac) inflight.current = null;
        setLoading(false);
      });

    return () => ac.abort();
  }, [countryIso2, countryName, q]);

  const uiCities = useMemo(() => {
    if (!q) return cities;
    const s = q.trim().toLowerCase();
    return cities.filter((c) => c.toLowerCase().startsWith(s));
  }, [cities, q]);

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* Country */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Country
        </label>
        <select
          name={nameCountry}
          value={countryName}
          onChange={(e) => {
            const nextName = e.target.value;
            setCountryName(nextName);
            const match = countries.find((c) => c.name === nextName);
            setCountryIso2(match ? match.iso2 : "");
            setQ("");
          }}
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none
                     focus:ring-4 focus:ring-teal-300/30
                     bg-white/70 dark:bg-white/5
                     border-slate-300/70 dark:border-slate-600
                     text-slate-800 dark:text-slate-100"
        >
          <option value="">Select country…</option>
          {countries.map((c) => (
            <option key={c.iso2} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* City + quick filter */}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>City</span>
          <input
            type="text"
            placeholder="Filter (optional)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="ml-2 w-40 rounded-md border px-2 py-1 text-xs
                       bg-white/70 dark:bg-white/5
                       border-slate-300/70 dark:border-slate-600
                       text-slate-700 dark:text-slate-200"
          />
        </label>
        <select
          name={nameCity}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!countryIso2 && !countryName}
          className="mt-1 w-full rounded-lg border px-3 py-2 outline-none
                     focus:ring-4 focus:ring-teal-300/30
                     bg-white/70 dark:bg-white/5
                     border-slate-300/70 dark:border-slate-600
                     text-slate-800 dark:text-slate-100 disabled:opacity-60"
        >
          <option value="" hidden={!loading && !!uiCities.length}>
            {loading
              ? "Loading cities…"
              : countryIso2 || countryName
              ? uiCities.length
                ? "Select city…"
                : "No cities found"
              : "Select a country first"}
          </option>
          {uiCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
