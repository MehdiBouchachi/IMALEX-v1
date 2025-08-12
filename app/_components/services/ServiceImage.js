import Image from "next/image";

export default function ServiceImage({ src, title }) {
  return (
    <div className="relative h-32">
      {src ? (
        <Image
          src={src}
          alt={title}
          quality={50}
          loading="lazy"
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition"
          sizes="(max-width:1024px) 100vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--g-hero-overlay)]" />
      )}
    </div>
  );
}
