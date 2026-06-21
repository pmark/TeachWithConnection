---
status: complete
updated: 2026-06-19
---

# Architecture

## Stack

- Astro 6
- TypeScript strict mode
- Tailwind CSS 4 through `@tailwindcss/vite`
- Static output
- Cloudflare Pages unless otherwise documented
- Cloudflare Pages Functions for the same-origin inquiry endpoint

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
├── functions/
│   └── api/
│       └── inquiry.ts
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
│   │   ├── pages/
│   │   ├── proof/
│   │   ├── resources/
│   │   ├── services/
│   │   ├── settings/
│   │   └── testimonials/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── docs/
├── astro.config.mjs
├── wrangler.jsonc
├── package.json
└── tsconfig.json
```

Do not create files outside this structure unless the architecture docs are updated first.

## Routes

Recommended launch routes:

```text
/
/workshops/
/keynotes/
/consultation/
/bookstore/
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

`/professional-development/` is a redirect-only legacy path and permanently redirects to `/`. It must not generate HTML or appear in the sitemap. Additional source-site redirects remain subject to the migration map.

## Major modules

- Layouts: base document shell, metadata, header, footer, and main content wrapper.
- Navigation: primary navigation, mobile navigation, footer links, and conversion CTA.
- Services: reusable cards and page sections for professional development, workshops, keynotes, and consultation.
- Proof: testimonials, credentials, publications, awards, logo rows, and source-backed credibility callouts.
- Resources: resource listings, resource detail pages, file links, and service CTAs.
- Articles: article listing and article detail rendering.
- Forms: accessible inquiry states and the Pages Function/Resend integration.
- SEO: metadata helpers, canonical URLs, social images, and structured data where useful.
- Functions: same-origin inquiry validation, spam controls, rate limiting, and Resend delivery.

## Content flow

Content should flow from source-controlled files into static pages at build time.

- All editable route copy lives in schema-validated `src/content/pages/*.yaml` entries.
- Shared navigation, footer, inquiry CTA, form, and interface copy lives in `src/content/settings/*.yaml`.
- Astro pages own fixed markup and section order; they retrieve named copy through `src/data/content.ts`.
- Repeated editorial records remain in Markdown collections under `src/content/`.
- Downloadable static files live in `public/resources/`.
- Static images live in `public/images/`.
- Source URLs from the existing With Connection site may be recorded in frontmatter or content notes for traceability.

## Content collections

Define content collections in `src/content.config.ts`.

Expected collections:

- `pages`
- `settings`
- `resources`
- `articles`
- `testimonials`
- `proof`
- `services`

Use Zod schemas to require important fields such as title, description, slug, audience, tags, source, and CTA fields.

Page and settings entries use stable semantic keys grouped into `strings`, `lists`, and `cards`. Missing entries or keys fail during the build. `pnpm content:audit` also rejects embedded editable props, literal template prose, and known placeholder language without requiring another dependency.

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
- `ImagePlaceholder.astro`: honest, dashed-border placeholder for pages still missing real photography.
- `ThemeToggleButton.astro`: dark-mode toggle button, rendered twice in `Header.astro` (once per responsive layout) sharing one `data-theme-toggle` click handler.
- `PartnerLogoBar.astro`: the "Past Presentations and Partnerships" logo wall, renders real logos or a text-wordmark fallback.

Do not put business logic into components when content collections or plain data files can provide the structure.

## External dependencies

Current dependencies:

- `astro`
- `tailwindcss`
- `@tailwindcss/vite`
- `@astrojs/sitemap`
- `@fontsource-variable/source-serif-4` — self-hosted variable serif font for headings (`docs/DESIGN.md` Phase 2), replacing the Georgia system-font fallback. Imported once in `src/styles/global.css`; no JavaScript, no third-party font CDN request.

Current development dependencies also include `wrangler` for Cloudflare configuration and local/deployment tooling.

Potential future integrations that require explicit approval and documentation:

- Analytics.
- Image optimization integration.

Prefer first-party Astro integrations where possible.

## Form architecture

The inquiry form is the reliability-sensitive conversion surface. It posts to `POST /api/inquiry`, implemented as a same-project Cloudflare Pages Function:

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

The function validates and bounds inputs, rejects honeypot and too-fast submissions, verifies Cloudflare Turnstile server-side, applies the configured rate-limit binding, and sends through the Resend HTTPS API. Secrets are supplied through Cloudflare and never exposed to the browser. A successful API response means Resend accepted the email request; production mailbox receipt remains a launch test.

## Phase 2 inquiry CRM

After launch, add D1 persistence and a password-protected admin surface for managing inquiries. This phase requires a separate architecture decision and the Cloudflare Astro adapter for server-side rendering. Public marketing pages must remain prerendered. Phase 2 is not part of launch.

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
