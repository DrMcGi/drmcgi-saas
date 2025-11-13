// src/components/CaseStudies.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import BackgroundManager from "@/components/BackgroundManager";

type Study = {
  title: string;
  copy: string;
  stack: string;
  stats: string[];
  img: string;
  steps: string[];
};

const CASES: Study[] = [
  {
    title: "Nzuri Café",
    copy: "Cinematic ordering flows and dynamic pricing engine boosted dwell time and average receipt by 38%.",
    stack: "Vite • Tailwind • Supabase",
    stats: ["Orders ↑54%", "Serve time ↓21%", "NPS +31"],
    img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    steps: ["Problem: Manual pricing & long queues","Solution: Motion-led ordering and realtime updates","Impact: Faster orders, delighted clientele"]
  },
  {
    title: "Trident Markets",
    copy: "Institutional-grade trading dashboard with clarity-first data visualisation and compliance-ready audit trails.",
    stack: "Next.js • NestJS • PostgreSQL",
    stats: ["Assets ↑2.1x", "Downtime 0.01%", "Teams onboarded 6"],
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    steps: ["Problem: Fragmented trading tools","Solution: Unified real-time platform","Impact: Confident decision velocity"]
  },
  {
    title: "TaxiLink",
    copy: "Transparent mobility marketplace with trust-driven design, predictive pricing, and multi-city expansion strategy.",
    stack: "Next.js • Prisma • Stripe",
    stats: ["Trips ↑3.4x", "Cities 12", "Driver retention 89%"],
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    steps: ["Problem: Informal transport chaos","Solution: Transparent booking with concierge support","Impact: Safer, trusted mobility network"]
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 py-24 relative overflow-hidden">
      <BackgroundManager variant="cases" />
      <div className="space-y-4 text-center">
        <p className="overline">Flagship work</p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="text-4xl"
        >
          Proof of luxury software in the wild.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-white/70 max-w-2xl mx-auto"
        >
          A sampling of platforms where experience, engineering, and business outcomes move in lockstep.
        </motion.p>
      </div>

      <div className="case-grid mt-12">
        {CASES.map((study, index) => (
          <motion.article
            key={study.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, delay: index * 0.12 }}
            className="case-card"
          >
            <div className="case-image">
              <Image
                src={study.img}
                alt={study.title}
                width={1200}
                height={800}
                unoptimized
                className="case-media"
              />
              <div className="case-overlay">
                {study.stats.map((stat) => (
                  <span key={stat}>{stat}</span>
                ))}
              </div>
            </div>

            <div className="case-body">
              <div>
                <h3 className="text-2xl">{study.title}</h3>
                <p className="mt-3 text-white/70 text-base leading-relaxed">{study.copy}</p>
              </div>

              <div className="case-stack">Stack: {study.stack}</div>

              <div>
                <button
                  className="btn-ghost text-xs"
                  onClick={() => {
                    const portal = document.getElementById("storyModal");
                    const body = document.getElementById("storyBody");
                    const header = document.querySelector("#storyHeader .text-lg");
                    if (portal && body && header) {
                      header.textContent = `${study.title} — walkthrough`;
                      body.innerHTML = study.steps
                        .map(
                          (step) =>
                            `<div class="flex items-start gap-3 mb-2"><div class="w-2 h-2 rounded-full bg-yellow-300 mt-2"></div><div class="text-sm text-white/80">${step}</div></div>`
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
          </motion.article>
        ))}
      </div>
    </section>
  );
}
