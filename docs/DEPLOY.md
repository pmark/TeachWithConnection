---
status: complete
updated: 2026-06-04
---

# Deploy

## Target platform

Cloudflare Pages.

## Build command

```sh
npm run build
```

## Output directory

```text
dist
```

## Runtime

The site should build as static Astro output. No server runtime is planned.

Node requirement from `package.json`:

```text
>=22.12.0
```

## Environment variables

None are required for the current static starter.

Environment variables may be needed later for:

- Inquiry form provider.
- Analytics provider.
- Search or indexing service, if added.

Any new variable must be documented here before deployment.

## Domains and redirects

Final production domain is not yet confirmed.

Known existing source domain:

```text
www.withconnectionpdx.com
```

The new site may need redirects from existing educator-facing paths if those pages move:

```text
/consultation-and-training
/workshops
/keynotes
/consultation
/bookstore
/withconnectionblog
/contact-us
```

Redirect decisions depend on final hosting/domain strategy and whether the original With Connection therapy site remains live separately.

## Forms

The primary conversion action is inquiry form submission. The form provider is not selected yet.

The selected provider must support static hosting on Cloudflare Pages and must provide:

- Reliable submission delivery.
- Spam protection.
- Accessible success and error states.
- Clear privacy behavior.
- No requirement to gate free resource downloads.

Document provider setup and required environment variables here when chosen.

## Analytics

No analytics provider is selected yet.

If analytics are added, prefer a privacy-conscious setup and track:

- Inquiry form submissions.
- Contact page visits.
- Resource downloads.
- Outbound clicks to book and publication links.

## Launch checklist

- [ ] Production build succeeds.
- [ ] `npm run lint` succeeds.
- [ ] Core pages reviewed on mobile and desktop.
- [ ] Metadata and social cards checked.
- [ ] Inquiry form path tested end to end.
- [ ] Resource download links tested.
- [ ] External book, publication, and social links tested.
- [ ] Accessibility pass completed for headings, labels, focus states, contrast, and alt text.
- [ ] Redirects configured if replacing or moving existing With Connection educator pages.
- [ ] Analytics configured if approved.
- [ ] Search Console or equivalent configured if applicable.

## Open deployment questions

- What final domain should be used?
- Should the existing With Connection site remain live for therapy content?
- Which inquiry form provider should be used?
- Should Cloudflare Pages redirects preserve the current Squarespace educator URLs?
