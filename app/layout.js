import dynamic from "next/dynamic";

import "./_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
const Header = dynamic(() => import("./_components/header/Header"), {
  ssr: false,
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | IMALEX",
    default: "Welcome | IMALEX",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by the most beautiful mountains and the darkest forests in the world.",
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
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
