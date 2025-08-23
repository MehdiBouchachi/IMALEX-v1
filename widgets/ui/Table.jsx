"use client";

import React, { createContext, useContext, useMemo } from "react";

const cx = (...a) => a.filter(Boolean).join(" ");

const TableCtx = createContext({ columns: "1fr", headers: [] });

export default function Table({ columns = "1fr", children, className = "" }) {
  const [headers, setHeaders] = React.useState([]);
  const value = useMemo(
    () => ({ columns, headers, setHeaders }),
    [columns, headers]
  );

  return (
    <TableCtx.Provider value={value}>
      <div
        role="table"
        className={cx(
          "overflow-hidden rounded-2xl border border-[var(--tile-border)] bg-[var(--tile-bg)] shadow-[var(--tile-shadow)]",
          className
        )}
      >
        {children}
      </div>
    </TableCtx.Provider>
  );
}

/* ========== DESKTOP/TABLET (UNCHANGED) ========== */
function Header({ children, className = "" }) {
  const { columns, setHeaders } = useContext(TableCtx);
  const labels = React.Children.toArray(children).map((el) =>
    React.isValidElement(el)
      ? el.props?.label ??
        (typeof el.props?.children === "string" ? el.props.children : "")
      : ""
  );
  React.useEffect(
    () => setHeaders(labels),
    [setHeaders, JSON.stringify(labels)]
  );

  return (
    <div className="hidden sm:block">
      <div
        role="row"
        style={{ gridTemplateColumns: columns }}
        className={cx(
          "grid items-center gap-x-6 px-6 py-4",
          "bg-[color:var(--surface-1)] border-b border-[var(--tile-border)]",
          "uppercase text-[12px] font-semibold tracking-wide text-[var(--text-secondary)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ children, className = "" }) {
  const { columns } = useContext(TableCtx);
  return (
    <div
      role="row"
      style={{ gridTemplateColumns: columns }}
      className={cx(
        "grid items-start gap-x-6 px-6 py-3",
        "border-b last:border-b-0 border-[var(--tile-border)]",
        "hover:bg-[color:var(--surface-1)]/40",
        className
      )}
    >
      {children}
    </div>
  );
}

function Head({ children, className = "", align = "left", label }) {
  return (
    <div
      role="columnheader"
      className={cx(
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </div>
  );
}

function Cell({
  children,
  className = "",
  align = "left",
  strong = false,
  muted = false,
  brand = false,
}) {
  return (
    <div
      role="cell"
      className={cx(
        "text-[14px]",
        align === "center" && "text-center",
        align === "right" && "text-right",
        strong && "font-bold text-[var(--text-primary)]",
        muted && "text-[var(--text-muted)]",
        brand && "font-semibold text-[var(--brand-700)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Footer({ children, className = "" }) {
  if (!children) return null;
  return (
    <div
      className={cx(
        "bg-[color:var(--surface-1)] px-6 py-3 flex justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ========== MOBILE (IMPROVED, SIMPLER, LESS NOISY) ========== */
function Body({ data = [], render, mobileRender, empty = "No data." }) {
  if (!data?.length) {
    return (
      <div className="px-6 py-6 text-center text-[15px] text-[var(--text-secondary)]">
        {empty}
      </div>
    );
  }

  return (
    <>
      {/* desktop / tablet (unchanged) */}
      <div className="hidden sm:block max-h-[480px] overflow-auto">
        <div role="rowgroup">{data.map(render)}</div>
      </div>

      {/* mobile (refined) */}
      <div className="sm:hidden p-2 space-y-3">
        {mobileRender
          ? data.map(mobileRender)
          : data.map((row, i) => (
              <MobileCard
                key={row?.id ?? row?.label ?? i}
                title={row?.label ?? `Row ${i + 1}`}
              >
                <SimpleTwoStats
                  leftLabel="DIY"
                  leftValue={row?.diy}
                  rightLabel="IMALEX"
                  rightValue={row?.imalex}
                />
              </MobileCard>
            ))}
      </div>
    </>
  );
}

/* ---------- lightweight mobile card ---------- */
function MobileCard({ title, children, className = "" }) {
  return (
    <article
      className={cx(
        "rounded-xl border border-[var(--tile-border)] bg-[var(--tile-bg)] p-3 shadow-[var(--tile-shadow)]",
        className
      )}
      aria-label={typeof title === "string" ? title : undefined}
    >
      {title && (
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
          {title}
        </h3>
      )}
      <div className="mt-2">{children}</div>
    </article>
  );
}

/* ---------- simpler 2-col stat block (balanced heights, subtle divide) ---------- */
function SimpleTwoStats({ leftLabel, leftValue, rightLabel, rightValue }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--tile-border)]">
      <div className="grid grid-cols-2 divide-x divide-[var(--tile-border)]">
        <MobileStat label={leftLabel} muted>
          {leftValue}
        </MobileStat>
        <MobileStat label={rightLabel} brand>
          {rightValue}
        </MobileStat>
      </div>
    </div>
  );
}

/* ---------- minimal stat: small label, value with tone ---------- */
function MobileStat({ label, children, brand = false, muted = false }) {
  return (
    <div className="p-3 text-center">
      <div className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
        {label}
      </div>
      <div
        className={cx(
          "mt-1 text-[14px] leading-5 text-balance",
          brand && "font-semibold text-[var(--brand-700)]",
          muted && "text-[var(--text-secondary)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;
Table.Footer = Footer;

/* export mobile helpers in case you want to customize per-table */
Table.MobileCard = MobileCard;
Table.MobileStat = MobileStat;
Table.SimpleTwoStats = SimpleTwoStats;
