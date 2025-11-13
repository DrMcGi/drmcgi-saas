"use client";

import { ReactNode, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

type WalkerType = "bot" | "scout" | "terminal";

type WalkerConfig = {
  id: string;
  type: WalkerType;
  yRange: [number, number];
  driftRange: [number, number];
  speedRange: [number, number];
  pauseRange: [number, number];
  scale: number;
};

type WalkerProps = Omit<WalkerConfig, "id">;

const WALKERS: WalkerConfig[] = [
  { id: "bot", type: "bot", yRange: [30, 62], driftRange: [-8, 8], speedRange: [18, 26], pauseRange: [2600, 5200], scale: 1 },
  { id: "scout", type: "scout", yRange: [12, 36], driftRange: [-5, 5], speedRange: [16, 22], pauseRange: [2400, 4600], scale: 0.78 },
  { id: "terminal", type: "terminal", yRange: [58, 82], driftRange: [-4, 6], speedRange: [22, 32], pauseRange: [3400, 6200], scale: 1.08 }
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function sleep(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function Walker({ type, yRange, driftRange, speedRange, pauseRange, scale }: WalkerProps) {
  const controls = useAnimationControls();
  const [minY, maxY] = yRange;
  const [minDrift, maxDrift] = driftRange;
  const [minSpeed, maxSpeed] = speedRange;
  const [minPause, maxPause] = pauseRange;

  useEffect(() => {
    let active = true;

    const loop = async () => {
      while (active) {
        const startY = randomBetween(minY, maxY);
        const drift = randomBetween(minDrift, maxDrift);
        const duration = randomBetween(minSpeed, maxSpeed);
        const pause = randomBetween(minPause, maxPause);

        controls.set({ x: "-22vw", y: `${startY}vh`, opacity: 0, rotate: 0, scale });
        await controls.start({ opacity: 1, transition: { duration: 0.75, ease: "easeOut" } });
        await controls.start({ x: "118vw", y: `${startY + drift}vh`, rotate: drift / 2, transition: { duration, ease: "linear" } });
        await controls.start({ opacity: 0, transition: { duration: 0.6, ease: "easeIn" } });
        await sleep(pause);
      }
    };

    loop();
    return () => {
      active = false;
    };
  }, [controls, minY, maxY, minDrift, maxDrift, minSpeed, maxSpeed, minPause, maxPause, scale]);

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
  }

  return (
    <motion.div className={`wallpaper-walker ${type}`} animate={controls} initial={false}>
      {content}
    </motion.div>
  );
}

export default function LiveWallpaper() {
  return (
    <div className="live-wallpaper" aria-hidden>
      <motion.div
        className="atlas-orb"
        animate={{ x: ["-8%", "12%", "18%", "-4%"], y: ["-14%", "-4%", "-12%", "-14%"], rotate: [0, 8, -6, 0], opacity: [0.18, 0.32, 0.22, 0.18] }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div className="atlas-rings" animate={{ rotate: 360 }} transition={{ duration: 68, repeat: Infinity, ease: "linear" }} />

      <motion.div
        className="atlas-grid"
        animate={{ backgroundPosition: ["0% 0%", "80% 80%", "0% 0%"], opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 54, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="atlas-constellation"
        animate={{ x: ["-6%", "6%", "-6%"], y: ["-2%", "4%", "-2%"], opacity: [0.12, 0.3, 0.12] }}
        transition={{ duration: 62, repeat: Infinity, ease: "easeInOut" }}
      />

      {WALKERS.map(({ id, ...config }) => (
        <Walker key={id} {...config} />
      ))}
    </div>
  );
}
