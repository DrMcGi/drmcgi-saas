// src/components/CaseStudies.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type Study = {
  title: string;
  copy: string;
  stack: string;
  stats: string[];
  img: string;
  href: string;
  siteLabel: string;
  steps: string[];
};

const CASES: Study[] = [
  {
    title: "LEM Projects",
    copy: "Strategic project storytelling and portfolio visibility designed to present the LEM group’s operating footprint with clarity, authority, and brand confidence.",
    stack: "Next.js • Brand systems • Portfolio experience",
    stats: ["Live site", "Executive polish", "Strategic narrative"],
    img: "/lem-projects-logo.png",
    href: "https://lemprojects.co.za",
    siteLabel: "Visit LEM Projects",
    steps: ["Problem: Group business story needed a cleaner strategic presentation","Solution: Premium portfolio experience with strong corporate identity","Impact: Cohesive, credible showcase for the broader LEM network"]
  },
  {
    title: "PCM Management Tool",
    copy: "Operational management dashboard for machine tracking, progress status, schedule visibility, and site-level decision support in a mining environment.",
    stack: "Next.js • Excel data flow • Admin controls",
    stats: ["Live app", "Operational clarity", "Site reporting"],
    img: "/pcm-logo.png",
    href: "https://pcm-management-tool.vercel.app",
    siteLabel: "Open PCM app",
    steps: ["Problem: Spreadsheet-heavy reporting and slow updates","Solution: Live operational dashboard with secure admin workflows","Impact: Cleaner oversight and faster decisions on the ground"]
  },
  {
    title: "Cheese by DrMcGi",
    copy: "Premium commerce and brand experience currently being shaped as a polished digital product, with design-led refinement and an active roadmap toward launch.",
    stack: "Next.js • Supabase • Design system",
    stats: ["In progress", "Brand-led", "Product iteration"],
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    href: "#contact",
    siteLabel: "In progress",
    steps: ["Problem: A premium commerce concept needed stronger product positioning","Solution: Luxury commerce concepts shaped around brand and UX refinement","Impact: A scalable foundation for the next launch phase"]
  }
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-6xl px-6 py-24 relative overflow-hidden">
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
                className={`case-media ${study.title === "LEM Projects" || study.title === "PCM Management Tool" ? "case-media-logo" : ""}`}
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                quality={85}
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

              <div className="flex flex-wrap gap-3">
                <a
                  href={study.href}
                  target={study.href.startsWith("http") ? "_blank" : undefined}
                  rel={study.href.startsWith("http") ? "noreferrer" : undefined}
                  className="btn-ghost text-[10px]"
                >
                  {study.siteLabel}
                </a>
                <button
                  className="btn-ghost text-[10px]"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-storyboard", {
                        detail: {
                          title: `${study.title} — walkthrough`,
                          steps: study.steps
                        }
                      })
                    );
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
