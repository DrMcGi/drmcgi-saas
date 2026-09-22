"use client";
import { motion } from "framer-motion";

export default function SignatureVision() {
  return (
    <section id="vision" className="mx-auto max-w-6xl px-6 py-24">
      <div className="section-frame vision-grid relative overflow-hidden">
        <div className="space-y-4">
          <p className="overline">The DrMcGi Thesis</p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="vision-title"
          >
            Focused delivery. Professional systems. Measured business value.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="vision-body"
        >
          DrMcGi&apos;s approach is rooted in clear focus, reliable delivery, and client-first execution. Every solution is
          shaped to improve operational efficiency, strengthen digital confidence, and support sustainable growth—
          with systems designed to be scalable, modern, and aligned to the realities of the businesses we serve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="vision-columns"
        >
          <div>
            <h3>01. Focus</h3>
            <p>
              We start with a clear understanding of business needs, operational friction, and the outcomes that matter
              most before building the right solution.
            </p>
          </div>
          <div>
            <h3>02. Delivery</h3>
            <p>
              From requirements analysis and design to development, deployment, and support, we deliver end-to-end
              digital systems with structure, clarity, and accountability.
            </p>
          </div>
          <div>
            <h3>03. Values</h3>
            <p>
              Professionalism, technical excellence, client-focused service delivery, and ethical business practices are
              the standards behind every engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
