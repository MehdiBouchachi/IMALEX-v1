// components/ui/Modal.jsx
"use client";

import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalCtx = createContext(null);

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <ModalCtx.Provider value={{ open, close, openName }}>
      {children}
    </ModalCtx.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalCtx);
  return cloneElement(children, {
    onClick: (e) => {
      children.props?.onClick?.(e);
      open(opens);
    },
  });
}

function Window({
  name,
  children,
  className = "",
  lockScroll = false, // keep false so page can still scroll
}) {
  const { openName, close } = useContext(ModalCtx);
  const panelRef = useRef(null);

  // ESC + optional scroll lock + autofocus first focusable
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);

    let prevOverflow;
    if (lockScroll) {
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }

    // autofocus a focusable control for a11y
    setTimeout(() => {
      const first = panelRef.current?.querySelector?.(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus?.();
    }, 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      if (lockScroll)
        document.documentElement.style.overflow = prevOverflow || "";
    };
  }, [close, lockScroll]);
  if (name !== openName) return null;

  const content =
    typeof children === "function"
      ? children({ onCloseModal: close })
      : cloneElement(children, { onCloseModal: close });

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] bg-[var(--backdrop-color)]/80 backdrop-blur-sm"
      onClick={(e) => e.currentTarget === e.target && close()}
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={[
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[min(92vw,720px)] rounded-2xl border border-[var(--tile-border)]",
          "bg-[var(--tile-bg)] shadow-[var(--tile-shadow)] p-6 sm:p-8",
          "transition-all duration-200",
          className,
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-secondary)] hover:bg-[color:var(--surface-1)] focus:outline-none"
        >
          <HiXMark className="h-5 w-5" />
        </button>
        {content}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
