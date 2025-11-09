"use client";

export default function StoryboardPortal() {
  return (
    <div
      id="storyModal"
      style={{ display: "none" }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
    >
      <div
        id="storyCard"
        className="max-w-2xl mx-auto mt-[8vh] bg-gray-800/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div
          id="storyHeader"
          className="p-4 border-b border-white/10 flex items-center justify-between"
        >
          <div className="text-lg">Storyboard</div>
          <button
            id="storyClose"
            className="text-white/60 hover:text-white text-sm"
            onClick={() =>
              document
                .getElementById("storyModal")
                ?.setAttribute("style", "display:none")
            }
          >
            ✕
          </button>
        </div>
        <div id="storyBody" className="p-4" />
      </div>
    </div>
  );
}
