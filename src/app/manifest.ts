import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DrMcGi's SaaS Atelier (Pty) Ltd",
    short_name: "DrMcGi SaaS",
    description: "Software development, SaaS design, and business systems by DrMcGi's SaaS Atelier.",
    start_url: "/",
    display: "standalone",
    background_color: "#020409",
    theme_color: "#020409",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}