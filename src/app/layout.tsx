import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const businessPhoneE164 = "+27649211745";
const businessName = "DrMcGi";
const socialProfiles = [
  "https://www.instagram.com/drmcgisaasco/",
  "https://github.com/DrMcGi",
  "https://www.linkedin.com/in/gift-rantho"
];

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
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: businessName,
      url: siteUrl,
      telephone: businessPhoneE164,
      sameAs: socialProfiles,
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        "Worldwide"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: businessPhoneE164,
          contactType: "sales",
          availableLanguage: ["en"],
          areaServed: ["ZA", "Worldwide"]
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: businessName,
      url: siteUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web & SaaS Development",
      provider: { "@type": "Organization", name: businessName, url: siteUrl },
      areaServed: [
        { "@type": "City", name: "Pretoria" },
        { "@type": "City", name: "Johannesburg" },
        { "@type": "City", name: "Cape Town" },
        { "@type": "Country", name: "South Africa" },
        "Worldwide"
      ]
    }
  ];

  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
