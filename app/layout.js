import dynamic from "next/dynamic";
import "./_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
const Header = dynamic(
  () => import("../widgets/landing/components/header/Header"),
  {
    ssr: false,
  }
);
const Footer = dynamic(
  () => import("../widgets/landing/components/footer/Footer"),
  {
    ssr: true,
  }
);
const SmoothScroll = dynamic(() => import("../widgets/ui/SmoothScroll"), {
  ssr: false,
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export const metadata = {
  title: {
    template: "%s | IMALEX",
    default: "Welcome | IMALEX",
  },
  description:
    "IMALEX, a science-driven startup, develops natural solutions in cosmetics, food supplements, biopesticides, animal nutrition, and agri-food.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={[
          josefin.className,
          "antialiased min-h-screen flex flex-col",
          // token-based colors; flip via :root / html.dark in globals.css
          "bg-[var(--surface-0)] text-[var(--text-primary)]",
          // selection uses brand token (works in both modes)
          "selection:bg-[rgba(127,207,167,0.35)] ",
        ].join(" ")}
      >
        {" "}
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
