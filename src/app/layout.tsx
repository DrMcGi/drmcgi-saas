import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "DrMcGi’s SaaS Co. — Luxury software. Real business impact.",
  description: "Luxury-grade web & SaaS builds with cinematic polish and outcomes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}