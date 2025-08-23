import { HiXMark } from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
export default function ReadMore({ data, label = "Read more" }) {
  return (
    <Modal>
      {/* trigger */}
      <Modal.Open opens="readmore">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded px-2 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:underline focus:outline-none"
        >
          {label}
        </button>
      </Modal.Open>

      {/* dialog */}
      <Modal.Window name="readmore">
        <ReadMoreDialog data={data} />
      </Modal.Window>
    </Modal>
  );
}

/* ------------------ Dialog content ------------------ */
function ReadMoreDialog({ data, onCloseModal }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname?.startsWith("/#");
  const contactHref = isHome ? "#contact" : "/#contact";

  const panel =
    data?.panel ?? "Full scope & documentation available on request.";
  const intro =
    data?.intro ??
    "You’ll receive a clear process map, QA/QC checkpoints, artwork guidance and a transfer package for scale-up.";
  const items = data?.items ?? [
    "Process flow & roles",
    "QA/QC checkpoints",
    "Artwork/label checklist",
    "Tech transfer package",
  ];
  const cta = data?.cta ?? "Request full scope";

  function goContact(e) {
    e.preventDefault();
    onCloseModal?.();

    if (isHome) {
      // same page: smooth scroll + update hash
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // keep URL in sync without reflow
      try {
        history.replaceState(null, "", "#contact");
      } catch {}
    } else {
      // other page: navigate after modal unmounts
      requestAnimationFrame(() => router.push("/#contact"));
    }
  }
  return (
    <div className="flex max-h-[78vh] w-full flex-col">
      {/* header */}
      <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-4 rounded-t-2xl border-b border-[var(--tile-border)] bg-[var(--tile-bg)]/85 px-6 py-3 backdrop-blur sm:-mx-8 sm:-mt-8 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
            Full scope & details
          </h3>

          {/* BIG close (no changes here) */}
          <button
            onClick={onCloseModal}
            aria-label="Close"
            className="group -mr-1 inline-flex h-12 w-12 items-center justify-center rounded-xl
                       text-[var(--text-secondary)] hover:bg-[color:var(--surface-1)]
                       focus:outline-none focus:ring-2 focus:ring-[var(--brand-700)]/40 transition"
          >
            <HiXMark className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
        </div>
      </div>

      {/* body */}
      <div className="overflow-auto pr-1">
        {/* soft note */}
        {panel && (
          <div className="mb-5 max-w-full rounded-lg border border-[var(--tile-softpanel-border)] bg-[var(--tile-softpanel-bg)] px-3 py-2 text-[13.5px] sm:text-sm text-[var(--brand-700)] dark:text-[var(--brand-800)]">
            {panel}
          </div>
        )}

        {/* intro */}
        {Array.isArray(intro) ? (
          intro.map((p, i) => (
            <p
              key={i}
              className={
                "text-[15.5px] sm:text-base leading-7 sm:leading-8 text-[var(--tile-copy)] " +
                (i ? "mt-3" : "mb-3")
              }
            >
              {p}
            </p>
          ))
        ) : (
          <p className="mb-3 text-[15.5px] sm:text-base leading-7 sm:leading-8 text-[var(--tile-copy)]">
            {intro}
          </p>
        )}

        {/* bullets */}
        {items?.length > 0 && (
          <ul className="mt-1 grid gap-2 sm:grid-cols-2">
            {items.map((k, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15.5px] sm:text-base leading-7 sm:leading-8 text-[var(--tile-copy)]"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--bullet)]" />
                <span className="min-w-0">{k}</span>
              </li>
            ))}
          </ul>
        )}
        {/* Actions */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            className="inline-flex items-center gap-2 rounded-md border border-[color:var(--tile-softpanel-border)]
                       px-3 py-2 text-sm font-semibold
                       text-[var(--brand-700)] hover:bg-[var(--tile-softpanel-bg)] dark:text-[var(--brand-800)]"
          >
            <Link href={contactHref} onClick={goContact}>
              {cta}
            </Link>{" "}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>

          <button
            onClick={onCloseModal}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold
                       text-[var(--text-secondary)] hover:bg-[color:var(--surface-1)]"
          >
            Close
          </button>
        </div>

        {/* bottom fade */}
        <div className="pointer-events-none mt-6 h-3 bg-gradient-to-t from-[var(--tile-bg)]/70 to-transparent" />
      </div>
    </div>
  );
}
