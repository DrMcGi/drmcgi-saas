import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const businessPhoneE164 = "+27649211745";
const businessName = "DrMcGi's SaaS Atelier (Pty) Ltd";
const businessRegistrationNumber = "2026/093277/07";
const socialProfiles = [
  "https://www.instagram.com/drmcgisaasco/",
  "https://github.com/DrMcGi",
  "https://www.linkedin.com/in/gift-rantho"
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DrMcGi's SaaS Atelier (Pty) Ltd — Luxury software, IT services, and SaaS craftsmanship.",
    template: "%s | DrMcGi's SaaS Atelier (Pty) Ltd"
  },
  description:
    "DrMcGi's SaaS Atelier (Pty) Ltd builds luxury web services, SaaS products, and enterprise IT systems with a concierge experience—South Africa & global.",
  keywords: [
    "web services",
    "IT company",
    "IT specialist",
    "IT project manager",
    "outsourced IT services",
    "retainer package",
    "software development",
    "software developer",
    "software programmer",
    "system developer",
    "computer scientist",
    "computer science",
    "software specialist",
    "IT roles",
    "IT interns",
    "website builder",
    "posters",
    "letterhead",
    "Google Forms handling",
    "luxury software",
    "SaaS company",
    "software as a service",
    "DrMcGi",
    "DrMcGi SaaS Atelier",
    "DrMcGi's SaaS Atelier (Pty) Ltd",
    "DrMcGi's SaaS Atelier",
    "South Africa",
    "Pretoria",
    "Johannesburg",
    "Cape Town"
  ],
  applicationName: "DrMcGi's SaaS Atelier (Pty) Ltd",
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
    siteName: "DrMcGi's SaaS Atelier (Pty) Ltd",
    title: "DrMcGi's SaaS Atelier (Pty) Ltd — Luxury software. Real business impact.",
    description:
      "DrMcGi's SaaS Atelier (Pty) Ltd builds luxury web services, SaaS products, and enterprise IT systems with a concierge experience—South Africa & global.",
    images: [{ url: "/backgrounds/hero-bg.svg" }],
    locale: "en_ZA"
  },
  twitter: {
    card: "summary_large_image",
    title: "DrMcGi's SaaS Atelier (Pty) Ltd — Luxury software. Real business impact.",
    description:
      "DrMcGi's SaaS Atelier (Pty) Ltd builds luxury web services, SaaS products, and enterprise IT systems with a concierge experience—South Africa & global.",
    images: ["/backgrounds/hero-bg.svg"],
    creator: "@drmcgisaasco"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: businessName,
      legalName: businessName,
      registrationNumber: businessRegistrationNumber,
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
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "DrMcGi's SaaS Atelier (Pty) Ltd",
      url: siteUrl,
      inLanguage: "en",
      description:
        "DrMcGi's SaaS Atelier (Pty) Ltd builds luxury web services, SaaS products, and enterprise IT systems with a concierge experience—South Africa & global.",
      isPartOf: { "@type": "WebSite", name: businessName, url: siteUrl }
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl
        }
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
