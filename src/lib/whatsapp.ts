const FEATURE_LABELS: Record<string, string> = {
  responsive: "Responsive Design",
  seo: "SEO Optimization",
  cms: "CMS Integration",
  luxuryUI: "Luxury UI/UX System",
  ecommerce: "E-commerce Setup",
  analytics: "Analytics & Tracking",
  mvp: "MVP Core",
  api: "Scalable API Architecture",
  cicd: "CI/CD Pipelines",
  observability: "Observability & Monitoring",
  multitenant: "Multi-Tenant Support",
  payments: "Payment & Subscription Systems",
  ai: "AI Concierge",
  integrations: "Integrations Suite",
  ops: "Automation & DevOps",
  security: "Security Layer",
  workflows: "Enterprise Workflows",
  offline: "Offline-First / Mobile Sync",
  dashboards: "Custom Dashboards"
};

const TIER_LABELS: Record<string, string> = {
  "tier-signature": "Signature",
  "tier-concierge": "Concierge",
  "tier-enterprise": "Enterprise"
};

const PACKAGE_LABELS: Record<string, string> = {
  "pkg-web": "Signature Web Experience",
  "pkg-saas": "Flagship SaaS Platform",
  "pkg-custom": "Private Client Systems"
};

export type WhatsAppContext = {
  name?: string | null;
  email?: string | null;
  project?: string | null;
  budget?: string | number | null;
  timeline?: string | null;
  message?: string | null;
  modules?: string[];
  tierId?: string | null | undefined;
  packageId?: string | null | undefined;
  attachmentName?: string | null;
  origin?: string;
};

export function buildWhatsAppMessage(context: WhatsAppContext) {
  const lines: string[] = ["DrMcGi SaaS Concierge Blueprint"];

  if (context.origin) {
    lines.push(`Origin: ${context.origin}`);
  }

  if (context.name) {
    lines.push(`Name: ${context.name}`);
  }

  if (context.email) {
    lines.push(`Email: ${context.email}`);
  }

  if (context.project) {
    lines.push(`Project: ${context.project}`);
  }

  if (context.budget) {
    lines.push(`Budget: ${context.budget}`);
  }

  if (context.timeline) {
    lines.push(`Timeline: ${context.timeline}`);
  }

  if (context.modules && context.modules.length > 0) {
    const moduleLabels = context.modules
      .map((id) => FEATURE_LABELS[id] ?? id)
      .filter((label, index, arr) => label && arr.indexOf(label) === index);
    if (moduleLabels.length > 0) {
      lines.push(`Modules: ${moduleLabels.join(", ")}`);
    }
  }

  if (context.tierId && TIER_LABELS[context.tierId]) {
    lines.push(`Preferred tier: ${TIER_LABELS[context.tierId]}`);
  }

  if (context.packageId && PACKAGE_LABELS[context.packageId]) {
    lines.push(`Package inspiration: ${PACKAGE_LABELS[context.packageId]}`);
  }

  if (context.message) {
    lines.push("—", context.message);
  }

  if (context.attachmentName) {
    lines.push(`Attachment: ${context.attachmentName}`);
  }

  return lines.join("\n");
}

export function createWhatsAppLink(context: WhatsAppContext, phone = "27649211745") {
  const budgetValue = typeof context.budget === "number" ? context.budget.toString() : context.budget;
  const payload = { ...context, budget: budgetValue };
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatBudget(amount?: number) {
  if (!amount || Number.isNaN(amount)) {
    return undefined;
  }
  return new Intl.NumberFormat("en-US").format(amount) + " ZAR";
}

export { FEATURE_LABELS, TIER_LABELS, PACKAGE_LABELS };
