# Cinematic WebGL Roadmap (Additive + Safe)

Goal: make the site feel *unlike anything else* while preserving SEO, conversions, and reliability.

Non-negotiables:
- Progressive enhancement: the site must look great with WebGL disabled.
- Additive rollout only: new effects behind feature flags; ability to halt/rollback quickly.
- Respect user/device constraints: `prefers-reduced-motion`, Save-Data, low-power heuristics, and mobile constraints.
- Never block interaction: all WebGL layers remain `pointer-events: none`.

## Feature-Flag Strategy (so we can ship safely)

Recommended flags (one per feature family):
- `NEXT_PUBLIC_WEBGL=1` (master switch; default is ON unless explicitly set to a non-`1` value)
- `NEXT_PUBLIC_WEBGL_MODE=stars|aurora|caustics|scene` (select effect)
- `NEXT_PUBLIC_WEBGL_QUALITY=low|med|high` (DPR cap, particle count)

Runtime gating (already present but we’ll standardize):
- Disable when reduced motion or low-power.
- On mobile portrait: keep effects minimal, avoid hit-testing edge cases.

## Option A — Shader Aurora (High impact, medium risk)

What it is:
- A fullscreen fragment shader (WebGL plane) producing a premium “aurora silk” that responds to time + pointer.

Why it’s special:
- The look is unique and brandable. We can bake gold/cyan palette and signature motion.

Implementation notes:
- Use a full-screen quad (PlaneGeometry) with `ShaderMaterial`.
- Keep to 1–2 passes only (no heavy postprocessing).

Perf knobs:
- DPR cap (e.g. 1.25–1.75)
- update rate throttling on low-power (e.g. 30fps)

Risks:
- Shader authoring complexity.
- Some Android GPUs are finicky; needs robust fallback.

## Option B — Gold Caustics / Marble Veins (Very high impact, medium risk)

What it is:
- Caustics-like moving light patterns (gold) and faint marble “veins” (white) layered into the background.

Implementation:
- Either shader-based procedural caustics OR scrolling noise textures.
- Prefer procedural to avoid big textures.

Perf knobs:
- Turn off on coarse-pointer by default.
- Reduce frequency/amplitude on low-power.

## Option C — Postprocessing (Bloom/Chromatic/DOF) (High impact, higher risk)

What it is:
- Three.js EffectComposer pipeline (bloom, vignette, color grading).

Recommendation:
- Only if needed; it’s the fastest way to blow perf budgets.
- If we do it, do it *surgically*:
  - 1 composer
  - 1 bloom pass
  - no depth-of-field on mobile

Risk:
- Significant GPU + bundle complexity.

## Option D — Scroll-Synced Scene Chapters (World-class feel, highest value)

What it is:
- Background is “chaptered” by section: hero → vision → atlas → packages…
- Scene parameters tween based on scroll progress.

How it stays safe:
- Only animate uniforms/positions, not massive scene rebuilds.
- Use `IntersectionObserver` + a single RAF loop.

Implementation:
- Define a small “scene state” object: palette, star density, aurora intensity, vignette.
- As the user scrolls into sections, interpolate targets.

Risks:
- Coordination required with layout and content.

## Option E — Gyro Parallax on Mobile (Huge wow, needs consent)

What it is:
- DeviceOrientation-driven parallax.

Guardrails:
- Only on HTTPS + after user gesture where required.
- Provide toggle / respect OS permission.

Risk:
- Permissions + UX complexity.

## Option F — Interactive Cursor Refraction (Desktop wow, low risk)

What it is:
- A soft refraction/halo following cursor, affecting shader parameters.

Notes:
- Keeps interactions intact since it’s purely visual.

## Option G — “Cinematic Performance Mode” (Necessary for global reach)

What it is:
- A UI toggle (or auto-detect) that degrades effects gracefully.

Levels:
- `High`: full shader + stars + chapter transitions
- `Medium`: stars + subtle vignette
- `Low`: static CSS gradients only

## Safe Rollout Plan (Recommended)

Stage 1 (Additive, low risk)
- Add feature flag plumbing + quality modes.
- Add shader aurora OR caustics (pick one) with default OFF.

Stage 2 (Wow factor)
- Add scroll-synced chapters (still behind flag).

Stage 3 (Polish)
- Add optional desktop cursor refraction.
- Add optional mobile gyro with permission flow.

Stage 4 (Optional)
- Consider limited postprocessing if it truly adds value.

## “Stop / Halt” Rules (when we pause)

We halt the feature if any of these happen:
- Interaction bugs (tap/click blocked) or hit-testing regressions.
- Mobile battery drain or jank (noticeable frame drops).
- Build size spikes (large chunk growth) without strong payoff.

## Next decision

Pick the next one to implement first (recommended order):
1) Shader Aurora
2) Scroll Chapters
3) Cursor Refraction
4) Mobile Gyro

