import { config, fields, collection, singleton } from "@keystatic/core";
import { copyFieldsFor } from "./keystatic/copy-fields";

// These render as always-present objects with blank-tolerant fields.
// content.config.ts normalizes an all-blank object back to `undefined`,
// so leaving them empty behaves the same as an absent key did before.
const sourceField = fields.object(
  {
    label: fields.text({ label: "Label (leave blank for no source)" }),
    url: fields.text({ label: "URL (optional)" }),
  },
  { label: "Source" }
);

const optionalCtaField = fields.object(
  {
    label: fields.text({ label: "Label (leave blank for no CTA)" }),
    href: fields.text({ label: "Href" }),
  },
  { label: "Call to action" }
);

const ctaField = fields.object(
  {
    label: fields.text({ label: "Label" }),
    href: fields.text({ label: "Href" }),
  },
  { label: "Call to action" }
);

const pageSingleton = (path: string) =>
  singleton({
    label: path,
    path: `src/content/pages/${path}`,
    format: "yaml",
    schema: {
      route: fields.text({ label: "Route" }),
      status: fields.select({
        label: "Status",
        options: [
          { label: "Approved", value: "approved" },
          { label: "Review needed", value: "review-needed" },
          { label: "Blocked (owner)", value: "blocked-owner" },
        ],
        defaultValue: "approved",
      }),
      copy: copyFieldsFor("pages", path),
    },
  });

const settingsSingleton = (path: string) =>
  singleton({
    label: path,
    path: `src/content/settings/${path}`,
    format: "yaml",
    schema: {
      copy: copyFieldsFor("settings", path),
    },
  });

export default config({
  storage: { kind: "local" },
  singletons: {
    "pages-about": pageSingleton("about"),
    "pages-article-detail": pageSingleton("article-detail"),
    "pages-articles": pageSingleton("articles"),
    "pages-bookstore": pageSingleton("bookstore"),
    "pages-consultation": pageSingleton("consultation"),
    "pages-contact": pageSingleton("contact"),
    "pages-disclaimer": pageSingleton("disclaimer"),
    "pages-home": pageSingleton("home"),
    "pages-keynotes": pageSingleton("keynotes"),
    "pages-privacy": pageSingleton("privacy"),
    "pages-publications": pageSingleton("publications"),
    "pages-resource-detail": pageSingleton("resource-detail"),
    "pages-resources": pageSingleton("resources"),
    "pages-terms": pageSingleton("terms"),
    "pages-workshops": pageSingleton("workshops"),
    "settings-site": settingsSingleton("site"),
    "settings-interface": settingsSingleton("interface"),
  },
  collections: {
    resources: collection({
      label: "Resources",
      path: "src/content/resources/*",
      format: { contentField: "content" },
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        audience: fields.array(fields.text({ label: "Audience" }), {
          label: "Audience",
          itemLabel: (props) => props.value || "Audience",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        file: fields.text({ label: "Downloadable file path (optional)" }),
        source: sourceField,
        cta: optionalCtaField,
        content: fields.markdoc({ label: "Content", extension: "md", options: { bold: true, italic: true, link: true } }),
      },
    }),
    articles: collection({
      label: "Articles",
      path: "src/content/articles/*",
      format: { contentField: "content" },
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        publishDate: fields.date({ label: "Publish date" }),
        audience: fields.array(fields.text({ label: "Audience" }), {
          label: "Audience",
          itemLabel: (props) => props.value || "Audience",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        source: sourceField,
        cta: optionalCtaField,
        content: fields.markdoc({ label: "Content", extension: "md", options: { bold: true, italic: true, link: true } }),
      },
    }),
    testimonials: collection({
      label: "Testimonials",
      path: "src/content/testimonials/*",
      format: { contentField: "content" },
      slugField: "attribution",
      schema: {
        quote: fields.text({ label: "Quote", multiline: true }),
        attribution: fields.slug({ name: { label: "Attribution" } }),
        context: fields.text({ label: "Context (optional)" }),
        service: fields.text({ label: "Service (optional)" }),
        source: sourceField,
        content: fields.markdoc({ label: "Content", extension: "md", options: { bold: true, italic: true, link: true } }),
      },
    }),
    proof: collection({
      label: "Proof",
      path: "src/content/proof/*",
      format: { contentField: "content" },
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Credential", value: "credential" },
            { label: "Publication", value: "publication" },
            { label: "Award", value: "award" },
            { label: "Logo", value: "logo" },
            { label: "Appearance", value: "appearance" },
          ],
          defaultValue: "credential",
        }),
        source: sourceField,
        href: fields.text({ label: "Href (optional)" }),
        image: fields.object(
          {
            src: fields.text({ label: "Image path (e.g. /images/partners/logo.png), leave blank for no image" }),
            alt: fields.text({ label: "Alt text" }),
          },
          { label: "Image" }
        ),
        content: fields.markdoc({ label: "Content", extension: "md", options: { bold: true, italic: true, link: true } }),
      },
    }),
    services: collection({
      label: "Services",
      path: "src/content/services/*",
      format: { contentField: "content" },
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        priority: fields.integer({ label: "Priority", defaultValue: 1 }),
        audience: fields.array(fields.text({ label: "Audience" }), {
          label: "Audience",
          itemLabel: (props) => props.value || "Audience",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        href: fields.text({ label: "Href" }),
        cta: ctaField,
        source: sourceField,
        image: fields.object(
          {
            src: fields.text({ label: "Image path (e.g. /images/photos/example.jpg)" }),
            alt: fields.text({ label: "Alt text" }),
          },
          { label: "Image" }
        ),
        content: fields.markdoc({ label: "Content", extension: "md", options: { bold: true, italic: true, link: true } }),
      },
    }),
  },
});
