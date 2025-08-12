export default function Divider({ className = "" }) {
  return (
    <div
      className={`mt-8 h-px w-full ${className}`}
      style={{
        background:
          "linear-gradient(to right, transparent, var(--brand-700-a22, rgba(60,139,99,0.22)), transparent)",
      }}
    />
  );
}
