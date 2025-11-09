// src/components/GoldDivider.tsx
"use client";

import Image from "next/image";

export default function GoldDivider() {
  return (
    <div className="flex justify-center my-12">
      <div className="relative w-48 h-3 animate-[dividerGlow_6s_ease_in_out_infinite]">
        <Image
          src="/backgrounds/gold-divider.svg"
          alt="Gold divider"
          fill
          sizes="192px"
          className="object-contain opacity-80"
          priority={false}
        />
      </div>
    </div>
  );
}
