"use client";

export default function ShimmerText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-linear-to-r from-(--gold) via-(--gold-soft) to-(--gold) bg-size-[200%_auto] animate-[shimmer_6s_linear_infinite] bg-clip-text text-transparent">
      {children}
    </span>
  );
}
