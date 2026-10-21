/**
 * Single source of truth for site-wide business details.
 *
 * This is a pay-per-call referral website, not an operating roofing company
 * (see docs/brief.md and docs/STRATEGY.md). Calls are routed to an independent
 * local roofing provider. Do not add fields that imply a founding date,
 * years-in-business, in-house crews, licences, insurance, an address or
 * 24/7 availability; none of that is verified.
 */

export const site = {
  name: 'Norman Roofing Experts',
  legalName: 'Norman Roofing Experts',
  /** Title-tag suffix on inner pages, keeps titles within 60 chars. */
  shortName: 'Norman Roofing',
  url: 'https://normanroofingexperts.com',
  /** Main service and city, used in copy, titles and schema. */
  service: 'Roof Leak Repair',
  city: 'Severna Park',
  state: 'MD',
  stateName: 'Maryland',
  county: 'Anne Arundel County',
  zip: '21146',
  tagline: 'Roof Leak Repair in Severna Park, MD',
  description:
    'Norman Roofing Experts connects Severna Park, Maryland homeowners with a local roofing provider for roof leak repair: flashing, chimneys, skylights, vents, flat roofs and storm damage.',

  phone: {
    display: '(773) 302-2292',
    /** E.164, used for tel: links and schema. */
    href: 'tel:+17733022292',
  },

  email: 'normanroofingsexperts@gmail.com',

  /** No physical address and no Google Business Profile. Never add one. */
  hasPhysicalLocation: false,

  /** Shown wherever the reference design would show an address. */
  serviceAreaLine: 'Serving Severna Park, MD 21146 and nearby Anne Arundel County',

  /** Short referral disclosure. Used in the hero small print and footer only. */
  disclosure:
    'Norman Roofing Experts is a free referral service. Calls are connected to an independent, local roofing provider who quotes and performs the work.',

  /** Broad service region, used in Organization schema areaServed. */
  areaServed: [
    'Severna Park, MD',
    'Arnold, MD',
    'Pasadena, MD',
    'Millersville, MD',
    'Severn, MD',
    'Glen Burnie, MD',
    'Anne Arundel County, MD',
  ],

  /** Open Graph default image, relative to /public. */
  defaultOgImage: '/og/og-default.png',
} as const;

/**
 * Primary navigation. `menu` marks an item that opens a dropdown whose links
 * are pulled from the matching content collection in Header.astro.
 */
export const primaryNav = [
  { label: 'Leak Repairs', href: '/#services', menu: 'services' },
  { label: 'Areas', href: '/#areas', menu: 'locations' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Legal / utility links, footer only. */
export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Service', href: '/terms/' },
] as const;
