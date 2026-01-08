function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.trim()) return normalizeBaseUrl(explicit.trim());

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim()) return normalizeBaseUrl(`https://${vercelUrl.trim()}`);

  return "https://drmcgi.co.za";
}
