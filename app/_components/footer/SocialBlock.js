import SocialIcon from "./SocialIcon";

export default function SocialBlock({ socials = [] }) {
  return (
    <div>
      <div className="font-semibold text-[var(--text-primary)]">Follow</div>
      <div className="mt-3 flex gap-3 text-[var(--text-muted)]">
        {socials.map(({ label, href, Icon }) => (
          <SocialIcon key={label} label={label} href={href} Icon={Icon} />
        ))}
      </div>
    </div>
  );
}
