"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CaseStudies() {
  const cards = [
    {
      title: "☕ Nzuri Café",
      copy: "Cinematic ordering app and responsive menu with real-time pricing and premium UX. Elevated brand presence and streamlined operations.",
      stack: "Vite • Tailwind • Configurator",
      img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
      steps: ["Problem: Manual pricing", "Solution: Responsive menu + realtime updates", "Impact: Faster orders, happier patrons"],
    },
    {
      title: "📈 Trading platform",
      copy: "Secure, scalable trading environment built from scratch. Performance-first, compliance-aware, and designed for clarity and trust.",
      stack: "Node.js • React • NestJS",
      img: "https://images.unsplash.com/photo-1649972904340-9f2a2e264d8d?auto=format&fit=crop&w=1200&q=80",
      steps: ["Problem: Unclear dashboards", "Solution: Clarity-first UI + secure core", "Impact: Confident decisions"],
    },
    {
      title: "⚖️ RKM Attorneys",
      copy: "Luxury‑grade digital presence for a leading law firm. WhatsApp booking, venue photo gallery, shimmering hero, and glowing leadership cards create trust and seamless client engagement.",
      stack: "Next.js • Tailwind • Framer Motion",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      steps: ["Problem: Outdated digital presence", "Solution: Luxury website with WhatsApp booking + gallery", "Impact: Elevated brand trust and seamless engagement"],
    },
  ];

  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 py-20 fade-up">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl text-center">Case studies</h3>
        <p className="text-white/70 mt-3 text-center max-w-2xl mx-auto">
          Flagship projects delivered with luxury-grade DNA, trust, and bulletproof polish.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="overflow-hidden rounded-xl border border-white/10 bg-gray-800/40 hover:bg-gray-800/60 transition"
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
                <button
                  className="mt-4 text-xs text-white/60 hover:text-white"
                  onClick={() => {
                    const portal = document.getElementById("storyModal");
                    const body = document.getElementById("storyBody");
                    const head = document.querySelector("#storyHeader .text-lg");
                    if (portal && body && head) {
                      head.textContent = `${c.title} — walkthrough`;
                      body.innerHTML = c.steps
                        .map(s => `<div class="storyStep"><div class="storyDot"></div><div class="text-sm">${s}</div></div>`)
                        .join("");
                      portal.setAttribute("style", "display:block");
                    }
                  }}
                >
                  Storyboard ▶
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}