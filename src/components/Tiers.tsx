"use client";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const fmt = new Intl.NumberFormat("en-US");

// Define a proper type for tiers
type Tier = {
  id: string;
  name: string;
  from: string;
  barClass: string;
  mods: string[];
  badge?: string;
};

export default function Tiers() {
  const { applyTier, activeTier } = useApp();

  const tiers: Tier[] = [
    {
      id: "tier-signature",
      name: "Signature",
      from: fmt.format(55000),
      barClass: "gradient-gold",
      mods: ["mvp", "luxuryUI"],
    },
    {
      id: "tier-concierge",
      name: "Concierge",
      from: fmt.format(95000),
      barClass: "gradient-neon",
      badge: "Most popular",
      mods: ["mvp", "luxuryUI", "ai", "integrations", "ops"],
    },
    {
      id: "tier-enterprise",
      name: "Enterprise",
      from: fmt.format(145000),
      barClass: "bg-white/60",
      mods: ["mvp", "luxuryUI", "ai", "integrations", "ops", "security", "multitenant"],
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-16 fade-up">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl">Pricing tiers</h3>
        <p className="text-white/80 mt-4 max-w-3xl">
          Choose a tier to auto‑select recommended features; refine with packages.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onClick={() => applyTier(t.mods, t.id)}
              className={`relative p-6 rounded-xl border bg-gray-800/40 hover:bg-gray-800/60 transition cursor-pointer ${
                activeTier === t.id ? "tier-active border-(--gold) shadow-(--edge)" : "border-white/10"
              }`}
            >
              {t.badge && (
                <div className="absolute -top-3 left-6 text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/20">
                  {t.badge}
                </div>
              )}
              <div className={`h-1 w-24 ${t.barClass}`} />
              <h4 className="text-lg mt-4">{t.name}</h4>
              <div className="text-white/70 text-sm">From {t.from} ZAR</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#contact"
            className="px-5 py-3 rounded-md bg-white text-gray-900 text-sm hover:opacity-90 transition"
          >
            Request a blueprint
          </a>
        </div>
      </motion.div>
    </section>
  );
}