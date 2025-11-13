"use client";

import { useCallback, type MouseEvent } from "react";
import BackgroundManager from "@/components/BackgroundManager";

const LINKS = [
  { href: "#vision", label: "Vision" },
  { href: "#atlas", label: "Process" },
  { href: "#configurator", label: "Pricing" },
  { href: "#case-studies", label: "Work" },
  { href: "#concierge", label: "Concierge" },
  { href: "#contact", label: "Blueprint" }
];

export default function Nav() {
  const handleScrollTop = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAnchorNavigation = useCallback((href: string) => {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  }, []);

  return (
    <nav className="nav-shell">
      <BackgroundManager variant="nav" />
      <div className="nav-inner">
        <a href="#home" className="nav-logo" onClick={handleScrollTop}>
          <span className="nav-logo-main">DrMcGi&apos;s SaaS Co.</span>
          <span className="nav-logo-tag">Luxury software assured</span>
        </a>

        <div className="nav-links" aria-label="Primary navigation">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" onClick={handleAnchorNavigation(link.href)}>
              <span>{link.label}</span>
              <span className="nav-glow" aria-hidden />
            </a>
          ))}
        </div>

        <a href="#concierge" className="nav-cta">Reserve A Build</a>
      </div>
      <span className="nav-spotlight" aria-hidden />
    </nav>
  );
}
