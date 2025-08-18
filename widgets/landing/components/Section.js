function Section({ id, eyebrow, title, children }) {
  return ( 
    <section id={id} className="py-20 sm:py-24 ">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {eyebrow && (
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--eye-brow)" }}
            >
              {eyebrow}
            </div>
          )}
          {title && (
            <h2
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h2>
          )}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default Section;
