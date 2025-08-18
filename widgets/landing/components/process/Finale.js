import Button from "../../../ui/Button";


export default function Finale() {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="rounded-2xl p-8 sm:p-10 text-center max-w-2xl anim-pop-lg"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: "var(--shadow-card-lg)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h3
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Journey Complete
        </h3>
        <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
          Ready to turn your hypothesis into a compliant, scalable product?
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="primary" size="lg" asLink href="#contact">
            Start a Project
          </Button>
          <Button variant="secondary" size="lg" asLink href="#services">
            View Services
          </Button>
        </div>
      </div>
    </div>
  );
}
