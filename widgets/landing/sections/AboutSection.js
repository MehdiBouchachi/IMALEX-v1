import BadgeGrid from "../components/about/BadgeGrid";
import MediaPanel from "../components/about/MediaPanel";
import AccentBlob from "../../ui/AccentBlob";
import BulletList from "../../ui/BulletList";
import CTAGroup from "../../ui/CTAGroup";
import Divider from "../../ui/Divider";
import EyebrowChip from "../../ui/EyebrowChip";

import { ABOUT } from "../../../app/_config/sections.config";
export default function AboutSection() {
  const {
    eyebrowIcon: EyebrowIcon,
    eyebrowText,
    title,
    lead,
    bullets,
    badges,
    ctas,
    image: { src, alt, captionIcon, caption },
  } = ABOUT;

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <AccentBlob
        className="-top-28 -right-24 h-80 w-80"
        varToken="--brand-300-a28, rgba(127,207,167,0.28)"
      />
      <AccentBlob
        className="-bottom-28 -left-24 h-96 w-96"
        varToken="--brand-700-a26, rgba(60,139,99,0.26)"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl lg:max-w-none">
            <EyebrowChip icon={EyebrowIcon}>{eyebrowText}</EyebrowChip>

            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {title}
            </h2>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
              {lead}
            </p>

            <Divider />
            <BulletList items={bullets} />
            <BadgeGrid items={badges} />
            <CTAGroup items={ctas} />
          </div>

          {/* Visual */}
          <MediaPanel
            src={src}
            alt={alt}
            captionIcon={captionIcon}
            caption={caption}
          />
        </div>
      </div>
    </section>
  );
}
