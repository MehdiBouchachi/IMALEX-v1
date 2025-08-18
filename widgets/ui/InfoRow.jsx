import React from "react";

export default function InfoRow({ label, children }) {
  return (
    <div className="flex gap-2 text-sm">
      <dt className="font-semibold text-[var(--text-primary)]">{label}:</dt>
      <dd className="text-[var(--text-secondary)]">{children}</dd>
    </div>
  );
}
