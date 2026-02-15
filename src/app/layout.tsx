import type { Metadata, Viewport } from "next";
import { DM_Sans, Barlow_Condensed } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import GradientMesh from "@/components/GradientMesh";
import SkipLink from "@/components/SkipLink";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammad Raihan Rabbani - Portfolio | AI Engineer",
  description: "Portfolio website of a passionate AI engineer showcasing projects in data analysis, AI, and machine learning.",
  keywords: "portfolio, Data analysis, AI, machine learning, projects, contact, Mohammad Raihan Rabbani, AI engineer",
  authors: [{ name: "Mohammad Raihan Rabbani" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${barlowCondensed.variable} antialiased`}
      >
        <SkipLink />
        <BackToTop />
        <CustomCursor />
        <GradientMesh />
        {children}
      </body>
    </html>
  );
}
