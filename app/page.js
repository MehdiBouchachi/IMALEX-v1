"use client";
import labShot from "@/public/lab-shot.jpg";
import Process from "./_components/Process";
import ServicesGrid from "./_components/ServicesGrid";
import SectorsGrid from "./_components/SectorsGrid";
import WhyUsFlask from "./_components/WhyUsFlask";
import Hero from "./_components/Hero";
import AboutImalex from "./_components/AboutImalex";
import Section from "./_components/Section";
import CTA from "./_components/CTA";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

// optional: control caching/ISR
// export const revalidate = 60;         // ISR every 60s
// export const dynamic = "force-static"; // or fully static build
// export const dynamic = "force-dynamic"; // or always SSR

export default function Page() {
  return (
    <div className="selection:bg-green-300/40">
      <main>
        <Hero /> {/* client */}
        <AboutImalex imageSrc={labShot} /> {/* server */}
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
