// app/blogs/_ui/components/CustomSelect.js
"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default memo(function CustomSelect({
  ariaLabel,
  value,
  onChange,
  options,
  align = "start",
  className = "",
  open,
  setOpen,
}) {
  const [highlight, setHighlight] = useState(-1);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 240 });
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  const flat = useMemo(
    () =>
      options
        .map((o, idx) => (o.type === "group" ? null : { ...o, _i: idx }))
        .filter(Boolean),
    [options]
  );

  const place = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const desiredWidth = Math.max(r.width, 240);
    const vw = window.innerWidth;
    const leftStart = align === "end" ? r.right - desiredWidth : r.left;
    const left = Math.max(8, Math.min(leftStart, vw - desiredWidth - 8));
    const top = Math.min(window.innerHeight - 10, r.bottom + 8);
    setPos({ top, left, width: desiredWidth });
  };

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) {
      place();
      const onScroll = () => place();
      const onResize = () => place();
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", onResize);
      };
    }
  }, [open, align]);

  useEffect(() => {
    if (!open) return;
    const i = flat.findIndex((o) => o.value === value);
    setHighlight(i >= 0 ? i : 0);
  }, [open, flat, value]);

  // close on outside click (but ignore clicks inside the portal)
  useEffect(() => {
    const handler = (e) => {
      const t = e.target;
      const clickedTrigger = rootRef.current?.contains(t);
      const clickedMenu = popRef.current?.contains(t);
      if (clickedTrigger || clickedMenu) return;
      setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  const onKeyDown = (e) => {
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, flat.length - 1));
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setHighlight(flat.length - 1);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const sel = flat[highlight];
      if (sel) {
        onChange(sel.value);
        setOpen(false);
        btnRef.current?.focus();
      }
    }
  };

  const current = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  return (
    <div className={`relative ${className}`} data-align={align} ref={rootRef}>
      {/* trigger matches your tinted control styling */}
      <button
        type="button"
        ref={btnRef}
        className={[
          "inline-flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-3 text-[13.5px] font-extrabold outline-none transition",
          "border-[var(--border)]",
          "bg-[linear-gradient(0deg,var(--surface-0),var(--surface-0)),color-mix(in_srgb,var(--brand-400)_6%,transparent)]",
          "text-[var(--text-primary)] hover:border-[color-mix(in_srgb,var(--brand-700)_25%,var(--border))]",
          "focus:border-[color-mix(in_srgb,var(--brand-600)_55%,var(--border))]",
          "focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand-400)_18%,transparent)]",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
      >
        <span>{current?.label || "Select"}</span>
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`ml-1 text-[var(--text-muted)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* dropdown panel — shared look for ALL selects */}
      {mounted &&
        open &&
        createPortal(
          <div
            ref={popRef}
            role="listbox"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            // position must be inline (computed)
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
            }}
            className={[
              "z-[9999] max-h-[60svh] overflow-auto rounded-2xl border p-2",
              "border-[var(--border)] bg-[var(--surface-0)]",
              "shadow-[0_18px_44px_rgba(0,0,0,.18),0_6px_20px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.06)]",
              "animate-[cselIn_.12s_ease-out_both]",
            ].join(" ")}
          >
            {options.map((opt, idx) =>
              opt.type === "group" ? (
                <div
                  key={`g-${idx}`}
                  className="px-3 pb-1 pt-2 text-[11px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]"
                >
                  {opt.label}
                </div>
              ) : (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  onMouseEnter={() =>
                    setHighlight(flat.findIndex((o) => o.value === opt.value))
                  }
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                  className={[
                    "flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3 py-2 text-[13.5px]",
                    // selected = subtle brand frame; highlight = stronger wash
                    opt.value === value
                      ? "border-[color-mix(in_srgb,var(--brand-600)_20%,transparent)] bg-[color-mix(in_srgb,var(--brand-400)_10%,transparent)]"
                      : flat[highlight]?.value === opt.value
                      ? "border-transparent bg-[color-mix(in_srgb,var(--brand-400)_20%,transparent)]"
                      : "border-transparent bg-transparent",
                    "text-[var(--text-primary)]",
                  ].join(" ")}
                >
                  <div>
                    <div className="font-extrabold">{opt.label}</div>
                    {opt.desc ? (
                      <div className="text-[12px] text-[var(--text-secondary)]">
                        {opt.desc}
                      </div>
                    ) : null}
                  </div>
                  {opt.value === value ? (
                    <span className="font-black text-[var(--brand-700)]">
                      ✓
                    </span>
                  ) : (
                    <span aria-hidden className="opacity-0">
                      ✓
                    </span>
                  )}
                </div>
              )
            )}
          </div>,
          document.body
        )}
    </div>
  );
});
