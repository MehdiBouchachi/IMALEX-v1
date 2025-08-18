"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      const p = h > 0 ? (el.scrollTop / h) * 100 : 0;
      setWidth(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-50"
      style={{
        width: `${width}%`,
        background: "var(--brand-700)",
        transition: "width 0.1s linear",
      }}
    />
  );
}
