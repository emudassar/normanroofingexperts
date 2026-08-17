import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Reused by every collection that renders an FAQ block + FAQPage schema. */
const faq = z.object({
  question: z.string(),
  answer: z.string(),
});

/** A titled point, used for "what's included" and local roofing notes. */
const point = z.object({
  title: z.string(),
  body: z.string(),
});

/**
 * Service pages (e.g. "Roof Replacement", "Roof Repair", "Storm Damage").
 * Rendered by src/pages/services/[slug].astro via ServiceLayout.astro.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      /** Short label used in nav, cards and breadcrumbs. */
      title: z.string(),
      /** On-page H1, carries the target keyword. */
      h1: z.string(),
      /** <title> tag. Must be unique across the site. */
      metaTitle: z.string().max(65),
      /** Meta description. Must be unique across the site. */
      description: z.string().min(80).max(160),
      /** Primary keyword this page targets. */
      keyword: z.string(),
      /** One-line summary for service grids and cards. */
      summary: z.string(),
      /** Opening paragraph. Must contain the keyword. */
      intro: z.string(),
      /** Inline SVG icon key. See src/components/ServiceIcon.astro. */
      icon: z.string(),
      /** Sort order across grids and the footer. */
      order: z.number(),
      heroImage: image(),
      heroImageAlt: z.string(),
      /** "What's included": 4-6 points. */
      includes: z.array(point).min(3),
      /** Optional numbered process, rendered as "how it works". */
      process: z.array(point).optional(),
      /** Bulleted signals that a homeowner needs this service. */
      signals: z.array(z.string()).optional(),
      /** Honest cost guidance shown above the FAQ. */
      pricingNote: z.string().optional(),
      faqs: z.array(faq).min(3).max(6),
      /** 2-3 location entries to cross-link to. */
      relatedLocations: z.array(reference('locations')).min(2).max(3),
      draft: z.boolean().default(false),
    }),
});

/**
 * Location / service-area pages. Collection is `locations`; the public URL
 * segment is `/service-areas/` (see docs/sitemap.md).
 */
const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: ({ image }) =>
    z.object({
      /** Area name as locals use it. Never a compass-direction invention. */
      title: z.string(),
      h1: z.string(),
      metaTitle: z.string().max(65),
      description: z.string().min(80).max(160),
      keyword: z.string(),
      summary: z.string(),
      intro: z.string(),
      order: z.number(),
      /** Groups the two blocks in docs/sitemap.md. */
      group: z.enum(['norman', 'surrounding']),
      /** Shown on cards, e.g. "Cleveland County" / "Central Norman". */
      county: z.string(),
      heroImage: image(),
      heroImageAlt: z.string(),
      /** Genuinely area-specific roofing context: 3-5 points. */
      localNotes: z.array(point).min(3),
      /** Housing stock / roof age paragraph. */
      housingStock: z.string(),
      /** Recognisable local reference points, if confidently known. */
      landmarks: z.array(z.string()).optional(),
      faqs: z.array(faq).min(3).max(6),
      /** 2-3 service entries to cross-link to. */
      relatedServices: z.array(reference('services')).min(2).max(3),
      draft: z.boolean().default(false),
    }),
});

/** Long-form guides supporting the storm/hail and materials intent clusters. */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      metaTitle: z.string().max(65),
      description: z.string().min(80).max(160),
      excerpt: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      heroImageAlt: z.string(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { services, locations, blog };
