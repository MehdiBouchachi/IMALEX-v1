import React from "react";
import InfoRow from "../ui/InfoRow";

export default function ContactInfo({
  eyebrow,
  title,
  blurb,
  email,
  phone,
  phoneDisplay,
  city,
  country,
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--eye-brow)]">
        {eyebrow}
      </p>

      <h2
        id="contact-title"
        className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
      >
        {title}
      </h2>

      <p className="mt-4 text-[var(--text-secondary)]">{blurb}</p>

      <address className="not-italic mt-8">
        <dl className="space-y-3">
          <InfoRow label="Email">
            <a
              href={`mailto:${email}`}
              className="underline-offset-2 hover:underline focus:underline"
            >
              {email}
            </a>
          </InfoRow>

          <InfoRow label="Phone">
            <a
              href={`tel:${phone}`}
              className="underline-offset-2 hover:underline focus:underline"
            >
              {phoneDisplay}
            </a>
          </InfoRow>

          <InfoRow label="Location">
            {city}, {country}
          </InfoRow>
        </dl>
      </address>
    </div>
  );
}
