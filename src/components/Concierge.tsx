// src/components/Concierge.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundManager from "@/components/BackgroundManager";
import { useApp } from "@/lib/store";
import { createWhatsAppLink } from "@/lib/whatsapp";

const WhatsAppMark = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M20.6 11.8c0 4.8-3.9 8.8-8.8 8.8a8.7 8.7 0 0 1-4.3-1.1L4 20l1.1-3.5a8.7 8.7 0 0 1-1.3-4.6c0-4.8 3.9-8.8 8.8-8.8s8.8 3.9 8.8 8.7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill="currentColor"
      d="M9.8 9c-.2-.4-.4-.4-.6-.4H8.8c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1 0 1.2.8 2.3.9 2.4.1.2 1.6 2.5 3.9 3.4.5.2.9.3 1.3.4.6.1 1.1.1 1.5 0 .5-.1 1.5-.6 1.6-1.2.1-.6.1-1 .1-1.1 0-.1-.1-.3-.3-.3h-.7c-.2 0-.4.1-.5.2-.2.2-.6.6-.7.6-.1.1-.3.1-.4 0-.2-.1-.9-.3-1.7-1-.6-.5-1.1-1.2-1.2-1.3-.1-.1 0-.3.1-.4.2-.2.3-.4.4-.5.1-.1.2-.2.3-.4.1-.1.1-.2.2-.3a3 3 0 0 0 .2-.5c0-.1 0-.2-.1-.3 0-.1-.3-.8-.7-1.6Z"
    />
  </svg>
);

const FALLBACK_ASSIST = [
  {
    test: /package|suite|option/i,
    reply: "Our Signature, Concierge, and Enterprise tiers each preload the configurator. Start with Signature if you want editorial storytelling fast; move to Concierge when you need AI concierge and automation from day one."
  },
  {
    test: /timeline|launch|deliver/i,
    reply: "Immersion and blueprint typically run two weeks, couture build is eight to twelve, with launch choreography layered in the final fortnight."
  },
  {
    test: /price|budget|invest/i,
    reply: "Expect engagements from 65k ZAR for Signature through 165k+ ZAR for Enterprise, with concierge uplift depending on AI, integrations, and governance requirements."
  }
];

export default function Concierge() {
  const [open, setOpen] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const [assistantInput, setAssistantInput] = useState("");
  const [recording, setRecording] = useState(false);
  const [memoUrl, setMemoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { selected, activeTier, activePackage } = useApp();
  const whatsappHref = useMemo(
    () =>
      createWhatsAppLink({
        origin: "Concierge dock",
        modules: Array.from(selected).sort(),
        tierId: activeTier,
        packageId: activePackage
      }),
    [selected, activeTier, activePackage]
  );

  useEffect(() => () => {
    mediaRecorderRef.current?.stop();
    chunksRef.current = [];
  }, []);

  const startRecording = async () => {
    if (recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setMemoUrl(url);
        chunksRef.current = [];
      };
      mediaRecorder.start();
      setRecording(true);
    } catch {
      setAssistantResponse("Voice capture unavailable in this browser. Please attach an audio note via email instead.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
  };

  const handleAssistant = () => {
    if (!assistantInput.trim()) {
      setAssistantResponse("Share a thought and I will tailor a response.");
      return;
    }
    const match = FALLBACK_ASSIST.find((item) => item.test.test(assistantInput));
    if (match) {
      setAssistantResponse(match.reply);
    } else {
      setAssistantResponse("Expect an executive-level reply within minutes once we receive your full brief.");
    }
    setAssistantInput(assistantInput.trim());
  };

  const PANEL_ID = "concierge-dock-panel";

  return (
    <div id="concierge" className="concierge-dock">
      <button
        className="dock-pill"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
      >
        <span className="pulse-dot" aria-hidden />
        Executive concierge available
      </button>

      {open && (
        <div
          id={PANEL_ID}
          className="dock-panel open relative overflow-hidden"
          style={{ maxHeight: "min(82vh, 640px)", width: "min(92vw, 340px)" }}
        >
          <BackgroundManager variant="concierge" />
          <div className="dock-panel-scroll">
            <div className="dock-panel-header">
              <div className="space-y-1">
                <h3 className="text-sm uppercase tracking-[0.35em] text-white/70">DrMcGi Concierge Desk</h3>
                <p className="text-xs text-white/60">Reserve time, capture a memo, or ask for instant guidance.</p>
              </div>
              <button
                type="button"
                className="dock-panel-close"
                onClick={() => setOpen(false)}
                aria-label="Close concierge"
              >
                ✕
              </button>
            </div>

            <section className="space-y-2">
              <h4 className="text-xs uppercase tracking-[0.32em] text-white/60">Calendar</h4>
              <iframe
                title="Concierge booking"
                src="https://cal.com/drmcgi-apa8hg/"
                className="w-full h-48 rounded-2xl border border-white/10 bg-[rgba(6,9,15,0.8)]"
                loading="lazy"
              />
            </section>

            <section className="space-y-3">
              <h4 className="text-xs uppercase tracking-[0.32em] text-white/60">Copy assistant</h4>
              <textarea
                className="w-full rounded-2xl border border-white/10 bg-[rgba(6,9,15,0.7)] px-4 py-3 text-xs text-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                rows={3}
                value={assistantInput}
                onChange={(event) => setAssistantInput(event.target.value)}
                placeholder="Describe the experience you are chasing."
              />
              <button type="button" className="btn-ghost text-xs" onClick={handleAssistant}>
                Draft response
              </button>
              {assistantResponse && <p className="text-xs text-white/70 leading-relaxed">{assistantResponse}</p>}
            </section>

            <section className="space-y-3">
              <h4 className="text-xs uppercase tracking-[0.32em] text-white/60">Voice memo</h4>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="btn-gold text-xs"
                  onClick={recording ? stopRecording : startRecording}
                >
                  {recording ? "Stop capture" : "Start capture"}
                </button>
                {memoUrl && (
                  <a href={memoUrl} download="drmcgi-brief.webm" className="btn-ghost text-xs">
                    Download memo
                  </a>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                We transcribe memos privately and respond with action steps.
              </p>
            </section>
          </div>
        </div>
      )}

      <a
        id="waButton"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Start a WhatsApp conversation with DrMcGi's SaaS Co."
      >
        <span className="whatsapp-float-icon" aria-hidden>
          <WhatsAppMark />
        </span>
        <span>WhatsApp concierge</span>
      </a>
    </div>
  );
}
