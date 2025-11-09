"use client";
import { create } from "zustand";

type State = {
  selected: Set<string>;
  activeTier?: string | null;
  activePackage?: string | null;
  toggle: (id: string) => void;
  applyTier: (mods: string[], tierId: string) => void;
  applyPackage: (feats: string[], pkgId: string) => void;
};

export const useApp = create<State>((set, get) => ({
  selected: new Set(["mvp", "luxuryUI"]),
  activeTier: null,
  activePackage: null,

  toggle: (id) => {
    const s = new Set(get().selected);
    if (s.has(id)) {
      s.delete(id);
    } else {
      s.add(id);
    }
    set({ selected: s, activeTier: null, activePackage: null });
  },

  applyTier: (mods, tierId) => {
    const s = new Set<string>();
    mods.forEach((m) => s.add(m));
    set({ selected: s, activeTier: tierId, activePackage: null });
  },

  applyPackage: (feats, pkgId) => {
    const s = new Set(get().selected);
    const isActive = get().activePackage === pkgId;
    if (isActive) {
      feats.forEach((f) => s.delete(f));
      set({ activePackage: null });
    } else {
      feats.forEach((f) => s.add(f));
      set({ activePackage: pkgId, activeTier: null });
    }
    set({ selected: s });
  },
}));