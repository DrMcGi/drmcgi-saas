"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fmt = new Intl.NumberFormat("en-US");

export default function Contact() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const range = document.getElementById("budgetRange") as HTMLInputElement | null;
    const label = document.getElementById("budgetLabel");
    if (range && label) {
      const update = () => (label.textContent = `~ ${fmt.format(parseInt(range.value))} ZAR`);
      range.addEventListener("input", update);
      update();
      return () => range.removeEventListener("input", update);
    }
  }, []);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20 fade-up">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-glow p-10 rounded-2xl"
      >
        <h3 className="text-3xl text-center">Request a blueprint</h3>
        <p className="text-white/80 mt-4 text-center max-w-2xl mx-auto">
          Share your vision. We’ll respond with a strategic plan, investment range, and next steps.
        </p>

        {/* Progress */}
        <div className="mt-8">
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-linear-to-r from-yellow-300 to-yellow-100"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <p className="text-xs text-white/60 mt-2 text-center">Step {step} of 4</p>
        </div>

        {/* Form */}
        <form
          id="blueprintForm"
          className="mt-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget).entries());
            const banner = document.getElementById("formSuccess");
            if (banner) {
              banner.textContent = `Thank you ${data.name || ""}, your blueprint request has been received. We’ll be in touch shortly.`;
              banner.classList.remove("hidden");
            }
            const wm = document.getElementById("watermark");
            if (wm && data.name) {
              wm.textContent = `Crafted for ${data.name}`;
              wm.setAttribute(
                "style",
                "position:fixed;right:12px;bottom:90px;z-index:40;font-size:11px;color:rgba(255,255,255,0.35);background:rgba(31,41,55,0.4);border:1px solid rgba(255,255,255,0.1);padding:6px 10px;border-radius:8px;backdrop-filter:blur(8px);display:block;"
              );
            }
            (e.target as HTMLFormElement).reset();
            setStep(1);
          }}
        >
          {/* Step 1 */}
          {step === 1 && (
            <div className="step">
              <label className="text-sm text-white/70">Name</label>
              <input
                name="name"
                className="mt-2 w-full p-3 rounded-md bg-gray-800/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="step">
              <label className="text-sm text-white/70">Email</label>
              <input
                name="email"
                type="email"
                className="mt-2 w-full p-3 rounded-md bg-gray-800/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="step">
              <label className="text-sm text-white/70">Project type</label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Website", "SaaS / Web App", "Custom Application", "Law Firm Site"].map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="project" value={v} required /> {v}
                  </label>
                ))}
              </div>

              <label className="text-sm text-white/70 mt-4 block">Budget range</label>
              <input id="budgetRange" type="range" name="budget" min="50000" max="200000" step="5000" className="w-full accent-yellow-300" />
              <p id="budgetLabel" className="text-xs text-white/60 mt-1">~ 50,000 ZAR</p>

              <label className="text-sm text-white/70 mt-4 block">Timeline</label>
              <div className="flex gap-4 mt-2 text-sm">
                {["Urgent", "1–3 months", "Flexible"].map((v) => (
                  <label key={v} className="flex items-center gap-2">
                    <input type="radio" name="timeline" value={v} required /> {v}
                  </label>
                ))}
              </div>

              <label className="text-sm text-white/70 mt-4 block">Attach file (optional)</label>
              <input type="file" name="attachment" className="mt-2 text-sm text-white/60" />
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="step">
              <label className="text-sm text-white/70">Message</label>
              <textarea
                name="message"
                rows={6}
                className="mt-2 w-full p-3 rounded-md bg-gray-800/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              ></textarea>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={`px-5 py-3 rounded-md border border-white/20 text-white text-sm hover:border-white/40 ${step === 1 ? "hidden" : ""}`}
            >
              ◀ Back
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              className={`px-5 py-3 rounded-md bg-white text-gray-900 text-sm font-medium hover:opacity-90 ${step === 4 ? "hidden" : ""}`}
            >
              Next ▶
            </button>
          </div>

          {/* Submit + WhatsApp */}
          <div className={`mt-8 flex gap-4 justify-center ${step === 4 ? "" : "hidden"}`}>
            <button type="submit" className="px-6 py-3 rounded-md bg-white text-gray-900 font-medium hover:opacity-90">
              Send request
            </button>
            <a
              id="waShortcut"
              href="#"
              className="px-6 py-3 rounded-md bg-[#25D366] text-white font-medium hover:scale-105 transition"
              onClick={(e) => {
                e.preventDefault();
                const form = document.getElementById("blueprintForm") as HTMLFormElement;
                const fd = new FormData(form);
                const payload = Object.fromEntries(fd.entries());
                const msg = encodeURIComponent(
                  `Blueprint via WhatsApp:
Name: ${payload.name || ""}
Email: ${payload.email || ""}
Project: ${payload.project || ""}
Budget: ${
                    payload.budget ? fmt.format(parseInt(payload.budget as string)) + " ZAR" : ""
                  }
Timeline: ${payload.timeline || ""}
Message: ${payload.message || ""}`
                );
                window.open(`https://wa.me/27649211745?text=${msg}`, "_blank");
              }}
            >
              📱 WhatsApp
            </a>
          </div>
        </form>

        <p className="mt-6 text-xs text-white/50 text-center">Secure • Confidential • No spam</p>
        <div id="formSuccess" className="hidden mt-6 p-4 rounded-md bg-white/5 border border-white/10 text-center text-white/80"></div>
      </motion.div>
    </section>
  );
}