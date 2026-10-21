import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Reused by every collection that renders an FAQ block + FAQPage schema. */
const faq = z.object({
  question: z.string(),
  answer: z.string(),
});

/**
 * Leak-repair service pages, served at first-level URLs (/roof-flashing-repair/).
 * Long-form sections live in the markdown body, in the order set by
 * docs/STRATEGY.md; FAQs and cross-links live in frontmatter.
 * Rendered by src/pages/[slug].astro via ServiceLayout.astro.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) => z.object({
    /** Short label used in nav, cards and breadcrumbs. */
    title: z.string(),
    /** On-page H1, carries the target keyword. */
    h1: z.string(),
    /** <title> tag. Must be unique across the site. */
    metaTitle: z.string().max(43),
    /** Meta description. Must be unique across the site. */
    description: z.string().min(80).max(155),
    /** Primary keyword this page targets. */
    keyword: z.string(),
    /** One-line lede under the H1. */
    lede: z.string(),
    /** Bento card blurb on the homepage (~60 words). */
    blurb: z.string(),
    /** Hero background photo (src/assets/photos/), with its alt text. */
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    /** Close-up photo for the "About this repair" split and related cards. */
    image: image().optional(),
    imageAlt: z.string().optional(),
    /** Icon key, see src/components/Icon.astro. */
    icon: z.string(),
    order: z.number(),
    faqs: z.array(faq).min(5).max(6),
    relatedServices: z.array(reference('services')).min(2).max(3),
    relatedLocations: z.array(reference('locations')).min(2).max(3),
    draft: z.boolean().default(false),
  }),
});

/**
 * Nearby-area pages, served at /roof-leak-repair-<town>-md/.
 * Rendered by src/pages/[slug].astro via LocationLayout.astro.
 */
const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: ({ image }) => z.object({
    /** Area name as locals use it. Never a compass-direction invention. */
    title: z.string(),
    h1: z.string(),
    metaTitle: z.string().max(43),
    description: z.string().min(80).max(155),
    keyword: z.string(),
    lede: z.string(),
    /** One paragraph shown in the homepage "areas" section. */
    blurb: z.string(),
    zip: z.string(),
    /** Hero background photo (src/assets/photos/), with its alt text. */
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    order: z.number(),
    faqs: z.array(faq).length(5),
    relatedServices: z.array(reference('services')).min(3).max(4),
    nearby: z.array(reference('locations')).min(2).max(3),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, locations };
