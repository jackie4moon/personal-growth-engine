import type { MetadataRoute } from 'next'

/**
 * Site is link-only by design — no Google indexing, no crawler access.
 * Recruiters land here via direct links shared by Julian, not via search.
 *
 * Belt-and-suspenders with the per-page robots meta tags set in layout.tsx:
 * - layout.tsx metadata.robots → tells crawlers not to index
 * - robots.ts → tells crawlers not to crawl in the first place
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  }
}
