"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";

export default function CaseStudies() {
  const cards = [
    {
      title: "☕ Nzuri Café",
      copy: "Cinematic ordering app and responsive menu with real-time pricing and premium UX.",
      stack: "Vite • Tailwind • Configurator",
      img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
      steps: ["Problem: Manual pricing","Solution: Responsive menu + realtime updates","Impact: Faster orders, happier patrons"]
    },
    {
      title: "📈 Trading platform",
      copy: "Secure, scalable trading environment built from scratch. Clarity-first UI and trust.",
      stack: "Node.js • React • NestJS",
      img: "https://images.unsplash.com/photo-1649972904340-9f2a2e264d8d?auto=format&fit=crop&w=1200&q=80",
      steps: ["Problem: Unclear dashboards","Solution: Clarity-first UI + secure core","Impact: Confident decisions"]
    },
    {
      title: "🚖 TaxiLink",
      copy: "Mobility platform connecting riders and drivers with transparent pricing and community trust.",
      stack: "Next.js • Tailwind • Prisma",
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      steps: ["Problem: Informal transport","Solution: Transparent booking + payments","Impact: Safer, trusted mobility"]
    }
  ];

  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 py-20 fade-up">
      <SectionHeader
        title="Case studies"
        subtitle="Flagship projects delivered with luxury-grade DNA, trust, and bulletproof polish."
        align="center"
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="overflow-hidden rounded-xl border border-white/10 bg-gray-800/40 card-glow"
          >
            <div className="h-48 w-full overflow-hidden">
              <Image
                src={c.img}
                alt={c.title}
                width={1200}
                height={800}
                unoptimized
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6">
              <h4 className="text-lg">{c.title}</h4>
              <p className="text-white/70 mt-2 text-sm">{c.copy}</p>
              <div className="mt-4 text-xs text-white/50">Stack: {c.stack}</div>

              <div className="mt-4">
                <button
                  className="btn-neon text-xs"
                  onClick={() => {
                    const portal = document.getElementById("storyModal");
                    const body = document.getElementById("storyBody");
                    const header = document.querySelector("#storyHeader .text-lg");
                    if (portal && body && header) {
                      header.textContent = `${c.title} — walkthrough`;
                      body.innerHTML = c.steps
                        .map(
                          (s) =>
                            `<div class="flex items-start gap-3 mb-2"><div class="w-2 h-2 rounded-full bg-yellow-300 mt-2"></div><div class="text-sm">${s}</div></div>`
                        )
                        .join("");
                      portal.setAttribute("style", "display:block");
                    }
                  }}
                >
                  Storyboard ▶
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
