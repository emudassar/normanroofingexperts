/**
 * Frontmatter strings (FAQ answers, "what's included" bodies) are authored in
 * markdown but are not run through the markdown renderer, because they are
 * structured data rather than page body content.
 *
 * These two helpers cover the only inline syntax we actually use in frontmatter:
 * links, bold and code. `toHtml` is safe because the input is our own content
 * collection, never user input, and HTML-special characters are escaped first, so
 * nothing in the markdown can inject markup beyond the tags we generate.
 */

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Inline markdown → HTML. Links, bold, inline code. */
export function toHtml(markdown: string): string {
  return escapeHtml(markdown)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/** Inline markdown → plain text. Used for JSON-LD, where markup is noise. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
