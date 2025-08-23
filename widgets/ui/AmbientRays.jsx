function AmbientRays({ isLite = false }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [contain:paint]"
    >
      <div className="absolute inset-0 opacity-60 dark:opacity-40 mask-why-top">
        <div
          className={[
            "absolute -top-16 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rotate-[8deg]",
            "bg-why-conic",
            !isLite ? "anim-tilt" : "",
          ].join(" ")}
        />
      </div>
      <div className="absolute inset-0 bg-why-spots" />
    </div>
  );
}

export default AmbientRays;
