import { getEntry, type CollectionEntry } from "astro:content";

export type Copy = CollectionEntry<"pages">["data"]["copy"];

export async function getPageCopy(id: string) {
  const entry = await getEntry("pages", id);
  if (!entry) throw new Error(`Missing page content entry: ${id}`);
  return entry.data.copy;
}

export async function getSettingsCopy(id: string) {
  const entry = await getEntry("settings", id);
  if (!entry) throw new Error(`Missing settings content entry: ${id}`);
  return entry.data.copy;
}

export async function getTestimonial(id: string) {
  const entry = await getEntry("testimonials", id);
  if (!entry) throw new Error(`Missing testimonial content entry: ${id}`);
  return entry.data;
}

export function text(copy: Copy, key: string) {
  const value = copy.strings[key];
  if (value === undefined) throw new Error(`Missing content string: ${key}`);
  return value;
}

export function list(copy: Copy, key: string) {
  const value = copy.lists[key];
  if (value === undefined) throw new Error(`Missing content list: ${key}`);
  return value;
}

export function cards(copy: Copy, key: string) {
  const value = copy.cards[key];
  if (value === undefined) throw new Error(`Missing content cards: ${key}`);
  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Renders a tiny Markdown subset to HTML: **bold**, *italic*, [text](url).
 * All other characters are escaped, so the result is safe to use with set:html.
 */
function markdownToHtml(raw: string) {
  const escaped = escapeHtml(raw);
  return escaped
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const safeUrl = /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : "#";
      return `<a href="${safeUrl}">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export function richText(copy: Copy, key: string) {
  return markdownToHtml(text(copy, key));
}

export function richList(copy: Copy, key: string) {
  return list(copy, key).map(markdownToHtml);
}
