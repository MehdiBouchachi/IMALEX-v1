// app/_components/services/ServiceImage.js
import Image from "next/image";

/**
 * Flexible service image:
 * - On mobile, uses tall aspect to show more of the photo.
 * - On desktop, parent can pass a fixed height thumbnail via `wrapperClass`.
 */
export default function ServiceImage({
  src,
  title,
  priority = false,
  focal = "center",
  wrapperClass = "",
  rounded = true,
}) {
  const objectPos =
    focal === "top"
      ? "object-[50%_35%]"
      : focal === "bottom"
      ? "object-[50%_65%]"
      : "object-center";

  // Fallback aspect if parent doesn't pass a wrapperClass
  const fallbackAspect = "aspect-[5/4] sm:aspect-[4/3] lg:aspect-[3/2]";

  return (
    <div
      className={[
        "relative overflow-hidden",

        wrapperClass || fallbackAspect,
      ].join(" ")}
    >
      <Image
        src={src} // StaticImageData (from services.config) for real blur
        alt={title}
        fill
        placeholder="blur"
        priority={priority}
        quality={75}
        className={`object-cover ${objectPos} transition-opacity duration-300`}
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
      />
    </div>
  );
}
