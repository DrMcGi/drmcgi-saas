"use client";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  align = "left",
  className = ""
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`w-full ${alignClass} ${className}`}>
      <motion.h3
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-2xl breath"
      >
        {title}
      </motion.h3>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`text-white/70 mt-3 max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "6rem", opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`section-divider mt-4 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}
