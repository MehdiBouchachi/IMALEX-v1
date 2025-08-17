// Footer.js
import BrandBlock from "./BrandBlock";
import FooterCol from "./FooterCol";
import SocialBlock from "./SocialBlock";
import FooterLegal from "./FooterLegal";
import {
  DEFAULT_BRAND,
  DEFAULT_COLUMNS,
  DEFAULT_SOCIALS,
  DEFAULT_LEGAL,
} from "./data";

export default function Footer({
  brand = DEFAULT_BRAND,
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,

  year = new Date().getFullYear(),
}) {
  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--footer-border)",
        transition:
          "background .12s ease, color .12s ease, border-color .12s ease",
        background: "var(--surface-0)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <BrandBlock
          name={brand.name}
          initials={brand.initials}
          tagline={brand.tagline}
        />

        {columns.map((c) => (
          <FooterCol key={c.title} title={c.title} items={c.links} />
        ))}

        <SocialBlock socials={socials} />
      </div>

      <FooterLegal year={year} brandName={brand.name} />
    </footer>
  );
}
