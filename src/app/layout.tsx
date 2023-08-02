import "./globals.css";
import type { Metadata } from "next";
import { Oswald, Fira_Sans_Condensed } from "next/font/google";
import { Footer } from "@/components";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const fira = Fira_Sans_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-fira",
});

export const metadata: Metadata = {
  title: "Furniture - Luxury furniture",
  description: "Luxury furniture for a lavish home",
};

// prettier-ignore
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${oswald.variable} ${fira.variable } bg-brand-light 
      font-oswald text-brand-light min-h-screen`}>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
