export default function SocialIcon({ label, href = "#", Icon }) {
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      aria-label={label}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="
        h-9 w-9 grid place-items-center rounded-full transition
        border text-[var(--text-secondary)]
        border-[var(--btn-ghost-border)]
        hover:border-[var(--footer-icon-hover-border)]
        hover:text-[var(--footer-link-hover)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-0)]
      "
    >
      {Icon ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="6" />
        </svg>
      )}
    </a>
  );
}
