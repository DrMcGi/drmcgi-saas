"use client";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";

const PILLARS = [
  {
    title: "Bulletproof delivery",
    copy: "Dedicated technical lead, dual QA layers, and observability dashboards available to your exec team in real time."
  },
  {
    title: "Confidentiality assured",
    copy: "NDA-first engagement, secure communications, and compartmentalised environments for sensitive IP."
  },
  {
    title: "Momentum guardians",
    copy: "Quarterly growth councils, optimisation sprints, and proactive roadmap surfacing so value compounds." 
  }
];

export default function GuaranteeSuite() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="guarantee-band relative overflow-hidden"
      >
        <BackgroundManager variant="guarantee" />
        <p className="overline">The assurance suite</p>
        <h2 className="vision-title text-3xl sm:text-4xl">What every private client receives.</h2>
        <div className="guarantee-grid">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="guarantee-item">
              <h3 className="text-sm uppercase tracking-[0.35em] text-white/70">{pillar.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
