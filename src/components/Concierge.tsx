"use client";

export default function Concierge() {
  return (
    <>
      <div id="watermark" style={{ display: "none" }}>Crafted for you</div>

      <a
        id="waButton"
        href="#"
        className="fixed bottom-6 right-6 z-50 px-5 py-4 rounded-full bg-[#25D366] text-white shadow-xl flex items-center gap-2 font-medium hover:scale-105 transition-transform"
        onClick={(e) => {
          e.preventDefault();
          const transcript = Array.from(document.querySelectorAll("#chatLog > div")).map(d => d.textContent?.trim()).join(" | ");
          const msg = encodeURIComponent(
            `Blueprint request:\nTranscript: ${transcript || "N/A"}\nEmail: giftk.rantho@gmail\nLinkedIn: www.linkedin.com/in/gift-rantho\nGitHub: https://github.com/DrMcGi`
          );
          window.open(`https://wa.me/27649211745?text=${msg}`, "_blank");
        }}
      >
        <span>💬</span> Concierge
      </a>

      <div id="chatBot" className="fixed bottom-24 right-6 w-80 rounded-xl border border-white/10 bg-gray-800/80 backdrop-blur-xl shadow-xl hidden">
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2"><span>🤖</span><span className="text-sm">Concierge bot</span></div>
          <button id="chatClose" className="text-white/60 hover:text-white text-sm" onClick={() => document.getElementById("chatBot")?.classList.add("hidden")}>✕</button>
        </div>
        <div id="chatLog" className="p-4 h-64 overflow-y-auto text-sm space-y-2"></div>
        <div className="p-3 border-t border-white/10">
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
                typing.className = "text-white/60";
                log.appendChild(typing);
                setTimeout(() => {
                  typing.remove();
                  const reply =
                    /pricing|price|tier/i.test(msg) ? "We offer Signature, Concierge, and Enterprise tiers." :
                    /package|packages/i.test(msg) ? "Packages: Website build, SaaS / web app, and Custom applications." :
                    /recommend|suggest|best/i.test(msg) ? "MVP + API foundation. Add CI/CD for smooth releases. Luxury UI + AI concierge is strong—consider Security + Observability for trust." :
                    "Ask about pricing, packages, or request a blueprint.";
                  log.innerHTML += `<div>Bot: ${reply}</div>`;
                  log.scrollTop = log.scrollHeight;
                }, 600);
              }
            }}
          />
        </div>
      </div>

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
    </>
  );
}