export function redirectToUrl(url: string, newTab = true) {
  return () => window.open(url, newTab ? "_blank" : "_self", "noopener,noreferrer");
}
