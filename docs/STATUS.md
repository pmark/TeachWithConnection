---
status: active
updated: 2026-06-19
---

# Status

## Current milestone

Content-management consolidation and launch hardening for production inquiry delivery.

## What works

- TeachWithConnection.com is configured as the canonical Astro site and `@astrojs/sitemap` generates a sitemap.
- The homepage is the sole early childhood professional-development hub with targeted H1, metadata, opening copy, audience fit, formats, outcomes, proof, service links, and inquiry CTA.
- `/professional-development/` no longer generates a page or content entry and permanently redirects to `/`.
- `/bookstore/` is a first-class, educator-facing canonical route with source-backed Book/Product structured data.
- `BaseLayout` outputs canonicals, robots directives, Open Graph, Twitter metadata, global entity data, breadcrumbs, and route-specific JSON-LD.
- Header navigation is mobile-first, semantic, and JavaScript-free; inquiry remains prominent.
- The contact form has complete qualification fields and accessible pending, field-error, success, and failure behavior.
- `POST /api/inquiry` validates submissions, applies spam controls, verifies Turnstile, uses the configured rate limiter, and calls Resend with escaped HTML/plain text.
- Placeholder legal, article, and resource pages are `noindex` and excluded from the sitemap.
- The footer contextually links visitors to the separate With Connection PDX family therapy site.
- `pnpm build` succeeds and generates 13 static pages plus the sitemap.
- `pnpm lint` succeeds with 0 errors, 0 warnings, and 0 hints; the Pages Function passes standalone TypeScript checking.
- Cloudflare Pages deployment is fully documented in `docs/DEPLOY.md`: Git-integration deploys from `main` (production) and `staging` (pinned to a stable `staging.teachwithconnection.com` preview domain), with no GitHub Actions deploy workflow needed.
- `scripts/deploy-setup.sh` (`pnpm deploy:setup`) idempotently bootstraps the Cloudflare Pages project and the one secret shared across environments via Wrangler CLI.
- The lockfile conflict (stale `package-lock.json` alongside `pnpm-lock.yaml`) is resolved — pnpm is the only package manager referenced anywhere in the repo. Node version is pinned via `.node-version` and `package.json` `engines`.
- Generated-route checks confirm one H1, canonical, indexability, social metadata, and JSON-LD on every core page; the sitemap excludes the redirect and incomplete routes.
- Mocked Function checks pass success, validation, honeypot, Turnstile failure, Resend failure, rate-limit, and unsupported-method paths.
- Browser checks pass all seven core routes at 320px, 390px, 768px, and 1280px with no overflow, undersized targets, heading failures, or incorrect navigation mode.
- Production-preview Lighthouse scores are 100 for Performance, Accessibility, Best Practices, and SEO on both the homepage and contact page.
- Astro was updated to the latest available 6.4.8 release after a dependency audit.
- All editable route, shared-interface, navigation, footer, CTA, and form copy now lives in schema-validated YAML content entries; Astro templates retain fixed layout and section order.
- `pnpm content:audit` verifies required entries, rejects known placeholder language, and guards against new literal editable copy in Astro templates.
- The 32-item placeholder/editorial-copy inventory is documented in `docs/CONTENT-INVENTORY.md`; safe cases are visitor-ready and owner-dependent gaps remain explicitly blocked.
- Visual design refresh (`docs/DESIGN.md` Phases 1–2): the site accent color was resampled from the real logo file (navy, not the prior inherited teal) and propagated through Tailwind theme tokens; the real logo now renders in the header; Katie's existing photography is wired into the homepage hero and About page; the testimonial card, credibility block, and Approach section have distinct, less template-like treatments; an honest dashed-border `ImagePlaceholder` component marks pages still missing real photography (Workshops, Keynotes, Consultation, Bookstore book cover).
- A `PartnerLogoBar` component and `public/images/partners/` directory are in place for the "Past Presentations and Partnerships" logo wall, ready to render real entries — see Blockers for the exact content template, which the owner needs to add directly (an automated content-safety check blocks the agent from writing named third-party organizations into proof content on its own).

## What is flaky

- The inquiry form is disabled without `PUBLIC_TURNSTILE_SITE_KEY`; production delivery has not been tested because Cloudflare/Resend credentials are not present locally.
- Articles, resources, and testimonials collections remain empty and emit expected build warnings.
- Legal copy, testimonials, article selections, and resource files remain owner-blocked; visitor-safe noindex/empty states are centralized in YAML meanwhile.
- Source assets, third-party logos, and testimonials still need reuse confirmation.
- The new rate-limit binding and Pages Function require deployment verification in the target Cloudflare account.
- `pnpm audit --omit=dev` still reports newly disclosed Astro/esbuild build-tool advisories despite Astro 6.4.8 being the latest available release. The deployed marketing output is static and does not run the Astro server, but the advisories should be rechecked when patched versions publish.
- The Cloudflare Pages project has not been created or connected to GitHub yet — `docs/DEPLOY.md` is a runbook, not a record of completed dashboard work.

## Blockers

- Run the one-time Cloudflare dashboard setup in `docs/DEPLOY.md` (Git connection, Turnstile widgets, Resend domain verification, per-environment env vars, custom domains for production and `staging`). None of this can be scripted further — it's UI-only by Cloudflare's own constraints.
- Configure and verify the Resend sender domain, API key, sender address, and Katie's recipient address.
- Configure Turnstile keys and verify the Cloudflare rate-limit binding.
- Update WithConnectionPDX.com with reciprocal `sameAs`, contextual links, and educator-bookstore canonicals.
- Supply or approve legal copy, reusable assets, testimonials, and resource files.
- Add the 13 "Past Presentations and Partnerships" proof entries directly (the agent is blocked from writing these). For each organization, confirm the relationship is current/accurate and rights-cleared, then:
  1. Save a logo image to `public/images/partners/<slug>.png` (transparent background preferred).
  2. Create `src/content/proof/partner-<slug>.md` with:
     ```yaml
     ---
     title: "Organization Name"
     description: "Organization Name logo."
     type: "logo"
     image:
       src: "/images/partners/<slug>.png"
       alt: "Organization Name logo"
     ---
     ```
  3. Repeat for: Oregon Department of Early Learning and Care, Marion and Polk Early Learning Hub, Portland Community College, Portland State University, EveryChild California, Silver Falls School District, NAEYC, Think Small Institute, Redleaf Press, University of Michigan, Head Start, Discover, Western Oregon University.
  4. The homepage Proof section picks these up automatically via `PartnerLogoBar` — no template changes needed.

## Last user-testing or owner insight

The owner wants all English content editable independently of Astro markup through clearly named, source-controlled content files. Fixed templates are preferred over editor-controlled section composition.

## Next 3 highest-value tasks

1. Configure Cloudflare, Turnstile, and Resend production values; verify end-to-end delivery and failure behavior.
2. Complete reciprocal WithConnectionPDX schema/link/canonical changes and validate both domains together.
3. Supply or approve legal copy, testimonials, article selections, and resource files, then replace the centralized blocked-owner states.

## Active plan

- Completed: Route consolidation, homepage SEO hub, bookstore, sitemap, robots, redirects, metadata, and structured data.
- Completed: Mobile semantic navigation and responsive homepage/form layouts.
- Completed: Pages Function/Resend/Turnstile inquiry implementation and accessible client states.
- Completed: Durable project documentation and decision records.
- Completed: Schema-validated YAML content layer, content audit, placeholder inventory, safe placeholder rewrites, and centralized form response copy.
- Verified: Content audit, static production build, zero-diagnostic lint, Worker type check, generated noindex/sitemap behavior, and 320px/390px/768px/1280px core-route browser checks.
- Pending verification: reciprocal domain changes, Cloudflare binding/secrets, and production email receipt.
