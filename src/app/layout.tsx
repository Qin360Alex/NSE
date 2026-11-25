import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { AmbientLight } from "@/components/AmbientLight";
import { AskNina } from "@/components/nina/AskNina";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Swath · The NSE, made simple",
    template: "%s · Swath",
  },
  description:
    "Learn the Nairobi Securities Exchange in plain language: eight short lessons, the market shelves, and real listed companies to study. Education only. Not investment advice.",
  applicationName: "Swath",
  openGraph: {
    type: "website",
    siteName: "Swath",
    title: "Swath · The NSE, made simple",
    description: "A plain-language study desk for Kenyans learning the Nairobi Securities Exchange. Education only.",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b12",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <body>
        <AmbientLight />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <AskNina />
      </body>
    </html>
  );
}
