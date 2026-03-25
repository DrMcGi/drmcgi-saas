// src/components/Configurator.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useSpring, useMotionValueEvent } from "framer-motion";
import type { Options as ConfettiOptions } from "canvas-confetti";
import { useApp } from "@/lib/store";

type Feature = {
  id: string;
  name: string;
  price: number;
  category: "website" | "saas" | "custom";
  desc: string;
};

const FEATURES: Feature[] = [
  { id: "responsive", name: "Responsive Design", price: 8000, category: "website", desc: "Your website looks great on phones, tablets, and computers." },
  { id: "seo", name: "SEO Optimization", price: 6000, category: "website", desc: "Make your website easy to find on Google and other search engines." },
  { id: "cms", name: "CMS Integration", price: 12000, category: "website", desc: "Easy way to add and edit content on your website without coding." },
  { id: "luxuryUI", name: "Luxury UI/UX System", price: 15000, category: "website", desc: "Beautiful design that looks professional and modern." },
  { id: "ecommerce", name: "E‑commerce Setup", price: 20000, category: "website", desc: "Sell products online with a shopping cart and payment system." },
  { id: "analytics", name: "Analytics & Tracking", price: 5000, category: "website", desc: "Track how many people visit your site and what they do." },
  { id: "mvp", name: "MVP Core", price: 35000, category: "saas", desc: "Basic app with login, dashboard, and data management." },
  { id: "api", name: "Scalable API Architecture", price: 25000, category: "saas", desc: "Connect your app to other systems securely." },
  { id: "cicd", name: "CI/CD Pipelines", price: 10000, category: "saas", desc: "Automatic updates and testing for your app." },
  { id: "observability", name:"Observability & Monitoring", price: 12000, category: "saas", desc: "Monitor your app's performance and get alerts if something goes wrong." },
  { id: "multitenant", name: "Multi‑Tenant Support", price: 18000, category: "saas", desc: "Support multiple users or teams with different access levels." },
  { id: "payments", name: "Payment & Subscription Systems", price: 15000, category: "saas", desc: "Handle payments and subscriptions easily." },
  { id: "ai", name: "AI Concierge", price: 22000, category: "custom", desc: "Smart chatbot to help your customers." },
  { id: "integrations", name: "Integrations Suite", price: 24000, category: "custom", desc: "Connect to WhatsApp, customer management, and business tools." },
  { id: "ops", name: "Automation & DevOps", price: 26000, category: "custom", desc: "Automate tasks and keep your systems running smoothly." },
  { id: "security", name: "Security Layer", price: 20000, category: "custom", desc: "Keep your app safe with strong security." },
  { id: "workflows", name: "Enterprise Workflows", price: 18000, category: "custom", desc: "Advanced processes for big businesses." },
  { id: "offline", name: "Offline‑First / Mobile Sync", price: 16000, category: "custom", desc: "Works offline and syncs data on mobile." },
  { id: "dashboards", name: "Custom Dashboards", price: 14000, category: "custom", desc: "Custom reports showing your business metrics." }
];

const fmt = new Intl.NumberFormat("en-US");

type ConfettiFn = (options?: ConfettiOptions) => Promise<undefined> | null;

let confettiInstance: ConfettiFn | null = null;

async function fireConfetti(options: ConfettiOptions) {
  if (!confettiInstance) {
    const confettiModule = await import("canvas-confetti");
    confettiInstance = confettiModule.default;
  }

  confettiInstance?.(options);
}

function AnimatedAmount({ value, suffix = " ZAR", className }: { value: number; suffix?: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const spring = useSpring(value, { stiffness: 190, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => setDisplay(value));
      return () => window.cancelAnimationFrame(frame);
    }

    spring.set(value);
    return undefined;
  }, [reduceMotion, spring, value]);

  useMotionValueEvent(spring, "change", (latest) => {
    if (reduceMotion) return;
    const nextValue = Math.round(latest);
    setDisplay((prev) => (prev === nextValue ? prev : nextValue));
  });

  return (
    <span className={className} aria-live="polite">
      {fmt.format(reduceMotion ? value : display)}
      {suffix ?? ""}
    </span>
  );
}

export default function Configurator() {
  const { selected, toggle } = useApp();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    if (prefersReducedMotion) return;
    if (milestone === "Luxury" || milestone === "Legacy") {
      fireConfetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [milestone, prefersReducedMotion]);

  return (
    <section id="configurator" className="relative mx-auto max-w-6xl px-6 py-24">

      <div className="grid gap-10 relative">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.3 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.6 }}
          className="space-y-3"
        >
          <p className="overline">Configurable couture</p>
          <h2 className="text-3xl md:text-4xl">Compose your build with modules tuned for legacy impact.</h2>
          <p className="text-white/70 max-w-2xl">
            Pick features in plain language and see live costs at every step. This is a business-first builder for local
            organisations, with optional concierge support if you want a premium hand-holding path.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <motion.div
            initial={false}
            className="section-frame bg-transparent"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="moduleList">
              {FEATURES.map((f) => {
                const active = selected.has(f.id);
                return (
                  <motion.button
                    key={f.id}
                    initial={false}
                    onClick={() => toggle(f.id)}
                    className={`text-left package-card ${active ? "is-active" : ""}`}
                    whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
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
            initial={false}
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
