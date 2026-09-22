"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    label: "01. Focus",
    text: "A South African-based IT company specialising in software development, systems design, and SaaS-based digital solutions for SMEs and professional firms.",
  },
  {
    label: "02. Delivery",
    text: "From requirements analysis and system design to development, deployment, and ongoing support, every engagement is structured for clarity and reliability.",
  },
  {
    label: "03. Values",
    text: "Professionalism, technical excellence, client-first service, and ethical, compliant business practices shape how we work with every client.",
  },
];

const flagshipProjects = [
  {
    name: "LEM Projects",
    detail: "Strategic portfolio platform for the broader LEM group, built to present projects with clearer stakeholder visibility and stronger narrative positioning.",
  },
  {
    name: "PCM Management Tool",
    detail: "Operations dashboard for machine tracking, schedule visibility, and decision support in a demanding live mining environment.",
  },
  {
    name: "Cheese by DrMcGi",
    detail: "A premium SaaS and cultural brand concept designed to combine software, signature experiences, and scalable digital growth.",
  },
];

export default function CompanyProfile() {
  return (
    <section id="company-profile" className="mx-auto max-w-6xl px-6 pb-10 pt-2">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="section-frame profile-shell"
      >
        <div className="profile-grid">
          <div className="space-y-6">
            <p className="overline">About the company</p>
            <h2 className="profile-title">
              DrMcGi&apos;s SaaS Atelier is a South African technology partner building reliable, modern digital systems for ambitious businesses.
            </h2>
            <p className="profile-body">
              Founded in Limpopo, South Africa, DrMcGi&apos;s SaaS Atelier specialises in software development,
              systems design, and SaaS-based digital solutions for SMEs, professional firms, and organisations that
              need scalable technology aligned to business goals. The company operates with a strong focus on
              in-house technical expertise, modern development frameworks, and client-led delivery from concept to
              deployment.
            </p>

            <div className="profile-pill-row">
              <span>100% Black-owned</span>
              <span>Client-focused</span>
              <span>National reach</span>
            </div>

            <div className="profile-values">
              {pillars.map((pillar) => (
                <div key={pillar.label} className="profile-value">
                  <p className="profile-value-label">{pillar.label}</p>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="profile-panel">
            <div className="profile-panel-header">
              <span className="profile-chip">Current focus</span>
              <span className="profile-panel-label">Flagship work</span>
            </div>

            <ul className="profile-projects">
              {flagshipProjects.map((project) => (
                <li key={project.name}>
                  <span>{project.name}</span>
                  <p>{project.detail}</p>
                </li>
              ))}
            </ul>

            <div className="profile-footer">
              <span>Selected portfolio</span>
              <div className="profile-tags">
                <span>LEM Projects</span>
                <span>PCM</span>
                <span>Cheese</span>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
