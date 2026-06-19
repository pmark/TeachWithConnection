import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const sourceSchema = z.object({
  label: z.string(),
  url: z.url().optional(),
});

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

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
    file: z.string().optional(),
    source: sourceSchema.optional(),
    cta: ctaSchema.optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date().optional(),
    audience: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    source: sourceSchema.optional(),
    cta: ctaSchema.optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    attribution: z.string(),
    context: z.string().optional(),
    service: z.string().optional(),
    source: sourceSchema.optional(),
  }),
});

const proof = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proof" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["credential", "publication", "award", "logo", "appearance"]),
    source: sourceSchema.optional(),
    href: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
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
    source: sourceSchema.optional(),
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
