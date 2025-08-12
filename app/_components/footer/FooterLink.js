export default function FooterLink({ href = "#", children }) {
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="
        transition-colors hover:text-[var(--footer-link-hover)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]
        rounded-sm
      "
    >
      {children}
    </a>
  );
}
