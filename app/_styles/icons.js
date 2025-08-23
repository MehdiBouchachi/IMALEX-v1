export const ICosmetics = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M8 3h8M10 3v5M7 8h10M7 8l-2 12h14L17 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export const INutra = (p) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...p}
  >
    {/* Capsule / pill shape */}
    <rect x="3" y="8" width="18" height="8" rx="4" ry="4" />
    {/* Middle dividing line */}
    <line x1="12" y1="8" x2="12" y2="16" />
  </svg>
);

export const IAgriBio = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M4 16c4-8 8-8 12-8M4 16c4 0 8 2 12 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="18"
      cy="8"
      r="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export const IAnimal = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M7 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5 14c2-2 12-2 14 0v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export const IFood = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" {...p}>
    <path
      d="M4 12h16M6 7h4v10H6zM14 7h4v6h-4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
// app/_components/services/icons.js
export const IFlask = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M8 3h8M10 3v5l-5 10a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-10V3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M9 14h6" stroke="currentColor" strokeWidth="2" />
  </svg>
);
export const IBeaker = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M6 3h12M9 3v4l-5 9a3 3 0 0 0 3 5h10a3 3 0 0 0 3-5l-5-9V3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export const IShield = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export const IGauge = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M4 13a8 8 0 1 1 16 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M12 13l4-4" stroke="currentColor" strokeWidth="2" />
  </svg>
);
export const ILeaf = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M4 12c6-10 16-8 16-8s2 10-8 16C6 22 4 16 4 12z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 12c6 0 8 2 12 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export const IFactory = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" {...p}>
    <path
      d="M3 21V9l6 3V9l6 3V6l6 3v12H3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6 21v-3M9 21v-3M12 21v-3M15 21v-3M18 21v-3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
export function LeafIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M5 12c7-8 14-6 14-6s1 9-7 14C6 22 5 16 5 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 12c6 0 7 2 12 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
export function MicroscopeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M6 18h12M9 18a4 4 0 0 1 6 0M13 7l3 3M12 3l1 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="4" y="19" width="16" height="2" rx="1" />
    </svg>
  );
}
export function ComplianceIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="5"
        y="3"
        width="12"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 7h6M9 11h6M9 15h4M16 21l3-3-1.5-1.5L14.5 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
export function RecycleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7 7l-3 5h6L7 7zm10 0l-3 5h6l-3-5zM12 12l-3 5h6l-3-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
export function HandshakeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M8 12l3 3 5-5M2 12l4-4 4 4m8 0l4-4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
