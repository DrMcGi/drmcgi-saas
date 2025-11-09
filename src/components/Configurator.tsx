"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useApp } from "@/lib/store";
import BackgroundManager from "@/components/BackgroundManager";
import GoldDivider from "@/components/GoldDivider";
import SectionHeader from "@/components/SectionHeader";

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

export default function Configurator() {
  const { selected, toggle } = useApp();
  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const totals = useMemo(() => {
    const base = FEATURES.reduce((sum, f) => sum + (selected.has(f.id) ? f.price : 0), 0);
    const premiumRate = (selected.has("luxuryUI") && selected.has("ai")) ? 0.08 : 0.05;
    const premium = Math.round(premiumRate * base);
    return { base, premium, total: base + premium, premiumRate };
  }, [selected]);

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
    <section id="pricing" className="relative mx-auto max-w-6xl px-6 py-16 fade-up">
      <BackgroundManager variant="marble" />

      <SectionHeader
        title="Custom build configurator"
        subtitle="Select features, see the investment, and request your blueprint."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative"
      >
        {/* Feature selection */}
        <div className="md:col-span-2 p-6 rounded-xl border border-white/10 bg-gray-800/40">
          <h4 className="text-lg">Select features</h4>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" id="moduleList">
            {FEATURES.map((f, i) => {
              const active = selected.has(f.id);
              return (
                <motion.button
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => toggle(f.id)}
                  className={`text-left p-4 rounded-lg border transition ${
                    active
                      ? "border-(--gold) bg-gray-800 shadow-(--edge)"
                      : "border-white/10 bg-gray-800/30 hover:border-white/20 hover:bg-gray-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{f.name}</span>
                    <span className="text-white/60 text-sm">{fmt.format(f.price)} ZAR</span>
                  </div>
                  <p className="text-white/70 text-sm mt-2">{f.desc}</p>
                  <div className="mt-2 text-xs text-white/50">Category: {f.category}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Investment panel with breakdown toggle */}
        <div className="p-6 rounded-xl border border-white/10 bg-gray-800/40">
          <h4 className="text-lg">Estimated investment</h4>

          {/* Total with glow pulse */}
          <div
            className="mt-3 text-3xl bg-clip-text text-transparent animate-[glowPulse_3s_ease_in_out_infinite]"
            style={{ backgroundImage: "linear-gradient(90deg, var(--gold) 0%, var(--gold-soft) 100%)" }}
          >
            {fmt.format(totals.total)} ZAR
          </div>

          {/* Breakdown toggle */}
          <button
            className="mt-3 text-xs text-white/70 hover:text-white underline underline-offset-4"
            onClick={() => setShowBreakdown((s) => !s)}
            aria-expanded={showBreakdown}
          >
            {showBreakdown ? "Hide breakdown" : "View breakdown"}
          </button>

          {showBreakdown && (
            <div className="mt-3 space-y-3">
              <div className="flex justify-between text-sm text-white/70">
                <span>Base features</span>
                <span>{fmt.format(totals.base)} ZAR</span>
              </div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Premium uplift {Math.round(totals.premiumRate * 100)}%</span>
                <span>{fmt.format(totals.premium)} ZAR</span>
              </div>
              <div className="border-t border-white/10 my-2"></div>
              <div className="flex justify-between text-sm text-white/90">
                <span>Total</span>
                <span>{fmt.format(totals.total)} ZAR</span>
              </div>
            </div>
          )}

          {/* Progress + milestone */}
          <div className="mt-6 space-y-2">
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden" title="Blueprint completion">
              <div className="h-2 bg-linear-to-r from-yellow-300 to-yellow-100" style={{ width: `${percent}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">{percent}% complete</span>
              <span className="text-white/80">{milestone}</span>
            </div>
          </div>

          {/* Keep CTAs minimal: single premium CTA only in Hero */}
        </div>
      </motion.div>

      <GoldDivider />
    </section>
  );
}
