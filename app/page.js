import dynamic from "next/dynamic";
import ContactSection from "./_sections/ContactSection";
import HeroSection from "./_sections/HeroSection";
import AboutSection from "./_sections/AboutSection";
import ServicesSection from "./_sections/ServicesSection";
import SectorsSection from "./_sections/SectorsSection";
import WhyUsSection from "./_sections/WhyUsSection";
import ProcessSection from "./_sections/ProcessSection";
import CTA from "./_components/CTA";
import Footer from "./_components/footer/Footer";

const Section = dynamic(() => import("./_components/Section"), {
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
        <HeroSection />
        <AboutSection />
        <Section id="services" title="Our Services" eyebrow="What we do">
          <ServicesSection />
        </Section>
        <SectorsSection />
        <WhyUsSection />
        <ProcessSection />
        <CTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
