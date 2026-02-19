"use client";

import dynamic from "next/dynamic";

const CinematicWebGL = dynamic(() => import("@/components/CinematicWebGL"), { ssr: false });

export default function CinematicWebGLClient() {
  return <CinematicWebGL />;
}
