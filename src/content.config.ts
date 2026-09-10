import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const optionalString = () =>
  z
    .string()
    .optional()
    .transform((v) => (v ? v : undefined));

// Optional nested objects (source/cta/image) are always presented as filled-in
// fields in the Keystatic admin UI, so a left-blank field round-trips as an
// empty string rather than a missing key. These transforms normalize an
// all-blank object back to `undefined` so app code sees the same shape as
// before Keystatic (present only when actually filled in).
const sourceSchema = z
  .object({
    label: z.string().default(""),
    url: z.string().default(""),
  })
  .optional()
  .transform((v) => (v && v.label ? { label: v.label, url: v.url || undefined } : undefined));

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const optionalCtaSchema = z
  .object({
    label: z.string().default(""),
    href: z.string().default(""),
  })
  .optional()
  .transform((v) => (v && v.label && v.href ? { label: v.label, href: v.href } : undefined));

const optionalImageSchema = z
  .object({
    src: z.string().default(""),
    alt: z.string().default(""),
  })
  .optional()
  .transform((v) => (v && v.src ? { src: v.src, alt: v.alt } : undefined));

const copyCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  label: z.string().optional(),
  href: z.string().optional(),
});

const copySchema = z.object({
  strings: z.record(z.string(), z.string()),
  lists: z.record(z.string(), z.array(z.string())).default({}),
  cards: z.record(z.string(), z.array(copyCardSchema)).default({}),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/pages" }),
  schema: z.object({
    route: z.string(),
    status: z.enum(["approved", "review-needed", "blocked-owner"]),
    copy: copySchema,
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/settings" }),
  schema: z.object({
    copy: copySchema,
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    audience: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    file: optionalString(),
    source: sourceSchema,
    cta: optionalCtaSchema,
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z
      .coerce
      .date()
      .nullable()
      .optional()
      .transform((v) => v ?? undefined),
    audience: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    source: sourceSchema,
    cta: optionalCtaSchema,
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    attribution: z.string(),
    context: optionalString(),
    service: optionalString(),
    source: sourceSchema,
  }),
});

const proof = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proof" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["credential", "publication", "award", "logo", "appearance"]),
    source: sourceSchema,
    href: optionalString(),
    image: optionalImageSchema,
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    priority: z.number().int().positive(),
    audience: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    href: z.string(),
    cta: ctaSchema,
    source: sourceSchema,
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

export const collections = {
  articles,
  pages,
  proof,
  resources,
  services,
  settings,
  testimonials,
};
