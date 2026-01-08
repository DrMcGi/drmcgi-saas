import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "72px 16px", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: 0, lineHeight: 1.05 }}>Page not found.</h1>
      <p style={{ marginTop: 12, maxWidth: 720 }}>
        The link might be broken, or the page may have moved.
      </p>
      <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link className="btn-gold" href="/">
          Back to home
        </Link>
        <Link className="btn-ghost" href="/#contact">
          Contact
        </Link>
      </div>
    </main>
  );
}
