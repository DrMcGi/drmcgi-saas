"use client";

import { ReactNode, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type WalkerType = "bot" | "scout" | "terminal" | "cheese" | "pizza";

type WalkerConfig = {
  id: string;
  type: WalkerType;
  yRange: [number, number];
  driftRange: [number, number];
  speedRange: [number, number];
  pauseRange: [number, number];
  scale: number;
};

type WalkerProps = WalkerConfig & { disableMotion: boolean };

const WALKERS: WalkerConfig[] = [
  { id: "bot", type: "bot", yRange: [30, 62], driftRange: [-8, 8], speedRange: [18, 26], pauseRange: [2600, 5200], scale: 1 },
  { id: "scout", type: "scout", yRange: [12, 36], driftRange: [-5, 5], speedRange: [16, 22], pauseRange: [2400, 4600], scale: 0.78 },
  { id: "terminal", type: "terminal", yRange: [58, 82], driftRange: [-4, 6], speedRange: [22, 32], pauseRange: [3400, 6200], scale: 1.08 },
  { id: "cheese", type: "cheese", yRange: [18, 44], driftRange: [-6, 5], speedRange: [20, 28], pauseRange: [2800, 5200], scale: 0.92 },
  { id: "pizza", type: "pizza", yRange: [44, 72], driftRange: [-7, 6], speedRange: [24, 34], pauseRange: [3200, 5800], scale: 1 }
];

function hashToUnit(seed: string) {
  let h1 = 0xdeadbeef ^ seed.length;
  let h2 = 0x41c6ce57 ^ seed.length;

  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);

  const combined = (h1 ^ h2) >>> 0;
  return combined / 4294967296;
}

function randomBetweenSeed(base: string, min: number, max: number) {
  return hashToUnit(base) * (max - min) + min;
}

function Walker({ id, type, yRange, driftRange, speedRange, pauseRange, scale, disableMotion }: WalkerProps) {
  const [minY, maxY] = yRange;
  const [minDrift, maxDrift] = driftRange;
  const [minSpeed, maxSpeed] = speedRange;
  const [minPause, maxPause] = pauseRange;

  const motionConfig = useMemo(() => {
    const baseKey = `${id}-${type}`;
    const startY = randomBetweenSeed(`${baseKey}:start`, minY, maxY);
    const drift = randomBetweenSeed(`${baseKey}:drift`, minDrift, maxDrift);
    const endY = startY + drift;
    const duration = randomBetweenSeed(`${baseKey}:speed`, minSpeed, maxSpeed);
    const repeatDelay = randomBetweenSeed(`${baseKey}:pause`, minPause, maxPause) / 1000;
    const delayOffset = randomBetweenSeed(`${baseKey}:offset`, 0, 1.5);

    return { startY, endY, drift, duration, repeatDelay, delayOffset };
  }, [id, type, minDrift, maxDrift, minPause, maxPause, minSpeed, maxSpeed, minY, maxY]);

  let content: ReactNode = null;

  if (type === "bot") {
    content = (
      <div className="wallpaper-bot">
        <div className="bot-shell">
          <span className="bot-antenna" />
          <span className="bot-head">
            <span className="bot-eye" />
            <span className="bot-eye" />
          </span>
          <span className="bot-body" />
          <span className="bot-leg bot-leg-left" />
          <span className="bot-leg bot-leg-right" />
        </div>
      </div>
    );
  } else if (type === "scout") {
    content = (
      <div className="wallpaper-scout">
        <span className="scout-orb" />
        <span className="scout-ring" />
        <span className="scout-tail" />
      </div>
    );
  } else if (type === "terminal") {
    content = (
      <div className="wallpaper-terminal">
        <div className="terminal-screen">
          <span className="terminal-scan" />
          <span className="terminal-pixel" />
          <span className="terminal-pixel" />
        </div>
        <div className="terminal-base" />
        <div className="terminal-legs">
          <span />
          <span />
        </div>
      </div>
    );
  } else if (type === "cheese") {
    content = (
      <div className="wallpaper-cheese">
        <span className="cheese-label">Cheese by DrMcGi</span>
        <span className="cheese-wedge">
          <span className="cheese-edge" />
          <span className="cheese-spot" />
          <span className="cheese-spot spot-b" />
          <span className="cheese-spot spot-c" />
        </span>
      </div>
    );
  } else if (type === "pizza") {
    content = (
      <div className="wallpaper-pizza">
        <span className="pizza-label">{"Let's Keep Dairy"}</span>
        <span className="pizza-slice">
          <span className="pizza-crust" />
          <span className="pizza-body" />
          <span className="pizza-glisten" />
          <span className="pizza-topping" />
          <span className="pizza-topping topping-b" />
          <span className="pizza-steam" />
        </span>
      </div>
    );
  }

  const motionProps = disableMotion
    ? {
        initial: { opacity: 0.4, x: `${(motionConfig.startY % 36) - 18}vw`, y: `${motionConfig.startY}vh`, scale },
        animate: { opacity: 0.32, x: `${(motionConfig.startY % 36) - 12}vw`, y: `${motionConfig.startY}vh`, scale },
        transition: { duration: 7, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const }
      }
    : {
        initial: { opacity: 0, x: "-22vw", y: `${motionConfig.startY}vh`, scale },
        animate: {
          x: ["-22vw", "118vw"],
          y: [`${motionConfig.startY}vh`, `${motionConfig.endY}vh`],
          opacity: [0, 1, 1, 0],
          rotate: [0, motionConfig.drift / 2, motionConfig.drift / 2, motionConfig.drift / 2],
          scale
        },
        transition: {
          duration: motionConfig.duration,
          ease: "linear" as const,
          repeat: Infinity,
          repeatType: "loop" as const,
          repeatDelay: motionConfig.repeatDelay,
          times: [0, 0.08, 0.92, 1],
          delay: motionConfig.delayOffset
        }
      };

  return (
    <motion.div
      className={`wallpaper-walker ${type}`}
      style={{ willChange: disableMotion ? undefined : "transform, opacity" }}
      {...motionProps}
    >
      {content}
    </motion.div>
  );
}

export default function LiveWallpaper() {
  const prefersReducedMotion = useReducedMotion();
  const disableMotion = Boolean(prefersReducedMotion);

  return (
    <div className="live-wallpaper" aria-hidden="true">
      <motion.div
        className="atlas-orb"
        style={{ willChange: disableMotion ? undefined : "transform, opacity" }}
        initial={{ opacity: 0 }}
        animate={
          disableMotion
            ? { opacity: 0.28, x: "-4%", y: "-12%", rotate: 0 }
            : { opacity: [0.18, 0.32, 0.22, 0.18], x: ["-8%", "12%", "18%", "-4%"], y: ["-14%", "-4%", "-12%", "-14%"], rotate: [0, 8, -6, 0] }
        }
        transition={disableMotion ? { duration: 1 } : { duration: 48, repeat: Infinity, ease: "easeInOut" as const }}
      />

      <motion.div
        className="atlas-rings"
        style={{ willChange: disableMotion ? undefined : "transform, opacity" }}
        initial={{ opacity: 0.4 }}
        animate={disableMotion ? { opacity: 0.4, rotate: 0 } : { opacity: 1, rotate: 360 }}
        transition={disableMotion ? { duration: 1 } : { duration: 68, repeat: Infinity, ease: "linear" as const }}
      />

      <motion.div
        className="atlas-grid"
        style={{ willChange: disableMotion ? undefined : "background-position, opacity" }}
        initial={{ opacity: 0.12 }}
        animate={
          disableMotion
            ? { opacity: 0.18, backgroundPosition: "0% 0%" }
            : { opacity: [0.16, 0.28, 0.16], backgroundPosition: ["0% 0%", "80% 80%", "0% 0%"] }
        }
        transition={disableMotion ? { duration: 1.2 } : { duration: 54, repeat: Infinity, ease: "easeInOut" as const }}
      />

      <motion.div
        className="atlas-constellation"
        style={{ willChange: disableMotion ? undefined : "transform, opacity" }}
        initial={{ opacity: 0.1 }}
        animate={
          disableMotion ? { opacity: 0.18, x: "-2%", y: "-1%" } : { opacity: [0.12, 0.3, 0.12], x: ["-6%", "6%", "-6%"], y: ["-2%", "4%", "-2%"] }
        }
        transition={disableMotion ? { duration: 1.2 } : { duration: 62, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {WALKERS.map((walker) => (
        <Walker key={walker.id} disableMotion={disableMotion} {...walker} />
      ))}
    </div>
  );
}
