import dynamic from "next/dynamic";
import { fakePosts } from "./_data/fakePosts";

const ContactSection = dynamic(() => import("./_sections/ContactSection"), {
  ssr: false,
});
const HeroSection = dynamic(() => import("./_sections/HeroSection"), {
  ssr: true,
});
const AboutSection = dynamic(() => import("./_sections/AboutSection"), {
  ssr: true,
});
const ServicesSection = dynamic(() => import("./_sections/ServicesSection"), {
  ssr: true,
});
const SectorsSection = dynamic(() => import("./_sections/SectorsSection"), {
  ssr: true,
});

// heavy animations → client only to avoid hydration jank
const WhyUsSection = dynamic(() => import("./_sections/WhyUsSection"), {
  ssr: false,
});
const ProcessSection = dynamic(() => import("./_sections/ProcessSection"), {
  ssr: false,
});

const BlogsSection = dynamic(() => import("./_sections/BlogsSection"), {
  ssr: false,
}); // adjust path if needed

const CTA = dynamic(() => import("./_components/CTA"), { ssr: true });
const Footer = dynamic(() => import("./_components/footer/Footer"), {
  ssr: true,
});

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

        <BlogsSection posts={fakePosts.slice(0, 5)} basePath="/blogs" showCTA />
        <ProcessSection />
        <CTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
