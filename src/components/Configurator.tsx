"use client";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

type Feature = {
  id: string;
  name: string;
  price: number;
  category: "website" | "saas" | "custom";
  desc: string;
};

const FEATURES: Feature[] = [
  { id: "responsive",  name: "Responsive Design",                        price: 8000,  category: "website", desc: "Mobile‑first, pixel‑perfect layouts." },
  { id: "seo",         name: "SEO Optimization",                         price: 6000,  category: "website", desc: "Metadata, schema, performance tuning." },
  { id: "cms",         name: "CMS Integration",                          price: 12000, category: "website", desc: "Headless CMS or custom admin." },
  { id: "luxuryUI",    name: "Luxury UI/UX System",                      price: 15000, category: "website", desc: "Design tokens, motion, editorial spacing." },
  { id: "ecommerce",   name: "E‑commerce Setup",                         price: 20000, category: "website", desc: "Catalog, cart, checkout, payments." },
  { id: "analytics",   name: "Analytics & Tracking",                     price: 5000,  category: "website", desc: "GA4, events, funnels." },
  { id: "mvp",         name: "MVP Core",                                 price: 35000, category: "saas",    desc: "Auth, dashboard, CRUD flows." },
  { id: "api",         name: "Scalable API Architecture",                price: 25000, category: "saas",    desc: "Node/Nest services." },
  { id: "cicd",        name: "CI/CD Pipelines",                          price: 10000, category: "saas",    desc: "Automation, deployments." },
  { id: "observability", name:"Observability & Monitoring",              price: 12000, category: "saas",    desc: "Logs, metrics, alerts." },
  { id: "multitenant", name: "Multi‑Tenant Support",                     price: 18000, category: "saas",    desc: "Orgs, roles, permissions." },
  { id: "payments",    name: "Payment & Subscription Systems",           price: 15000, category: "saas",    desc: "Stripe/PayPal." },
  { id: "ai",          name: "AI Concierge",                             price: 22000, category: "custom",  desc: "Branded assistant, support." },
  { id: "integrations",name: "Integrations Suite",                       price: 24000, category: "custom",  desc: "WhatsApp, CRM, ERP." },
  { id: "ops",         name: "Automation & DevOps",                      price: 26000, category: "custom",  desc: "Pipelines, monitoring." },
  { id: "security",    name: "Security Layer",                           price: 20000, category: "custom",  desc: "Auth hardening, secrets." },
  { id: "workflows",   name: "Enterprise Workflows",                     price: 18000, category: "custom",  desc: "Approvals, reporting." },
  { id: "offline",     name: "Offline‑First / Mobile Sync",              price: 16000, category: "custom",  desc: "PWA/RN sync." },
  { id: "dashboards",  name: "Custom Dashboards",                        price: 14000, category: "custom",  desc: "Tailored KPIs." }
];

const fmt = new Intl.NumberFormat("en-US");

export default function Configurator() {
  const { selected, toggle } = useApp();

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
    const premium = Math.round(((selected.has("luxuryUI") && selected.has("ai")) ? 0.08 : 0.05) * base);
    return { base, premium, total: base + premium };
  }, [selected]);

  const percent = Math.round((selected.size / FEATURES.length) * 100);
  const milestone = selected.size >= 12 ? "Legacy" : selected.size >= 8 ? "Luxury" : selected.size >= 4 ? "Scale" : "Foundation";

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 fade-up">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 p-6 rounded-xl border border-white/10 bg-gray-800/40">
          <h3 className="text-xl">Custom build configurator</h3>
          <p className="text-white/80 mt-2">Select features. See impact. Request a blueprint.</p>

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

        <div className="p-6 rounded-xl border border-white/10 bg-gray-800/40">
          <h4 className="text-lg">Estimated investment</h4>
          <div className="mt-4">
            <div
              className="text-3xl bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, var(--gold) 0%, var(--gold-soft) 100%)" }}
            >
              {fmt.format(totals.total)} ZAR
            </div>

            <button
              className="mt-2 text-xs text-white/60 hover:text-white transition"
              onClick={() => {
                const b = document.getElementById("breakdown");
                if (b) b.classList.toggle("hidden");
              }}
            >
              View breakdown ▼
            </button>

            <div id="breakdown" className="hidden mt-4 text-sm text-white/80 space-y-2">
              {[...selected].map((id) => {
                const f = FEATURES.find((x) => x.id === id)!;
                return (
                  <div key={id} className="grid grid-cols-[1fr_auto] gap-3">
                    <div>• {f.name}</div>
                    <div className="text-white/60">{fmt.format(f.price)} ZAR</div>
                  </div>
                );
              })}
              <div className="border-t border-white/10 mt-2" />
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div>Subtotal</div>
                <div className="text-white/60">{fmt.format(totals.base)} ZAR</div>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <div>Premium</div>
                <div className="text-white/60">{fmt.format(totals.premium)} ZAR</div>
              </div>
              <div className="border-t border-white/10" />
              <div className="grid grid-cols-[1fr_auto] gap-3 font-medium">
                <div>Total</div>
                <div className="text-white">{fmt.format(totals.total)} ZAR</div>
              </div>
            </div>

            <p className="text-white/60 mt-3 text-xs">Tip: Packages auto‑add features; fine‑tune everything here.</p>
            <a
              href="#contact"
              className="mt-6 inline-block px-4 py-2 rounded-md bg-white text-gray-900 text-sm hover:opacity-90 transition"
            >
              Request a blueprint
            </a>

            <div className="mt-6 space-y-2">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden" title="Blueprint completion">
                <div className="h-2 bg-linear-to-r from-yellow-300 to-yellow-100" style={{ width: `${percent}%` }} />
              </div>
              <div className="text-white/60 text-xs">{percent}%</div>
              <div className="text-white/80 text-xs">{milestone}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
