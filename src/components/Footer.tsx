"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="logo-text">DrMcGi’s SaaS Co.</div>
            <div className="mt-3 flex flex-col gap-2">
              <a href="mailto:giftk.rantho@gmail" className="flex items-center gap-2 hover:text-(--gold)">✉️ giftk.rantho@gmail</a>
              <a href="https://wa.me/27649211745" target="_blank" className="flex items-center gap-2 hover:text-(--gold)">📱 +27 64 921 1745</a>
              <a href="https://github.com/DrMcGi" target="_blank" className="flex items-center gap-2 hover:text-(--gold)">💻 github.com/DrMcGi</a>
              <a href="https://www.linkedin.com/in/gift-rantho" target="_blank" className="flex items-center gap-2 hover:text-(--gold)">🔗 linkedin.com/in/gift-rantho</a>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-white">Quick links</div>
            <div className="flex gap-4">
              <a href="#pricing" className="hover:text-white">Pricing</a>
              <a href="#packages" className="hover:text-white">Packages</a>
              <a href="#case-studies" className="hover:text-white">Case studies</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs">© {new Date().getFullYear()} DrMcGi’s SaaS Co. All rights reserved.</div>
      </motion.div>
    </footer>
  );
}