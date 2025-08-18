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
    <html lang="en" className="scroll-smooth ">
      <body
        className={[
          josefin.className,
          "antialiased min-h-svh overflow-x-hidden flex flex-col",
          "bg-[var(--surface-0)] text-[var(--text-primary)]",
          "selection:bg-[rgba(127,207,167,0.35)]",
        ].join(" ")}
      >
        {" "}
        <div
          id="app"
          className="
            relative isolate
            max-w-[100dvw] overflow-x-clip
            min-h-inherit flex flex-col
          "
        >
          <SmoothScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
