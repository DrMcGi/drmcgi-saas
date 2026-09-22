"use client";
import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

const FEATURE_MAP: Record<string, string> = {
  responsive: "Responsive business websites",
  seo: "SEO-friendly builds",
  cms: "CMS and content control",
  luxuryUI: "Modern UX direction",
  ecommerce: "Commerce-ready experiences",
  analytics: "Reporting and insight layers",
  mvp: "MVP foundation",
  api: "API and workflow design",
  cicd: "Deployment and release support",
  observability: "Operational visibility",
  multitenant: "Scalable architecture",
  payments: "Payments and transactions",
  ai: "AI-assisted efficiency",
  integrations: "Systems integrations",
  ops: "Automation workflows",
  security: "Security and access controls",
  workflows: "Business process automation",
  offline: "Operational continuity",
  dashboards: "Executive dashboards"
};

const PACKAGES = [
  {
    id: "pkg-web",
    title: "Business Website Design",
    copy: "Professional websites and digital storefronts built to improve brand trust, client engagement, and online visibility.",
    feats: ["luxuryUI", "responsive", "cms", "seo"]
  },
  {
    id: "pkg-saas",
    title: "SaaS & Systems Build",
    copy: "Custom software and SaaS platforms for internal operations, customer journeys, and business systems that need to scale cleanly.",
    feats: ["mvp", "api", "integrations", "dashboards", "security"]
  },
  {
    id: "pkg-custom",
    title: "Digital Transformation Support",
    copy: "ICT consulting, workflow automation, reporting tools, and system support designed to strengthen how teams operate and make decisions.",
    feats: ["ai", "ops", "workflows", "analytics", "cicd"]
  }
];

export default function Packages() {
  const { applyPackage, activePackage } = useApp();

  return (
    <section id="packages" className="mx-auto max-w-6xl px-6 py-24">
      <div className="section-frame space-y-10 relative overflow-hidden">
        <div className="space-y-3">
          <p className="overline">Tailored packages</p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="text-3xl md:text-4xl"
          >
            Practical digital solutions for businesses that need systems to work.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-white/70 max-w-2xl"
          >
            From website builds and SaaS platforms to automation and day-to-day operational support, each package is
            shaped around the real needs of the business.
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
