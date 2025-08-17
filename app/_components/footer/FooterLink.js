// FooterLink.js
import Link from "next/link";

export default function FooterLink({ href = "#", children }) {
  const isExternal = /^https?:\/\//i.test(href);
  const common = `
    transition-colors rounded-[8px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
    focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]
    hover:text-[var(--footer-link-hover)]
  `;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
        aria-label={`${children} (opens in new tab)`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={common}>
      {children}
    </Link>
  );
}
