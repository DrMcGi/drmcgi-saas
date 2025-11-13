"use client";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";
import { useApp } from "@/lib/store";

const fmt = new Intl.NumberFormat("en-US");

type Tier = {
  id: string;
  name: string;
  from: string;
  mods: string[];
  badge?: string;
  promise: string;
};

const TIERS: Tier[] = [
  {
    id: "tier-signature",
    name: "Signature",
    from: fmt.format(65000),
    mods: ["mvp", "luxuryUI"],
    promise: "Perfect for market-making launches with prestige aesthetics."
  },
  {
    id: "tier-concierge",
    name: "Concierge",
    from: fmt.format(110000),
    mods: ["mvp", "luxuryUI", "ai", "integrations", "ops"],
    badge: "Most requested",
    promise: "Full-service partnership with AI concierge and automation built in."
  },
  {
    id: "tier-enterprise",
    name: "Enterprise",
    from: fmt.format(165000),
    mods: ["mvp", "luxuryUI", "ai", "integrations", "ops", "security", "multitenant"],
    promise: "Global scale architecture with governance, security, and expansion support."
  }
];

export default function Tiers() {
  const { applyTier, activeTier } = useApp();

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="section-frame space-y-8 relative overflow-hidden">
        <BackgroundManager variant="tiers" />
        <div className="space-y-3">
          <p className="overline">Investment tiers</p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85 }}
            className="text-3xl md:text-4xl"
          >
            Select a tier to pre-load the configurator with our recommended modules.
          </motion.h2>
        </div>

        <div className="tier-grid">
          {TIERS.map((tier, index) => (
            <motion.article
              key={tier.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              onClick={() => applyTier(tier.mods, tier.id)}
              className={`tier-card ${activeTier === tier.id ? "is-active" : ""}`}
            >
              {tier.badge && <span className="tier-badge">{tier.badge}</span>}
              <div className="tier-bar" aria-hidden />
              <h3 className="mt-6 text-2xl">{tier.name}</h3>
              <p className="tier-price">From {tier.from} ZAR</p>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">{tier.promise}</p>
              <button className="mt-6 btn-ghost text-xs" type="button">Apply tier</button>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <a href="#contact" className="btn-gold">Request full blueprint</a>
        </div>
      </div>
    </section>
  );
}
