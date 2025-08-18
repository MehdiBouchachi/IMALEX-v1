"use client";

import { useEffect, useRef, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [mode, setMode] = useState("system");
  const mediaRef = useRef(null);

  const apply = (m) => {
    const root = document.documentElement;
    root.classList.add("theme-animating");
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = m === "dark" || (m === "system" && systemDark);
    root.classList.toggle("dark", isDark);
    root.dataset.theme = m;

    requestAnimationFrame(() => {
      // ensure transitions actually fire
      const sys = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", m === "dark" || (m === "system" && sys));
      setTimeout(() => root.classList.remove("theme-animating"), 320);
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("themeMode") || "system";
    setMode(stored);
    apply(stored);

    if (window.matchMedia) {
      mediaRef.current = window.matchMedia("(prefers-color-scheme: dark)");
      const onMedia = () => {
        const current = localStorage.getItem("themeMode") || "system";
        if (current === "system") apply("system");
      };
      mediaRef.current.addEventListener?.("change", onMedia);
      return () => mediaRef.current?.removeEventListener?.("change", onMedia);
    }
  }, []);

  const cycle = () => {
    const sysDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    let next;
    if (mode === "system") next = sysDark ? "light" : "dark";
    else next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("themeMode", next);
    apply(next);
  };

  const effectiveDark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const Icon = effectiveDark ? FiMoon : FiSun;
  const label = effectiveDark ? "Dark mode" : "Light mode";

  return (
    <button
      onClick={cycle}
      aria-label={`Toggle theme (${label})`}
      title={label}
      className="ml-1 rounded-full p-2 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] border bg-[var(--surface-1)]"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
