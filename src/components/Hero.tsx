"use client";
import jsPDF from "jspdf";
import { useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";
import MotionBackgrounds from "@/components/MotionBackgrounds";
import ShimmerText from "@/components/ShimmerText";
import GoldDivider from "@/components/GoldDivider";

export default function Hero() {
  useEffect(() => {
    const holo = document.getElementById("heroHolo");
    const move = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 10;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 10;
      if (holo) holo.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <BackgroundManager variant="hero" />
      <MotionBackgrounds />
      <div id="heroHolo" className="hero-holo" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-5xl px-6 py-24 relative"
      >
        <div className="glass-glow px-8 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl leading-tight breath"
          >
            Luxury software.<br />
            <ShimmerText>Real business impact.</ShimmerText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-white/80 text-lg"
          >
            We don’t ship features. We orchestrate experiences that feel inevitable—from MVP to enterprise scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <a href="#pricing" className="px-5 py-3 rounded-md bg-white text-gray-900 text-sm font-medium hover:opacity-90 transition">
              Explore tiers
            </a>
            <a href="#contact" className="px-5 py-3 rounded-md border border-white/20 text-white text-sm hover:border-white/40 transition">
              Request a blueprint
            </a>
            <button
              onClick={() => {
                const doc = new jsPDF();
                doc.text("Blueprint Summary", 15, 15);
                doc.save("blueprint.pdf");
              }}
              className="px-5 py-3 rounded-md border border-white/20 text-white text-sm hover:border-white/40 transition"
              title="Export PDF"
            >
              🧾
            </button>
          </motion.div>
        </div>
        <GoldDivider />
      </motion.div>
    </section>
  );
}
