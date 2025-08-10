import {
  FaFlask,
  FaSearch,
  FaMicroscope,
  FaCheck,
  FaIndustry,
} from "react-icons/fa";
export default function Process() {
  const steps = [
    {
      title: "Discovery",
      desc: "Brief, goals, constraints and regulatory targets.",
      Icon: FaSearch,
    },
    {
      title: "Research",
      desc: "Actives screening, concepting, feasibility.",
      Icon: FaMicroscope,
    },
    {
      title: "Prototype",
      desc: "Bench samples, iteration, stability pre-checks.",
      Icon: FaFlask,
    },
    {
      title: "Validation",
      desc: "Stability, compatibility, claims & dossiers.",
      Icon: FaCheck,
    },
    {
      title: "Scale-Up",
      desc: "Tech transfer and pilot → production.",
      Icon: FaIndustry,
    },
  ];

  return (
    <section
      id="process"
      className="py-20 sm:py-24  bg-gray-50 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-300">
            Process
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            From Idea to Industry
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Center spine */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-teal-500/40 via-teal-500/20 to-transparent" />

          <ol className="space-y-12 md:space-y-16">
            {steps.map(({ title, desc, Icon }, idx) => {
              const leftSide = idx % 2 === 0;
              const num = `0${idx + 1}`;

              return (
                <li
                  key={title}
                  className="relative grid md:grid-cols-2 md:gap-16 md:items-center"
                >
                  {/* HALF connector: center → card side only */}
                  <SideConnector side={leftSide ? "left" : "right"} />

                  {/* Spine marker */}
                  <div
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 z-20"
                    style={{ top: "calc(50% - 0.75rem)" }}
                    aria-hidden="true"
                  >
                    <div className="relative h-6 w-6 rounded-full bg-teal-500/15 border border-teal-500/30 grid place-items-center shadow-[0_0_18px_rgba(20,184,166,0.35)]">
                      <span className="absolute inset-0 rounded-full bg-teal-500/20 blur-md" />
                      <span className="relative h-2 w-2 rounded-full bg-teal-500" />
                    </div>
                  </div>

                  {/* Card left/right */}
                  <div className={leftSide ? "z-30" : "md:order-2 z-30"}>
                    <StepCard
                      side={leftSide ? "left" : "right"}
                      num={num}
                      title={title}
                      desc={desc}
                      Icon={Icon}
                    />
                  </div>

                  {/* keep grid balance */}
                  <div className={leftSide ? "md:order-2" : ""} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SideConnector({ side = "left" }) {
  const toLeft = side === "left";
  return (
    <div
      className={[
        "hidden md:block absolute top-1/2 -translate-y-1/2 z-10",
        toLeft ? "left-0 right-1/2 pr-8" : "left-1/2 right-0 pl-8",
      ].join(" ")}
    >
      {/* gradient fades out toward the edge; brighter near the spine */}
      <div
        className={[
          "h-px",
          toLeft
            ? "bg-[linear-gradient(to_right,rgba(20,184,166,0.85),rgba(20,184,166,0.35),rgba(20,184,166,0.05))] dark:bg-[linear-gradient(to_right,rgba(20,184,166,0.00),rgba(20,184,166,0.20),rgba(20,184,166,0.45))]"
            : "bg-[linear-gradient(to_right,rgba(20,184,166,0.85),rgba(20,184,166,0.35),rgba(20,184,166,0.05))]  dark:bg-[linear-gradient(to_left,rgba(20,184,166,0.00),rgba(20,184,166,0.20),rgba(20,184,166,0.45))]",
        ].join(" ")}
      />
    </div>
  );
}

function StepCard({ side = "left", num, title, desc, Icon }) {
  const isLeft = side === "left";
  return (
    <div className="relative">
      <div
        className={[
          "relative rounded-xl border border-black/5 dark:border-white/10",
          "bg-white/75 dark:bg-white/5 backdrop-blur-sm",
          "p-5 sm:p-6 shadow-sm transition-transform duration-200",
          "hover:-translate-y-0.5 hover:shadow-md",
        ].join(" ")}
      >
        <div className="flex items-start gap-4">
          <div className="mt-0.5 grid h-11 w-11 flex-none place-items-center rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.25)]">
            <Icon className="text-lg" />
          </div>

          <div>
            <div className="text-[11px] font-semibold tracking-wider text-teal-700 dark:text-teal-300">
              {num}
            </div>
            <h3 className="mt-0.5 text-lg font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {desc}
            </p>
          </div>
        </div>

        {/* soft highlight line */}
        <div className="pointer-events-none absolute left-0 right-0 -top-px h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      </div>
    </div>
  );
}
