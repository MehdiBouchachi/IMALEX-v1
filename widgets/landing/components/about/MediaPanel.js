import Image from "next/image";

export default function MediaPanel({ src, alt, captionIcon: Icon, caption }) {
  return (
    <div className="relative">
      <div
        className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl backdrop-blur-md shadow-xl border"
        style={{
          borderColor: "var(--border-subtle, rgba(0,0,0,0.06))",
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--surface-0) 85%, transparent), color-mix(in srgb, var(--surface-0) 60%, transparent))",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={60}
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 600px"
        />
        {caption ? (
          <div className="absolute bottom-4 left-4">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs backdrop-blur-sm"
              style={{ background: "rgba(15,23,42,0.7)", color: "#fff" }}
            >
              {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
              {caption}
            </span>
          </div>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
        style={{
          border: "1px solid var(--brand-700-a22, rgba(60,139,99,0.22))",
        }}
      />
    </div>
  );
}
