"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function BackToTop() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const ratio = maxScroll <= 0 ? 0 : scrollTop / maxScroll;
      const nextProgress = clamp(ratio * 100, 0, 100);
      const nextVisible = scrollTop > 160;

      setProgress((prev) => (Math.abs(prev - nextProgress) > 0.5 ? nextProgress : prev));
      setIsVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = window.requestAnimationFrame(updateMetrics);
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div className="backtotop-shell" aria-hidden={false}>
      <motion.button
        type="button"
        className="backtotop-button"
        initial={false}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: "easeOut" as const }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        onClick={handleClick}
        aria-label="Back to top"
      >
        <span className="backtotop-indicator" role="presentation">
          <svg viewBox="0 0 60 60" className="backtotop-ring" aria-hidden="true">
            <circle className="backtotop-track" cx="30" cy="30" r={RADIUS} />
            <circle
              className="backtotop-meter"
              cx="30"
              cy="30"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: prefersReducedMotion ? undefined : "stroke-dashoffset 0.35s ease" }}
            />
          </svg>
          <span className="backtotop-arrow" aria-hidden />
        </span>
      </motion.button>
    </div>
  );
}
