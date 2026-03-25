"use client";

import { useCallback, type MouseEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollTop = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAnchorNavigation = useCallback((href: string) => {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      setIsMenuOpen(false); // Close menu on mobile
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
          <span className="nav-logo-main">DrMcGi&apos;s SaaS Atelier (Pty) Ltd</span>
          <span className="nav-logo-tag">Luxury software assured</span>
        </a>

        <button
          className="md:hidden flex flex-col space-y-1 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        <AnimatePresence>
          <motion.div
            className={`nav-links ${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-black/90 p-4' : 'hidden'} md:flex md:flex-row md:static md:bg-transparent md:p-0`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            aria-label="Primary navigation"
          >
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="nav-link" onClick={handleAnchorNavigation(link.href)}>
                <span>{link.label}</span>
                <span className="nav-glow" aria-hidden />
              </a>
            ))}
          </motion.div>
        </AnimatePresence>

        <a href="#concierge" className="nav-cta hidden md:block">Reserve A Build</a>
      </div>
      <span className="nav-spotlight" aria-hidden />
    </nav>
  );
}
