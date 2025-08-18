"use client";

import Link from "next/link";
import React, { forwardRef } from "react";

/** Utility to join class strings */
function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

const Button = forwardRef(function Button(
  {
    variant = "primary", // "primary" | "secondary"
    size = "md", // "xlg" | "lg" | "md" | "sm" | "xs"
    children,
    className,
    href,
    as = undefined,
    asLink = false,
    leftIcon = null,
    rightIcon = null,
    loading = false,
    disabled = false,
    fullWidth = false,
    rounded = "lg", // "lg" | "full"
    type = "button",
    ...rest
  },
  ref
) {
  const isLink = !!href || as === "a";
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center font-semibold transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "active:translate-y-[1px] select-none whitespace-nowrap";

  const sizes = {
    xlg: "text-base px-7 py-4 gap-2.5", // Hero big button
    lg: "text-sm px-6 py-3 gap-2", // CTA section
    mlg: "text-base px-5 py-3 gap-2", // Old AboutImalex style
    md: "text-sm px-5 py-2.5 gap-2", // Forms & general
    sm: "text-sm px-3.5 py-2 gap-2", // Header compact
    xs: "text-xs px-2.5 py-1.5 gap-1.5", // Chips/pills
  }[size];

  const radii = {
    lg: "rounded-lg",
    full: "rounded-full",
  }[rounded];

  const palette =
    variant === "primary"
      ? "bg-[var(--cta-bg)] hover:bg-[var(--cta-bg-hover)] " +
        "text-[var(--cta-50)] shadow-[0_10px_24px_rgba(0,0,0,0.12),0_8px_18px_var(--ring-pulse)] " +
        "ring-offset-[var(--surface-0)]"
      : "border bg-[var(--btn-ghost-bg)] hover:bg-[var(--btn-ghost-hover-bg)] " +
        "border-[var(--btn-ghost-border)] text-[var(--btn-ghost-text)] " +
        "ring-offset-[var(--surface-0)]";

  const state = cn(
    isDisabled && "opacity-60 pointer-events-none",
    loading && "cursor-progress"
  );

  const cls = cn(base, sizes, radii, palette, state, className);

  const content = (
    <>
      {leftIcon ? <span className="-ml-0.5">{leftIcon}</span> : null}
      <span className="inline-flex items-center">
        {loading ? (
          <>
            <span className="spinner-mini mr-2" />
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </span>
      {rightIcon ? <span className="-mr-0.5">{rightIcon}</span> : null}
    </>
  );

  if (isLink) {
    const aProps = {
      ref,
      href: href || "#",
      className: cn(cls, fullWidth && "w-full"),
      "aria-disabled": isDisabled || undefined,
      ...rest,
    };
    if (asLink) {
      return (
        <Link
          href={aProps.href}
          className={aProps.className}
          aria-disabled={aProps["aria-disabled"]}
          {...rest}
        >
          {content}
        </Link>
      );
    }
    return <a {...aProps}>{content}</a>;
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(cls, fullWidth && "w-full")}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
