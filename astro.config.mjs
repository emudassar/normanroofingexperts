// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://normanroofingexperts.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline only genuinely small stylesheets; keep the shared sheet cacheable.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      // The 404 is not indexable and must not appear in the sitemap.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      // No global lastmod: stamping every URL with the build time on each deploy
      // teaches Google to ignore lastmod (2026-10-16 SEO report, ticket 3).
    }),
  ],
  // Self-hosted, preloaded, subset webfonts — no render-blocking request to
  // fonts.googleapis.com and no layout shift from a fallback swap.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Sora',
      cssVariable: '--font-display',
      weights: [600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  ],
});
