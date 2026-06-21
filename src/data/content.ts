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
