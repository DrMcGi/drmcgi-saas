"use client";
import Image from "next/image";

type Variant = "hero" | "marble" | "noise" | "none";

export default function BackgroundManager({ variant = "none" }: { variant?: Variant }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {variant === "hero" && (
        <Image
          src="/backgrounds/hero-bg.svg"
          alt="Hero background"
          fill
          priority
          className="object-cover opacity-80"
        />
      )}
      {variant === "marble" && (
        <Image
          src="/backgrounds/marble.svg"
          alt="Marble background"
          fill
          className="object-cover opacity-60 mix-blend-screen"
        />
      )}
      {variant === "noise" && (
        <Image
          src="/backgrounds/noise.svg"
          alt="Noise texture"
          fill
          className="object-cover opacity-20"
        />
      )}
      {/* Corner accent always visible */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-40">
        <Image
          src="/backgrounds/corner-accent.svg"
          alt="Corner accent"
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
