// app/blogs/[slug]/CopyCodeButtons.js
"use client";
import { useEffect } from "react";

/** Enhances <pre><code>…</code></pre> blocks inside `scopeSelector`
 * with a “Copy” button. No SSR/CSR mismatches; no inline scripts.
 */
export default function CopyCodeButtons({ scopeSelector = ".prose-area" }) {
  useEffect(() => {
    const root = document.querySelector(scopeSelector);
    if (!root) return;

    const pres = Array.from(root.querySelectorAll("pre"));
    const cleanups = [];

    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";

      const onClick = () => {
        const code = pre.querySelector("code");
        if (!code) return;
        navigator.clipboard.writeText(code.innerText || "").then(() => {
          btn.dataset.ok = "1";
          btn.textContent = "Copied";
          setTimeout(() => {
            btn.dataset.ok = "";
            btn.textContent = "Copy";
          }, 1200);
        });
      };

      btn.addEventListener("click", onClick);
      pre.appendChild(btn);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [scopeSelector]);

  return null;
}
