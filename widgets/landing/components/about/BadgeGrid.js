import React from "react";

export default function BadgeGrid({ items = [] }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="rounded-xl backdrop-blur-sm p-4 text-center shadow-sm border"
          style={{
            borderColor: "var(--border)",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--surface-0) 85%, transparent), color-mix(in srgb, var(--surface-0) 60%, transparent))",
          }}
        >
          <div
            className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full"
            style={{
              background: "var(--brand-700-a15, rgba(60,139,99,0.15))",
              color: "var(--brand-700)",
            }}
            aria-hidden="true"
          >
            {Icon ? <Icon /> : null}
          </div>
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
