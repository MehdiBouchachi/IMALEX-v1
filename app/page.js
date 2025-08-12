import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./_components/Hero"), { ssr: false });
const Process = dynamic(() => import("./_components/Process"), { ssr: false });
const WhyUsFlask = dynamic(() => import("./_components/WhyUsFlask"), {
  ssr: false,
});
const ServicesGrid = dynamic(() => import("./_components/ServicesGrid"), {
  ssr: false,
});
const AboutImalex = dynamic(() => import("./_components/AboutImalex"), {
  ssr: false,
});
const Contact = dynamic(() => import("./_components/Contact"), {
  ssr: false,
});
const Footer = dynamic(() => import("./_components/Footer"), {
  ssr: false,
});
const Section = dynamic(() => import("./_components/Section"), {
  ssr: false,
});
const CTA = dynamic(() => import("./_components/CTA"), {
  ssr: false,
});
const SectorsGrid = dynamic(() => import("./_components/SectorsGrid"), {
  ssr: false,
});

// optional: control caching/ISR
// export const revalidate = 60;         // ISR every 60s
// export const dynamic = "force-static"; // or fully static build
// export const dynamic = "force-dynamic"; // or always SSR

export default function Page() {
  return (
    <div className="selection:bg-green-300/40">
      <main>
        <Hero /> {/* client */}
        <AboutImalex  /> {/* server */}
        <Section id="services" title="Our Services" eyebrow="What we do">
          <ServicesGrid /> {/* client or server, your file says client */}
        </Section>
        <SectorsGrid /> {/* client */}
        <WhyUsFlask /> {/* (whichever it is) */}
        <Process /> {/* client */}
        <CTA /> {/* server */}
        <Contact /> {/* server wrapper + client form inside */}
      </main>
      <Footer /> {/* server */}
    </div>
  );
}
