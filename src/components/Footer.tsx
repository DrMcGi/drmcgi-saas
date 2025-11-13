"use client";
import Link from "next/link";
import type { SVGProps } from "react";
import BackgroundManager from "@/components/BackgroundManager";

const PRESS = ["TechCouture", "FounderLane", "UX Atlas", "The Product Ledger"];
const PARTNERS = ["Stripe Premium", "AWS Activate", "Notion Cosmos", "Linear Enterprise"];

type IconProps = SVGProps<SVGSVGElement>;

const MailIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
    <path d="M3 7.5 11.4 13a1 1 0 0 0 1.2 0L21 7.5" />
  </svg>
);

const WhatsAppIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.6 11.8c0 4.8-3.9 8.8-8.8 8.8a8.7 8.7 0 0 1-4.3-1.1L4 20l1.1-3.5a8.7 8.7 0 0 1-1.3-4.6c0-4.8 3.9-8.8 8.8-8.8s8.8 3.9 8.8 8.7Z" />
    <path fill="currentColor" stroke="none" d="M9.8 9c-.2-.4-.4-.4-.6-.4H8.8c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.8 2.3.9 2.4.1.2 1.6 2.5 3.9 3.4.5.2.9.3 1.3.4.6.1 1.1.1 1.5 0 .5-.1 1.5-.6 1.6-1.2.1-.6.1-1 .1-1.1 0-.1-.1-.3-.3-.3h-.7c-.2 0-.4.1-.5.2-.2.2-.6.6-.7.6-.1.1-.3.1-.4 0-.2-.1-.9-.3-1.7-1-.6-.5-1.1-1.2-1.2-1.3-.1-.1 0-.3.1-.4.2-.2.3-.4.4-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3a3 3 0 0 0 .2-.5c0-.1 0-.2-.1-.3 0-.1-.3-.8-.7-1.6Z" />
  </svg>
);

const GithubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.2-4.5-1.1-4.5-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.4.8 1.1.8 2.1v3.1c0 .3.2.6.7.5A11.2 11.2 0 0 0 12 .8Z" />
  </svg>
);

const LinkedinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path fill="currentColor" stroke="none" d="M4.8 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.3 9.1h3v11.4h-3V9.1Zm6 0h2.9v1.6c.4-.8 1.5-1.9 3.2-1.9 3.4 0 4 2.2 4 5.1v6.6h-3v-5.9c0-1.4 0-3.1-1.9-3.1-1.9 0-2.1 1.5-2.1 3v6h-3V9.1Z" />
  </svg>
);

const CONTACTS = [
  {
    label: "Email",
    display: "Giftk.rantho@gmail",
    href: "mailto:Giftk.rantho@gmail",
    icon: MailIcon,
    external: false
  },
  {
    label: "WhatsApp",
    display: "+27 64 921 1745",
    href: "https://wa.me/27649211745",
    icon: WhatsAppIcon,
    external: true
  },
  {
    label: "GitHub",
    display: "github.com/DrMcGi",
    href: "https://github.com/DrMcGi",
    icon: GithubIcon,
    external: true
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/gift-rantho",
    href: "https://www.linkedin.com/in/gift-rantho",
    icon: LinkedinIcon,
    external: true
  }
] as const;

export default function Footer() {
  return (
    <footer className="footer-shell">
      <BackgroundManager variant="footer" />
      <div className="footer-glow" aria-hidden />
      <div className="footer-inner">
        <section className="space-y-3">
          <p className="overline">Private client wing</p>
          <p className="text-white/70 text-sm leading-relaxed">
            DrMcGi&apos;s SaaS Co. crafts couture digital ecosystems for leaders who demand cinematic polish and measurable
            outcomes.
          </p>
          <Link href="#contact" className="btn-gold text-xs w-max">Request blueprint</Link>
        </section>

        <section className="space-y-3">
          <h3 className="footer-title">Press</h3>
          <ul className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
            {PRESS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="footer-title">Alliances</h3>
          <ul className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
            {PARTNERS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="footer-title">Direct line</h3>
          <div className="contact-links">
            {CONTACTS.map(({ label, display, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                className="contact-link"
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
              >
                <Icon className="contact-link-icon" aria-hidden />
                <span className="contact-link-text">
                  <span className="contact-link-label">{label}</span>
                  <span className="contact-link-value">{display}</span>
                </span>
              </a>
            ))}
          </div>
          <Link href="#concierge" className="btn-ghost text-xs w-max">Open concierge</Link>
        </section>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} DrMcGi&apos;s SaaS Co. Luxury software assured.</div>
    </footer>
  );
}
