"use client";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

export default function Packages() {
  const { applyPackage, activePackage } = useApp();

  const cards = [
    { id: "pkg-web", title: "🌐 Website build", copy: "Luxury websites with cinematic polish, locked tokens, and SEO foundation.", feats: ["responsive","seo","cms","luxuryUI","ecommerce","analytics"] },
    { id: "pkg-saas", title: "⚡ SaaS / web app", copy: "From MVP to enterprise — bulletproof architecture, automation, and scale.", feats: ["mvp","api","cicd","observability","multitenant","payments"] },
    { id: "pkg-custom", title: "🛠️ Custom applications", copy: "Tailored builds with integrations, AI concierge, and enterprise workflows.", feats: ["ai","integrations","ops","security","workflows","offline","dashboards"] },
  ];

  return (
    <section id="packages" className="mx-auto max-w-6xl px-6 py-16 fade-up">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h3 className="text-2xl">Tailored packages</h3>
        <p className="text-white/70 mt-2">Select a package to auto‑configure features; refine anytime in the configurator.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              onClick={() => applyPackage(c.feats, c.id)}
              className={`p-6 rounded-xl border bg-gray-800/40 hover:bg-gray-800/60 transition cursor-pointer ${
                activePackage === c.id ? "package-active border-(--gold) shadow-(--edge)" : "border-white/10"
              }`}
            >
              <h4 className="text-lg">{c.title}</h4>
              <p className="text-white/70 mt-2">{c.copy}</p>
              <button className="mt-4 text-xs text-white/60 hover:text-white">Storyboard ▶</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}