import React from "react";

export default function EyebrowChip({ icon: Icon, children }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border bg-clip-padding"
      style={{
        borderColor: "var(--brand-700-a25, rgba(60,139,99,0.25))",
        background: "var(--brand-700-a10, rgba(60,139,99,0.10))",
        color: "var(--brand-700)",
      }}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </span>
  );
}
