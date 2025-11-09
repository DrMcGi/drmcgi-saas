"use client";
import SectionHeader from "@/components/SectionHeader";

export default function Concierge() {
  return (
    <>
      {/* Section content */}
      <section id="concierge" className="mx-auto max-w-6xl px-6 py-20 fade-up">
        <SectionHeader
          title="Concierge bot"
          subtitle="Ask about pricing, packages, or request a blueprint. Quick replies and lifelike typing animations included."
          align="center"
        />
      </section>

      {/* Floating WhatsApp button */}
      <a
        id="waButton"
        href="#"
        className="fixed bottom-6 right-6 z-50 px-5 py-4 rounded-full bg-[#25D366] text-white shadow-xl flex items-center gap-2 font-medium hover:scale-105 transition-transform"
        onClick={(e) => {
          e.preventDefault();
          const transcript = Array.from(document.querySelectorAll("#chatLog > div"))
            .map((d) => d.textContent?.trim())
            .join(" | ");
          const msg = encodeURIComponent(`Blueprint request:\nTranscript: ${transcript || "N/A"}`);
          window.open(`https://wa.me/27649211745?text=${msg}`, "_blank");
        }}
      >
        <span>💬</span> WhatsApp
      </a>

      {/* Floating Chat toggle */}
      <button
        id="chatToggle"
        className="fixed bottom-24 right-6 z-50 px-4 py-2 rounded-full border border-white/10 bg-white/10 text-white text-sm hover:bg-white/20"
        onClick={() => {
          const bot = document.getElementById("chatBot")!;
          const log = document.getElementById("chatLog")!;
          bot.classList.toggle("hidden");
          if (!bot.classList.contains("hidden") && log.childElementCount === 0) {
            log.innerHTML += `<div>Bot: Hi there 👋 I’m your concierge bot. Ask about packages, pricing, or request a blueprint.</div>`;
          }
        }}
      >
        🤖 Chat
      </button>

      {/* Chat bot panel */}
      <div
        id="chatBot"
        className="fixed bottom-24 right-6 w-80 rounded-xl border border-white/10 bg-gray-800/80 backdrop-blur-xl shadow-xl hidden"
      >
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>🤖</span>
            <span className="text-sm">Concierge bot</span>
          </div>
          <button
            id="chatClose"
            className="text-white/60 hover:text-white text-sm"
            onClick={() => document.getElementById("chatBot")?.classList.add("hidden")}
          >
            ✕
          </button>
        </div>

        <div id="chatLog" className="p-4 h-64 overflow-y-auto text-sm space-y-2"></div>

        <div className="p-3 border-t border-white/10 space-y-3">
          {/* Quick replies */}
          <div className="flex gap-2 flex-wrap">
            {["Show pricing", "Suggest package", "Request blueprint"].map((q) => (
              <button
                key={q}
                className="btn-neon text-xs"
                onClick={() => {
                  const input = document.getElementById("chatInput") as HTMLInputElement;
                  if (input) {
                    input.value = q;
                    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
                  }
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <input
            id="chatInput"
            className="w-full p-2 rounded bg-gray-800/60 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Type here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const input = e.currentTarget;
                const msg = input.value.trim();
                if (!msg) return;
                const log = document.getElementById("chatLog")!;
                log.innerHTML += `<div class="text-right text-(--gold)">You: ${msg}</div>`;
                input.value = "";

                const typing = document.createElement("div");
                typing.textContent = "Bot is typing…";
                typing.className = "text-white/60 animate-pulse";
                log.appendChild(typing);
                log.scrollTop = log.scrollHeight;

                setTimeout(() => {
                  typing.remove();
                  const reply =
                    /pricing|price|tier/i.test(msg)
                      ? "We offer Signature, Concierge, and Enterprise tiers."
                      : /package|packages/i.test(msg)
                      ? "Packages: Website build, SaaS/web app, and Custom applications."
                      : /recommend|suggest|best/i.test(msg)
                      ? "Start with MVP + API. Add CI/CD for smooth releases. Luxury UI + AI concierge is strong—consider Security + Observability for trust."
                      : /blueprint/i.test(msg)
                      ? "Request a blueprint via the contact form or the WhatsApp shortcut."
                      : "Ask about pricing, packages, or request a blueprint.";
                  log.innerHTML += `<div>Bot: ${reply}</div>`;
                  log.scrollTop = log.scrollHeight;
                }, 600);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
