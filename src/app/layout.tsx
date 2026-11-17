import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Swath — Learn the Nairobi Securities Exchange",
    template: "%s · Swath",
  },
  description:
    "A plain-language study desk for Kenyans learning the Nairobi Securities Exchange. Education only. Not investment advice.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
