// src/components/Configurator.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useApp } from "@/lib/store";
import BackgroundManager from "@/components/BackgroundManager";

type Feature = {
  id: string;
  name: string;
  price: number;
  category: "website" | "saas" | "custom";
  desc: string;
};

const FEATURES: Feature[] = [
  { id: "responsive", name: "Responsive Design", price: 8000, category: "website", desc: "Mobile‑first, pixel‑perfect layouts." },
  { id: "seo", name: "SEO Optimization", price: 6000, category: "website", desc: "Metadata, schema, performance tuning." },
  { id: "cms", name: "CMS Integration", price: 12000, category: "website", desc: "Headless CMS or custom admin." },
  { id: "luxuryUI", name: "Luxury UI/UX System", price: 15000, category: "website", desc: "Design tokens, motion, editorial spacing." },
  { id: "ecommerce", name: "E‑commerce Setup", price: 20000, category: "website", desc: "Catalog, cart, checkout, payments." },
  { id: "analytics", name: "Analytics & Tracking", price: 5000, category: "website", desc: "GA4, events, funnels." },
  { id: "mvp", name: "MVP Core", price: 35000, category: "saas", desc: "Auth, dashboard, CRUD flows." },
  { id: "api", name: "Scalable API Architecture", price: 25000, category: "saas", desc: "Node/Nest services." },
  { id: "cicd", name: "CI/CD Pipelines", price: 10000, category: "saas", desc: "Automation, deployments." },
  { id: "observability", name:"Observability & Monitoring", price: 12000, category: "saas", desc: "Logs, metrics, alerts." },
  { id: "multitenant", name: "Multi‑Tenant Support", price: 18000, category: "saas", desc: "Orgs, roles, permissions." },
  { id: "payments", name: "Payment & Subscription Systems", price: 15000, category: "saas", desc: "Stripe/PayPal." },
  { id: "ai", name: "AI Concierge", price: 22000, category: "custom", desc: "Branded assistant, support." },
  { id: "integrations", name: "Integrations Suite", price: 24000, category: "custom", desc: "WhatsApp, CRM, ERP." },
  { id: "ops", name: "Automation & DevOps", price: 26000, category: "custom", desc: "Pipelines, monitoring." },
  { id: "security", name: "Security Layer", price: 20000, category: "custom", desc: "Auth hardening, secrets." },
  { id: "workflows", name: "Enterprise Workflows", price: 18000, category: "custom", desc: "Approvals, reporting." },
  { id: "offline", name: "Offline‑First / Mobile Sync", price: 16000, category: "custom", desc: "PWA/RN sync." },
  { id: "dashboards", name: "Custom Dashboards", price: 14000, category: "custom", desc: "Tailored KPIs." }
];

const fmt = new Intl.NumberFormat("en-US");

function AnimatedAmount({ value, suffix = " ZAR", className }: { value: number; suffix?: string; className?: string }) {
  const spring = useSpring(value, { stiffness: 120, damping: 22, mass: 0.7 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return () => {
      unsubscribe();
    };
  }, [spring]);

  return (
    <span className={className} aria-live="polite">
      {fmt.format(display)}
      {suffix ?? ""}
    </span>
  );
}

export default function Configurator() {
  const { selected, toggle } = useApp();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totals = useMemo(() => {
    const base = FEATURES.reduce((sum, f) => sum + (selected.has(f.id) ? f.price : 0), 0);
    const premiumRate = (selected.has("luxuryUI") && selected.has("ai")) ? 0.08 : 0.05;
    const premium = Math.round(premiumRate * base);
    return { base, premium, total: base + premium, premiumRate };
  }, [selected]);

  const selectedFeatures = useMemo(() => FEATURES.filter((f) => selected.has(f.id)), [selected]);

  const percent = Math.round((selected.size / FEATURES.length) * 100);
  const milestone =
    selected.size >= 12 ? "Legacy" :
    selected.size >= 8 ? "Luxury" :
    selected.size >= 4 ? "Scale" : "Foundation";

  useEffect(() => {
    if (milestone === "Luxury" || milestone === "Legacy") {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [milestone]);

  return (
    <section id="configurator" className="relative mx-auto max-w-6xl px-6 py-24">
      <BackgroundManager variant="configurator" />

      <div className="grid gap-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="space-y-3"
        >
          <p className="overline">Configurable couture</p>
          <h2 className="text-3xl md:text-4xl">Compose your build with modules tuned for legacy impact.</h2>
          <p className="text-white/70 max-w-2xl">
            Toggle modules to craft a signature blueprint. Pricing updates in real time, including concierge uplift when
            we blend luxury UI and AI experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="section-frame bg-transparent"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="moduleList">
              {FEATURES.map((f, i) => {
                const active = selected.has(f.id);
                return (
                  <motion.button
                    key={f.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => toggle(f.id)}
                    className={`text-left package-card ${active ? "is-active" : ""}`}
                  >
                    <span className="package-badge">{f.category}</span>
                    <h4>{f.name}</h4>
                    <p>{f.desc}</p>
                    <span className="package-luxe">{fmt.format(f.price)} ZAR</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="section-frame bg-transparent flex flex-col gap-6"
          >
            <div>
              <p className="overline">Investment ledger</p>
              <h3 className="text-2xl"><AnimatedAmount value={totals.total} /></h3>
              <button
                className="mt-3 text-xs uppercase tracking-[0.32em] text-white/60 hover:text-white/90"
                onClick={() => setShowBreakdown((s) => !s)}
                aria-expanded={showBreakdown}
                aria-controls="investmentBreakdown"
              >
                {showBreakdown ? "Hide breakdown" : "View breakdown"}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {showBreakdown && (
                <motion.div
                  id="investmentBreakdown"
                  key="ledger-breakdown"
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 12, height: 0 }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                  className="investment-breakdown"
                >
                  <div className="breakdown-row">
                    <span>Base features</span>
                    <AnimatedAmount value={totals.base} className="breakdown-amount" />
                  </div>
                  <div className="breakdown-row">
                    <span>Concierge uplift {Math.round(totals.premiumRate * 100)}%</span>
                    <AnimatedAmount value={totals.premium} className="breakdown-amount" />
                  </div>
                  <div className="breakdown-total">
                    <span>Total</span>
                    <AnimatedAmount value={totals.total} className="breakdown-amount" />
                  </div>
                  <div className="breakdown-features" aria-live="polite">
                    <span className="breakdown-label">Selected modules ({selectedFeatures.length})</span>
                    {selectedFeatures.length > 0 ? (
                      <ul>
                        {selectedFeatures.map((feature) => (
                          <li key={feature.id} className="feature-tag">
                            <span className="feature-tag-dot" aria-hidden />
                            <span>
                              {feature.name}
                              <span className="feature-tag-price"> · {fmt.format(feature.price)} ZAR</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="breakdown-empty">No modules selected yet—toggle a card to start crafting.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <div className="contact-progress" title="Blueprint completion">
                <span style={{ width: `${percent}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-white/60">
                <span>{percent}% sculpted</span>
                <span>{milestone}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(8,12,18,0.7)] p-4 space-y-2 text-xs tracking-[0.28em] uppercase text-white/60">
              <div>• Dedicated technical director</div>
              <div>• Concierge launch rehearsal</div>
              <div>• Post-launch growth council</div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
