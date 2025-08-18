import Button from "../../../ui/Button";

export default function Finale() {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="rounded-2xl p-6 xs:p-7 sm:p-10 text-center max-w-2xl anim-pop-lg"
        style={{
          border: "1px solid transparent",
          background:
            "linear-gradient(var(--surface-1), var(--surface-1)) padding-box, var(--g-accent-bar) border-box",
          boxShadow: "var(--shadow-card-lg)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h3
          className="text-xl xs:text-2xl sm:text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Journey Complete
        </h3>
        <p
          className="mt-2 xs:mt-3 text-[14px] xs:text-[15px]"
          style={{ color: "var(--text-secondary)" }}
        >
          Ready to turn your hypothesis into a compliant, scalable product?
        </p>

        <div className="mt-5 xs:mt-6 flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-2 xs:gap-3">
          <Button
            variant="primary"
            size="lg"
            asLink
            href="#contact"
            className="w-full xs:w-auto"
          >
            Start a Project
          </Button>
          <Button
            variant="secondary"
            size="lg"
            asLink
            href="#services"
            className="w-full xs:w-auto"
          >
            View Services
          </Button>
        </div>
      </div>
    </div>
  );
}
