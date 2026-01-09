"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelTimer: (() => void) | undefined;

    const startFade = () => {
      cancelTimer?.();
      const timeout = window.setTimeout(() => setVisible(false), 900);
      cancelTimer = () => window.clearTimeout(timeout);
    };

    if (document.readyState === "complete") {
      startFade();
    } else {
      window.addEventListener("load", startFade, { once: true });
    }

    return () => {
      window.removeEventListener("load", startFade);
      cancelTimer?.();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader-shell"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1, pointerEvents: "auto" }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="preloader-core"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: [0.92, 1, 0.96, 1], opacity: 1 }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="preloader-title">DrMcGi&apos;s SaaS Co.</div>
            <motion.div
              className="preloader-bot"
              aria-hidden
              animate={{ x: ["-32px", "32px", "-32px"], rotate: [0, 6, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="preloader-bot-eye" />
            </motion.div>
            <motion.div
              className="preloader-trail"
              aria-hidden
              animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
