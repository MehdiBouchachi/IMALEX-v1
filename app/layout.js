import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

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
    <html lang="en">
      <body
        className={`${josefin.className} antialiased min-h-screen flex flex-col text-slate-900 scroll-smooth bg-white  dark:bg-slate-900 dark:text-white selection:bg-teal-300/40`}
      >
        <Header />

        {/* Full-bleed main — pages control their own containers */}
        <main className="flex-1">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
      </body>
    </html>
  );
}
