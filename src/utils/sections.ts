/**
 * Splits a rendered markdown body (entry.rendered.html) into one block per
 * H2, so the layouts can give every part of a page its own full-width
 * section, like the reference site. The kind of each block comes from its
 * heading, which follows the fixed body order in CLAUDE.md.
 *
 * The markdown is machine-generated HTML with no nested <p>, so the small
 * string transforms below stay safe.
 */

export type SectionKind =
  | 'about' | 'how' | 'signs' | 'causes' | 'checks' | 'visit' | 'cost' | 'prevent' | 'emergency'
  | 'services' | 'checklist' | 'questions' | 'nearby' | 'plain';

export interface Section {
  kind: SectionKind;
  id: string;
  title: string;
  body: string;
}

/** First match wins, so the specific patterns come before the broad ones. */
const SERVICE_KINDS: [RegExp, SectionKind][] = [
  [/warning signs/i, 'signs'],
  [/affects the cost/i, 'cost'],
  [/^when is/i, 'emergency'],
  [/^what is/i, 'about'],
  [/^how does/i, 'how'],
  [/^what causes/i, 'causes'],
  [/check yourself/i, 'checks'],
  [/roofer (visits|arrives)/i, 'visit'],
  [/^how do you/i, 'prevent'],
];

const LOCATION_KINDS: [RegExp, SectionKind][] = [
  [/^why does/i, 'about'],
  [/^which leak repairs/i, 'services'],
  [/checklist/i, 'checklist'],
  [/ask the roofer/i, 'questions'],
  [/^nearby/i, 'nearby'],
];

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '').trim();

export function splitSections(html: string, type: 'service' | 'location'): Section[] {
  const kinds = type === 'service' ? SERVICE_KINDS : LOCATION_KINDS;
  return html
    .split(/(?=<h2[\s>])/)
    .filter((part) => part.startsWith('<h2'))
    .map((part) => {
      const m = part.match(/^<h2(?:\s+id="([^"]*)")?[^>]*>([\s\S]*?)<\/h2>/);
      if (!m) throw new Error(`Unparseable section: ${part.slice(0, 80)}`);
      const title = stripTags(m[2]);
      const kind = kinds.find(([re]) => re.test(title))?.[1] ?? 'plain';
      return { kind, id: m[1] ?? '', title, body: transform(kind, part.slice(m[0].length).trim()) };
    });
}

/** Per-kind markup upgrades: card grids, process steps, checklists. */
function transform(kind: SectionKind, body: string): string {
  switch (kind) {
    case 'how':
      return featureCards(body);
    case 'visit':
      return body.replace('<ol>', '<ol class="process">');
    case 'prevent':
    case 'checklist':
      return body.replace(/<ul>/, '<ul class="check-grid">');
    case 'questions':
      return body.replace(/<ul>/, '<ul class="qa-list">');
    case 'services':
      return h3Cards(body);
    default:
      return body;
  }
}

/** Runs of "<p><strong>Term</strong> ..." paragraphs become a numbered card grid. */
function featureCards(body: string): string {
  return body.replace(/(?:<p><strong>[\s\S]*?<\/p>\s*){2,}/g, (run) => {
    let n = 0;
    const cards = run
      .trim()
      .split(/\s*(?=<p><strong>)/)
      .map((p) => `<article class="feature"><span class="feature__num">${String(++n).padStart(2, '0')}</span>${p}</article>`);
    return `<div class="feature-grid">${cards.join('')}</div>`;
  });
}

/** Each H3 and the content under it becomes a card; text before the first H3 stays as the intro. */
function h3Cards(body: string): string {
  const parts = body.split(/(?=<h3[\s>])/);
  // split() drops the empty piece when the body opens with an H3.
  const intro = parts[0].startsWith('<h3') ? '' : parts.shift()!;
  const groups = parts;
  if (!groups.length) return body;
  let n = 0;
  const cards = groups.map((g) => `<article class="feature"><span class="feature__num">${String(++n).padStart(2, '0')}</span>${g.trim()}</article>`);
  return `${intro}<div class="feature-grid feature-grid--2">${cards.join('')}</div>`;
}
