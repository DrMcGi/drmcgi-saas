"use client";

export default function MotionBackgrounds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-(--neon-a) opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-(--neon-b) opacity-20 blur-3xl animate-pulse delay-1000" />
    </div>
  );
}
