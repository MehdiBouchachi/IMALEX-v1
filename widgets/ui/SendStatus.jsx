"use client";

import { useEffect, useMemo, useRef } from "react";

export default function SendStatus({
  open,
  variant = "success", // "success" | "error"
  message,
  details,
  onClose,
  onRetry,
}) {
  const isSuccess = variant === "success";
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // small ambient spark dots (subtle)
  const sparks = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 1 + Math.random() * 1.2,
        d: 1.8 + Math.random() * 1,
        dl: Math.random() * 1.2,
      })),
    []
  );

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // confetti on success (toned down)
  useEffect(() => {
    if (!open || !isSuccess) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches)
      return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let w = 0,
      h = 0,
      ctx = null;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      const box = wrapRef.current?.getBoundingClientRect();
      w = Math.floor((box?.width || 560) * DPR);
      h = Math.floor((box?.height || 360) * DPR);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${Math.floor(w / DPR)}px`;
      canvas.style.height = `${Math.floor(h / DPR)}px`;
      ctx = canvas.getContext("2d");
    }

    resize();
    const ro = new ResizeObserver(resize);
    wrapRef.current && ro.observe(wrapRef.current);

    const css = getComputedStyle(document.documentElement);
    const pick = (v, fb) => css.getPropertyValue(v)?.trim() || fb;
    const brand700 = pick("--brand-700", "#167a55");
    const brand400 = pick("--brand-400", "#7fcfa7");
    const cta700 = pick("--cta-700", "#3c8b63");
    const danger700 = pick("--danger-700", "#c2410c");
    const accentA = pick("--effect-glow-a", "rgba(127,207,167,.85)");
    const palette = [brand700, brand400, cta700, accentA, danger700];

    const N = 60;
    const parts = new Array(N).fill(0).map(() => {
      const angle = (Math.random() * Math.PI) / 2 + Math.PI * 1.25;
      const speed = 3.5 + Math.random() * 5.5;
      return {
        x: w / 2,
        y: Math.max(40 * DPR, h * 0.2),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rw: 4 + Math.random() * 8,
        rh: 2 + Math.random() * 4,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.16,
        col: palette[(Math.random() * palette.length) | 0],
        drag: 0.996 - Math.random() * 0.01,
        g: 0.1 + Math.random() * 0.05,
        life: (80 + Math.random() * 30) | 0,
      };
    });

    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, w, h);

      parts.forEach((p) => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.life--;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.col;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
        ctx.fillRect(-p.rw / 2, -p.rh / 2, p.rw, p.rh);
        ctx.restore();
      });

      if (frame < 200) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, isSuccess]);

  if (!open) return null;

  const title = message ?? (isSuccess ? "Message sent" : "Send failed");
  const body =
    details ??
    (isSuccess
      ? "Thanks for reaching out. We’ll reply shortly."
      : "Something went wrong. Please try again.");

  return (
    <div
      className="ss4-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.currentTarget === e.target && onClose?.()}
    >
      <div
        ref={wrapRef}
        className={["ss4-card", isSuccess ? "ok" : "err"].join(" ")}
      >
        {/* top status bar (thin, readable) */}
        <div className={["ss4-bar", isSuccess ? "ok" : "err"].join(" ")} />

        {/* close */}
        <button className="ss4-close" aria-label="Close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6l-12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* subtle bg wash */}
        <div aria-hidden className="ss4-ambient" />

        {/* ring pulse + confetti (success only) */}
        {isSuccess && <div aria-hidden className="ss4-ring" />}
        {isSuccess && <canvas ref={canvasRef} className="ss4-confetti" />}

        {/* tiny sparks */}
        <div aria-hidden className="ss4-sparks">
          {sparks.map((s) => (
            <span
              key={s.id}
              style={{
                top: `${s.y}%`,
                left: `${s.x}%`,
                width: s.s,
                height: s.s,
                animationDuration: `${s.d}s`,
                animationDelay: `${s.dl}s`,
              }}
            />
          ))}
        </div>

        <div className="ss4-body">
          <div className="ss4-row">
            <div className={["ss4-ic", isSuccess ? "ok" : "err"].join(" ")}>
              {/* success: check-circle | error: warning triangle */}
              {isSuccess ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8.5 12.5l2.8 2.8L16.8 9.8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4l9 16H3l9-16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="currentColor"
                    fillOpacity=".08"
                  />
                  <path
                    d="M12 9v5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
                </svg>
              )}
            </div>

            <div className="ss4-copy">
              <h3 className="ss4-title">{title}</h3>
              <p className="ss4-sub">{body}</p>

              <div className="ss4-actions">
                {!isSuccess && onRetry ? (
                  <button className="ss4-btn danger" onClick={onRetry}>
                    Try again
                  </button>
                ) : null}
                <a
                  className="ss4-btn ghost emailus"
                  href={`mailto:${
                    process.env.NEXT_PUBLIC_FALLBACK_EMAIL ||
                    "contact.imalex.dz@gmail.com"
                  }`}
                >
                  Email us
                </a>
                <button className="ss4-btn ghost" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ss4-foot">
          <span>Imalex • Natural Formulation Lab</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
