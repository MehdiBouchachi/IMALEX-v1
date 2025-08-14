export function buildInquiryEmailHTML({
  brand = {
    name: "IMALEX",
    tagline: "Natural Formulation Lab",
    grad: "linear-gradient(90deg,#7fcfa7,#57a87a,#2f5f4b)",
    primary: "#3c8b63",
    textPrimary: "#0f172b",
    textSecondary: "#334155",
    surface: "#ffffff",
    logo: process.env.LOGO_URL || "",
  },
  name,
  email,
  phone,
  country,
  city,
  sector,
  stage,
  needs = [],
  brief = "",
}) {
  const esc = (s = "") =>
    String(s).replace(
      /[<>&]/g,
      (m) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[m])
    );

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Country", country],
    ["City", city],
    ["Sector", sector],
    ["Project stage", stage],
  ].filter(([, v]) => v && String(v).trim() !== "");

  const needsChips =
    (Array.isArray(needs) ? needs : [])
      .filter(Boolean)
      .map(
        (n) => `<span style="
          display:inline-block;margin:3px 8px 3px 0;padding:6px 12px;border-radius:999px;
          background:linear-gradient(135deg,rgba(60,139,99,.08),rgba(60,139,99,.15));
          border:1px solid rgba(60,139,99,.15);
          color:${brand.primary};
          font:500 13px 'Josefin Sans', Segoe UI, Roboto, Helvetica, Arial;
        ">${esc(n)}</span>`
      )
      .join("") || `<span style="color:#94a3b8">—</span>`;

  const inlineLogo = `
  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      <td style="vertical-align:middle;">
      <div style="
  height:36px;
  width:36px;
  border-radius:50%;
  background:#15803d;
  color:#ffffff;
  font:700 16px 'Josefin Sans', Arial, sans-serif;
  text-align:center;
  line-height:36px;
">
  I
</div>
      </td>
      <td style="vertical-align:middle;padding-left:10px;line-height:1.1;">
        <div style="font-weight:600;font-size:16px;font-family:'Josefin Sans',system-ui,Segoe UI,Roboto,Helvetica,Arial;color:${brand.textPrimary}">IMALEX</div>
        <div style="font-weight:400;font-size:12px;font-family:'Josefin Sans',system-ui,Segoe UI,Roboto,Helvetica,Arial;color:${brand.textSecondary}">Natural Formulation Lab</div>
      </td>
    </tr>
  </table>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <title>${esc(brand.name)} • New inquiry</title>
</head>
<body style="margin:0;background:${
    brand.surface
  };font-family:'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;">

  <!-- Top accent -->
  <tr><td style="height:0;background:none;"></td></tr>

  <!-- Header -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;padding:0 24px;">
    <tr>
      <td align="left">${inlineLogo}</td>
      <td align="right">
        <span style="
          display:inline-block;padding:4px 10px;border-radius:999px;
          background:rgba(60,139,99,.08);color:${brand.primary};
          font:500 11px 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;
        ">New Inquiry</span>
      </td>
    </tr>
  </table>

  <!-- Title -->
  <div style="padding:14px 24px 4px 24px;font:500 18px/1.4 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:${
    brand.textPrimary
  };">
    New website inquiry — ${esc(name || "Visitor")}${
    sector
      ? ` <span style="color:${brand.primary}">(${esc(sector)})</span>`
      : ""
  }
  </div>
  <div style="padding:0 24px 18px 24px;font:400 14px/1.6 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:${
    brand.textSecondary
  };">
    A visitor submitted the contact form. Reply directly from your email client.
  </div>

  <!-- Details -->
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:20px;">
    ${rows
      .map(
        ([k, v]) => `
      <tr>
        <td style="width:180px;padding:8px 24px;font:500 13px 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:#6b7280;">${esc(
          k
        )}</td>
        <td style="padding:8px 0;font:400 14px 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:${
          brand.textPrimary
        };">
          ${
            k === "Email"
              ? `<a href="mailto:${esc(v)}" style="color:${
                  brand.primary
                };text-decoration:none;">${esc(v)}</a>`
              : k === "Phone"
              ? `<a href="tel:${esc(v)}" style="color:${
                  brand.textPrimary
                };text-decoration:none;">${esc(v)}</a>`
              : esc(v)
          }
        </td>
      </tr>`
      )
      .join("")}
    <tr>
      <td style="width:180px;padding:8px 24px;font:500 13px 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:#6b7280;">Needs</td>
      <td style="padding:8px 0;">${needsChips}</td>
    </tr>
  </table>

  <!-- Brief -->
  <div style="padding:0 24px 8px 24px;font:500 13px 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:#6b7280;">Brief</div>
  <div style="
    margin:0 24px 26px 24px;padding:14px 16px;border-radius:8px;
    background:#f9fafb;color:${brand.textPrimary};
    font:400 14px/1.5 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;
    white-space:pre-wrap;box-shadow:0 1px 3px rgba(0,0,0,.05);
  ">${esc(brief || "(empty)")}</div>

  <!-- CTA -->
  <div style="padding:0 24px 40px 24px;">
  <a href="mailto:${encodeURIComponent(email || "")}"
  style="
    display:inline-block;
    background:#3c8b63;
    color:#ffffff;
    text-decoration:none;
    padding:12px 24px;
    font-family:'Josefin Sans', Arial, sans-serif;
    font-weight:500;
    font-size:14px;
    border-radius:8px;
    box-shadow:0 6px 16px -6px rgba(60,139,99,0.4);
  "
>
  Reply to ${esc(name || "sender")}
</a>


</div>

  <!-- Signature footer fade -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
   
    <tr>
      <td align="center" style="padding:10px 12px 22px 12px;">
        <div style="font:500 11px 'Josefin Sans',Segoe UI,Roboto,Helvetica,Arial;color:#94a3b8;">
          Sent from ${esc(brand.name)} — ${esc(brand.tagline)}
        </div>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
