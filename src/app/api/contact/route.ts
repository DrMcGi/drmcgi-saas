import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || process.env.CONTACT_RECIPIENT;

const MAX_ATTACHMENT_BYTES = 6 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function getRateStore() {
  const key = "__drmcgiContactRateStore";
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[key]) g[key] = new Map<string, { count: number; resetAt: number }>();
  return g[key] as Map<string, { count: number; resetAt: number }>;
}

function isValidEmail(value: string) {
  if (!value) return false;
  if (value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatHtml(payload: Record<string, string>) {
  const rows = Object.entries(payload)
    .filter(([, value]) => value)
    .map(([label, value]) => {
      const title = label.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
      return `<tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:0.2em;">${escapeHtml(title)}</td><td style="padding:8px 0 8px 20px;color:#e2e8f0;font-size:15px;">${escapeHtml(value)}</td></tr>`;
    })
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:32px;background:#050912;font-family:'Neue Haas Grotesk',Arial,sans-serif;">
    <table style="width:100%;max-width:640px;margin:0 auto;background:rgba(12,18,28,0.9);border-radius:24px;padding:40px;border:1px solid rgba(255,255,255,0.08);">
      <tr><td colspan="2" style="font-size:18px;color:#f7d87b;font-weight:600;letter-spacing:0.3em;text-transform:uppercase;padding-bottom:16px;">Concierge blueprint request</td></tr>
      ${rows}
    </table>
  </body></html>`;
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const ip = getClientIp(request);
  const now = Date.now();
  const rateStore = getRateStore();
  const entry = rateStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count += 1;
    if (entry.count > RATE_LIMIT_MAX) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
    }
  }

  const formData = await request.formData();

  const honeypot = (formData.get("company") as string | null)?.trim() || "";
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = (formData.get("name") as string | null)?.trim() || "";
  const email = (formData.get("email") as string | null)?.trim() || "";
  const project = (formData.get("project") as string | null)?.trim() || "";
  const budget = (formData.get("budget") as string | null)?.trim() || "";
  const timeline = (formData.get("timeline") as string | null)?.trim() || "";
  const message = (formData.get("message") as string | null)?.trim() || "";
  const attachment = formData.get("attachment");

  if (!name || !email || !project || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const payload = {
    name,
    email,
    project,
    budget,
    timeline,
    message
  } satisfies Record<string, string>;

  const resend = new Resend(RESEND_API_KEY);

  try {
    const attachments = [] as { filename: string; content: Buffer }[];

    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: "Attachment is too large." }, { status: 413 });
      }
      const buffer = Buffer.from(await attachment.arrayBuffer());
      attachments.push({ filename: attachment.name, content: buffer });
    }

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL.split(",").map((entry) => entry.trim()).filter(Boolean),
      replyTo: email,
      subject: `Blueprint Request — ${project || "New"}`,
      html: formatHtml(payload),
      text: Object.entries(payload)
        .map(([label, value]) => `${label.toUpperCase()}: ${value}`)
        .join("\n"),
      attachments: attachments.length ? attachments : undefined
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend delivery failed", error);
    return NextResponse.json({ error: "Failed to dispatch blueprint email." }, { status: 500 });
  }
}
