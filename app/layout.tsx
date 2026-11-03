import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: "700", variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Maanya Shukla",
  description: "Computer engineering student at Rutgers. Builder mind, curious person. Open to internships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
