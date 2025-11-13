"use client";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";

const PHASES = [
  {
    title: "Immersion",
    subtitle: "Executive discovery",
    copy:
      "Joint workshops, brand anthropology, and market field notes translate your north star into tangible product angles.",
    stat: "2 weeks"
  },
  {
    title: "Blueprint",
    subtitle: "Narrative architecture",
    copy:
      "Storyboarded journeys, data hierarchy, and motion language. Immersive prototypes validate resonance before code.",
    stat: "Fidelity deck"
  },
  {
    title: "Couture Build",
    subtitle: "Engineering in movements",
    copy:
      "Sprints orchestrated like a production crew. Design systems, scalable APIs, and instrumentation advance together.",
    stat: "Ship cadence"
  },
  {
    title: "Premiere",
    subtitle: "Launch choreography",
    copy:
      "Full instrumentation, QA theatre, rehearsal deployments, and go-live concierge that feels effortless for leadership.",
    stat: "White-glove"
  },
  {
    title: "Legacy",
    subtitle: "Growth councils",
    copy:
      "Quarterly data salons, rapid optimisation, and opportunity scouting to preserve momentum and halo.",
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
            A cinematic delivery arc, from immersion to legacy.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="vision-body mx-auto"
          >
            Together we choreograph a release that feels inevitable—every phase orchestrated with executive clarity,
            proof, and polish.
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
