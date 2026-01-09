function normalizeBaseUrl(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.trim()) return normalizeBaseUrl(explicit.trim());

  return "https://drmcgi.co.za";
}
