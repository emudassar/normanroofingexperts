/**
 * Single source of truth for site-wide business details.
 *
 * PLACEHOLDERS: every value marked `TODO` below must be replaced before launch.
 * The phone number uses the reserved 555-01xx fictional range on purpose so a
 * placeholder can never dial a real person. See docs/brief.md §12.
 */

export const site = {
  name: 'Norman Roofing Experts',
  legalName: 'Norman Roofing Experts',
  url: 'https://normanroofingexperts.com',
  /** Used in <title> suffixes and the footer. */
  tagline: 'Roofing Contractors in Norman, OK',
  description:
    'Norman Roofing Experts provides roof repair, replacement, inspection and storm damage restoration for homeowners across Norman, Oklahoma and the surrounding Cleveland County communities.',

  /** TODO: replace with the provisioned call-tracking number. */
  phone: {
    display: '(405) 555-0147',
    /** E.164, used for tel: links and schema. */
    href: 'tel:+14055550147',
    isPlaceholder: true,
  },

  email: 'normanroofingsexperts@gmail.com',

  /**
   * TODO: replace with the LeadSmart endpoint. Until then the form posts
   * nowhere and the client-side handler shows a "not yet connected" notice.
   */
  formEndpoint: '/api/lead-placeholder',

  /** No physical address and no Google Business Profile. See docs/brief.md §2. */
  hasPhysicalLocation: false,

  hours: 'Monday – Saturday, 7:00am – 7:00pm. Storm response calls answered 24/7.',

  /** Broad service region, used in copy and Organization schema areaServed. */
  areaServed: [
    'Norman, OK',
    'Noble, OK',
    'Lexington, OK',
    'Slaughterville, OK',
    'Washington, OK',
    'Little Axe, OK',
    'Goldsby, OK',
    'Cleveland County, OK',
    'McClain County, OK',
  ],

  /** Year the brand started serving Norman, used for "serving since" copy. */
  servingSince: 2013,

  /** Open Graph default image, relative to /public. */
  defaultOgImage: '/og/placeholder-og-default.jpg',
} as const;

export const yearsServing = new Date().getFullYear() - site.servingSince;

/**
 * Primary navigation. Both collection hubs sit in the header by design.
 *
 * `menu` marks an item that opens a dropdown in the header. The dropdown's
 * links are pulled straight from the matching content collection in
 * Header.astro, so adding a service or location page adds it to the menu.
 */
export const primaryNav = [
  { label: 'Services', href: '/services/', menu: 'services' },
  { label: 'Areas We Serve', href: '/service-areas/', menu: 'locations' },
  { label: 'About', href: '/about/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Roof Guides', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Legal / utility links, footer only. */
export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms of Service', href: '/terms/' },
] as const;

/**
 * Project-type options shared by every lead form so submissions land in
 * LeadSmart with a consistent taxonomy.
 */
export const projectTypes = [
  'Roof leak / emergency repair',
  'Storm or hail damage',
  'Full roof replacement',
  'Roof inspection',
  'Gutter installation or repair',
  'Commercial roofing',
  'Something else',
] as const;
