export default function FooterLegal({ year, brandName }) {
  return (
    <div className="border-t border-[var(--footer-border)] py-5 text-center text-sm text-[var(--text-muted)]">
      © {year} {brandName}. All rights reserved.
    </div>
  );
}
