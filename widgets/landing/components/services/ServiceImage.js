// app/_components/services/ServiceImage.js
import Image from "next/image";

export default function ServiceImage({ src, title, position, focal }) {
  // Backward-compatible: allow src to be a string or an object
  let _src = src;
  let _position = position;
  let _focal = focal;

  if (src && typeof src === "object") {
    _src = src.src || src.url || "";
    _position = src.position ?? _position;
    _focal = src.focal ?? _focal;
  }

  const objectPosition = _position
    ? _position // e.g. "center 80%" or "40% 30%"
    : _focal && typeof _focal === "object"
    ? `${((_focal.x ?? 0.5) * 100).toFixed(2)}% ${(
        (_focal.y ?? 0.5) * 100
      ).toFixed(2)}%`
    : "50% 50%"; // default center

  return (
    <div className="relative h-32">
      {_src ? (
        <Image
          src={_src}
          alt={title || ""}
          quality={60}
          loading="lazy"
          fill
          sizes="(max-width:1024px) 100vw, 33vw"
          className="object-cover opacity-90 transition group-hover:opacity-100"
          style={{ objectPosition }}
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--g-hero-overlay)]" />
      )}
    </div>
  );
}
