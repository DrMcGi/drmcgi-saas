"use client";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";

export default function SignatureVision() {
  return (
    <section id="vision" className="mx-auto max-w-6xl px-6 py-24">
      <div className="section-frame vision-grid relative overflow-hidden">
        <BackgroundManager variant="vision" />
        <div className="space-y-4">
          <p className="overline">The DrMcGi Thesis</p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="vision-title"
          >
            Luxury-grade platforms engineered to feel inevitable.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="vision-body"
        >
          We translate brand mythology into product ecosystems. Every flow, animation, and service touchpoint is
          choreographed to reinforce trust and performance—so your platform carries the gravitas of a legacy house
          with the velocity of a modern venture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="vision-columns"
        >
          <div>
            <h3>01. Narrative First</h3>
            <p>
              Cinematic storyboarding ensures every surface serves your core promise. We align executive storytelling
              with interface choreography.
            </p>
          </div>
          <div>
            <h3>02. Couture Engineering</h3>
            <p>
              Event-driven systems, predictive infrastructure, and observability woven in from day one. Beauty matched
              with bulletproof scale.
            </p>
          </div>
          <div>
            <h3>03. Forever Concierge</h3>
            <p>
              Quarterly growth councils, proactive iteration, and rapid-response support. Launch is simply the
              premiere.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
