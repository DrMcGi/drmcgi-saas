"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Intentionally minimal: keep UX clean, avoid noisy logs.
    console.error("App error:", error);
  }, [error]);

  return (
    <main style={{ padding: "72px 16px", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: 0, lineHeight: 1.05 }}>Something went wrong.</h1>
      <p style={{ marginTop: 12, maxWidth: 720 }}>
        Refreshing usually fixes it. If it persists, try again in a moment.
      </p>
      <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="btn-gold" onClick={() => reset()}>
          Retry
        </button>
        <Link className="btn-ghost" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
