"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

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

type WalkerProps = Omit<WalkerConfig, "id">;

function isLowPowerDevice() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const cores = navigator.hardwareConcurrency;
  const memory = nav.deviceMemory;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  return Boolean(nav.connection?.saveData) || (isCoarsePointer && ((cores !== undefined && cores <= 4) || (memory !== undefined && memory <= 4)));
}

const WALKERS: WalkerConfig[] = [
  { id: "bot", type: "bot", yRange: [30, 62], driftRange: [-8, 8], speedRange: [18, 26], pauseRange: [2600, 5200], scale: 0.65 },
  { id: "scout", type: "scout", yRange: [12, 36], driftRange: [-5, 5], speedRange: [16, 22], pauseRange: [2400, 4600], scale: 0.507 },
  { id: "terminal", type: "terminal", yRange: [58, 82], driftRange: [-4, 6], speedRange: [22, 32], pauseRange: [3400, 6200], scale: 0.702 },
  { id: "cheese", type: "cheese", yRange: [18, 44], driftRange: [-6, 5], speedRange: [20, 28], pauseRange: [2800, 5200], scale: 0.598 },
  { id: "pizza", type: "pizza", yRange: [44, 72], driftRange: [-7, 6], speedRange: [24, 34], pauseRange: [3200, 5800], scale: 0.65 }
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

  return (
    <motion.div className={`wallpaper-walker ${type}`} animate={controls} initial={false}>
      {content}
    </motion.div>
  );
}

export default function LiveWallpaper() {
  const prefersReducedMotion = useReducedMotion();
  const [clip, setClip] = useState({ top: 0, bottom: 0 });
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setLowPower(isLowPowerDevice()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateClip = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>(".hero-shell");
      const footer = document.querySelector<HTMLElement>(".footer-shell");
      const top = hero ? Math.min(window.innerHeight, Math.max(0, hero.getBoundingClientRect().bottom)) : 0;
      const bottom = footer ? Math.min(window.innerHeight, Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)) : 0;

      setClip((previous) => (previous.top === top && previous.bottom === bottom ? previous : { top, bottom }));
    };

    updateClip();
    const scheduleClipUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateClip);
    };

    window.addEventListener("scroll", scheduleClipUpdate, { passive: true });
    window.addEventListener("resize", updateClip);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleClipUpdate);
      window.removeEventListener("resize", updateClip);
    };
  }, []);

  const activeWalkers = useMemo(() => {
    if (!lowPower && !prefersReducedMotion) return WALKERS;
    return WALKERS.filter((walker) => walker.id === "bot");
  }, [lowPower, prefersReducedMotion]);

  return (
    <div className="live-wallpaper" aria-hidden style={{ clipPath: `inset(${clip.top}px 0 ${clip.bottom}px)` }}>
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

      {activeWalkers.map(({ id, ...config }) => (
        <Walker key={id} {...config} />
      ))}
    </div>
  );
}
