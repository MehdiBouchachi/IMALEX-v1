// app/_components/about/BulletList.jsx
"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function BulletList({ items = [] }) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center">
            <FaCheckCircle
              className="h-5 w-5"
              style={{ color: "var(--brand-700)" }}
            />
          </span>
          <span
            className="leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
