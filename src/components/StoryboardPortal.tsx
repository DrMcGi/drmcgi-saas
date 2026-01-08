"use client";

import { useEffect, useId, useState } from "react";

type StoryboardDetail = {
  title: string;
  steps: string[];
};

export default function StoryboardPortal() {
  const [open, setOpen] = useState(false);
  const [storyboard, setStoryboard] = useState<StoryboardDetail>({ title: "Storyboard", steps: [] });
  const titleId = useId();

  useEffect(() => {
    const onOpen = (event: Event) => {
      const custom = event as CustomEvent<StoryboardDetail>;
      if (!custom.detail) return;
      setStoryboard(custom.detail);
      setOpen(true);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("open-storyboard", onOpen as EventListener);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-storyboard", onOpen as EventListener);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      id="storyModal"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={() => setOpen(false)}
    >
      <div
        id="storyCard"
        className="max-w-2xl mx-auto mt-[8vh] bg-gray-800/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          id="storyHeader"
          className="p-4 border-b border-white/10 flex items-center justify-between"
        >
          <div className="text-lg" id={titleId}>
            {storyboard.title}
          </div>
          <button
            id="storyClose"
            className="text-white/60 hover:text-white text-sm"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>
        <div id="storyBody" className="p-4">
          <div className="space-y-2">
            {storyboard.steps.map((step) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-300 mt-2" aria-hidden />
                <div className="text-sm text-white/80">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
