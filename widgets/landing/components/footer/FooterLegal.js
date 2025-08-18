// FooterLegal.js
import FooterLink from "./FooterLink";

export default function FooterLegal({ year, brandName, legal = [] }) {
  return (
    <div
      className="border-t py-5 text-center text-sm"
      style={{
        borderColor: "var(--footer-border)",
        color: "var(--text-muted)",
      }}
    >
      <div>
        © {year} {brandName}. All rights reserved.
      </div>

      {!!legal.length && (
        <div className="mt-2 flex items-center justify-center gap-4">
          {legal.map((l) => (
            <FooterLink key={l.label} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </div>
      )}
    </div>
  );
}
