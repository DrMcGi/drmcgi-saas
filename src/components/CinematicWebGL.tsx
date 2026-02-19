"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function isLikelyLowPower() {
  if (typeof window === "undefined") return true;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : undefined;
  const mem = typeof nav.deviceMemory === "number" ? nav.deviceMemory : undefined;
  const saveData = Boolean(nav.connection?.saveData);

  const coarsePointer = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
  const smallViewport = typeof window.matchMedia === "function" && window.matchMedia("(max-width: 640px)").matches;

  return saveData || (typeof cores === "number" && cores <= 4) || (typeof mem === "number" && mem <= 4) || (coarsePointer && smallViewport);
}

export default function CinematicWebGL() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    if (isLikelyLowPower()) {
      setEnabled(false);
      return;
    }

    // Avoid hydration mismatch: decide after mount.
    setEnabled(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let frame = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const master = process.env.NEXT_PUBLIC_WEBGL;
      if (typeof master === "string" && master !== "1") {
        setEnabled(false);
        return;
      }

      const mode = (process.env.NEXT_PUBLIC_WEBGL_MODE ?? "stars").toLowerCase();
      const quality = (process.env.NEXT_PUBLIC_WEBGL_QUALITY ?? "med").toLowerCase();
      const chaptersEnabled = process.env.NEXT_PUBLIC_WEBGL_CHAPTERS === "1";
      const cursorEnabled = process.env.NEXT_PUBLIC_WEBGL_CURSOR === "1";
      const gyroEnabled = process.env.NEXT_PUBLIC_WEBGL_GYRO === "1";
      const causticsEnabled = process.env.NEXT_PUBLIC_WEBGL_CAUSTICS === "1";

      const qualityConfig = (() => {
        if (quality === "low") {
          return { dprCap: 1.25, starCount: 900, antialias: false };
        }
        if (quality === "high") {
          return { dprCap: 1.75, starCount: 1800, antialias: true };
        }
        return { dprCap: 1.5, starCount: 1400, antialias: true };
      })();

      // WebGL availability check
      const testCanvas = document.createElement("canvas");
      const hasWebGL = Boolean(
        testCanvas.getContext("webgl2") ||
          testCanvas.getContext("webgl") ||
          testCanvas.getContext("experimental-webgl")
      );
      if (!hasWebGL) {
        setEnabled(false);
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: qualityConfig.antialias,
        alpha: true,
        powerPreference: "high-performance"
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
      camera.position.z = 14;

      let fitAuroraToView = () => {};
      let fitCursorToView = () => {};
      let fitCausticsToView = () => {};

      // Keep it crisp but not battery-melting.
      const setSize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        const dpr = Math.min(window.devicePixelRatio || 1, qualityConfig.dprCap);
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height, false);

        fitAuroraToView();
        fitCursorToView();
        fitCausticsToView();
      };

      setSize();
      window.addEventListener("resize", setSize, { passive: true });

      // Subtle fog for depth.
      scene.fog = new THREE.FogExp2(0x020309, 0.06);

      // Starfield particles
      const starCount = qualityConfig.starCount;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);

      const gold = new THREE.Color(0xf7d87b);
      const cyan = new THREE.Color(0x7df9ff);
      const white = new THREE.Color(0xf8fbff);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;

        // Cylinder-ish distribution with depth
        const radius = 10 + Math.random() * 26;
        const theta = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 22;
        const z = -Math.random() * 70;

        positions[i3 + 0] = Math.cos(theta) * radius;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        const mix = Math.random();
        const c = mix < 0.12 ? gold : mix < 0.22 ? cyan : mix < 0.8 ? white : cyan;
        colors[i3 + 0] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
      }

      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const starMat = new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const stars = new THREE.Points(starGeo, starMat);
      stars.position.z = -6;
      scene.add(stars);

      // Optional shader aurora (additive-only; default remains stars/ribbon).
      let auroraGeo: import("three").PlaneGeometry | null = null;
      let auroraMat: import("three").ShaderMaterial | null = null;
      let auroraMesh: import("three").Mesh | null = null;

      // Optional cursor refraction/halo (desktop-only, additive).
      let cursorGeo: import("three").PlaneGeometry | null = null;
      let cursorMat: import("three").ShaderMaterial | null = null;
      let cursorMesh: import("three").Mesh | null = null;

      // Optional caustics/marble layer (additive, very subtle).
      let causticsGeo: import("three").PlaneGeometry | null = null;
      let causticsMat: import("three").ShaderMaterial | null = null;
      let causticsMesh: import("three").Mesh | null = null;

      const buildAurora = () => {
        if (mode !== "aurora") return;

        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uIntensity;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.55;
            for (int i = 0; i < 4; i++) {
              v += a * noise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          vec3 palette(float t) {
            // gold ↔ cyan ↔ deep-night
            vec3 gold = vec3(0.97, 0.85, 0.48);
            vec3 cyan = vec3(0.49, 0.98, 1.0);
            vec3 night = vec3(0.02, 0.03, 0.06);
            vec3 mid = mix(cyan, gold, smoothstep(0.1, 0.9, t));
            return mix(night, mid, t);
          }

          void main() {
            vec2 uv = vUv;

            // Aspect-correct centered coords
            vec2 p = uv * 2.0 - 1.0;
            p.x *= uResolution.x / max(1.0, uResolution.y);

            // Pointer gently bends the flow
            vec2 ptr = (uPointer * 2.0 - 1.0);
            float ptrLen = clamp(length(ptr), 0.0, 1.0);

            float t = uTime;
            vec2 flow = p;
            flow += 0.18 * vec2(sin(t * 0.12 + p.y * 2.2), cos(t * 0.10 + p.x * 1.7));
            flow += 0.22 * ptr * (0.25 + 0.35 * ptrLen);

            float n = fbm(flow * 1.35 + vec2(0.0, t * 0.06));
            float bands = sin((p.y + n * 0.55) * 3.6 + t * 0.35);
            bands = 0.5 + 0.5 * bands;

            float veil = smoothstep(1.25, 0.1, length(p));
            float strength = bands * veil;
            strength = pow(strength, 1.35);

            vec3 col = palette(strength);

            float alpha = strength * (0.28 + 0.18 * n) * uIntensity;
            gl_FragColor = vec4(col, alpha);
          }
        `;

        auroraGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        auroraMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uPointer: { value: new THREE.Vector2(0.5, 0.5) },
            uIntensity: { value: 1.15 }
          },
          vertexShader,
          fragmentShader
        });

        auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
        auroraMesh.position.set(0, 0, -40);
        scene.add(auroraMesh);
      };

      const buildCursorHalo = () => {
        if (!cursorEnabled) return;

        const finePointer = typeof window.matchMedia === "function" && window.matchMedia("(pointer: fine)").matches;
        if (!finePointer) return;

        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        // Note: this is a lightweight “lens/halo” impression (no render-to-texture sampling).
        const fragmentShader = `
          precision highp float;
          varying vec2 vUv;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uStrength;

          float gauss(float x, float sigma) {
            return exp(-(x * x) / (2.0 * sigma * sigma));
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv;

            // Aspect-correct distance field from pointer
            vec2 d = (p - uPointer);
            d.x *= uResolution.x / max(1.0, uResolution.y);

            float r = length(d);

            // Inner glow + ring
            float inner = gauss(r, 0.16);
            float ring = gauss(r - 0.22, 0.06);

            // Very subtle chroma split impression
            float chroma = gauss(r - 0.24, 0.07);
            vec3 col = vec3(0.0);
            col += vec3(0.14, 0.10, 0.04) * inner;
            col += vec3(0.10, 0.22, 0.26) * ring;
            col += vec3(0.10, 0.18, 0.22) * chroma;

            // Fade to edges; keep super premium/subtle
            float vign = smoothstep(1.2, 0.15, length((uv * 2.0 - 1.0) * vec2(uResolution.x / max(1.0, uResolution.y), 1.0)));

            float a = (inner * 0.06 + ring * 0.10 + chroma * 0.06) * uStrength * vign;
            gl_FragColor = vec4(col, a);
          }
        `;

        cursorGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        cursorMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uPointer: { value: new THREE.Vector2(0.5, 0.5) },
            uStrength: { value: 1 }
          },
          vertexShader,
          fragmentShader
        });

        cursorMesh = new THREE.Mesh(cursorGeo, cursorMat);
        cursorMesh.position.set(0, 0, -26);
        scene.add(cursorMesh);
      };

      const buildCaustics = () => {
        if (!causticsEnabled) return;

        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        // Procedural caustics + faint marble veins. No textures, single pass.
        const fragmentShader = `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uPointer;
          uniform float uIntensity;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(41.13, 289.97))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.55;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          float causticField(vec2 p) {
            // Warp -> sharpen -> caustic-like highlights
            float n1 = fbm(p * 1.6);
            float n2 = fbm(p * 2.7 + vec2(0.0, 3.1));
            float w = n1 * 0.65 + n2 * 0.35;
            float bands = sin((p.x + w * 1.1) * 6.0) * cos((p.y - w * 0.9) * 6.2);
            bands = 0.5 + 0.5 * bands;
            float sharp = pow(bands, 5.0);
            return sharp;
          }

          float veins(vec2 p) {
            // Marble-ish veins: ridged noise
            float n = fbm(p * 1.9);
            float r = 1.0 - abs(2.0 * n - 1.0);
            r = pow(r, 3.5);
            return r;
          }

          void main() {
            vec2 uv = vUv;
            vec2 p = uv * 2.0 - 1.0;
            p.x *= uResolution.x / max(1.0, uResolution.y);

            vec2 ptr = (uPointer * 2.0 - 1.0);
            float t = uTime;

            // slow drift + pointer pull
            vec2 q = p;
            q += 0.10 * vec2(sin(t * 0.18 + p.y * 1.4), cos(t * 0.16 + p.x * 1.2));
            q += ptr * 0.10;
            q += vec2(t * 0.02, -t * 0.018);

            float c = causticField(q * 1.35);
            float v = veins(q * 0.85 + vec2(2.2, -1.7));

            // edge fade, keep it luxurious/subtle
            float veil = smoothstep(1.35, 0.12, length(p));

            vec3 gold = vec3(0.98, 0.85, 0.45);
            vec3 pearl = vec3(0.95, 0.97, 1.0);

            vec3 col = gold * c + pearl * (v * 0.28);
            float alpha = (c * 0.18 + v * 0.10) * veil * uIntensity;

            gl_FragColor = vec4(col, alpha);
          }
        `;

        causticsGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
        causticsMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uPointer: { value: new THREE.Vector2(0.5, 0.5) },
            uIntensity: { value: 0.75 }
          },
          vertexShader,
          fragmentShader
        });

        causticsMesh = new THREE.Mesh(causticsGeo, causticsMat);
        causticsMesh.position.set(0, 0, -34);
        scene.add(causticsMesh);
      };

      // A soft “ribbon” plane (very lightweight), just for cinematic sheen.
      const ribbonGeo = new THREE.PlaneGeometry(44, 18, 1, 1);
      const ribbonMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
      ribbon.rotation.x = -0.2;
      ribbon.rotation.y = 0.25;
      ribbon.position.set(-6, 2.5, -24);
      scene.add(ribbon);

      // Build optional aurora after core scene is ready.
      buildAurora();
      buildCursorHalo();
      buildCaustics();

      fitAuroraToView = () => {
        if (!auroraMesh) return;
        const distance = camera.position.z - auroraMesh.position.z;
        const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance;
        const width = height * camera.aspect;
        auroraMesh.scale.set(width, height, 1);
        auroraMat?.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      };

      fitCursorToView = () => {
        if (!cursorMesh) return;
        const distance = camera.position.z - cursorMesh.position.z;
        const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance;
        const width = height * camera.aspect;
        cursorMesh.scale.set(width, height, 1);
        cursorMat?.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      };

      fitCausticsToView = () => {
        if (!causticsMesh) return;
        const distance = camera.position.z - causticsMesh.position.z;
        const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * distance;
        const width = height * camera.aspect;
        causticsMesh.scale.set(width, height, 1);
        causticsMat?.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      };

      fitAuroraToView();
      fitCursorToView();
      fitCausticsToView();

      // Pointer-driven parallax (touch-friendly: listens but never blocks).
      let targetX = 0;
      let targetY = 0;
      let prevTargetX = 0;
      let prevTargetY = 0;
      let pointerEnergy = 0;

      // Optional gyro parallax (mobile) — permission-gated on iOS.
      const coarsePointer = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
      let gyroX = 0;
      let gyroY = 0;
      let targetGyroX = 0;
      let targetGyroY = 0;
      let gyroActive = false;
      const gyroStorageKey = "drmcgi:webglGyro";

      const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

      const onDeviceOrientation = (event: DeviceOrientationEvent) => {
        // gamma: left/right tilt (-90..90), beta: front/back tilt (-180..180)
        const gamma = typeof event.gamma === "number" ? event.gamma : 0;
        const beta = typeof event.beta === "number" ? event.beta : 0;

        // Map to a small camera offset in world units.
        targetGyroX = clamp(gamma / 45, -1, 1) * 0.55;
        targetGyroY = clamp(-beta / 45, -1, 1) * 0.38;
      };

      const enableGyro = () => {
        if (!gyroEnabled) return;
        if (!coarsePointer) return;
        if (gyroActive) return;

        // Respect an explicit previous opt-out.
        try {
          const stored = window.localStorage.getItem(gyroStorageKey);
          if (stored === "off") return;
        } catch {
          // ignore
        }

        window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });
        gyroActive = true;
      };

      const requestGyroPermissionIfNeeded = async () => {
        if (!gyroEnabled) return;
        if (!coarsePointer) return;

        const maybe = DeviceOrientationEvent as unknown as {
          requestPermission?: () => Promise<"granted" | "denied">;
        };

        if (typeof maybe.requestPermission !== "function") {
          enableGyro();
          return;
        }

        // iOS requires a user gesture. We'll attempt once on first pointerdown.
        let alreadyAsked = false;
        try {
          alreadyAsked = window.localStorage.getItem(gyroStorageKey) === "asked";
        } catch {
          // ignore
        }
        if (alreadyAsked) return;

        try {
          window.localStorage.setItem(gyroStorageKey, "asked");
        } catch {
          // ignore
        }

        try {
          const result = await maybe.requestPermission();
          if (result === "granted") {
            enableGyro();
          } else {
            try {
              window.localStorage.setItem(gyroStorageKey, "off");
            } catch {
              // ignore
            }
          }
        } catch {
          // ignore
        }
      };
      const onPointerMove = (event: PointerEvent) => {
        const nx = (event.clientX / window.innerWidth) * 2 - 1;
        const ny = (event.clientY / window.innerHeight) * 2 - 1;
        targetX = nx;
        targetY = ny;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      // Kick off gyro (permission-gated) only when requested via env.
      const onFirstPointerDown = () => {
        void requestGyroPermissionIfNeeded();
      };
      if (gyroEnabled) {
        window.addEventListener("pointerdown", onFirstPointerDown, { passive: true, once: true });
      }

      // Scroll-synced "scene chapters" (additive + safe)
      // This modulates a few lightweight params per visible section.
      let observer: IntersectionObserver | null = null;
      let chapterElements: HTMLElement[] = [];
      let activeChapterIndex = 0;

      let targetAuroraIntensity = 1.15;
      let currentAuroraIntensity = targetAuroraIntensity;
      let targetCausticsIntensity = 0.75;
      let currentCausticsIntensity = targetCausticsIntensity;
      let targetStarOpacity = starMat.opacity;
      let currentStarOpacity = starMat.opacity;
      let targetRibbonOpacity = ribbonMat.opacity;
      let currentRibbonOpacity = ribbonMat.opacity;

      const applyChapterTargets = (index: number) => {
        // A small hand-tuned curve: calm hero -> brighter mid -> deeper late.
        const t = chapterElements.length > 1 ? index / (chapterElements.length - 1) : 0;
        const aurora = 1.05 + Math.sin(t * Math.PI) * 0.35; // ~1.05..1.40
        const caustics = 0.62 + Math.sin(t * Math.PI) * 0.28; // ~0.62..0.90
        const starsOpacity = 0.72 + (1 - t) * 0.12; // ~0.84..0.72
        const ribbonOpacity = 0.05 + Math.sin(t * Math.PI) * 0.03; // ~0.05..0.08

        targetAuroraIntensity = aurora;
        targetCausticsIntensity = caustics;
        targetStarOpacity = starsOpacity;
        targetRibbonOpacity = ribbonOpacity;
      };

      if (chaptersEnabled) {
        chapterElements = Array.from(document.querySelectorAll<HTMLElement>(".hero-shell, .section-frame"));

        if (chapterElements.length) {
          // Initialize
          applyChapterTargets(0);

          // Use intersection ratio to pick the most "present" section.
          const ratios = new Map<Element, number>();
          observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                ratios.set(entry.target, entry.intersectionRatio);
              }

              let bestEl: Element | null = null;
              let bestRatio = 0;

              for (const el of chapterElements) {
                const r = ratios.get(el) ?? 0;
                if (r > bestRatio) {
                  bestRatio = r;
                  bestEl = el;
                }
              }

              if (!bestEl) return;
              const nextIndex = Math.max(0, chapterElements.indexOf(bestEl as HTMLElement));
              if (nextIndex !== activeChapterIndex) {
                activeChapterIndex = nextIndex;
                applyChapterTargets(activeChapterIndex);
              }
            },
            {
              root: null,
              // center-weighted activation
              rootMargin: "-20% 0px -35% 0px",
              threshold: [0, 0.12, 0.22, 0.35, 0.5, 0.65, 0.8]
            }
          );

          for (const el of chapterElements) observer.observe(el);
        }
      }

      const start = performance.now();

      const tick = (now: number) => {
        if (disposed) return;

        const t = (now - start) / 1000;

        // very subtle drift
        stars.rotation.y = t * 0.02;
        stars.rotation.x = Math.sin(t * 0.15) * 0.02;

        // parallax camera
        if (gyroActive) {
          gyroX += (targetGyroX - gyroX) * 0.08;
          gyroY += (targetGyroY - gyroY) * 0.08;
        } else {
          gyroX += (0 - gyroX) * 0.06;
          gyroY += (0 - gyroY) * 0.06;
        }

        camera.position.x += (targetX * 0.6 + gyroX - camera.position.x) * 0.04;
        camera.position.y += (-targetY * 0.35 + gyroY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, -18);

        // ribbon shimmer
        ribbon.position.x = -6 + Math.sin(t * 0.22) * 1.8;
        ribbon.position.y = 2.5 + Math.cos(t * 0.18) * 1.1;
        ribbon.rotation.z = Math.sin(t * 0.12) * 0.08;

        if (auroraMat) {
          auroraMat.uniforms.uTime.value = t;
          // normalize pointer into 0..1
          const px = (targetX + 1) * 0.5;
          const py = (-targetY + 1) * 0.5;
          auroraMat.uniforms.uPointer.value.set(px, py);

          // smooth chapter-driven intensity
          currentAuroraIntensity += (targetAuroraIntensity - currentAuroraIntensity) * 0.03;
          auroraMat.uniforms.uIntensity.value = currentAuroraIntensity;
        }

        if (causticsMat) {
          causticsMat.uniforms.uTime.value = t;
          const px = (targetX + 1) * 0.5;
          const py = (-targetY + 1) * 0.5;
          causticsMat.uniforms.uPointer.value.set(px, py);
          currentCausticsIntensity += (targetCausticsIntensity - currentCausticsIntensity) * 0.02;
          causticsMat.uniforms.uIntensity.value = currentCausticsIntensity;
        }

        if (cursorMat) {
          const px = (targetX + 1) * 0.5;
          const py = (-targetY + 1) * 0.5;
          cursorMat.uniforms.uPointer.value.set(px, py);

          const dx = targetX - prevTargetX;
          const dy = targetY - prevTargetY;
          const v = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 6);
          pointerEnergy = pointerEnergy * 0.92 + v * 0.08;
          cursorMat.uniforms.uStrength.value = 0.55 + pointerEnergy * 0.9;

          prevTargetX = targetX;
          prevTargetY = targetY;
        }

        // smooth chapter-driven material opacities
        currentStarOpacity += (targetStarOpacity - currentStarOpacity) * 0.02;
        starMat.opacity = currentStarOpacity;

        currentRibbonOpacity += (targetRibbonOpacity - currentRibbonOpacity) * 0.02;
        ribbonMat.opacity = currentRibbonOpacity;

        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);

      const doCleanup = () => {
        disposed = true;
        window.cancelAnimationFrame(frame);
        window.removeEventListener("resize", setSize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onFirstPointerDown);

        if (gyroActive) {
          window.removeEventListener("deviceorientation", onDeviceOrientation);
          gyroActive = false;
        }

        if (observer) {
          observer.disconnect();
          observer = null;
        }

        starGeo.dispose();
        starMat.dispose();
        ribbonGeo.dispose();
        ribbonMat.dispose();

        if (auroraMesh) scene.remove(auroraMesh);
        auroraGeo?.dispose();
        auroraMat?.dispose();

        if (cursorMesh) scene.remove(cursorMesh);
        cursorGeo?.dispose();
        cursorMat?.dispose();

        if (causticsMesh) scene.remove(causticsMesh);
        causticsGeo?.dispose();
        causticsMat?.dispose();

        renderer.dispose();
      };

      // Expose cleanup to the outer effect via closure.
      cleanup = doCleanup;
    })();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cinematic-webgl" aria-hidden="true">
      <canvas ref={canvasRef} className="cinematic-webgl-canvas" />
      <div className="cinematic-webgl-vignette" />
    </div>
  );
}
