// src/components/BackgroundManager.tsx
"use client";
import React from "react";
import { motion, type MotionProps } from "framer-motion";

type Variant =
  | "hero"
  | "vision"
  | "atlas"
  | "packages"
  | "tiers"
  | "cases"
  | "configurator"
  | "contact"
  | "guarantee"
  | "concierge"
  | "nav"
  | "footer"
  | "marble"
  | "noise"
  | "aurora"
  | "ribbon"
  | "vein";

const DATA_URI_AURORA =
  "url('data:image/svg+xml,%3Csvg width=\"1200\" height=\"1200\" viewBox=\"0 0 1200 1200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3CradialGradient id=\"a\" cx=\"50%\" cy=\"10%\" r=\"90%\"%3E%3Cstop stop-color=\"%23aef1ff\" stop-opacity=\"0.45\"/%3E%3Cstop offset=\"0.45\" stop-color=\"%2374d0ff\" stop-opacity=\"0.25\"/%3E%3Cstop offset=\"1\" stop-color=\"%23020916\" stop-opacity=\"0\"/%3E%3C/stop%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width=\"1200\" height=\"1200\" fill=\"url(%23a)\"/%3E%3C/svg%3E')";
const DATA_URI_RIBBON =
  "url('data:image/svg+xml,%3Csvg width=\"1600\" height=\"900\" viewBox=\"0 0 1600 900\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 540C240 420 480 660 720 540C960 420 1200 180 1440 300C1560 360 1600 360 1600 360V900H0V540Z\" fill=\"url(%23grad)\" opacity=\"0.32\"/%3E%3Cdefs%3E%3ClinearGradient id=\"grad\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"%3E%3Cstop stop-color=\"%23f7d87b\" stop-opacity=\"0.6\"/%3E%3Cstop offset=\"0.5\" stop-color=\"%2374d0ff\" stop-opacity=\"0.2\"/%3E%3Cstop offset=\"1\" stop-color=\"%23fff2c9\" stop-opacity=\"0.05\"/%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E')";
const DATA_URI_VEIN =
  "url('data:image/svg+xml,%3Csvg width=\"1200\" height=\"1200\" viewBox=\"0 0 1200 1200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 600Q150 450 300 600T600 600T900 600T1200 600V1200H0Z\" fill=\"none\" stroke=\"rgba(255,255,255,0.18)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-dasharray=\"12 28\"/%3E%3C/svg%3E')";
const DATA_URI_STARFIELD =
  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22800%22 viewBox=%220 0 800 800%22%3E%3Cg fill=%22white%22 opacity=%220.32%22%3E%3Ccircle cx=%2290%22 cy=%22110%22 r=%221.6%22/%3E%3Ccircle cx=%22260%22 cy=%2280%22 r=%221.2%22/%3E%3Ccircle cx=%22450%22 cy=%22140%22 r=%221.4%22/%3E%3Ccircle cx=%22650%22 cy=%2290%22 r=%221.1%22/%3E%3Ccircle cx=%2260%22 cy=%22340%22 r=%221.5%22/%3E%3Ccircle cx=%22310%22 cy=%23410%22 r=%221.8%22/%3E%3Ccircle cx=%22580%22 cy=%23300%22 r=%221.6%22/%3E%3Ccircle cx=%22740%22 cy=%23410%22 r=%221.2%22/%3E%3Ccircle cx=%22180%22 cy=%22610%22 r=%221.4%22/%3E%3Ccircle cx=%22440%22 cy=%25560%22 r=%221.8%22/%3E%3Ccircle cx=%22710%22 cy=%25640%22 r=%221.5%22/%3E%3Ccircle cx=%22130%22 cy=%27490%22 r=%221.2%22/%3E%3C/g%3E%3C/svg%3E')";

type Layer = {
  className?: string;
  style: React.CSSProperties;
  key?: string;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  transition?: MotionProps["transition"];
};

const FLOAT_TRANSITION: MotionProps["transition"] = {
  duration: 36,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut"
};

const ORBIT_TRANSITION: MotionProps["transition"] = {
  duration: 48,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut"
};

const LOOP_TRANSITION: MotionProps["transition"] = {
  duration: 52,
  repeat: Infinity,
  ease: "linear"
};

const LAYERS: Record<Variant, Layer[]> = {
  hero: [
    {
      className: "bg-svg mix-screen opacity-70",
      style: {
        backgroundImage: 'url("/backgrounds/hero-constellation.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        transformOrigin: "50% 50%"
      },
      animate: { scale: [1, 1.06, 1], x: [-18, 14, -18], y: [-10, 12, -10] },
      transition: LOOP_TRANSITION
    },
    {
      className: "bg-svg mix-overlay opacity-28",
      style: {
        backgroundImage: DATA_URI_RIBBON,
        backgroundSize: "1600px 900px",
        backgroundPosition: "center",
        transformOrigin: "50% 50%"
      },
      animate: { rotate: [0, 2.2, -1.6, 0], scale: [1.05, 1.12, 1.05] },
      transition: { ...LOOP_TRANSITION, duration: 62 }
    },
    {
      className: "bg-svg mix-screen opacity-18",
      style: {
        backgroundImage: DATA_URI_AURORA,
        backgroundSize: "1400px 1400px",
        backgroundPosition: "50% 20%",
        transformOrigin: "50% 50%"
      },
      animate: { x: [-24, 18, -24], y: [-14, 20, -14] },
      transition: { ...LOOP_TRANSITION, duration: 58 }
    },
    {
      className: "bg-svg mix-screen opacity-18",
      style: {
        backgroundImage: DATA_URI_STARFIELD,
        backgroundSize: "800px 800px",
        backgroundRepeat: "repeat"
      },
      animate: { opacity: [0.12, 0.32, 0.18], rotate: [0, 4, 0] },
      transition: { ...LOOP_TRANSITION, duration: 64 }
    },
    {
      className: "absolute top-0 left-0 opacity-45",
      style: {
        width: "112px",
        height: "112px",
        backgroundImage: 'url("/backgrounds/corner-accent.svg")',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        transformOrigin: "20% 20%"
      },
      animate: { rotate: [0, 10, -4, 0] },
      transition: { ...ORBIT_TRANSITION, duration: 46 }
    }
  ],
  vision: [
    {
      className: "bg-svg mix-softlight opacity-55",
      style: {
        backgroundImage: 'url("/backgrounds/vision-lines.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { y: [-18, 18, -18] },
      transition: FLOAT_TRANSITION
    },
    {
      className: "bg-svg mix-screen opacity-20",
      style: {
        backgroundImage: DATA_URI_AURORA,
        backgroundSize: "1400px 1400px",
        backgroundPosition: "50% 20%"
      },
      animate: { x: [-16, 16, -16], y: [-12, 12, -12], rotate: [0, 8, 0] },
      transition: { ...FLOAT_TRANSITION, duration: 44 }
    }
  ],
  atlas: [
    {
      className: "bg-svg mix-overlay opacity-65",
      style: {
        backgroundImage: 'url("/backgrounds/atlas-waves.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { y: [-26, 18, -26] },
      transition: { ...FLOAT_TRANSITION, duration: 42 }
    }
  ],
  packages: [
    {
      className: "bg-svg mix-softlight opacity-55",
      style: {
        backgroundImage: 'url("/backgrounds/packages-silk.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { x: [-18, 18, -18] },
      transition: { ...FLOAT_TRANSITION, duration: 48 }
    }
  ],
  tiers: [
    {
      className: "bg-svg mix-overlay opacity-55",
      style: {
        backgroundImage: 'url("/backgrounds/tiers-strata.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { y: [-20, 24, -20] },
      transition: { ...FLOAT_TRANSITION, duration: 40 }
    }
  ],
  cases: [
    {
      className: "bg-svg mix-screen opacity-40",
      style: {
        backgroundImage: 'url("/backgrounds/cases-lattice.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { x: [-14, 14, -14] },
      transition: { ...FLOAT_TRANSITION, duration: 38 }
    }
  ],
  configurator: [
    {
      className: "bg-svg mix-softlight opacity-55",
      style: {
        backgroundImage: 'url("/backgrounds/marble.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { y: [-12, 12, -12] },
      transition: { ...FLOAT_TRANSITION, duration: 34 }
    },
    {
      className: "bg-svg mix-overlay opacity-28",
      style: {
        backgroundImage: DATA_URI_VEIN,
        backgroundSize: "1200px 1200px"
      },
      animate: { x: [-14, 14, -14] },
      transition: { ...FLOAT_TRANSITION, duration: 40 }
    }
  ],
  contact: [
    {
      className: "bg-svg mix-softlight opacity-60",
      style: {
        backgroundImage: 'url("/backgrounds/contact-veil.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { y: [-16, 16, -16] },
      transition: { ...FLOAT_TRANSITION, duration: 46 }
    }
  ],
  guarantee: [
    {
      className: "bg-svg mix-screen opacity-55",
      style: {
        backgroundImage: 'url("/backgrounds/guarantee-particles.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { scale: [1, 1.05, 1], opacity: [0.55, 0.7, 0.55] },
      transition: { ...FLOAT_TRANSITION, duration: 42 }
    }
  ],
  concierge: [
    {
      className: "bg-svg mix-screen opacity-65",
      style: {
        backgroundImage: 'url("/backgrounds/concierge-orbital.svg")',
        backgroundSize: "520px 520px",
        backgroundPosition: "80% 20%",
        transformOrigin: "80% 20%"
      },
      animate: { rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] },
      transition: { ...ORBIT_TRANSITION, duration: 54 }
    }
  ],
  nav: [
    {
      className: "bg-svg mix-overlay opacity-70",
      style: {
        backgroundImage: 'url("/backgrounds/nav-flare.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { y: [-8, 6, -8], opacity: [0.6, 0.75, 0.6] },
      transition: { ...FLOAT_TRANSITION, duration: 52 }
    },
    {
      className: "bg-svg mix-screen opacity-28",
      style: {
        backgroundImage: DATA_URI_STARFIELD,
        backgroundSize: "600px 600px",
        backgroundRepeat: "repeat"
      },
      animate: { x: [-12, 12, -12] },
      transition: { ...FLOAT_TRANSITION, duration: 46 }
    }
  ],
  footer: [
    {
      className: "bg-svg mix-overlay opacity-75",
      style: {
        backgroundImage: 'url("/backgrounds/footer-flare.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center"
      },
      animate: { scale: [1, 1.04, 1], y: [-10, 6, -10] },
      transition: { ...FLOAT_TRANSITION, duration: 58 }
    },
    {
      className: "bg-svg mix-screen opacity-24",
      style: {
        backgroundImage: DATA_URI_STARFIELD,
        backgroundSize: "520px 520px",
        backgroundRepeat: "repeat"
      },
      animate: { opacity: [0.16, 0.28, 0.16], y: [-6, 6, -6] },
      transition: { ...FLOAT_TRANSITION, duration: 48 }
    }
  ],
  marble: [
    {
      className: "bg-svg mix-softlight opacity-35",
      style: {
        backgroundImage: 'url("/backgrounds/marble.svg")',
        backgroundSize: "cover"
      },
      animate: { y: [-10, 10, -10] },
      transition: { ...FLOAT_TRANSITION, duration: 30 }
    }
  ],
  noise: [
    {
      className: "bg-svg mix-screen opacity-25",
      style: {
        backgroundImage: 'url("/backgrounds/noise.svg")',
        backgroundSize: "420px 420px"
      },
      animate: { opacity: [0.18, 0.32, 0.18] },
      transition: { duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
    }
  ],
  aurora: [
    {
      className: "bg-svg mix-screen opacity-35",
      style: {
        backgroundImage: DATA_URI_AURORA,
        backgroundSize: "cover"
      },
      animate: { x: [-14, 14, -14], y: [-10, 10, -10] },
      transition: { ...FLOAT_TRANSITION, duration: 44 }
    }
  ],
  ribbon: [
    {
      className: "bg-svg mix-overlay opacity-32",
      style: {
        backgroundImage: DATA_URI_RIBBON,
        backgroundSize: "1600px 900px"
      },
      animate: { rotate: [0, 3, -3, 0] },
      transition: { ...LOOP_TRANSITION, duration: 68 }
    }
  ],
  vein: [
    {
      className: "bg-svg mix-softlight opacity-28",
      style: {
        backgroundImage: DATA_URI_VEIN,
        backgroundSize: "1200px 1200px"
      },
      animate: { x: [-10, 10, -10] },
      transition: { ...FLOAT_TRANSITION, duration: 36 }
    }
  ]
};

export default function BackgroundManager({ variant = "hero" }: { variant?: Variant }) {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {(LAYERS[variant] ?? []).map((layer, index) => (
        <motion.div
          key={layer.key ?? index}
          className={layer.className}
          style={layer.style}
          initial={layer.initial}
          animate={layer.animate}
          transition={layer.transition}
        />
      ))}
    </div>
  );
}
