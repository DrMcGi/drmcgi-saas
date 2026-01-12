"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useApp } from "@/lib/store";
import { createWhatsAppLink } from "@/lib/whatsapp";

const FLOAT_VARIANTS = {
  idle: { y: [0, -8, 0], rotate: [0, 2, -2, 0] }
};

const FLOAT_TRANSITION = { duration: 6.8, repeat: Infinity, ease: "easeInOut" as const };

const GLOW_TRANSITION = { duration: 3.6, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const };

export default function GuidanceBot() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [entryThreshold, setEntryThreshold] = useState<number | null>(null);
  const [exitThreshold, setExitThreshold] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { selected, activeTier, activePackage } = useApp();

  const modulesList = useMemo(() => Array.from(selected).sort(), [selected]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = "(pointer: coarse) and (max-width: 960px) and (orientation: portrait)";
    const media = window.matchMedia(query);

    const sync = () => setIsMobilePortrait(media.matches);
    sync();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }

    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

  useEffect(() => {
    const atlas = document.getElementById("atlas");
    const contact = document.getElementById("contact");
    if (!atlas) return;

    const computeThreshold = () => {
      const rect = atlas.getBoundingClientRect();
      const offset = rect.top + window.scrollY;
      setEntryThreshold(Math.max(0, offset - window.innerHeight * 0.35));

      if (contact) {
        const contactRect = contact.getBoundingClientRect();
        const contactOffset = contactRect.top + window.scrollY;
        setExitThreshold(contactOffset - window.innerHeight * 0.3);
      } else {
        setExitThreshold(null);
      }
    };

    computeThreshold();
    window.addEventListener("resize", computeThreshold);
    return () => window.removeEventListener("resize", computeThreshold);
  }, []);

  useEffect(() => {
    if (entryThreshold === null) return;

    const handleScroll = () => {
      const y = window.scrollY;
      const hasPassedEntry = y >= entryThreshold - 40;
      const hasPassedExit = exitThreshold !== null && y >= exitThreshold;
      const nextVisible = hasPassedEntry && !hasPassedExit;
      setVisible((current) => (current === nextVisible ? current : nextVisible));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entryThreshold, exitThreshold]);

  const conciergeLink = useMemo(() => {
    const hasContext = modulesList.length > 0 || Boolean(activeTier) || Boolean(activePackage);
    if (!hasContext) {
      return "https://wa.me/27649211745";
    }
    return createWhatsAppLink({
      origin: "Guidance bot CTA",
      modules: modulesList,
      tierId: activeTier,
      packageId: activePackage
    });
  }, [modulesList, activeTier, activePackage]);

  if (!visible) {
    return null;
  }

  if (dismissed) {
    return (
      <button
        type="button"
        className="guidance-bot-pill"
        onClick={() => setDismissed(false)}
        aria-label="Open guidance bot"
      >
        Open guidance bot
      </button>
    );
  }

  return (
    <motion.aside
      className={`guidance-bot ${visible ? "is-visible" : ""} ${hovering ? "is-hovering" : ""}`}
      initial={false}
      animate={
        visible
          ? isMobilePortrait
            ? { opacity: 1 }
            : { opacity: 1, x: 0 }
          : isMobilePortrait
            ? { opacity: 0 }
            : { opacity: 0, x: -40 }
      }
      transition={{ duration: 0.45, ease: "easeOut" }}
      role="complementary"
      aria-label="Build concierge guidance"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="guidance-bot-top">
        <span className="guidance-bot-label">Guidance bot</span>
        <button
          type="button"
          className="guidance-bot-close"
          onClick={() => setDismissed(true)}
          aria-label="Close guidance bot"
        >
          ✕
        </button>
      </div>

      <div className="guidance-bot-grid">
      <motion.div
        className="guidance-bot-avatar"
        animate={prefersReducedMotion ? undefined : "idle"}
        variants={prefersReducedMotion ? undefined : FLOAT_VARIANTS}
        transition={prefersReducedMotion ? undefined : FLOAT_TRANSITION}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        whileHover={
          prefersReducedMotion
            ? undefined
            : {
                rotate: [0, 6, -6, 0],
                scale: 1.08,
                y: [-2, 4, -2],
                transition: { duration: 0.9, ease: "easeInOut" }
              }
        }
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94, rotate: -6 }}
      >
        <motion.span
          className="guidance-bot-halo"
          animate={prefersReducedMotion ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [0.96, 1.06, 0.96] }}
          transition={prefersReducedMotion ? undefined : GLOW_TRANSITION}
        />
        <span className="guidance-bot-body">
          <span className="guidance-bot-eye" />
          <span className="guidance-bot-eye" />
          <span className="guidance-bot-mouth" />
        </span>
        <span className="guidance-bot-antenna" />
        <span className="guidance-bot-banner">
          <span className="banner-title">Cheese By DrMcGi</span>
          <span className="banner-slogan">Lets Keep Dairy</span>
          <a
            className="banner-link"
            href="https://cheesebydrmcgi.company.site"
            target="_blank"
            rel="noopener noreferrer"
          >
            cheesebydrmcgi.company.site
          </a>
        </span>
      </motion.div>

      <div className="guidance-bot-panel">
        <p className="guidance-bot-intro">
          We craft everything from swift couture sites to flagship enterprise platforms. Here&apos;s how to steer your build:
        </p>
        <ul className="guidance-bot-list">
          <li>
            <strong>Launch fast:</strong> Visit <a href="#configurator">Configurator</a>, toggle <span className="bot-chip">Responsive Design</span>, then send the blueprint for a boutique-ready website.
          </li>
          <li>
            <strong>Scale boldly:</strong> In <a href="#pricing">Investment tiers</a>, pick <span className="bot-chip">Concierge</span> or <span className="bot-chip">Enterprise</span> to auto-load executive modules.
          </li>
          <li>
            <strong>Meet live:</strong> Open <a href="#concierge">Concierge Desk</a>, select a slot on the calendar, confirm your timezone, and book the rehearsal.
          </li>
        </ul>

        <div className="guidance-bot-brand">
          <div className="brand-meta">
            <span className="brand-title">Cheese By DrMcGi</span>
            <span className="brand-slogan">“Lets Keep Dairy”</span>
          </div>
          <a
            className="brand-link"
            href="https://cheesebydrmcgi.company.site"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit collection
          </a>
        </div>

        <div className="guidance-bot-actions">
          <a href="#configurator" className="btn-gold guidance-bot-cta">Open configurator</a>
          <a href={conciergeLink} className="btn-ghost guidance-bot-cta" target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </div>
      </div>
      </div>
    </motion.aside>
  );
}
