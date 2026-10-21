import type { ImageMetadata } from 'astro';

/**
 * Photos shared by several pages (src/assets/photos/shared/). Looked up by
 * file name so a page still builds, without that photo, if one is missing.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/shared/*.{jpg,jpeg,png,webp}', { eager: true });

const ALT: Record<string, string> = {
  'ceiling-stain': 'Homeowner checking a brown water stain on a ceiling with a flashlight',
  'attic-check': 'Flashlight on damp, stained roof boards inside an attic',
  'roofer-inspection': 'Roofer on a ladder inspecting asphalt shingles and flashing',
};

export function sharedPhoto(name: keyof typeof ALT | string) {
  const hit = Object.entries(files).find(([path]) => path.split('/').pop()!.replace(/\.\w+$/, '') === name);
  return hit ? { src: hit[1].default, alt: ALT[name] ?? '' } : undefined;
}
