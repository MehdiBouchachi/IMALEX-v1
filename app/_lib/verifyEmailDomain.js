// lib/verifyEmailDomain.js
import dns from "dns/promises";
import punycode from "punycode/";

// Returns { ok: boolean, reason?: string }
export async function verifyEmailDomain(address) {
  // 1) quick format check
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address || "")) {
    return { ok: false, reason: "Bad format" };
  }

  // 2) extract & IDNA-encode the domain (handles custom/Unicode domains)
  const domain = address.split("@")[1].trim().toLowerCase();
  const idna = punycode.toASCII(domain);

  // 3) block common disposable domains (optional)
  const disposable = new Set([
    "mailinator.com",
    "tempmail.dev",
    "10minutemail.com",
    "yopmail.com",
    "guerrillamail.com",
    "trashmail.com",
    "sharklasers.com",
  ]);
  if (disposable.has(idna)) return { ok: false, reason: "Disposable domain" };

  try {
    // 4) try MX
    const mx = await dns.resolveMx(idna);
    if (mx && mx.length) return { ok: true };
  } catch (_) {
    /* ignore */
  }

  try {
    // 5) fallback: A/AAAA record (some custom domains accept mail on A host)
    const a = await dns.resolveAny(idna);
    const hasAddr = a.some((r) => ["A", "AAAA"].includes(r.type));
    if (hasAddr) return { ok: true };
  } catch (_) {
    /* ignore */
  }

  return { ok: false, reason: "Domain has no mail records" };
}
