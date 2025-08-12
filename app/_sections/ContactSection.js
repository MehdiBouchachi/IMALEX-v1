import { CONTACT } from "../_components/contact/constants";
import ContactFormWizard from "../_components/contact/ContactFormWizard";
import ContactInfo from "../_components/contact/ContactInfo";

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
        <ContactInfo {...CONTACT} />
        <ContactFormWizard />
      </div>
    </section>
  );
}
