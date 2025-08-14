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

  // tiny ambient spark dots
  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 1 + Math.random() * 1.2,
        d: 2 + Math.random() * 1.1,
        dl: Math.random() * 1.2,
      })),
    []
  );

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // refined confetti (success)
  useEffect(() => {
    if (!open || !isSuccess) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

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
    const accentA = pick("--effect-glow-a", "rgba(127,207,167,.85)");
    const gold = "#e6b84d";
    const palette = [brand700, brand400, cta700, accentA, gold];

    const N = 70;
    const parts = new Array(N).fill(0).map(() => {
      const angle = (Math.random() * Math.PI) / 2 + Math.PI * 1.25;
      const speed = 3.2 + Math.random() * 5.2;
      return {
        x: w / 2,
        y: Math.max(44 * DPR, h * 0.22),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rw: 3 + Math.random() * 9,
        rh: 2 + Math.random() * 6,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.18,
        col: palette[(Math.random() * palette.length) | 0],
        drag: 0.996 - Math.random() * 0.012,
        g: 0.11 + Math.random() * 0.06,
        life: 90 + (Math.random() * 30) | 0,
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

        // subtle sheen
        const g = ctx.createLinearGradient(p.x - p.rw, p.y, p.x + p.rw, p.y);
        g.addColorStop(0, p.col);
        g.addColorStop(1, "rgba(255,255,255,.25)");

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = g;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 45));
        ctx.fillRect(-p.rw / 2, -p.rh / 2, p.rw, p.rh);
        ctx.restore();
      });
      if (frame < 220) rafRef.current = requestAnimationFrame(tick);
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
      : "We hit a snag. Check your connection and try again.");

  return (
    <div
      className="ss5-overlay"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      onClick={(e) => e.currentTarget === e.target && onClose?.()}
    >
      <div
        ref={wrapRef}
        className={["ss5-card", isSuccess ? "ok" : "err"].join(" ")}
      >
        {/* top bar */}
        <div className={["ss5-bar", isSuccess ? "ok" : "err"].join(" ")} />

        {/* corner accents */}
        <div aria-hidden className="ss5-corners" />

        {/* close */}
        <button className="ss5-close" aria-label="Close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6l-12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* background wash + textures */}
        <div aria-hidden className="ss5-ambient" />

        {/* effects */}
        {isSuccess && <div aria-hidden className="ss5-ring" />}
        {isSuccess ? (
          <canvas ref={canvasRef} className="ss5-confetti" />
        ) : (
          <div aria-hidden className="ss5-mist" />
        )}

        {/* content */}
        <div className="ss5-body">
          <div className="ss5-row">
            <div className={["ss5-ic", isSuccess ? "ok" : "err"].join(" ")}>
              {isSuccess ? (
                // check-circle refined
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    className="ss5-check"
                    d="M8.5 12.5l2.8 2.8L16.8 9.8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // error diamond / alert
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="14"
                    height="14"
                    rx="2.5"
                    transform="rotate(45 12 12)"
                    fill="currentColor"
                    fillOpacity=".08"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M12 9v4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
                </svg>
              )}
            </div>

            <div className="ss5-copy">
              <h3 className="ss5-title">{title}</h3>
              <p className="ss5-sub">{body}</p>

              <div className="ss5-actions">
                {!isSuccess && onRetry ? (
                  <button className="ss5-btn danger" onClick={onRetry}>
                    Try again
                  </button>
                ) : null}
                <a
                  className="ss5-btn ghost"
                  href={`mailto:${
                    process.env.NEXT_PUBLIC_FALLBACK_EMAIL || "hello@imalex.com"
                  }`}
                >
                  Email us
                </a>
                <button className="ss5-btn ghost" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="ss5-foot">
          <span>Imalex • Natural Formulation Lab</span>
          <span>{new Date().toLocaleString()}</span>
        </div>

        {/* sparkles (subtle) */}
        <div aria-hidden className="ss5-sparks">
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
      </div>
    </div>
  );
}
