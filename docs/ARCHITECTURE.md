---
status: complete
updated: 2026-06-04
---

# Architecture

## Stack

- Astro 6
- TypeScript strict mode
- Tailwind CSS 4 through `@tailwindcss/vite`
- Static output
- Cloudflare Pages unless otherwise documented

The current project uses `astro.config.mjs`, not `astro.config.ts`.

## Folder structure

Use this structure for launch development:

```text
/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── images/
│   ├── resources/
│   └── social/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── content/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── proof/
│   │   └── services/
│   ├── content/
│   │   ├── articles/
│   │   ├── proof/
│   │   ├── resources/
│   │   ├── services/
│   │   └── testimonials/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── docs/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Do not create files outside this structure unless the architecture docs are updated first.

## Routes

Recommended launch routes:

```text
/
/professional-development/
/workshops/
/keynotes/
/consultation/
/about/
/resources/
/resources/[slug]/
/articles/
/articles/[slug]/
/publications/
/contact/
/privacy/
/disclaimer/
/terms/
```

Use redirects later if the final launch plan needs to preserve existing With Connection paths.

## Major modules

- Layouts: base document shell, metadata, header, footer, and main content wrapper.
- Navigation: primary navigation, mobile navigation, footer links, and conversion CTA.
- Services: reusable cards and page sections for professional development, workshops, keynotes, and consultation.
- Proof: testimonials, credentials, publications, awards, logo rows, and source-backed credibility callouts.
- Resources: resource listings, resource detail pages, file links, and service CTAs.
- Articles: article listing and article detail rendering.
- Forms: inquiry form markup and provider integration once selected.
- SEO: metadata helpers, canonical URLs, social images, and structured data where useful.

## Content flow

Content should flow from source-controlled files into static pages at build time.

- Repeated content lives in `src/content/` collections.
- Single-use page copy may live in `.astro` pages or nearby data files if it does not need collection behavior.
- Downloadable static files live in `public/resources/`.
- Static images live in `public/images/`.
- Source URLs from the existing With Connection site may be recorded in frontmatter or content notes for traceability.

## Content collections

Define content collections in `src/content.config.ts`.

Expected collections:

- `resources`
- `articles`
- `testimonials`
- `proof`
- `services`

Use Zod schemas to require important fields such as title, description, slug, audience, tags, source, and CTA fields.

## Component boundaries

Prefer Astro components with props over client-side islands.

Suggested boundaries:

- `BaseLayout.astro`: document structure, metadata, global header/footer slots.
- `Section.astro`: layout wrapper for consistent vertical rhythm.
- `ButtonLink.astro`: link styling for primary and secondary CTAs.
- `InquiryCta.astro`: reusable CTA section tied to the inquiry form.
- `ServiceCard.astro`: repeated service previews.
- `TestimonialQuote.astro`: repeated quote display.
- `ProofList.astro`: credentials, publications, awards, and logos.
- `ResourceCard.astro`: resource listing item.
- `ArticleCard.astro`: article listing item.
- `InquiryForm.astro`: form markup once form provider is chosen.

Do not put business logic into components when content collections or plain data files can provide the structure.

## External dependencies

Current dependencies:

- `astro`
- `tailwindcss`
- `@tailwindcss/vite`

No additional dependencies are approved yet.

Potential future integrations that require explicit approval and documentation:

- Form service integration for inquiry submissions.
- Analytics.
- Sitemap or SEO integration if Astro built-ins are insufficient.
- Image optimization integration.

Prefer first-party Astro integrations where possible.

## Form architecture

The inquiry form is the reliability-sensitive conversion surface. Until a provider is chosen, implement the form component in a provider-ready way:

- Name.
- Email.
- Organization.
- Role/title.
- Location.
- Inquiry type: professional development, workshop, keynote, consultation, other.
- Estimated date or timeline.
- Audience size.
- Message.
- Consent or privacy acknowledgement if required.

Final form handling must work on Cloudflare Pages static hosting. Options should be evaluated before implementation.

## Reliability-sensitive surfaces

- Inquiry form submission and confirmation.
- Resource download links.
- External publication/book links.
- Image and logo paths.
- Metadata and canonical URLs.
- Accessibility of navigation, headings, forms, and downloadable resources.

## Observability

No analytics or monitoring provider is selected yet.

If analytics are added, use a privacy-conscious configuration and document it in `docs/DEPLOY.md`. Track at minimum:

- Inquiry form submissions.
- Resource downloads.
- Outbound clicks to book/publication links.
- Contact page visits.

Do not add analytics until the owner approves the provider.
