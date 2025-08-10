import { FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-primary-950 text-primary-100 px-8 py-6 border-t border-primary-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4  text-sm">
        <span>
          © {new Date().getFullYear()} The Wild Oasis. All rights reserved.
        </span>

        <div className="flex gap-6 text-xl">
          <Link
            href="mailto:mehdibch.dev@gmail.com"
            className="hover:text-accent-400 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope />
          </Link>
          <Link
            href="https://web.facebook.com/profile.php?id=61564032774895"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-400 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://www.linkedin.com/in/mehdi-bouchachi-79a874281/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
