"use client";
import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";
import ShimmerText from "@/components/ShimmerText";
import { useApp } from "@/lib/store";
import { createWhatsAppLink, formatBudget } from "@/lib/whatsapp";

const fmt = new Intl.NumberFormat("en-US");

export default function Contact() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(65000);
  const [pending, setPending] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fieldTransition = { type: "spring", stiffness: 260, damping: 24 } as const;
  const fieldHover = { y: -4 } as const;
  const fieldFocus = {
    y: -8,
    boxShadow: "0 28px 80px rgba(125, 249, 255, 0.25)",
    borderColor: "rgba(125, 249, 255, 0.4)",
    backgroundColor: "rgba(12, 18, 28, 0.85)"
  } as const;
  const { selected, activeTier, activePackage } = useApp();
  const selectedModules = useMemo(() => Array.from(selected).sort(), [selected]);

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
      <BackgroundManager variant="contact" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.9 }}
        className="glass-glow p-12 section-frame contact-shell"
      >
        <div className="text-center space-y-4">
          <h3 className="text-3xl md:text-4xl"><ShimmerText>Request a private blueprint</ShimmerText></h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Share your vision. We respond with a cinematic plan, budget ranges, and a curated launch approach within
            48 hours.
          </p>
        </div>

        <div className="mt-10">
          <div className="contact-progress">
            <span style={{ width: `${(step / 4) * 100}%` }} />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/60 mt-3 text-center">Step {step} of 4</p>
        </div>

        <form
          id="blueprintForm"
          className="mt-12 space-y-8"
          onSubmit={async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setPending(true);
            setBannerMessage(null);
            setErrorMessage(null);

            const form = event.currentTarget;
            const formData = new FormData(form);

            try {
              const response = await fetch("/api/contact", {
                method: "POST",
                body: formData
              });

              const result = await response.json().catch(() => ({}));

              if (!response.ok) {
                setErrorMessage(result?.error ?? "We couldn't dispatch your blueprint. Please try again.");
                setPending(false);
                return;
              }

              const name = (formData.get("name") as string | null) ?? "";
              setBannerMessage(name ? `Thank you ${name}. Your concierge blueprint is in motion.` : "Your concierge blueprint is in motion.");
              form.reset();
              setStep(1);
              setBudget(65000);
            } catch {
              setErrorMessage("Network issue prevented the send. Please retry.");
            } finally {
              setPending(false);
            }
          }}
        >
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
            <label>
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {step === 1 && (
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Name</label>
              <motion.input
                name="name"
                className="w-full rounded-2xl border border-white/10 bg-[rgba(8,12,18,0.7)] px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
                whileHover={fieldHover}
                whileFocus={fieldFocus}
                transition={fieldTransition}
              />
              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Email</label>
              <motion.input
                name="email"
                type="email"
                className="w-full rounded-2xl border border-white/10 bg-[rgba(8,12,18,0.7)] px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
                whileHover={fieldHover}
                whileFocus={fieldFocus}
                transition={fieldTransition}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Project type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Website", "SaaS / Web App", "Custom Application", "Digital Ecosystem"].map((option) => (
                  <motion.label
                    key={option}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(6,9,15,0.7)] px-4 py-3 text-sm"
                    whileHover={{ y: -6, borderColor: "rgba(247, 216, 123, 0.4)", boxShadow: "0 20px 45px rgba(247, 216, 123, 0.18)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={fieldTransition}
                  >
                    <input type="radio" name="project" value={option} required /> {option}
                  </motion.label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Investment range</label>
              <motion.input
                id="budgetRange"
                type="range"
                name="budget"
                min="65000"
                max="2500000"
                step="5000"
                value={budget}
                onChange={(event) => setBudget(parseInt(event.target.value, 10))}
                className="contact-range"
                aria-label="Select investment range"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
              />
              <p id="budgetLabel" className="text-xs uppercase tracking-[0.35em] text-white/60">~ {fmt.format(budget)} ZAR</p>

              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Timeline</label>
              <div className="flex flex-wrap gap-3 text-sm">
                {["Urgent", "1–3 months", "3–6 months", "Strategic"]
                  .map((option) => (
                    <motion.label
                      key={option}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(6,9,15,0.7)] px-4 py-3"
                      whileHover={{ y: -6, borderColor: "rgba(125, 249, 255, 0.35)", boxShadow: "0 20px 48px rgba(125, 249, 255, 0.22)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={fieldTransition}
                    >
                      <input type="radio" name="timeline" value={option} required /> {option}
                    </motion.label>
                  ))}
              </div>

              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Attach deck (optional)</label>
              <motion.input
                type="file"
                name="attachment"
                className="text-xs text-white/60"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={fieldTransition}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <label className="text-sm uppercase tracking-[0.35em] text-white/60">Narrate your goals</label>
              <motion.textarea
                name="message"
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-[rgba(8,12,18,0.7)] px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
                whileHover={fieldHover}
                whileFocus={fieldFocus}
                transition={fieldTransition}
              />
            </div>
          )}

          <div className="contact-controls">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(1, current - 1))}
              className={`btn-ghost text-xs ${step === 1 ? "hidden" : ""}`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep((current) => Math.min(4, current + 1))}
              className={`btn-gold text-xs ${step === 4 ? "hidden" : ""}`}
            >
              Next
            </button>
          </div>

          {step === 4 && (
            <div className="flex flex-wrap justify-center gap-4">
              <button type="submit" className="btn-gold text-xs" disabled={pending}>
                {pending ? "Sending…" : "Send request"}
              </button>
              <a
                id="waShortcut"
                href="#"
                className="btn-ghost text-xs"
                onClick={(event) => {
                  event.preventDefault();
                  const form = document.getElementById("blueprintForm") as HTMLFormElement;
                  const formData = new FormData(form);
                  const payload = Object.fromEntries(formData.entries());
                  const attachmentEntry = formData.get("attachment");
                  const attachmentName = attachmentEntry instanceof File && attachmentEntry.name ? attachmentEntry.name : undefined;
                  const budgetValue = payload.budget ? parseInt(payload.budget as string, 10) : undefined;

                  const link = createWhatsAppLink({
                    origin: "Contact blueprint form",
                    name: (payload.name as string) || null,
                    email: (payload.email as string) || null,
                    project: (payload.project as string) || null,
                    budget: budgetValue ? formatBudget(budgetValue) : undefined,
                    timeline: (payload.timeline as string) || null,
                    message: (payload.message as string) || null,
                    attachmentName,
                    modules: selectedModules,
                    tierId: activeTier,
                    packageId: activePackage
                  });

                  window.open(link, "_blank", "noopener");
                }}
              >
                WhatsApp concierge
              </a>
            </div>
          )}
        </form>

        <p className="mt-10 text-xs uppercase tracking-[0.4em] text-white/50 text-center">Secure • Confidential • White-glove</p>
        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-red-300/40 bg-[rgba(24,8,12,0.72)] px-5 py-4 text-center text-red-200 text-sm uppercase tracking-[0.3em]">
            {errorMessage}
          </div>
        ) : null}

        {bannerMessage ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[rgba(8,12,18,0.6)] px-5 py-4 text-center text-white/80 text-sm uppercase tracking-[0.3em]">
            {bannerMessage}
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
