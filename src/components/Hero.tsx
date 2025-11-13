"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";
import MotionBackgrounds from "@/components/MotionBackgrounds";
import ShimmerText from "@/components/ShimmerText";
import GoldDivider from "@/components/GoldDivider";

const TICKER = [
  "92% client retention",
  "Continental launches across 3 regions",
  "Average ROI x6 within 9 months"
];

export default function Hero() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".hero-shell");
    const listener = (event: MouseEvent) => {
      if (!shell) return;
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      shell.style.setProperty("--pointer-x", `${x}%`);
      shell.style.setProperty("--pointer-y", `${y}%`);
    };
    window.addEventListener("mousemove", listener);
    return () => window.removeEventListener("mousemove", listener);
  }, []);

  return (
    <section id="home" className="hero-shell">
      <BackgroundManager variant="hero" />
      <MotionBackgrounds />
      <div className="hero-caustics" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="hero-content"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="hero-kicker"
        >
          Luxury SaaS atelier for iconic brands
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="hero-title"
        >
          <span className="block">Luxury software.</span>
          <span className="block">
            <ShimmerText>Real business impact.</ShimmerText>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="hero-subtitle"
        >
          We don&apos;t ship features. We orchestrate experiences that feel inevitable—from MVP to enterprise scale.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hero-subtitle text-sm text-white/60"
        >
          Software couture for leaders who refuse the ordinary. Every interaction, handcrafted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="hero-actions"
        >
          <a href="#pricing" className="btn-gold">Explore tiers</a>
          <a href="#contact" className="btn-ghost">Request a blueprint</a>
          <a href="#concierge" className="btn-ghost">Open concierge</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 flex justify-center"
        >
          <GoldDivider />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="hero-ticker"
        >
          {TICKER.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
