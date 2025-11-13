import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL || process.env.CONTACT_RECIPIENT;

function formatHtml(payload: Record<string, string>) {
  const rows = Object.entries(payload)
    .filter(([, value]) => value)
    .map(([label, value]) => {
      const title = label.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
      return `<tr><td style="padding:8px 0;color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:0.2em;">${title}</td><td style="padding:8px 0 8px 20px;color:#e2e8f0;font-size:15px;">${value}</td></tr>`;
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

  const formData = await request.formData();

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
