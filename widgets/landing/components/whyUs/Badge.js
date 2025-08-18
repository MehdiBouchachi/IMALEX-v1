import { Halo } from "./MobileGrid";

export default function Badge({ title, desc, icon: Icon, spot }) {
  const pos =
    {
      tl: "left-[3%] top-[2%]",
      t: "left-1/2 -translate-x-1/2 -top-1",
      tr: "right-[3%] top-[4%]",
      bl: "left-[6%] bottom-[10%]",
      br: "right-[6%] bottom-[8%]",
    }[spot] || "";

  return (
    <div className={`absolute z-10 ${pos} w-[260px] max-w-[42vw]`}>
      <div
        className="relative group rounded-2xl border border-[var(--tile-border)] bg-[var(--surface-1)]/95 backdrop-blur-md p-4
                   shadow-[0_10px_28px_-10px_var(--effect-glow-a)]
                   dark:shadow-[0_14px_34px_-12px_var(--effect-glow-b)]
                   transition will-change-transform hover:-translate-y-0.5 [contain:paint]"
      >
        <Halo />
        <div className="relative flex items-start gap-3">
          <span
            className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-[var(--tile-icon-border)] 
                       bg-[var(--tile-icon-bg)] text-[var(--brand-700)] dark:bg-[var(--tile-icon-bg-dark)] dark:text-[var(--brand-800)]"
          >
            <Icon />
          </span>
          <div>
            <div className="font-semibold leading-tight text-[var(--text-primary)]">
              {title}
            </div>
            <div className="mt-1 text-sm text-[var(--text-secondary)]">
              {desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
