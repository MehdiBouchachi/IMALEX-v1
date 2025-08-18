export default function AccentBlob({ className = "", varToken }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{
        background: `radial-gradient(closest-side, var(${varToken}), transparent)`,
      }}
    />
  );
}
