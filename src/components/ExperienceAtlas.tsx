"use client";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";

const PHASES = [
  {
    title: "Discover",
    subtitle: "Understand your business",
    copy:
      "We meet with you to learn your business, your customers, and your goals, so the project is built the right way from day one.",
    stat: "1-2 weeks"
  },
  {
    title: "Plan",
    subtitle: "Clear project roadmap",
    copy:
      "We map what will be built, in what order, and what success looks like in simple terms everyone can follow.",
    stat: "Written plan"
  },
  {
    title: "Build",
    subtitle: "Design and code",
    copy:
      "Design, development, and testing run together. You get early previews and can give feedback before launch.",
    stat: "Sprint cycles"
  },
  {
    title: "Launch",
    subtitle: "Go live with confidence",
    copy:
      "We prepare your site/app for real users, check everything works, and then launch with support on standby.",
    stat: "Launch support"
  },
  {
    title: "Grow",
    subtitle: "Improve and expand",
    copy:
      "After launch we check performance, add improvements, and help you find new ways to get more leads and sales.",
    stat: "Ongoing"
  }
];

export default function ExperienceAtlas() {
  return (
    <section id="atlas" className="mx-auto max-w-6xl px-6 py-24">
      <div className="section-frame space-y-10 relative overflow-hidden">
        <BackgroundManager variant="atlas" />
        <div className="space-y-3 text-center">
          <p className="overline">Experience atlas</p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="vision-title"
          >
            Simple steps from first idea to a live website or product.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="vision-body mx-auto"
          >
            No jargon. Every stage is explained, with clear progress updates, so you always know what’s next.
          </motion.p>
        </div>

        <div className="grid gap-6">
          {PHASES.map((phase, index) => (
            <motion.article
              key={phase.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.85, delay: index * 0.05 }}
              className="package-card"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="package-badge">Phase {index + 1}</span>
                  <h3 className="mt-4 text-2xl">{phase.title}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.45em] text-white/50">{phase.subtitle}</p>
                </div>
                <div className="text-right text-xs uppercase tracking-[0.45em] text-white/60">{phase.stat}</div>
              </div>
              <p className="mt-5 text-base text-white/70">{phase.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
