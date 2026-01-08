import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DrMcGi’s SaaS Co. — Luxury software. Real business impact.",
    template: "%s | DrMcGi’s SaaS Co."
  },
  description: "Luxury-grade web & SaaS builds with cinematic polish and outcomes.",
  applicationName: "DrMcGi’s SaaS Co.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "DrMcGi’s SaaS Co.",
    title: "DrMcGi’s SaaS Co. — Luxury software. Real business impact.",
    description: "Luxury-grade web & SaaS builds with cinematic polish and outcomes.",
    images: [{ url: "/backgrounds/hero-bg.svg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "DrMcGi’s SaaS Co. — Luxury software. Real business impact.",
    description: "Luxury-grade web & SaaS builds with cinematic polish and outcomes.",
    images: ["/backgrounds/hero-bg.svg"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
