/* tiny inline parser for <b> and <br> (safe; ignores everything else) */
function renderInlineB(str) {
  if (typeof str !== "string") return str;
  const tokens = str.split(/(<\/?b>|<br\s*\/?>)/gi);
  const out = [];
  let k = 0,
    bold = false;

  for (const t of tokens) {
    if (!t) continue;
    if (/^<b>$/i.test(t)) {
      bold = true;
      continue;
    }
    if (/^<\/b>$/i.test(t)) {
      bold = false;
      continue;
    }
    if (/^<br\s*\/?>$/i.test(t)) {
      out.push(<br key={`br-${k++}`} />);
      continue;
    }
    out.push(bold ? <strong key={`b-${k++}`}>{t}</strong> : t);
  }
  return out;
}

export default function SectionHeader({
  eyebrow,
  title,
  blurb,
  center = false,
  className = "",
}) {
  const wrapCls = ["max-w-3xl", center ? "mx-auto text-center" : "", className]
    .filter(Boolean)
    .join(" ");

  const eyebrowCls = [
    "text-xs font-semibold uppercase tracking-wider",
    center
      ? "text-[var(--brand-700)] dark:text-[var(--brand-800)]"
      : "text-[var(--eye-brow)]",
  ].join(" ");

  const titleCls =
    "mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]";

  const blurbCls = [
    "text-[var(--text-secondary)] whitespace-pre-line",
    center ? "mt-4" : "mt-3 text-[15px] leading-7",
  ].join(" ");

  return (
    <div className={wrapCls}>
      {eyebrow && <div className={eyebrowCls}>{eyebrow}</div>}
      <h2 className={titleCls}>{title}</h2>
      {blurb && <p className={blurbCls}>{renderInlineB(blurb)}</p>}
    </div>
  );
}
