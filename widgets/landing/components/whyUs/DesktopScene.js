import {
  Caustics,
  ConvectionFlow,
  DriftParticles,
  FlaskSVG,
  FoamRim,
  LiquidSurface,
  LiquidWaves,
  MeniscusShineLite,
  MicroBubbles,
  Sparkles,
} from "./effects/FlaskParts";

export default function DesktopScene({ isLite }) {
  return (
    <div
      className={[
        "relative mx-auto w-[560px] max-w-full will-change-transform [contain:paint]",
        !isLite ? "anim-float" : "",
      ].join(" ")}
    >
      <FlaskSVG />
      {isLite ? (
        <MeniscusShineLite />
      ) : (
        <>
          <ConvectionFlow />
          <LiquidSurface />
          <FoamRim />
          <DriftParticles />
          <LiquidWaves />
          <MicroBubbles />
          <Sparkles />
          <Caustics />
          <MeniscusShineLite />
        </>
      )}
    </div>
  );
}
