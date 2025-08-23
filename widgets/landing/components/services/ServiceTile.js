// app/_components/services/ServiceTile.js

import ServiceCard from "./ServiceCard";

export default function ServiceTile({
  title,
  line,
  icon: Icon,
  image,
  bullets = [],
  cta,
  readMore,
}) {
  return (
    <ServiceCard>
      <ServiceCard.Media src={image} title={title} />
      <ServiceCard.Content>
        <ServiceCard.Header title={title} Icon={Icon} />
        <ServiceCard.Body>{line}</ServiceCard.Body>
        <ServiceCard.Bullets items={bullets} />
        <ServiceCard.Actions>
          <ServiceCard.CTA href="#contact">{cta}</ServiceCard.CTA>
          <ServiceCard.More data={readMore} />
        </ServiceCard.Actions>
      </ServiceCard.Content>
    </ServiceCard>
  );
}
