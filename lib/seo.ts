export const SITE_URL = 'https://betapower.fr'
export const SITE_NAME = 'BetaPower'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/betapower_logo.png`

/** Returns an absolute canonical URL with trailing slash. */
export function canonical(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`
  return `${SITE_URL}${withSlash}`
}

/*
 * i18n extension point — implement hreflang() here when launching EN/ES:
 *
 * export function hreflang(path: string) {
 *   return {
 *     fr: canonical(path),
 *     en: `https://betapower.fr/en${path}`,
 *     es: `https://betapower.fr/es${path}`,
 *   }
 * }
 *
 * Then in generateMetadata:
 *   alternates: { canonical: canonical(path), languages: hreflang(path) }
 */
