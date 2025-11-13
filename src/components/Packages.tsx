"use client";
import { motion } from "framer-motion";
import BackgroundManager from "@/components/BackgroundManager";
import { useApp } from "@/lib/store";

const FEATURE_MAP: Record<string, string> = {
  responsive: "Responsive design",
  seo: "Search equity",
  cms: "Editorial control",
  luxuryUI: "Luxury UI system",
  ecommerce: "Commerce engine",
  analytics: "Insight stack",
  mvp: "MVP core",
  api: "Scalable API",
  cicd: "CI/CD runway",
  observability: "Observability",
  multitenant: "Multi-tenant",
  payments: "Payments",
  ai: "AI concierge",
  integrations: "Systems integrations",
  ops: "Automation ops",
  security: "Security layer",
  workflows: "Enterprise workflows",
  offline: "Offline sync",
  dashboards: "Executive dashboards"
};

const PACKAGES = [
  {
    id: "pkg-web",
    title: "Signature Web Experience",
    copy: "Editorial-grade websites with cinematic motion, luxe storytelling, and resilient SEO foundations.",
    feats: ["luxuryUI", "responsive", "cms", "analytics"]
  },
  {
    id: "pkg-saas",
    title: "Flagship SaaS Platform",
    copy: "MVP to scale with couture dashboards, automation, and observability built for executive confidence.",
    feats: ["mvp", "api", "cicd", "observability", "payments"]
  },
  {
    id: "pkg-custom",
    title: "Private Client Systems",
    copy: "Exclusive applications with AI concierge, enterprise workflows, and custom integration tapestries.",
    feats: ["ai", "integrations", "security", "workflows", "dashboards"]
  }
];

export default function Packages() {
  const { applyPackage, activePackage } = useApp();

  return (
    <section id="packages" className="mx-auto max-w-6xl px-6 py-24">
      <div className="section-frame space-y-10 relative overflow-hidden">
        <BackgroundManager variant="packages" />
        <div className="space-y-3">
          <p className="overline">Tailored packages</p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="text-3xl md:text-4xl"
          >
            Luxury software. Real business impact.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-white/70 max-w-2xl"
          >
            We don&apos;t ship features. We orchestrate experiences that feel inevitable—start with a curated suite and
            refine every detail in the configurator.
          </motion.p>
        </div>

        <div className="package-grid">
          {PACKAGES.map((pkg, index) => (
            <motion.article
              key={pkg.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.75, delay: index * 0.12 }}
              className={`package-card ${activePackage === pkg.id ? "is-active" : ""}`}
              onClick={() => applyPackage(pkg.feats, pkg.id)}
            >
              <span className="package-badge">Commission</span>
              <h4>{pkg.title}</h4>
              <p>{pkg.copy}</p>
              <ul className="package-features">
                {pkg.feats.map((feat) => (
                  <li key={feat}>{FEATURE_MAP[feat]}</li>
                ))}
              </ul>
              <span className="package-luxe">Includes private launch concierge</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
