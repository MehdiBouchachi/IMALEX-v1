// app/_sections/SectorsSection.js
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../ui/Button";
import { SECTORS } from "../components/sectors/sectors.config";

const cx = (...a) => a.filter(Boolean).join(" ");
const ease = (t) => 1 - Math.pow(1 - t, 3);
const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SectorsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="sectors" className="relative isolate py-16 sm:py-20">
      {/* ambient brand aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(900px 420px at 22% 14%, var(--cta-section-gradient), transparent),
            radial-gradient(840px 420px at 80% 82%, color-mix(in srgb, var(--brand-700) 16%, transparent), transparent)
          `,
          mask: "linear-gradient(to bottom, transparent 0, black 8%, black 92%, transparent 100%)",
          WebkitMask:
            "linear-gradient(to bottom, transparent 0, black 8%, black 92%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--eye-brow)]">
            Sectors
          </p>
          <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)]">
            Where we bring nature to industry
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
            Follow the line. Each station is a market we serve—tap to see how we
            plug in.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.18fr,0.92fr]">
          <TransitMap active={active} setActive={setActive} />
          <DetailPanel sector={SECTORS[active] || {}} />
        </div>
      </div>
    </section>
  );
}

/* ───────── Transit Map ───────── */
function TransitMap({ active, setActive }) {
  const N = SECTORS.length || 1;
  const VIEW_W = 100;
  const VIEW_H = 68;

  const boxRef = useRef(null);
  const pathRef = useRef(null);
  const gradId = useRef(`grad-${Math.random().toString(36).slice(2)}`);

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [L, setL] = useState(0);
  const [stops, setStops] = useState([]); // [{xu,yu,xp,yp,t,ang}]
  const [tTrain, setTTrain] = useState(0);
  const rafRef = useRef(null);
  const lastIdxRef = useRef(0);

  const compute = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setL(len);

    const box = boxRef.current?.getBoundingClientRect();
    if (box) setDims({ w: box.width, h: box.height });

    const m1 = len * 0.07;
    const m2 = len * 0.93;
    const span = m2 - m1;

    const arr = [];
    for (let i = 0; i < N; i++) {
      const t = m1 + (span * (i + 0.5)) / N;
      const pt = path.getPointAtLength(t);
      const p2 = path.getPointAtLength(Math.min(len, t + 0.01 * len));
      const ang = Math.atan2(p2.y - pt.y, p2.x - pt.x);
      arr.push({
        t,
        xu: pt.x,
        yu: pt.y,
        xp: (pt.x / VIEW_W) * 100,
        yp: (pt.y / VIEW_H) * 100,
        ang,
      });
    }
    setStops(arr);
  }, [N]);

  useEffect(() => {
    compute();
    const ro = new ResizeObserver(compute);
    if (boxRef.current) ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [compute]);

  const jumpTo = useCallback(
    (t01, immediate = false) => {
      if (!L) return;
      if (prefersReduced || immediate) {
        cancelAnimationFrame(rafRef.current);
        setTTrain(t01);
        return;
      }
      cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = tTrain;
      const to = t01;
      const dur = 620;

      const tick = (now) => {
        const k = Math.min(1, (now - start) / dur);
        const v = from + (to - from) * ease(k);
        setTTrain(v);
        if (k < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [L, tTrain]
  );

  useEffect(() => {
    if (!stops.length || !L) return;
    const t01 = stops[active].t / L;
    jumpTo(t01, lastIdxRef.current === active);
    lastIdxRef.current = active;
  }, [active, stops, L, jumpTo]);

  // pointer: drag/click → nearest stop
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    box.style.touchAction = "none";

    let dragging = false;
    const nearest = (e) => {
      const r = box.getBoundingClientRect();
      const xu = ((e.clientX - r.left) / r.width) * VIEW_W;
      const yu = ((e.clientY - r.top) / r.height) * VIEW_H;
      let best = { i: 0, d: Infinity };
      stops.forEach((p, i) => {
        const d = (p.xu - xu) ** 2 + (p.yu - yu) ** 2;
        if (d < best.d) best = { i, d };
      });
      return best.i;
    };

    const down = (e) => {
      dragging = true;
      box.setPointerCapture?.(e.pointerId);
      setActive(nearest(e));
    };
    const move = (e) => dragging && setActive(nearest(e));
    const up = () => {
      dragging = false;
    };

    box.addEventListener("pointerdown", down);
    box.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      box.removeEventListener("pointerdown", down);
      box.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [stops, setActive]);

  // keyboard (clamped)
  const step = useCallback(
    (d) => setActive((i) => Math.max(0, Math.min(N - 1, i + d))),
    [N, setActive]
  );
  const onKey = useCallback(
    (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Home") setActive(0);
      if (e.key === "End") setActive(N - 1);
    },
    [N, step, setActive]
  );

  // train CSS position
  const trainPos = useMemo(() => {
    if (!L || !pathRef.current) return { left: "0%", top: "0%" };
    const p = pathRef.current.getPointAtLength(tTrain * L);
    return {
      left: `${(p.x / VIEW_W) * 100}%`,
      top: `${(p.y / VIEW_H) * 100}%`,
    };
  }, [tTrain, L]);

  const dashOffset = useMemo(
    () => (L ? Math.max(0, L - tTrain * L) : 0),
    [L, tTrain]
  );
  const atStart = active === 0;
  const atEnd = active === N - 1;

  // estimate label width
  const estimateLW = (title) =>
    Math.min(220, Math.max(96, Math.round((title?.length || 10) * 7.2 + 20)));

  // per-index nudges (kept as you set them)
  const indexTune = (i) => {
    if (i === 0) return { addDist: 27, addSlide: 26 }; // 1st
    if (i === 1) return { addDist: 10, addSlide: 10 }; // 2nd
    if (i === 2) return { addDist: 0, addSlide: 0 }; // 3rd (perfect)
    if (i === 3) return { addDist: 10, addSlide: 8 }; // 4th
    if (i === 4) return { addDist: 30, addSlide: 16 }; // 5th
    return { addDist: 0, addSlide: 0 };
  };

  // choose best side for label; bias outward + enforce clearance (length-aware)
  const chooseOffsetPx = useCallback(
    (p, isActive, i, title) => {
      const { w, h } = dims;
      if (!w || !h) return { ox: 28, oy: -12 };

      const { addDist, addSlide } = indexTune(i);

      const cx = (p.xp / 100) * w;
      const cy = (p.yp / 100) * h;
      const tx = Math.cos(p.ang);
      const ty = Math.sin(p.ang);
      const nx = -ty;
      const ny = tx;

      // tiny-screen spacing guard
      const isTiny = Math.min(w, h) < 340;

      let baseDist = (isActive ? 36 : 30) + addDist;
      baseDist += isTiny ? 6 : 0; // extra air on tiny screens

      const baseSlide = 8 + addSlide;
      const lw = estimateLW(title);
      const lh = 28;
      const pad = 12;
      const centerX = w / 2;

      const candidates = [1, -1].map((sgn) => {
        let ox = nx * baseDist * sgn + tx * baseSlide * sgn;
        let oy = ny * baseDist * sgn + ty * baseSlide * sgn;

        const Lx = cx + ox - lw / 2;
        const Rx = cx + ox + lw / 2;
        const Ty = cy + oy - lh / 2;
        const By = cy + oy + lh / 2;

        let penalty = 0;
        if (Lx < pad) penalty += pad - Lx;
        if (Rx > w - pad) penalty += Rx - (w - pad);
        if (Ty < pad) penalty += pad - Ty;
        if (By > h - pad) penalty += By - (h - pad);

        const distBefore = Math.abs(cx - centerX);
        const distAfter = Math.abs(cx + ox - centerX);
        if (distAfter < distBefore) penalty += (distBefore - distAfter) * 0.6;

        return { ox, oy, penalty };
      });

      candidates.sort((a, b) => a.penalty - b.penalty);
      const best = candidates[0];

      // length-aware halo so labels never kiss the node
      const lenFactor = Math.min(1.6, Math.max(1, (title?.length || 10) / 16));
      const CLEAR = 12 * lenFactor; // 12..19 px
      const d = Math.hypot(best.ox, best.oy) || 1;
      const scale = 1 + CLEAR / d;

      // base scaled offset
      let scaled = { ox: best.ox * scale, oy: best.oy * scale };

      // >>> Extra outward push ONLY for the first stop (index 0)
      if (i === 0) {
        const EXTRA0 = 12; // tweak to taste (10–16)
        scaled.ox += nx * EXTRA0;
        scaled.oy += ny * EXTRA0;
      }

      return scaled;
    },
    [dims.w, dims.h]
  );

  /* ----------------------- Label collision management ---------------------- */
  // Tiny bbox helper for a label centered at (cx, cy) with offset (ox, oy)
  function labelBBox(cx, cy, ox, oy, lw = 120, lh = 28) {
    const x = cx + ox - lw / 2;
    const y = cy + oy - lh / 2;
    return { x, y, w: lw, h: lh };
  }
  function intersects(a, b) {
    return !(
      a.x + a.w < b.x ||
      b.x + b.w < a.x ||
      a.y + a.h < b.y ||
      b.y + b.h < a.y
    );
  }

  // Precompute all offsets, then lightly relax to avoid collisions & edges
  const labelOffsets = useMemo(() => {
    if (!stops.length || !dims.w) return [];
    // 1) initial offsets from chooser
    const raw = stops.map((p, i) => {
      const title = SECTORS[i]?.title || "";
      const isActive = i === active;
      const { ox, oy } = chooseOffsetPx(p, isActive, i, title);
      return { ox, oy };
    });

    // 2) small relaxation loop
    const ITER = 8;
    const lwFor = (i) => estimateLW(SECTORS[i]?.title || "");
    const lh = 28;
    const pad = 10;

    for (let k = 0; k < ITER; k++) {
      for (let i = 0; i < stops.length; i++) {
        const si = stops[i];
        const liw = lwFor(i);
        const ci = { x: (si.xp / 100) * dims.w, y: (si.yp / 100) * dims.h };
        const bi = labelBBox(ci.x, ci.y, raw[i].ox, raw[i].oy, liw, lh);

        // push off edges
        const ex =
          pad - bi.x > 0
            ? pad - bi.x
            : bi.x + bi.w > dims.w - pad
            ? dims.w - pad - (bi.x + bi.w)
            : 0;
        const ey =
          pad - bi.y > 0
            ? pad - bi.y
            : bi.y + bi.h > dims.h - pad
            ? dims.h - pad - (bi.y + bi.h)
            : 0;
        raw[i].ox += ex;
        raw[i].oy += ey;

        // repel from other labels
        for (let j = i + 1; j < stops.length; j++) {
          const sj = stops[j];
          const ljw = lwFor(j);
          const cj = { x: (sj.xp / 100) * dims.w, y: (sj.yp / 100) * dims.h };
          const bj = labelBBox(cj.x, cj.y, raw[j].ox, raw[j].oy, ljw, lh);
          if (intersects(bi, bj)) {
            const dx = bi.x + bi.w / 2 - (bj.x + bj.w / 2);
            const dy = bi.y + bi.h / 2 - (bj.y + bj.h / 2);
            const len = Math.hypot(dx, dy) || 1;
            const push = 6; // subtle nudge
            const ux = (dx / len) * push;
            const uy = (dy / len) * push;
            raw[i].ox += ux;
            raw[i].oy += uy;
            raw[j].ox -= ux;
            raw[j].oy -= uy;
          }
        }

        // cap distance so leaders don't get too long on tiny screens
        const maxR = Math.min(
          140,
          Math.max(80, Math.min(dims.w, dims.h) * 0.28)
        );
        const r = Math.hypot(raw[i].ox, raw[i].oy);
        if (r > maxR) {
          raw[i].ox *= maxR / r;
          raw[i].oy *= maxR / r;
        }
      }
    }
    return raw;
  }, [stops, dims.w, dims.h, active, chooseOffsetPx]);

  return (
    <div
      tabIndex={0}
      onKeyDown={onKey}
      className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4 sm:p-6 [box-shadow:var(--tile-shadow)]"
      aria-label="Interactive market line"
    >
      {/* HUD */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12.5px] text-[var(--text-secondary)]">
          <span
            className="inline-block h-[10px] w-[10px] rounded-full"
            style={{
              background:
                "color-mix(in srgb, var(--brand-400) 38%, transparent)",
            }}
          />
          Interactive market line
        </div>
        <div className="flex items-center gap-2">
          <MapBtn onClick={() => step(-1)} disabled={atStart}>
            ‹
          </MapBtn>
          <MapBtn onClick={() => step(1)} disabled={atEnd}>
            ›
          </MapBtn>
        </div>
      </div>

      {/* Rail */}
      <div ref={boxRef} className="relative aspect-[100/68] w-full select-none">
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 68"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient
              id={gradId.current}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="color-mix(in srgb, var(--brand-700) 15%, transparent)"
              />
              <stop
                offset="100%"
                stopColor="color-mix(in srgb, var(--brand-400) 55%, transparent)"
              />
            </linearGradient>
          </defs>

          <path
            d="M 2 60 C 24 30, 32 8, 50 16 C 68 24, 76 54, 98 8"
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            ref={pathRef}
            d="M 2 60 C 24 30, 32 8, 50 16 C 68 24, 76 54, 98 8"
            fill="none"
            stroke={`url(#${gradId.current})`}
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              strokeDasharray: L,
              strokeDashoffset: dashOffset,
              transition: prefersReduced
                ? "none"
                : "stroke-dashoffset 520ms cubic-bezier(.22,.8,.35,1)",
            }}
          />

          {stops.map((s) => {
            const n = { x: -Math.sin(s.ang), y: Math.cos(s.ang) };
            const a = 0.8;
            return (
              <line
                key={`tick-${s.xu}`}
                x1={s.xu - n.x * a}
                y1={s.yu - n.y * a}
                x2={s.xu + n.x * a}
                y2={s.yu + n.y * a}
                stroke="var(--border-subtle)"
                strokeWidth="0.65"
              />
            );
          })}
        </svg>

        {/* train dot */}
        <span
          aria-hidden
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: trainPos.left,
            top: trainPos.top,
            background: "color-mix(in srgb, var(--brand-400) 72%, white 10%)",
            boxShadow:
              "0 0 0 2px color-mix(in srgb, var(--brand-700) 35%, transparent)",
            transition: prefersReduced
              ? "none"
              : "left 90ms linear, top 90ms linear",
          }}
        />

        {/* stations */}
        {stops.map((p, i) => {
          const Icon = SECTORS[i]?.icon;
          const isActive = i === active;
          const title = SECTORS[i]?.title || "";
          const { ox, oy } = labelOffsets[i] || { ox: 0, oy: -20 };
          const angleToLabel = Math.atan2(oy, ox);

          // Leader geometry: start further from node, keep label free
          const baseClear = 18;
          const NODE_CLEAR = i === 0 ? baseClear + 6 : baseClear; // extra space for first label only
          const dist = Math.hypot(ox, oy);
          const leaderLen = Math.max(12, dist - NODE_CLEAR);

          return (
            <button
              key={`${title}-${i}`}
              onClick={() => setActive(i)}
              className={cx(
                "group absolute -translate-x-1/2 -translate-y-1/2 outline-none",
                "focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--brand-400)_60%,transparent)]",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)] rounded-full"
              )}
              style={{ left: `${p.xp}%`, top: `${p.yp}%` }}
              aria-label={title}
            >
              <span className="absolute -inset-3" aria-hidden />
              <span
                className={cx(
                  "relative grid h-12 w-12 place-items-center rounded-full border transition-transform",
                  "bg-[var(--surface-0)] border-[var(--border-subtle)] text-[var(--brand-700)]",
                  isActive && "scale-[1.06] border-[var(--brand-600)]"
                )}
              >
                {Icon ? <Icon /> : null}
                {isActive && (
                  <>
                    <span className="pointer-events-none absolute inset-0 rounded-full animate-impulse" />
                    <span className="pointer-events-none absolute inset-0 rounded-full animate-impulse2" />
                  </>
                )}
              </span>

              {/* leader */}
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 block h-[2px] -translate-x-1/2 -translate-y-1/2 rounded"
                style={{
                  width: `${leaderLen}px`,
                  transform: `translate(-50%,-50%) rotate(${
                    (angleToLabel * 180) / Math.PI
                  }deg) translateX(${NODE_CLEAR}px)`,
                  background:
                    "linear-gradient(90deg, color-mix(in srgb, var(--brand-400) 35%, transparent), transparent)",
                  opacity: 0.9,
                }}
              />

              {/* label */}
              <span
                className={cx(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap",
                  "rounded-md border px-2.5 py-1.5 text-[12px]",
                  "border-[var(--border-subtle)] bg-[var(--surface-2)]/96 backdrop-blur-[2px]",
                  "text-[var(--text-secondary)] shadow-[var(--tile-shadow)] opacity-0",
                  "transition-[opacity,transform] duration-200",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "group-hover:opacity-100 group-hover:translate-y-[-1px]"
                )}
                style={{
                  transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`,
                }}
              >
                {title}
              </span>
            </button>
          );
        })}
      </div>

      {/* progress + counter */}
      <div className="mt-4 flex items-center justify-center gap-8">
        <div className="relative h-[2px] w-full max-w-[480px] rounded bg-[var(--surface-2)]">
          <div
            className="absolute left-0 top-0 h-full rounded"
            style={{
              width: `${(active / Math.max(1, N - 1)) * 100}%`,
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--brand-400) 40%, transparent), color-mix(in srgb, var(--brand-700) 45%, transparent))",
              transition: "width 520ms cubic-bezier(.22,.8,.35,1)",
            }}
          />
        </div>
        <div className="whitespace-nowrap text-[12px] text-[var(--text-secondary)]">
          {active + 1} / {N}
        </div>
      </div>

      {/* pulses */}
      <style jsx>{`
        @keyframes impulse {
          0% {
            box-shadow: 0 0 0 0
              color-mix(in srgb, var(--brand-400) 30%, transparent);
            opacity: 0.6;
          }
          100% {
            box-shadow: 0 0 0 20px transparent;
            opacity: 0;
          }
        }
        @keyframes impulse2 {
          0% {
            box-shadow: 0 0 0 0
              color-mix(in srgb, var(--brand-700) 22%, transparent);
            opacity: 0.5;
          }
          100% {
            box-shadow: 0 0 0 34px transparent;
            opacity: 0;
          }
        }
        .animate-impulse {
          animation: impulse 1500ms ease-out infinite;
        }
        .animate-impulse2 {
          animation: impulse2 2100ms ease-out infinite;
          animation-delay: 240ms;
        }
      `}</style>
    </div>
  );
}

function MapBtn({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={cx(
        "h-8 rounded-md border px-3 text-[12px]",
        disabled
          ? "cursor-not-allowed border-[var(--border-subtle)] bg-[var(--surface-2)] text-[color-mix(in_srgb,var(--text-secondary)_60%,transparent)] opacity-60"
          : "border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:border-[var(--brand-500)]"
      )}
    >
      {children}
    </button>
  );
}

/* ───────── Detail Panel ───────── */
function DetailPanel({ sector = {} }) {
  const Icon = sector.icon;
  const points = sector.points || [];
  const [idx, setIdx] = useState(0);

  useEffect(() => setIdx(0), [sector.title]);
  useEffect(() => {
    if (!points.length) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % points.length), 3000);
    return () => clearInterval(id);
  }, [points.length]);

  const progress = points.length ? (idx + 1) / points.length : 0;

  return (
    <aside className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5 sm:p-6 [box-shadow:var(--tile-shadow)]">
      <div className="flex items-start gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl border text-[var(--brand-700)]"
          style={{
            background: "color-mix(in srgb, var(--brand-400) 14%, transparent)",
            borderColor:
              "color-mix(in srgb, var(--brand-400) 24%, transparent)",
          }}
        >
          {Icon ? <Icon /> : null}
        </span>
        <div className="min-w-0">
          <h3 className="text-[1.15rem] font-semibold leading-snug text-[var(--text-primary)]">
            {sector.title}
          </h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">
            {sector.desc}
          </p>
        </div>
      </div>

      {points.length > 0 && (
        <div className="mt-4">
          <div
            className="relative overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-2)]"
            role="region"
            aria-live="polite"
          >
            <div className="p-3 text-[13.5px] text-[var(--text-secondary)]">
              {points[idx]}
            </div>
            <div className="h-1 w-full bg-[var(--surface-1)]">
              <div
                className="h-full"
                style={{
                  width: `${progress * 100}%`,
                  transition: "width 350ms linear",
                  background:
                    "linear-gradient(90deg, color-mix(in srgb, var(--brand-400) 40%, transparent), color-mix(in srgb, var(--brand-700) 45%, transparent))",
                }}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {points.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={cx(
                  "h-2.5 w-2.5 rounded-full border transition",
                  i === idx
                    ? "border-[var(--brand-600)] bg-[color-mix(in_srgb,var(--brand-400)_25%,transparent)]"
                    : "border-[var(--border-subtle)] bg-[var(--surface-0)] hover:border-[var(--brand-500)]"
                )}
                aria-label={`Fact ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <Button variant="primary" size="sm" href="#contact">
          Discuss a project
        </Button>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--brand-400) 22%, transparent), transparent)",
        }}
      />
    </aside>
  );
}
