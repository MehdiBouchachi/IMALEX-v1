// app/blogs/_ui/hooks/useDelayedBusy.js
"use client";

/** Shows `true` only after a small delay (to avoid flicker) and
 * keeps it visible a minimum time once shown (to feel smooth).
 */
import { useEffect, useRef, useState } from "react";

export default function useDelayedBusy(
  active,
  delayMs = 100,
  minVisibleMs = 200
) {
  const [show, setShow] = useState(false);
  const shownAt = useRef(0);
  useEffect(() => {
    let t1, t2;
    if (active) {
      // wait a beat; if still active then show
      t1 = setTimeout(() => {
        shownAt.current = Date.now();
        setShow(true);
      }, delayMs);
    } else {
      // if visible, keep it a touch longer to avoid blink
      const remain =
        shownAt.current > 0
          ? Math.max(0, minVisibleMs - (Date.now() - shownAt.current))
          : 0;
      t2 = setTimeout(() => {
        shownAt.current = 0;
        setShow(false);
      }, remain);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, delayMs, minVisibleMs]);

  return show;
}
